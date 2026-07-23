---
name: Precision Sales Intelligence
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#414753'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#727784'
  outline-variant: '#c1c6d5'
  surface-tint: '#005cba'
  primary: '#004e9f'
  on-primary: '#ffffff'
  primary-container: '#0066cc'
  on-primary-container: '#dfe8ff'
  inverse-primary: '#aac7ff'
  secondary: '#00687a'
  on-secondary: '#ffffff'
  secondary-container: '#57dffe'
  on-secondary-container: '#006172'
  tertiary: '#005c3e'
  on-tertiary: '#ffffff'
  tertiary-container: '#007751'
  on-tertiary-container: '#83ffc6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3ff'
  primary-fixed-dim: '#aac7ff'
  on-primary-fixed: '#001b3e'
  on-primary-fixed-variant: '#00458e'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style
The design system is engineered for high-stakes decision-making within the enterprise sales sector. It prioritizes clarity, analytical depth, and trust. The visual language follows a **Corporate / Modern** aesthetic, blending the systematic efficiency of data dashboards with a refined, contemporary interface. 

The target audience consists of sales directors and operations managers who require immediate, actionable insights without visual clutter. The UI evokes a sense of reliability and forward-thinking intelligence, utilizing high-quality whitespace and a structured information hierarchy to transform complex predictive data into a streamlined user experience.

## Colors
The palette is anchored by "Professional Blue," a color synonymous with stability and corporate trust. This is accented by a vibrant "Teal Accent" to highlight AI-driven insights and interactive elements. 

- **Primary (#0066CC):** Used for main actions, active states, and brand-critical indicators.
- **Secondary (#06B6D4):** Reserved for data visualizations, progress indicators, and AI feature callouts.
- **Success & Error:** Functional colors used sparingly to provide immediate feedback on sales targets and system alerts.
- **Neutrals:** A range of grays ensures high legibility and provides structural definition through subtle borders and backgrounds.

## Typography
This design system utilizes **Inter** for its systematic, utilitarian qualities. The typeface’s high x-height and neutral character make it ideal for data-heavy applications. 

The hierarchy is built on a tight scale to maximize screen real estate for charts and tables. Bold weights are used strategically for headlines to create clear entry points for the eye. On mobile devices, headline sizes scale down to prevent excessive line-breaking, while maintaining the same weight for brand consistency.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a 12-column structure for desktop interfaces. This allows data visualizations to expand or contract based on the user's viewport.

- **Desktop:** 12 columns with 24px gutters and 32px outer margins.
- **Tablet:** 8 columns with 16px gutters.
- **Mobile:** 4 columns with 16px gutters and 16px margins.

The spacing rhythm is strictly based on a 4px baseline, ensuring all components align perfectly in dense data views. Vertical rhythm is maintained through standardized `md` (16px) and `lg` (24px) spacing between related content blocks.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and **Ambient Shadows**. The design avoids heavy, dark shadows in favor of subtle, diffused lifts that signify interactivity and information hierarchy.

- **Level 0 (Base):** Background color `#F9FAFB`.
- **Level 1 (Cards/Containers):** Pure white `#FFFFFF` surfaces with a 1px border in `#E5E7EB`. This is the standard state for content blocks.
- **Level 2 (Hover/Active):** A soft shadow `0px 4px 12px rgba(0, 0, 0, 0.05)` is applied when a user interacts with a card or element.
- **Level 3 (Modals/Overlays):** Stronger elevation using `0px 12px 24px rgba(0, 0, 0, 0.08)` to clearly separate global actions from the data layer.

## Shapes
The shape language is professional and approachable. A consistent 8px (`rounded`) corner radius is applied to standard UI elements like buttons, input fields, and cards. 

Large containers or dashboard sections may use 16px (`rounded-xl`) to soften the overall appearance of the platform. This roundedness balances the rigid, grid-based nature of sales data, making the platform feel modern rather than institutional.

## Components
- **Buttons:** Primary buttons use the `#0066CC` background with white text and 8px radii. Secondary buttons use a transparent background with a 1px `#E5E7EB` border.
- **Input Fields:** Styled with a white background, `#E5E7EB` border, and 8px radii. The focus state uses a 2px `#0066CC` ring.
- **Chips/Badges:** Used for status indicators (e.g., "High Lead Score"). These use a soft-colored background (e.g., light teal) with high-contrast text.
- **Cards:** The fundamental building block. Cards feature white backgrounds, 1px borders, and 12px padding.
- **Data Tables:** Highly functional with subtle zebra-striping using `#F9FAFB` and sticky headers for long lists.
- **AI Insights Panel:** A specialized component using the Secondary Teal color as a left-border accent to denote machine-generated content.