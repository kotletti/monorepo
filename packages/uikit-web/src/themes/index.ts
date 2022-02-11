export enum ThemeColors {
  none = 'none',
  main = '#3C842F',
  backgroundPrimary = '#000000',
  bgNavBarPrimary = '#141515',
  text01 = '#ffffff',
  text02 = '#F6F6F6',
  text03 = '#F7F7F7',
  secondary8 = '#1E1F1F',
  secondary30 = '#4D4D4D',
  secondary40 = '#666666',
  secondary60 = '#999999',
  secondary80 = '#BDBDBD',
  secondary90 = '#BBBBBB',
  dividerPrimary = '#C4C4C4',
  error = '#E53935',
  brandSecondary = '#417BC2',
}

export enum ThemeBoxShadow {
  blue1 = '0px 0px 0px 4px rgba(0, 116, 227, 0.25)',
}

export enum ThemeGradient {
  primary = 'linear-gradient(285deg, #50ddc3 -7.7%, #6c4af2 110%)',
  primaryHovered = 'linear-gradient(285deg, #5DE5C4 -7.7%, #6C4AF2 110%)',
  primaryDisabled = 'linear-gradient(285deg, #A7CCC9 -7.7%, #C0BBDF 110%)',
}

export enum ThemeColorsRgba {
  blue1 = 'rgba(126, 134, 239, 0.15)',
  gray1 = 'rgba(129, 130, 135, 0.2)',
}

export enum ThemeFilter {
  shadow1 = 'drop-shadow(0px 1px 2px rgba(92, 159, 216, 0.35))',
}

export enum FontSize {
  h1 = 'h1',
  footnote = 'footnote',
  Button = 'Button',
}

export type Font = {
  [k in FontSize]: {
    fontSize: string;
    fontWeight: number;
    fontFamily: string;
    lineHeight: string;
  };
};

export const themeFont: Font = {
  h1: {
    fontFamily: 'Montserrat',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '16px',
  },
  footnote: {
    fontFamily: 'Roboto Mono',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '18px',
  },
  Button: {
    fontFamily: 'Roboto Mono',
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: '20px',
  },
};
