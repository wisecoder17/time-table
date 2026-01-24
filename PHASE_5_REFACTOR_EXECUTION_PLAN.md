# PHASE 5: FRONTEND REFACTOR EXECUTION PLAN

## Bells University Timetable Generator - Institutional Identity Enforcement

**Date**: January 24, 2026  
**Version**: 5.0  
**Status**: Ready for Execution  
**Objective**: Unify all screens under Brick & Gold institutional identity

---

## EXECUTIVE SUMMARY

This document provides a **step-by-step execution plan** for the Phase 5 frontend refactor, ensuring:

1. **Visual Consistency** - All screens match login page quality
2. **Deterministic Rendering** - Timetable consumes backend schedule JSON
3. **Atomic Design** - Component hierarchy enforced
4. **Token Discipline** - Zero raw hex values
5. **Motion Restraint** - Institutional calm, no excessive animation

**Guiding Principle**: The login page is the **institutional standard**. All other screens must match its visual quality and design discipline.

---

## PART 1: DESIGN TOKEN SYSTEM

### 1.1 Core Institutional Palette

**File**: `src/styles/tokens.css` (CREATE NEW)

```css
/* ==========================================================================
   BELLS UNIVERSITY - INSTITUTIONAL DESIGN TOKENS
   Locked Palette: Brick Brown + Shiny Yellow
   ========================================================================== */

:root {
  /* ===== BRAND IDENTITY ===== */
  --brand-brick: #b8846f;
  --brand-brick-deep: #a67660;
  --brand-brick-dark: #8a5b47;

  --brand-gold: #ffd36b;
  --brand-gold-deep: #ffb800;

  /* ===== FUNCTIONAL STATUS ===== */
  --status-info: #0b5fa5;
  --status-success: #1e7f3b;
  --status-warning: #cc9a22;
  --status-error: #a84444;

  /* ===== NEUTRAL PALETTE (Light) ===== */
  --bg-page: #f5ede3;
  --bg-surface: #ffffff;
  --bg-input: #f8f4f0;

  --text-primary: #2c2c2c;
  --text-secondary: #4a4a4a;
  --text-muted: #7a7a7a;
  --text-on-brand: #fff7f0;

  /* ===== STRUCTURAL TOKENS ===== */
  --radius-institutional: 8px;
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 16px;

  --spacing-unit: 4px;
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* ===== SHADOWS ===== */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 16px rgba(166, 118, 96, 0.12);
  --shadow-lg: 0 10px 30px rgba(166, 118, 96, 0.15);

  /* ===== TRANSITIONS ===== */
  --transition-institutional: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-fast: all 150ms ease;
  --transition-slow: all 500ms ease;
}

/* Dark Theme */
.dark {
  --bg-page: #1a1a1a;
  --bg-surface: #252525;
  --bg-input: #2d2d2d;

  --text-primary: #f5ede3;
  --text-secondary: #dcdcdc;
  --text-muted: #a0a0a0;

  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.4);
}
```

---

### 1.2 Tailwind Configuration

**File**: `tailwind.config.js` (UPDATE)

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Institutional Brand
        brick: {
          DEFAULT: "var(--brand-brick)",
          deep: "var(--brand-brick-deep)",
          dark: "var(--brand-brick-dark)",
        },
        gold: {
          DEFAULT: "var(--brand-gold)",
          deep: "var(--brand-gold-deep)",
        },

        // Functional Status
        "status-info": "var(--status-info)",
        "status-success": "var(--status-success)",
        "status-warning": "var(--status-warning)",
        "status-error": "var(--status-error)",

        // Semantic Aliases
        page: "var(--bg-page)",
        surface: "var(--bg-surface)",
        "institutional-primary": "var(--text-primary)",
        "institutional-secondary": "var(--text-secondary)",
        "institutional-muted": "var(--text-muted)",
      },

      borderRadius: {
        institutional: "var(--radius-institutional)",
      },

      boxShadow: {
        institutional: "var(--shadow-md)",
      },

      transitionTimingFunction: {
        institutional: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
```

---

### 1.3 Token Usage Rules

✅ **ALWAYS**:

- Use CSS variables for colors
- Use Tailwind classes for spacing
- Use token-based shadows
- Use institutional transitions

❌ **NEVER**:

- Hardcode hex values
- Use inline styles for colors
- Create custom colors outside token system
- Use arbitrary Tailwind values for brand colors

---

## PART 2: ATOMIC DESIGN COMPONENT LIBRARY

### 2.1 Atoms (Pure, Reusable, Token-Driven)

#### **Button Component** (REVIEW EXISTING)

**File**: `src/components/atoms/Button.tsx`

```typescript
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outlined' | 'brand';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', disabled = false, className = '', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-bold tracking-tight transition-institutional rounded-institutional focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.97]';

    const variantStyles = {
      primary: 'bg-brick text-white hover:brightness-110 focus:ring-brick shadow-sm hover:shadow-md',
      secondary: 'bg-surface text-institutional-primary border border-brick/10 hover:bg-page focus:ring-brick/20',
      danger: 'bg-status-error text-white hover:brightness-90 focus:ring-status-error/50',
      outlined: 'border-2 border-brick text-brick hover:bg-brick/5 focus:ring-brick',
      brand: 'bg-gradient-to-br from-gold to-gold-deep text-brick-deep shadow-[0_4px_12px_rgba(255,184,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,184,0,0.4)] hover:-translate-y-0.5',
    };

    const sizeStyles = {
      sm: 'px-4 py-1.5 text-xs uppercase tracking-widest',
      md: 'px-6 py-2.5 text-sm',
      lg: 'px-8 py-3.5 text-base',
    };

    const buttonClass = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
      disabled ? 'opacity-50 cursor-not-allowed grayscale pointer-events-none' : ''
    } ${className}`;

    return (
      <button ref={ref} disabled={disabled} className={buttonClass} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
```

**Status**: ✅ Already correct - uses tokens

---

#### **Badge Component** (CREATE NEW)

**File**: `src/components/atoms/Badge.tsx`

```typescript
import React from 'react';

interface BadgeProps {
  variant?: 'info' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'neutral', size = 'md', children, className = '' }) => {
  const variantStyles = {
    info: 'bg-status-info/10 text-status-info',
    success: 'bg-status-success/10 text-status-success',
    warning: 'bg-status-warning/10 text-status-warning',
    error: 'bg-status-error/10 text-status-error',
    neutral: 'bg-brick/10 text-brick',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[9px]',
    md: 'px-3 py-1 text-[10px]',
  };

  return (
    <span
      className={`inline-flex items-center justify-center font-black uppercase tracking-widest rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
```

---

#### **Spinner Component** (CREATE NEW)

**File**: `src/components/atoms/Spinner.tsx`

```typescript
import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'brick' | 'gold' | 'white';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'brick' }) => {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const colorStyles = {
    brick: 'border-brick border-t-transparent',
    gold: 'border-gold border-t-transparent',
    white: 'border-white border-t-transparent',
  };

  return (
    <div
      className={`inline-block rounded-full animate-spin ${sizeStyles[size]} ${colorStyles[color]}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
```

---

### 2.2 Molecules (Compose Atoms)

#### **StatCard Component** (CREATE NEW)

**File**: `src/components/molecules/StatCard.tsx`

```typescript
import React from 'react';
import Badge from '../atoms/Badge';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  badgeText?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend, badgeText = 'Verified' }) => {
  return (
    <div className="bg-surface p-6 rounded-institutional border border-brick/5 shadow-sm hover:border-brick/20 transition-institutional group">
      <div className="flex justify-between items-start mb-4">
        <div className="text-2xl text-brick group-hover:scale-110 transition-transform">{icon}</div>
        <Badge variant="neutral" size="sm">
          {badgeText}
        </Badge>
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-institutional-muted mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-black text-institutional-primary">{value}</h3>
        {trend && <span className="text-[9px] font-bold text-brick italic">{trend}</span>}
      </div>
    </div>
  );
};

export default StatCard;
```

---

#### **FormField Component** (CREATE NEW)

**File**: `src/components/molecules/FormField.tsx`

```typescript
import React from 'react';
import Input from '../atoms/Input';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type = 'text', value, onChange, error, required, placeholder }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted">
        {label}
        {required && <span className="text-status-error ml-1">*</span>}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? 'border-status-error' : ''}
      />
      {error && <p className="text-xs text-status-error font-bold">{error}</p>}
    </div>
  );
};

export default FormField;
```

---

### 2.3 Organisms (Compose Molecules)

#### **DataTable Component** (CREATE NEW)

**File**: `src/components/organisms/DataTable.tsx`

```typescript
import React from 'react';

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
}

function DataTable<T extends { id: string | number }>({ data, columns, onRowClick }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-institutional border border-brick/10">
      <table className="w-full">
        <thead className="bg-brick/5 border-b border-brick/10">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`px-4 py-3 text-[10px] font-black uppercase tracking-widest text-brick text-${col.align || 'left'}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brick/5 bg-surface">
          {data.map((row) => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row)}
              className={`hover:bg-brick/5 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className={`px-4 py-3 text-sm text-institutional-primary text-${col.align || 'left'}`}>
                  {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
```

---

#### **PageHeader Component** (CREATE NEW)

**File**: `src/components/organisms/PageHeader.tsx`

```typescript
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions }) => {
  return (
    <div className="border-b border-brick/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
      <div>
        <h1 className="text-4xl font-black text-institutional-primary tracking-tighter mb-2">{title}</h1>
        {subtitle && <p className="text-institutional-secondary font-medium tracking-tight">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-4">{actions}</div>}
    </div>
  );
};

export default PageHeader;
```

---

## PART 3: DETERMINISTIC TIMETABLE RENDERING

### 3.1 Backend Contract (Required)

**New Endpoint**: `GET /timetable/schedule`

```typescript
interface TimetableSlot {
  id: string;
  orderIndex: number; // Deterministic placement (0, 1, 2, ...)
  week: number;
  day: string; // "Mon", "Tue", etc.
  period: number;
  startTime?: string; // "09:00"
  endTime?: string; // "11:00"
  course?: {
    id: string;
    code: string;
    title: string;
  };
  venue?: {
    id: string;
    name: string;
    capacity: number;
  };
  staff?: {
    id: string;
    name: string;
    title: string;
  }[];
}

interface TimetableSchedule {
  slots: TimetableSlot[];
  metadata: {
    session: string;
    semester: string;
    startDate: string;
    endDate: string;
    totalSlots: number;
  };
}
```

**Response Example**:

```json
{
  "slots": [
    {
      "id": "slot-001",
      "orderIndex": 0,
      "week": 1,
      "day": "Mon",
      "period": 1,
      "startTime": "09:00",
      "endTime": "11:00",
      "course": {
        "id": "c-123",
        "code": "CMP 401",
        "title": "Advanced Algorithms"
      },
      "venue": {
        "id": "v-45",
        "name": "Auditorium Hall 2",
        "capacity": 200
      },
      "staff": [
        {
          "id": "s-789",
          "name": "Dr. Johnson",
          "title": "Professor"
        }
      ]
    }
  ],
  "metadata": {
    "session": "2024/2025",
    "semester": "First",
    "startDate": "2025-01-20",
    "endDate": "2025-02-28",
    "totalSlots": 120
  }
}
```

---

### 3.2 Frontend Service

**File**: `src/services/api/timetableService.ts` (UPDATE)

```typescript
import apiClient from "./client";
import { TimetableSchedule } from "../../types/timetable";

export const timetableService = {
  // ✅ NEW: Fetch deterministic schedule
  getSchedule: async (): Promise<TimetableSchedule> => {
    const response = await apiClient.get<TimetableSchedule>(
      "/timetable/schedule",
    );
    return response.data;
  },

  // Existing methods...
  submitParameters: async (params: any) => {
    const response = await apiClient.post("/main/add", params);
    return response.data;
  },

  exportCSV: async () => {
    const response = await apiClient.get("/course/export");
    return response.data;
  },
};
```

---

### 3.3 React Hook

**File**: `src/features/timetable/hooks/useTimetableSchedule.ts` (CREATE NEW)

```typescript
import { useQuery } from "@tanstack/react-query";
import { timetableService } from "../../../services/api/timetableService";

export const useTimetableSchedule = () => {
  return useQuery({
    queryKey: ["timetable", "schedule"],
    queryFn: timetableService.getSchedule,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
```

---

### 3.4 Timetable Grid Component (REFACTOR)

**File**: `src/features/timetable/components/TimetableGrid.tsx` (CREATE NEW)

```typescript
import React from 'react';
import { useTimetableSchedule } from '../hooks/useTimetableSchedule';
import SlotCard from './SlotCard';
import Spinner from '../../../components/atoms/Spinner';

const TimetableGrid: React.FC = () => {
  const { data, isLoading, error } = useTimetableSchedule();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner size="lg" color="brick" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-status-error p-8">
        <p className="font-bold">Failed to load timetable schedule</p>
      </div>
    );
  }

  if (!data || data.slots.length === 0) {
    return (
      <div className="text-center text-institutional-muted p-8">
        <p className="font-bold">No schedule available</p>
      </div>
    );
  }

  // ✅ DETERMINISTIC: Render slots by orderIndex
  const sortedSlots = [...data.slots].sort((a, b) => a.orderIndex - b.orderIndex);

  // Group by week
  const weekGroups = sortedSlots.reduce((acc, slot) => {
    if (!acc[slot.week]) acc[slot.week] = [];
    acc[slot.week].push(slot);
    return acc;
  }, {} as Record<number, typeof sortedSlots>);

  return (
    <div className="space-y-10">
      {Object.entries(weekGroups).map(([week, slots]) => (
        <div key={week} className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brick-deep border-l-4 border-brick pl-4">
            Week Cycle {week}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {slots.map((slot) => (
              <SlotCard key={slot.id} slot={slot} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimetableGrid;
```

---

### 3.5 Slot Card Component

**File**: `src/features/timetable/components/SlotCard.tsx` (CREATE NEW)

```typescript
import React from 'react';
import { TimetableSlot } from '../../../types/timetable';

interface SlotCardProps {
  slot: TimetableSlot;
}

const SlotCard: React.FC<SlotCardProps> = ({ slot }) => {
  const isEmpty = !slot.course;

  return (
    <div
      className={`p-4 rounded-institutional border transition-all ${
        isEmpty
          ? 'bg-page/50 border-brick/5 hover:border-brick/10'
          : 'bg-white border-brick/10 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="text-[10px] font-black uppercase text-institutional-muted mb-2 text-center border-b border-brick/5 pb-2">
        {slot.day} - Period {slot.period}
      </div>

      {isEmpty ? (
        <div className="text-center text-institutional-muted italic text-xs py-4">Empty Slot</div>
      ) : (
        <div className="space-y-2">
          <div className="text-xs font-bold text-brick">{slot.course?.code}</div>
          <div className="text-[10px] text-institutional-secondary line-clamp-2">{slot.course?.title}</div>
          {slot.venue && (
            <div className="text-[9px] text-institutional-muted bg-brick/5 px-2 py-1 rounded">
              📍 {slot.venue.name}
            </div>
          )}
          {slot.staff && slot.staff.length > 0 && (
            <div className="text-[9px] text-institutional-muted">
              👤 {slot.staff[0].title} {slot.staff[0].name}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SlotCard;
```

---

## PART 4: MOTION DISCIPLINE

### 4.1 Animation Rules

✅ **ALLOWED**:

- Page-level `fadeIn` (300ms)
- Hover micro-lifts (2px translate)
- Focus ring transitions (150ms)
- Theme toggle transitions (300ms)

❌ **FORBIDDEN**:

- Staggered delays on list items
- Excessive spring animations
- Parallax effects
- Auto-playing animations

---

### 4.2 Accessibility-First Motion

**File**: `src/styles/animations.css` (UPDATE)

```css
/* Institutional Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 4.3 Dashboard Refactor (Remove Stagger)

**File**: `src/pages/DashboardPage.tsx` (UPDATE)

**BEFORE** (❌ Excessive):

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: i * 0.1 }}  // ❌ Staggered
>
```

**AFTER** (✅ Institutional):

```typescript
<div className="animate-fadeIn">  {/* ✅ Simple, calm */}
```

---

## PART 5: COMPONENT REFACTORING

### 5.1 StaffList Refactor

**Current**: 404 lines, monolithic

**New Structure**:

```
src/features/crud/staff/
├── components/
│   ├── StaffForm.tsx        (form logic)
│   ├── StaffTable.tsx       (table rendering)
│   └── StaffRow.tsx         (row component)
├── hooks/
│   └── useStaffCRUD.ts      (API operations)
└── StaffPage.tsx            (orchestrator)
```

---

#### **useStaffCRUD Hook** (CREATE NEW)

**File**: `src/features/crud/staff/hooks/useStaffCRUD.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { staffService } from "../../../../services/api/staffService";
import { toast } from "react-toastify";

export const useStaffCRUD = () => {
  const queryClient = useQueryClient();

  const { data: staff = [], isLoading } = useQuery({
    queryKey: ["staff"],
    queryFn: staffService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: staffService.create,
    onSuccess: () => {
      toast.success("✅ Academic personnel record committed to registry");
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
    onError: () => {
      toast.error("❌ Personnel record commit failed");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      staffService.update(id, data),
    onSuccess: () => {
      toast.success("Personnel record modified in ledger");
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
    onError: () => {
      toast.error("Registry modification failed");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: staffService.delete,
    onSuccess: () => {
      toast.success("Personnel record purged successfully");
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
    onError: () => {
      toast.error("Purge operation failed");
    },
  });

  return {
    staff,
    isLoading,
    createStaff: createMutation.mutate,
    updateStaff: updateMutation.mutate,
    deleteStaff: deleteMutation.mutate,
  };
};
```

---

#### **StaffPage Orchestrator** (REFACTOR)

**File**: `src/features/crud/staff/StaffPage.tsx`

```typescript
import React from 'react';
import PageHeader from '../../../components/organisms/PageHeader';
import StaffForm from './components/StaffForm';
import StaffTable from './components/StaffTable';
import { useStaffCRUD } from './hooks/useStaffCRUD';

const StaffPage: React.FC = () => {
  const { staff, isLoading, createStaff, updateStaff, deleteStaff } = useStaffCRUD();

  return (
    <div className="space-y-12 animate-fadeIn">
      <PageHeader
        title="Academic Staff Registry"
        subtitle="Personnel Ledger • Faculty Management"
      />

      <StaffForm onSubmit={createStaff} />
      <StaffTable
        data={staff}
        isLoading={isLoading}
        onUpdate={updateStaff}
        onDelete={deleteStaff}
      />
    </div>
  );
};

export default StaffPage;
```

---

## PART 6: EXECUTION CHECKLIST

### Week 1: Token Enforcement + Shell Unification

- [ ] Create `src/styles/tokens.css`
- [ ] Update `tailwind.config.js` with institutional palette
- [ ] Audit `src/index.css` for blue tokens
- [ ] Replace all blue with brick
- [ ] Verify Header, Sidebar, MainLayout use tokens
- [ ] Test light/dark theme consistency

---

### Week 2: Atomic Components + Deterministic Rendering

- [ ] Create `src/components/atoms/Badge.tsx`
- [ ] Create `src/components/atoms/Spinner.tsx`
- [ ] Create `src/components/molecules/StatCard.tsx`
- [ ] Create `src/components/molecules/FormField.tsx`
- [ ] Create `src/components/organisms/DataTable.tsx`
- [ ] Create `src/components/organisms/PageHeader.tsx`
- [ ] Backend: Implement `GET /timetable/schedule`
- [ ] Create `useTimetableSchedule` hook
- [ ] Refactor `TimetablePage` to use schedule API
- [ ] Remove client-side calendar generation

---

### Week 3: Motion Discipline + Component Refactoring

- [ ] Update `src/styles/animations.css` with reduced-motion
- [ ] Remove staggered animations from `DashboardPage`
- [ ] Simplify motion in `TimetablePage`
- [ ] Create `src/features/crud/staff/` structure
- [ ] Extract `useStaffCRUD` hook
- [ ] Split `StaffList` into Form + Table
- [ ] Repeat for `CourseList`, `VenueList`

---

### Week 4: Feature Organization + Testing

- [ ] Create `src/features/timetable/` module
- [ ] Create `src/features/dashboard/` module
- [ ] Create `src/features/auth/` module
- [ ] Update imports across codebase
- [ ] Write integration tests for CRUD hooks
- [ ] Write unit tests for atomic components
- [ ] Accessibility audit with axe DevTools
- [ ] Final visual QA against login page

---

## PART 7: SUCCESS CRITERIA

✅ **Visual Consistency**:

- All screens match login page quality
- Zero blue components
- Unified Brick & Gold palette
- Consistent glassmorphism usage

✅ **Code Quality**:

- All components < 200 lines
- Atomic Design enforced
- Zero prop drilling
- Type-safe throughout

✅ **Deterministic Behavior**:

- Timetable renders from backend JSON
- No client-side slot generation
- Immutable data flow

✅ **Accessibility**:

- WCAG AA compliant
- Keyboard navigation works
- Screen reader tested
- Reduced motion respected

✅ **Performance**:

- Lighthouse score >= 90
- No unnecessary re-renders
- Optimized bundle size

---

## CONCLUSION

This execution plan provides a **clear, step-by-step roadmap** to unify the Bells University Timetable Generator frontend under the **institutional Brick & Gold identity**.

**Status**: ✅ **READY FOR EXECUTION**

**Next Step**: Begin Week 1 - Token Enforcement

---

**Document Version**: 5.0  
**Date**: January 24, 2026  
**Approval Required**: YES - Proceed with execution?

---
