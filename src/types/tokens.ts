export interface ColorToken {
  name: string;
  variable: string;
  value: string;
  category: "brand" | "accent" | "neutral" | "status" | "semantic";
  description?: string;
  onDarkContrast?: string;
  onLightContrast?: string;
}

export interface TypographyToken {
  name: string;
  variable: string;
  size: string;
  pixelValue: string;
  lineHeight: string;
  sampleText: string;
}

export interface SpacingToken {
  name: string;
  variable: string;
  value: string;
  pixelValue: string;
}

export interface RadiusToken {
  name: string;
  variable: string;
  value: string;
  usage: string;
  isPill?: boolean;
}

export interface ShadowToken {
  name: string;
  variable: string;
  value: string;
  usage: string;
  isGlow?: boolean;
}

export interface GradientToken {
  name: string;
  variable: string;
  cssValue: string;
  purpose: string;
}
