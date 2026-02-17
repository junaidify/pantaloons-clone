export const theme = {
  colors: {
    primary: '#111827', // Rich Black for text/headings
    primaryDark: '#0B0F19',
    primaryLight: '#374151',
    secondary: '#2563EB', // Electric Blue for Actions
    secondaryDark: '#1E40AF',
    secondaryLight: '#60A5FA',
    accent: '#F43F5E', // Hot Pink for Sale/Highlight
    accentDark: '#BE123C',
    success: '#10B981', // Emerald Green for Success
    warning: '#F59E0B', // Amber for Warning
    error: '#EF4444',   // Red for Error
    info: '#3B82F6',    // Blue for Info
    background: '#F9FAFB', // Off-white Background
    backgroundDark: '#111827',
    surface: '#FFFFFF', // Pure White Cards
    surfaceDark: '#1F2937',
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      disabled: '#9CA3AF',
      inverse: '#FFFFFF',
    },
    border: {
      light: '#E5E7EB',
      main: '#D1D5DB',
      dark: '#9CA3AF',
    },
    gradient: {
      primary: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
      secondary: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)',
      dark: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      warm: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
      cool: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    huge: '5rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.75rem',  // Modern, softer corners (12px)
    lg: '1rem',     // Even softer (16px)
    xl: '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Standard Elevate
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Hover state
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // Features/Modal
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    glow: '0 0 15px rgba(37, 99, 235, 0.3)', // Glow effect for primary actions
  },
  fontFamily: {
    heading: "'Urbanist', sans-serif",
    body: "'Urbanist', sans-serif",
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  animations: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.4, ease: "easeOut" },
    },
    slideInUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 30 },
      transition: { duration: 0.5, ease: "easeOut" },
    },
    slideInRight: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 50 },
      transition: { duration: 0.5, ease: "easeOut" },
    },
    zoomHover: {
      whileHover: { scale: 1.05 },
      transition: { duration: 0.3 },
    },
  },
};

export default theme;
