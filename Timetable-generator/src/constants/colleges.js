/**
 * College Representation System
 * Provides visual identification for Bells University colleges
 * Maintains core branding while offering subtle visual distinction
 */

export const COLLEGES = {
  SCIENCES: {
    id: "sciences",
    name: "College of Natural & Applied Sciences",
    shortName: "Sciences",
    icon: "🔬",
    accentColor: "#4CAF50", // Subtle green
    description: "Physics, Chemistry, Biology, Mathematics",
  },
  ENGINEERING: {
    id: "engineering",
    name: "College of Engineering",
    shortName: "Engineering",
    icon: "⚙️",
    accentColor: "#2196F3", // Subtle blue
    description: "Software, Civil, Mechanical, Electrical",
  },
  FOOD_TECH: {
    id: "food-tech",
    name: "College of Food Technology",
    shortName: "Food Technology",
    icon: "🍲",
    accentColor: "#FF9800", // Subtle orange
    description: "Nutrition, Food Science, Culinary",
  },
  MANAGEMENT: {
    id: "management",
    name: "College of Management Sciences",
    shortName: "Management",
    icon: "💼",
    accentColor: "#9C27B0", // Subtle purple
    description: "Business, Administration, Economics",
  },
};

export const getCollegeById = (id) => {
  return Object.values(COLLEGES).find((college) => college.id === id);
};

export const getAllColleges = () => {
  return Object.values(COLLEGES);
};

/**
 * Design Rules:
 * 1. Accent colors are subtle and never override core palette (brick + gold)
 * 2. Used as accents: icons, badges, form highlights (not full backgrounds)
 * 3. Applied to:
 *    - College selector badges
 *    - Form field accents (subtle tint)
 *    - Dashboard header indicator
 *    - Timetable contextual marks
 * 4. Core theme remains: brick brown + shiny yellow
 * 5. College accent is SECONDARY layer, not primary
 */

export const applyCollegeAccent = (collegeId) => {
  const college = getCollegeById(collegeId);
  if (!college) return null;

  return {
    accentColor: college.accentColor,
    cssVariable: `--college-accent-${college.id}`,
    backgroundTint: `${college.accentColor}12`, // 7% opacity for subtle tint
    borderTint: `${college.accentColor}33`, // 20% opacity for border
  };
};

/**
 * CSS Integration:
 * In your stylesheet, add these variables dynamically:
 *
 * :root {
 *   --college-accent-sciences: #4CAF50;
 *   --college-accent-engineering: #2196F3;
 *   --college-accent-food-tech: #FF9800;
 *   --college-accent-management: #9C27B0;
 * }
 *
 * Then use in components:
 * .college-badge {
 *   color: var(--college-accent-${collegeId});
 *   border-color: var(--college-accent-${collegeId});
 * }
 */

/**
 * Implementation Guidelines:
 *
 * 1. COLLEGE SELECTOR (On Login Form)
 *    - Optional college selection
 *    - 4 buttons with college icons
 *    - Icon + college name
 *    - On click: Store college in context
 *    - Visual: Icon in college accent color, minimal style
 *
 * 2. FORM INTEGRATION
 *    - After college selection, show in form header
 *    - Small badge: [Icon] College Name
 *    - Subtle accent color on badge
 *    - Can be changed by clicking
 *
 * 3. STATE MANAGEMENT
 *    - Store selectedCollege in React context
 *    - Persist in localStorage as college preference
 *    - Share with Dashboard, Timetable, Admin views
 *    - Pass to API calls for college-specific data
 *
 * 4. VISUAL APPLICATION
 *    - Icon color: College accent color
 *    - Background: Transparent with subtle tint
 *    - Border: Subtle accent tint
 *    - Text: Always brick brown or off-white (core palette)
 *    - NEVER change main theme colors
 *
 * 5. CONSISTENCY
 *    - Same college system across all pages
 *    - Icons always match college
 *    - Colors always subtle accents
 *    - Core palette (brick + gold) always dominant
 *    - Academic feel maintained
 *
 * 6. ACCESSIBILITY
 *    - College names always visible (not icon-only)
 *    - High contrast for selected college
 *    - ARIA labels for college selector
 *    - Keyboard navigation support
 *    - Screen reader friendly
 *
 * 7. MOBILE
 *    - College selector: Horizontal scroll or dropdown
 *    - Compact badge on small screens
 *    - Touch-friendly button sizes (min 44x44px)
 *    - Readable text at all sizes
 */
