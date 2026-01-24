# Frontend Refactoring Plan - Timetable Generator System

## Executive Summary

The current frontend is a functional but monolithic React application with scattered API calls, poor component reusability, minimal accessibility, and inconsistent styling. This plan transforms it into a **modern, scalable, accessible, and maintainable system** using industry best practices.

---

## 📊 Current State Assessment

### Strengths ✅

- Good animation usage (Framer Motion)
- Role-based access control implemented
- Toast notifications for user feedback
- Context API for authentication state
- Multiple specialized components

### Weaknesses ❌

- **Architecture:** No clear separation of concerns (API calls scattered in components)
- **Accessibility:** No ARIA labels, semantic HTML, keyboard navigation, or color contrast
- **Styling:** Monolithic CSS file (1064 lines), inconsistent naming, hardcoded colors
- **Reusability:** Duplicate code, no shared UI component library
- **State Management:** Over-reliance on useState, prop drilling, no global state for API data
- **Code Quality:** No error boundaries, inconsistent naming conventions, large components
- **Testing:** No test files beyond setup
- **Performance:** No code splitting, no lazy loading, no memoization
- **Documentation:** Minimal inline documentation

### File Structure Issues

```
src/
├── 29 component files in root (needs organization)
├── 1 large CSS file (1064 lines)
├── No services layer
├── No hooks directory
├── No constants directory
└── No utils directory
```

---

## 🎯 Refactoring Goals

| Goal                  | Current               | Target                             |
| --------------------- | --------------------- | ---------------------------------- |
| **Code Organization** | Flat structure        | Feature-based architecture         |
| **Accessibility**     | ~0% WCAG compliance   | WCAG 2.1 AA compliant              |
| **API Management**    | Scattered fetch calls | Centralized API service layer      |
| **State Management**  | Multiple useState     | Zustand or Redux + custom hooks    |
| **Styling**           | 1 monolithic CSS      | CSS-in-JS/Tailwind modules         |
| **Component Size**    | 200-500+ lines        | <200 lines (single responsibility) |
| **Reusability**       | Low                   | High (component library)           |
| **Performance**       | Not optimized         | Code split, memoized, lazy loaded  |
| **Testing**           | Minimal               | 70%+ coverage                      |
| **Documentation**     | None                  | Storybook + inline docs            |

---

## 📁 Phase 1: Project Structure Reorganization

### New Directory Structure

```
src/
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── components/                 # Reusable UI components
│   ├── common/                # Global components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   ├── Loading.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── Tooltip.jsx
│   ├── layout/               # Layout components
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── MainLayout.jsx
│   │   ├── DashboardLayout.jsx
│   │   └── FormLayout.jsx
│   └── features/             # Feature-specific components
│       ├── auth/
│       │   ├── LoginForm.jsx
│       │   └── LogoutButton.jsx
│       ├── timetable/
│       │   ├── TimetableGenerator.jsx
│       │   ├── CalendarView.jsx
│       │   ├── SlotSelector.jsx
│       │   └── TimetablePreview.jsx
│       ├── crud/
│       │   ├── CrudPanel.jsx
│       │   ├── StudentManager.jsx
│       │   ├── CourseManager.jsx
│       │   ├── StaffManager.jsx
│       │   ├── VenueManager.jsx
│       │   └── shared/
│       │       ├── DataTable.jsx
│       │       ├── FormModal.jsx
│       │       └── BulkActions.jsx
│       └── settings/
│           ├── ConstraintSettings.jsx
│           ├── OptimizationSettings.jsx
│           └── OutputDesign.jsx
├── hooks/                     # Custom React hooks
│   ├── useAuth.js
│   ├── useFetch.js
│   ├── useModal.js
│   ├── usePagination.js
│   ├── useDebounce.js
│   ├── useLocalStorage.js
│   └── useAccessibility.js
├── services/                  # API service layer
│   ├── api/
│   │   ├── client.js          # Axios/fetch client
│   │   ├── auth.js
│   │   ├── students.js
│   │   ├── courses.js
│   │   ├── staff.js
│   │   ├── venues.js
│   │   ├── timetable.js
│   │   ├── settings.js
│   │   └── index.js           # Export all
│   ├── state/                 # State management
│   │   ├── store.js           # Zustand store
│   │   ├── authSlice.js
│   │   ├── timetableSlice.js
│   │   ├── crudSlice.js
│   │   └── settingsSlice.js
│   └── localStorage.js
├── styles/                    # Styling
│   ├── variables.css          # CSS variables
│   ├── global.css             # Global styles
│   ├── utilities.css          # Utility classes
│   ├── accessibility.css      # A11y specific
│   ├── animations.css         # Animations
│   ├── responsive.css         # Responsive utilities
│   └── themes/
│       ├── light.css
│       └── dark.css
├── constants/                 # Constants & configuration
│   ├── api.js
│   ├── routes.js
│   ├── messages.js
│   ├── validation.js
│   └── config.js
├── utils/                     # Utility functions
│   ├── formatters.js
│   ├── validators.js
│   ├── converters.js
│   ├── errorHandler.js
│   ├── localStorage.js
│   └── a11y.js               # Accessibility helpers
├── pages/                     # Page components
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── AdminDashboard.jsx
│   ├── DeptRepDashboard.jsx
│   └── NotFoundPage.jsx
├── App.jsx
├── index.jsx
└── .env.example
```

---

## 🔧 Phase 2: API Service Layer

### 2.1 Create Centralized API Client

**File:** `src/services/api/client.js`

```javascript
// Centralized axios/fetch client with:
// - Base URL configuration
// - Default headers
// - Request interceptors (auth tokens)
// - Response interceptors (error handling)
// - Timeout configuration
// - Retry logic
```

### 2.2 Service Modules

- `auth.js` - Login, logout, token refresh
- `students.js` - Student CRUD operations
- `courses.js` - Course management
- `staff.js` - Staff operations
- `venues.js` - Venue management
- `timetable.js` - Timetable generation, calendar
- `settings.js` - Constraint, optimization settings
- `registration.js` - Course registration
- `departments.js` - Department operations

### 2.3 API Error Handling

```javascript
// Implement:
// - Custom error classes
// - Centralized error handlers
// - Retry mechanisms with exponential backoff
// - User-friendly error messages
// - API response validation
```

---

## 📦 Phase 3: State Management (Zustand)

### 3.1 Store Structure

```javascript
// src/services/state/store.js
- authStore (user, role, permissions, token)
- timetableStore (calendar, slots, settings)
- crudStore (students, courses, staff, venues)
- uiStore (loading states, modals, notifications)
- settingsStore (constraints, optimization configs)
```

### 3.2 Custom Hooks

```javascript
// src/hooks/useStore.js - Easy store access
// Better than Context API for complex state
```

---

## 🎨 Phase 4: Accessibility (WCAG 2.1 AA)

### 4.1 HTML & Semantic Structure

- [ ] Use semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`)
- [ ] Proper heading hierarchy (no skipped levels)
- [ ] Landmark regions for screen readers
- [ ] Form labels properly associated with inputs (`htmlFor`)

### 4.2 ARIA & Screen Reader Support

- [ ] Add ARIA labels to icon-only buttons
- [ ] ARIA roles for custom components
- [ ] Live regions for dynamic content (`aria-live`, `aria-atomic`)
- [ ] ARIA alerts for errors/confirmations
- [ ] Proper `aria-describedby` for help text

### 4.3 Keyboard Navigation

- [ ] Tab order management
- [ ] Escape key handling for modals
- [ ] Enter/Space for buttons
- [ ] Arrow keys for lists/calendars
- [ ] `tabIndex` management

### 4.4 Visual Accessibility

- [ ] WCAG AA color contrast (4.5:1 for text)
- [ ] Focus indicators visible (`:focus-visible`)
- [ ] No color-only information conveyance
- [ ] Sufficient spacing for touch targets (44x44px minimum)
- [ ] Text resizable up to 200%

### 4.5 Motion & Animation

- [ ] Respect `prefers-reduced-motion`
- [ ] Pause animations on focus
- [ ] Non-essential animations toggleable

### 4.6 Forms

- [ ] Required field indicators `aria-required`
- [ ] Error messages linked to inputs `aria-describedby`
- [ ] Field validation feedback
- [ ] Consistent labeling

### 4.7 Testing & Validation

- [ ] Axe DevTools audit
- [ ] WAVE browser extension
- [ ] Keyboard-only navigation testing
- [ ] Screen reader testing (NVDA/JAWS)

---

## 🎯 Phase 5: Component System & Design System

### 5.1 Base UI Components

Create atomic, accessible, reusable components:

| Component     | Props                                     | Accessibility              |
| ------------- | ----------------------------------------- | -------------------------- |
| Button        | variant, size, disabled, aria-label       | Keyboard nav, focus state  |
| Input         | label, type, error, required, placeholder | Linked label, error alerts |
| Select        | options, value, onChange, label, disabled | ARIA attributes            |
| Card          | title, children, clickable                | Semantic structure         |
| Modal         | isOpen, onClose, title, children          | Keyboard trap, focus mgmt  |
| Table         | data, columns, sortable, paginated        | Keyboard nav, headers      |
| Tabs          | tabs, activeTab, onChange                 | Keyboard nav (arrows)      |
| Tooltip       | text, position, children                  | Focus trigger, aria-hidden |
| Loading       | type, message                             | Accessible spinner         |
| ErrorBoundary | children, fallback                        | Graceful error display     |

### 5.2 Component Library Structure

```
components/
├── common/
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.module.css
│   │   ├── Button.a11y.js (accessibility helpers)
│   │   └── Button.stories.jsx (Storybook)
│   ├── Input/
│   │   ├── Input.jsx
│   │   ├── Input.module.css
│   │   └── Input.stories.jsx
```

### 5.3 Design Tokens

```css
/* Centralized variables */
--color-primary-*
--color-semantic-*
--spacing-*
--typography-*
--radius-*
--shadow-*
--transition-*
```

---

## 🎨 Phase 6: Styling Refactor

### 6.1 CSS Architecture (CSS Modules + Tailwind)

**Benefits:** Scoped styles, no conflicts, reusable utilities

```
styles/
├── variables.css        # Design tokens
├── global.css          # Global reset, base
├── utilities.css       # Helper classes (.flex-center, .text-truncate)
├── accessibility.css   # A11y utilities (.sr-only, .focus-visible)
└── themes/            # Theme variants
```

### 6.2 Tailwind Configuration

```javascript
// tailwind.config.js
- Extend default theme with custom tokens
- Dark mode support
- Accessibility plugin integration
- Custom animations (respect prefers-reduced-motion)
```

### 6.3 Migration Strategy

1. Create design token variables
2. Replace hardcoded values with tokens
3. Implement CSS modules for components
4. Add Tailwind utilities
5. Remove old monolithic CSS

---

## 🧪 Phase 7: Custom Hooks

### 7.1 Data Fetching

```javascript
// useFetch(url, options)
- Handles loading, error, success states
- Automatic refetch on params change
- Built-in error handling
- Cache support

// useInfiniteQuery(url)
- Pagination support
- Lazy loading
- Infinite scroll
```

### 7.2 Form Management

```javascript
// useForm(initialValues, onSubmit)
- Form state management
- Validation
- Error handling
- Dirty state tracking

// useFormField(name)
- Individual field binding
- Error display
- Touch tracking
```

### 7.3 UI Utilities

```javascript
// useModal(id)
- Modal open/close state
- Stacking multiple modals
- Keyboard handling

// useNotification()
- Toast notifications
- Snackbars
- Alert dialogs

// usePagination(items, itemsPerPage)
// useDebounce(value, delay)
// useLocalStorage(key, defaultValue)
// useAsync(asyncFn, immediate)
```

### 7.4 Accessibility

```javascript
// useAccessibility()
- Keyboard event handling
- Screen reader utilities
- Focus management
- ARIA attribute helpers

// useFocusTrap(ref)
// useKeyboardNav(items)
// useAnnouncment(message)
```

---

## 📄 Phase 8: Page-Level Architecture

### 8.1 Page Structure

```jsx
<MainLayout>
  <Header role="banner" />
  <Sidebar role="navigation" />
  <main role="main">
    <PageContent />
  </main>
  <Footer role="contentinfo" />
</MainLayout>
```

### 8.2 Feature Modules (Example: CRUD)

```
features/crud/
├── pages/
│   ├── CrudDashboard.jsx
│   ├── StudentManager.jsx
│   └── CourseManager.jsx
├── components/
│   ├── DataTable.jsx
│   ├── FormModal.jsx
│   ├── BulkActions.jsx
│   └── Filters.jsx
├── hooks/
│   ├── useCrud.js
│   └── useFilters.js
├── services/
│   └── crudApi.js
└── constants.js
```

---

## 🚀 Phase 9: Performance Optimization

### 9.1 Code Splitting

```javascript
// React.lazy + Suspense for route-based code splitting
// Lazy load feature modules
// Component-level code splitting for large modals
```

### 9.2 Memoization

```javascript
// useMemo for expensive computations
// useCallback for event handlers
// React.memo for pure components
```

### 9.3 Bundle Analysis

```bash
// npm install --save-dev webpack-bundle-analyzer
// Identify and eliminate large dependencies
```

### 9.4 Image Optimization

```javascript
// Use modern formats (webp)
// Responsive images
// Lazy loading for images
```

---

## 📝 Phase 10: Testing Strategy

### 10.1 Unit Tests (Jest + React Testing Library)

```javascript
// Components
// Hooks
// Utilities
// Services
```

### 10.2 Integration Tests

```javascript
// API integration
// Feature workflows
// State management
```

### 10.3 E2E Tests (Cypress)

```javascript
// Critical user paths
// Login flow
// CRUD operations
// Report generation
```

### 10.4 Accessibility Tests

```javascript
// Automated: axe, jest-axe
// Manual: keyboard, screen reader
// Visual: contrast checker
```

---

## 📚 Phase 11: Documentation

### 11.1 Storybook Setup

```javascript
// Interactive component library
// Visual regression testing
// Component API documentation
// Accessibility insights
```

### 11.2 Code Documentation

```javascript
// JSDoc comments for all functions
// README for each feature module
// CONTRIBUTING guide
// API documentation
```

### 11.3 Architecture Documentation

```
docs/
├── ARCHITECTURE.md
├── COMPONENTS.md
├── STATE_MANAGEMENT.md
├── API_INTEGRATION.md
├── ACCESSIBILITY.md
├── TESTING.md
└── DEPLOYMENT.md
```

---

## 🔄 Implementation Roadmap

### Timeline: ~8-12 weeks

| Phase             | Duration  | Priority  | Dependencies |
| ----------------- | --------- | --------- | ------------ |
| 1. Structure      | 1 week    | 🔴 HIGH   | None         |
| 2. API Layer      | 1.5 weeks | 🔴 HIGH   | Phase 1      |
| 3. State Mgmt     | 1 week    | 🔴 HIGH   | Phase 2      |
| 4. Accessibility  | 2 weeks   | 🔴 HIGH   | Phase 1, 2   |
| 5. Components     | 2 weeks   | 🔴 HIGH   | Phase 1, 4   |
| 6. Styling        | 1.5 weeks | 🟠 MEDIUM | Phase 5      |
| 7. Hooks          | 1 week    | 🟠 MEDIUM | Phase 1, 2   |
| 8. Pages          | 1 week    | 🟠 MEDIUM | Phase 3, 5   |
| 9. Performance    | 1 week    | 🟡 LOW    | Phase 5, 8   |
| 10. Testing       | 2 weeks   | 🟠 MEDIUM | Phases 1-8   |
| 11. Documentation | 1 week    | 🟡 LOW    | All phases   |

---

## ✅ Acceptance Criteria

### Code Quality

- [ ] ESLint with 0 errors, 0 warnings
- [ ] Prettier formatting applied
- [ ] No console errors in production
- [ ] No prop-type warnings

### Accessibility

- [ ] WCAG 2.1 AA compliance verified
- [ ] 0 axe violations
- [ ] Keyboard navigation works for all features
- [ ] Screen reader tested (NVDA/JAWS)
- [ ] Color contrast >= 4.5:1

### Performance

- [ ] Lighthouse score >= 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Bundle size < 300KB (gzipped)

### Testing

- [ ] > = 70% code coverage
- [ ] All critical paths E2E tested
- [ ] No console errors in tests

### Documentation

- [ ] Storybook with all components
- [ ] Architecture documentation complete
- [ ] API documentation complete
- [ ] Contributing guide written

---

## 🛠️ Dependencies to Add

```json
{
  "dependencies": {
    "zustand": "^4.x",
    "axios": "^1.x",
    "react-query": "^3.x",
    "tailwindcss": "^3.x",
    "framer-motion": "^10.x"
  },
  "devDependencies": {
    "@storybook/react": "^7.x",
    "@testing-library/react": "^14.x",
    "@testing-library/jest-dom": "^6.x",
    "cypress": "^13.x",
    "jest-axe": "^8.x",
    "prettier": "^3.x",
    "eslint": "^8.x",
    "@chromatic-com/storybook": "^1.x"
  }
}
```

---

## 📋 Quick Start Checklist

- [ ] Review and approve this plan
- [ ] Set up new directory structure
- [ ] Create API service layer
- [ ] Implement Zustand store
- [ ] Build base component library
- [ ] Add accessibility features
- [ ] Migrate existing components
- [ ] Add tests
- [ ] Set up Storybook
- [ ] Documentation
- [ ] Performance audit
- [ ] Deploy to staging

---

## 🤝 Team Collaboration

### Knowledge Sharing

- [ ] Weekly architecture sync
- [ ] Component library review sessions
- [ ] Testing strategy workshop
- [ ] Documentation walkthrough

### Parallel Work

- Component library (1-2 devs)
- API service layer (1 dev)
- Accessibility audit (1 dev)
- Migration of existing components (1-2 devs)

---

## 📞 Next Steps

1. **Review & Approval** - Stakeholder sign-off
2. **Setup Sprint** - Initial setup and tooling
3. **Component Library Sprint** - Build reusable components
4. **API Integration Sprint** - Connect to backend
5. **Feature Migration** - Refactor existing features
6. **Testing & QA** - Comprehensive testing
7. **Deployment** - Staged rollout

---

**Created:** January 15, 2026  
**Status:** Draft - Awaiting Review  
**Version:** 1.0
