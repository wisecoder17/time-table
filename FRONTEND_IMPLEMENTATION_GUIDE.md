# Frontend Refactoring - Detailed Implementation Guide

## Table of Contents

1. [Phase 1: Project Setup](#phase-1-project-setup)
2. [Phase 2: API Service Layer](#phase-2-api-service-layer)
3. [Phase 3: State Management](#phase-3-state-management)
4. [Phase 4: Component Library](#phase-4-component-library)
5. [Phase 5: Accessibility Implementation](#phase-5-accessibility-implementation)
6. [Phase 6: Feature Migration](#phase-6-feature-migration)
7. [Phase 7: Testing Strategy](#phase-7-testing-strategy)
8. [Phase 8: Performance & Deployment](#phase-8-performance--deployment)

---

## Phase 1: Project Setup

### 1.1 Directory Structure Creation

```bash
# Create new directory structure
mkdir -p src/{assets/{images,icons,fonts},components/{common,layout,features},services/{api,state},hooks,pages,styles/{themes},constants,utils}

# Move existing components to features
mv src/StudentList.js src/components/features/crud/
mv src/CourseList.js src/components/features/crud/
# ... etc
```

### 1.2 Install Dependencies

```bash
npm install zustand axios
npm install --save-dev tailwindcss postcss autoprefixer
npm install --save-dev @storybook/react jest-axe

# Verify installations
npm list zustand axios tailwindcss
```

### 1.3 Configuration Files

**tailwind.config.js:**

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
```

**postcss.config.js:**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## Phase 2: API Service Layer

### 2.1 API Client Setup

**src/services/api/client.js:**

```javascript
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 2.2 Error Handler

**src/utils/errorHandler.js:**

```javascript
export class ApiError extends Error {
  constructor(message, status, originalError) {
    super(message);
    this.status = status;
    this.originalError = originalError;
    this.name = "ApiError";
  }
}

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return new ApiError(
      error.response.data?.message || "An error occurred",
      error.response.status,
      error
    );
  } else if (error.request) {
    // Request was made but no response
    return new ApiError("No response from server", 0, error);
  } else {
    // Error in request setup
    return new ApiError(error.message, 0, error);
  }
};

export const getUserFriendlyMessage = (error) => {
  const errorMessages = {
    400: "Invalid request. Please check your input.",
    401: "Your session has expired. Please log in again.",
    403: "You do not have permission to perform this action.",
    404: "The requested resource was not found.",
    500: "Server error. Please try again later.",
    0: "Network error. Please check your connection.",
  };

  return errorMessages[error.status] || error.message;
};
```

### 2.3 Individual Service Modules

**src/services/api/auth.js:**

```javascript
import apiClient from "./client";
import { handleApiError } from "../../utils/errorHandler";

export const authAPI = {
  login: async (username, password) => {
    try {
      const response = await apiClient.post("/users/login", {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
      }
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  logout: () => {
    localStorage.removeItem("auth_token");
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get("/users/me");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
```

**src/services/api/students.js:**

```javascript
import apiClient from "./client";
import { handleApiError } from "../../utils/errorHandler";

export const studentAPI = {
  fetchAll: async (username) => {
    try {
      const response = await apiClient.get("/student/get", {
        params: { username },
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  fetchById: async (id) => {
    try {
      const response = await apiClient.get(`/student/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  create: async (studentData) => {
    try {
      const response = await apiClient.post("/student/post", studentData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  update: async (id, studentData) => {
    try {
      const response = await apiClient.put(
        `/student/update/${id}`,
        studentData
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/student/delete/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
```

**src/services/api/index.js:**

```javascript
export * as authAPI from "./auth";
export * as studentAPI from "./students";
export * as courseAPI from "./courses";
export * as staffAPI from "./staff";
export * as venueAPI from "./venues";
export * as timetableAPI from "./timetable";
export * as settingsAPI from "./settings";
```

---

## Phase 3: State Management

### 3.1 Zustand Store Setup

**src/services/state/authStore.js:**

```javascript
import { create } from "zustand";
import { authAPI } from "../api/auth";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("auth_token"),
  isAuthenticated: !!localStorage.getItem("auth_token"),
  isLoading: false,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authAPI.login(username, password);
      set({ user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  logout: () => {
    authAPI.logout();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
```

**src/services/state/crudStore.js:**

```javascript
import { create } from "zustand";
import { studentAPI, courseAPI, staffAPI, venueAPI } from "../api";

export const useCrudStore = create((set, get) => ({
  // Student state
  students: [],
  courses: [],
  staff: [],
  venues: [],

  // UI state
  isLoading: false,
  error: null,
  activeEntity: "students",

  // Actions
  fetchStudents: async (username) => {
    set({ isLoading: true });
    try {
      const students = await studentAPI.fetchAll(username);
      set({ students, error: null, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addStudent: async (studentData) => {
    set({ isLoading: true });
    try {
      const newStudent = await studentAPI.create(studentData);
      set((state) => ({
        students: [...state.students, newStudent],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateStudent: async (id, studentData) => {
    set({ isLoading: true });
    try {
      const updated = await studentAPI.update(id, studentData);
      set((state) => ({
        students: state.students.map((s) => (s.id === id ? updated : s)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteStudent: async (id) => {
    set({ isLoading: true });
    try {
      await studentAPI.delete(id);
      set((state) => ({
        students: state.students.filter((s) => s.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Similar methods for courses, staff, venues...
}));
```

### 3.2 Custom Hooks for Store

**src/hooks/useStore.js:**

```javascript
// Re-export store hooks for cleaner imports
export { useAuthStore } from "../services/state/authStore";
export { useCrudStore } from "../services/state/crudStore";

// Custom hook combining related state
export const useAuth = () => {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  return { user, isAuthenticated, login, logout };
};

export const useCrud = () => {
  const {
    students,
    courses,
    isLoading,
    error,
    fetchStudents,
    addStudent,
    updateStudent,
    deleteStudent,
  } = useCrudStore();

  return {
    students,
    courses,
    isLoading,
    error,
    fetchStudents,
    addStudent,
    updateStudent,
    deleteStudent,
  };
};
```

---

## Phase 4: Component Library

### 4.1 Base Button Component

**src/components/common/Button/Button.jsx:**

```javascript
import React from "react";
import styles from "./Button.module.css";

/**
 * Base Button Component
 * @param {string} variant - 'primary' | 'secondary' | 'danger' | 'ghost'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} disabled - Disable button
 * @param {string} ariaLabel - Accessible label for icon-only buttons
 * @param {React.ReactNode} children - Button content
 * @param {function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 */
export const Button = React.forwardRef((props, ref) => {
  const {
    variant = "primary",
    size = "md",
    disabled = false,
    ariaLabel,
    children,
    className = "",
    ...rest
  } = props;

  return (
    <button
      ref={ref}
      className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
        ${disabled ? styles.disabled : ""}
        ${className}
      `}
      disabled={disabled}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
```

**src/components/common/Button/Button.module.css:**

```css
.button {
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);

  /* Focus state for accessibility */
  &:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  /* Keyboard navigation */
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
}

.primary {
  background-color: var(--color-primary);
  color: white;
}

.primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
}

.secondary {
  background-color: var(--color-secondary);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.size-sm {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 0.875rem;
}

.size-lg {
  padding: var(--spacing-lg) var(--spacing-xl);
  font-size: 1.125rem;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### 4.2 Input Component with Accessibility

**src/components/common/Input/Input.jsx:**

```javascript
import React from "react";
import styles from "./Input.module.css";

export const Input = React.forwardRef((props, ref) => {
  const {
    label,
    id,
    error,
    required = false,
    helperText,
    ariaDescribedBy,
    ...rest
  } = props;

  const inputId = id || `input-${Math.random()}`;
  const errorId = error ? `${inputId}-error` : null;
  const helperId = helperText ? `${inputId}-helper` : null;
  const describedBy = [errorId, helperId, ariaDescribedBy]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span aria-label="required">*</span>}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        className={`${styles.input} ${error ? styles.error : ""}`}
        aria-invalid={!!error}
        aria-required={required}
        aria-describedby={describedBy || undefined}
        {...rest}
      />

      {error && (
        <div id={errorId} className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}

      {helperText && (
        <div id={helperId} className={styles.helperText}>
          {helperText}
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";
```

### 4.3 Modal Component

**src/components/common/Modal/Modal.jsx:**

```javascript
import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  closeButtonLabel = "Close",
  size = "md",
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
      // Trap focus within modal
      dialogRef.current.focus();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.modal} ${styles[size]}`}
      onKeyDown={handleKeyDown}
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 id="modal-title" className={styles.title}>
            {title}
          </h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label={closeButtonLabel}
          >
            ✕
          </button>
        </div>

        <div className={styles.body}>{children}</div>
      </div>
    </dialog>
  );
};
```

---

## Phase 5: Accessibility Implementation

### 5.1 Semantic HTML Structure

**src/components/layout/MainLayout.jsx:**

```javascript
export const MainLayout = ({ children }) => (
  <div className="app-container">
    <header role="banner" className="app-header">
      <Logo />
      <nav role="navigation" aria-label="Main navigation">
        <Navigation />
      </nav>
      <UserMenu />
    </header>

    <div className="main-container">
      <aside role="complementary" aria-label="Sidebar">
        <Sidebar />
      </aside>

      <main role="main" className="main-content">
        {children}
      </main>
    </div>

    <footer role="contentinfo" className="app-footer">
      <Footer />
    </footer>
  </div>
);
```

### 5.2 Keyboard Navigation Hook

**src/hooks/useKeyboardNav.js:**

```javascript
import { useEffect } from "react";

export const useKeyboardNav = (items, onSelect) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentIndex = items.findIndex(
        (item) => item.id === document.activeElement.id
      );

      let nextIndex;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          nextIndex = (currentIndex + 1) % items.length;
          items[nextIndex].element?.focus();
          break;
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          nextIndex = (currentIndex - 1 + items.length) % items.length;
          items[nextIndex].element?.focus();
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          onSelect(items[currentIndex]);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, onSelect]);
};
```

### 5.3 Focus Management Hook

**src/hooks/useFocusManagement.js:**

```javascript
import { useEffect, useRef } from "react";

export const useFocusTrap = (isActive) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    const container = containerRef.current;
    container.addEventListener("keydown", handleKeyDown);
    firstElement.focus();

    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  return containerRef;
};
```

---

## Phase 6: Feature Migration

### 6.1 Migrate StudentList Component

**OLD: src/StudentList.js**

```javascript
// 167 lines, monolithic, direct API calls
```

**NEW: src/components/features/crud/pages/StudentManager.jsx**

```javascript
import { useEffect } from "react";
import { useCrud } from "../../../../hooks/useStore";
import { DataTable } from "../components/DataTable";
import { Button } from "../../../common/Button/Button";

const STUDENT_COLUMNS = [
  { key: "matric_No", label: "Matric Number" },
  { key: "surname", label: "Surname" },
  { key: "firstname", label: "First Name" },
  { key: "level", label: "Level" },
];

export const StudentManager = () => {
  const { students, isLoading, error, fetchStudents, deleteStudent } =
    useCrud();

  useEffect(() => {
    const username = localStorage.getItem("username");
    fetchStudents(username);
  }, [fetchStudents]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this student?")) {
      await deleteStudent(id);
    }
  };

  return (
    <div role="main" aria-labelledby="page-title">
      <h1 id="page-title">Student Management</h1>

      <DataTable
        columns={STUDENT_COLUMNS}
        data={students}
        isLoading={isLoading}
        error={error}
        actions={[
          {
            label: "Edit",
            onClick: (student) => console.log("Edit:", student),
          },
          {
            label: "Delete",
            onClick: (student) => handleDelete(student.id),
            variant: "danger",
          },
        ]}
      />
    </div>
  );
};
```

---

## Phase 7: Testing Strategy

### 7.1 Component Test Example

**src/components/common/Button/Button.test.jsx:**

```javascript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText("Disabled")).toBeDisabled();
  });

  it("applies correct variant class", () => {
    render(<Button variant="danger">Delete</Button>);
    const button = screen.getByText("Delete");
    expect(button).toHaveClass("danger");
  });
});
```

### 7.2 Accessibility Testing

**src/components/common/Button/Button.a11y.test.jsx:**

```javascript
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "./Button";

expect.extend(toHaveNoViolations);

describe("Button A11y", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has focus visible state", () => {
    const { container } = render(<Button>Click me</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveStyle("outline: 2px solid");
  });

  it("has aria-label for icon-only buttons", () => {
    render(<Button ariaLabel="Close menu">✕</Button>);
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
  });
});
```

---

## Phase 8: Performance & Deployment

### 8.1 Code Splitting

**src/pages/AdminDashboard.jsx:**

```javascript
import { lazy, Suspense } from "react";

const TimetableGenerator = lazy(() =>
  import("../components/features/timetable/TimetableGenerator")
);
const SettingsPanel = lazy(() =>
  import("../components/features/settings/SettingsPanel")
);

export const AdminDashboard = () => (
  <div>
    <Suspense fallback={<Loading />}>
      <TimetableGenerator />
      <SettingsPanel />
    </Suspense>
  </div>
);
```

### 8.2 Memoization

**src/components/features/crud/components/DataTable.jsx:**

```javascript
import { useMemo, useCallback } from "react";
import React from "react";

const DataTableRow = React.memo(({ row, columns, actions }) => (
  <tr>
    {columns.map((col) => (
      <td key={col.key}>{row[col.key]}</td>
    ))}
  </tr>
));

export const DataTable = React.memo(({ data, columns, actions }) => {
  const rows = useMemo(() => data, [data]);

  const handleRowClick = useCallback((row) => {
    // Handle row click
  }, []);

  return (
    <table>
      <tbody>
        {rows.map((row) => (
          <DataTableRow
            key={row.id}
            row={row}
            columns={columns}
            actions={actions}
          />
        ))}
      </tbody>
    </table>
  );
});
```

### 8.3 Build & Deployment

```bash
# Build for production
npm run build

# Analyze bundle size
npm run build -- --analyze

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
```

---

## Implementation Checklist

### Week 1-2: Setup

- [ ] Create directory structure
- [ ] Install dependencies
- [ ] Configure Tailwind, PostCSS
- [ ] Create design tokens CSS
- [ ] Set up Zustand store
- [ ] Create API client

### Week 3-4: Components & API

- [ ] Build Button component
- [ ] Build Input component
- [ ] Build Modal component
- [ ] Build DataTable component
- [ ] Create student API service
- [ ] Create course API service
- [ ] Write service tests

### Week 5-7: Accessibility & Features

- [ ] Implement semantic HTML
- [ ] Add ARIA labels throughout
- [ ] Add keyboard navigation
- [ ] Implement focus management
- [ ] Migrate StudentManager
- [ ] Migrate CourseManager
- [ ] Migrate StaffManager

### Week 8-10: Testing & Performance

- [ ] Unit tests (70%+ coverage)
- [ ] A11y tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance optimization
- [ ] Bundle analysis

### Week 11-12: Deployment & Docs

- [ ] Storybook setup
- [ ] Architecture documentation
- [ ] API documentation
- [ ] Contributing guide
- [ ] Staging deployment
- [ ] Production deployment

---

This guide provides the technical foundation for each phase. Adapt as needed for your specific requirements.
