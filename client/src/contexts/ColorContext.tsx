import React, { createContext, useContext, useState, useEffect } from 'react';

export type ColorPalette = 'purple' | 'blue' | 'green' | 'orange' | 'red' | 'pink' | 'teal';

interface ColorContextType {
  brandColor: ColorPalette;
  setBrandColor: (color: ColorPalette) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

const colorPalettes: Record<ColorPalette, { hsl: string; name: string; hex: string }> = {
  purple: { hsl: '247 96% 63%', name: 'Purple', hex: '#5B47FB' },
  blue: { hsl: '217 100% 54%', name: 'Blue', hex: '#3B82F6' },
  green: { hsl: '160 84% 39%', name: 'Green', hex: '#10B981' },
  orange: { hsl: '38 92% 50%', name: 'Orange', hex: '#F59E0B' },
  red: { hsl: '0 84% 60%', name: 'Red', hex: '#EF4444' },
  pink: { hsl: '325 84% 58%', name: 'Pink', hex: '#EC4899' },
  teal: { hsl: '174 100% 41%', name: 'Teal', hex: '#06B6D4' },
};

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [brandColor, setBrandColor] = useState<ColorPalette>(() => {
    const saved = localStorage.getItem('brandColor');
    return (saved as ColorPalette) || 'purple';
  });

  useEffect(() => {
    localStorage.setItem('brandColor', brandColor);
    const palette = colorPalettes[brandColor];
    document.documentElement.style.setProperty('--brand-color', palette.hsl);
  }, [brandColor]);

  return (
    <ColorContext.Provider value={{ brandColor, setBrandColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColor must be used within ColorProvider');
  }
  return context;
}

export function getColorPalette(color: ColorPalette) {
  return colorPalettes[color];
}

export { colorPalettes };
