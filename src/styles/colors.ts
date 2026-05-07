/**
 * Global Color Palette
 * Custom brand colors used throughout the application
 */

export const colors = {
  // Primary brand colors
  brand: {
    blue: '#2ABDFF',
    pink: '#FF37C7',
    green: '#00C3A0',
    purple: '#9E62FF',
  },
  
  // Light background variants
  light: {
    blue: '#F2F7FC',
    pink: '#FFEBFF',
    green: '#EEF9F6',
    purple: '#F7F1FD',
  }
} as const;

// Feature card color mappings for easy reuse
export const featureColors = {
  fairness: {
    icon: colors.brand.blue,
    background: colors.light.blue,
  },
  incentivization: {
    icon: colors.brand.pink,
    background: colors.light.pink,
  },
  empowerment: {
    icon: colors.brand.green,
    background: colors.light.green,
  },
  instantLiquidity: {
    icon: colors.brand.purple,
    background: colors.light.purple,
  },
} as const;

// Export individual colors for convenience
export const {
  blue: brandBlue,
  pink: brandPink,
  green: brandGreen,
  purple: brandPurple,
} = colors.brand;

export const {
  blue: lightBlue,
  pink: lightPink,
  green: lightGreen,
  purple: lightPurple,
} = colors.light; 