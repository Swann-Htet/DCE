import { BRAND_NAME } from '../config/site';

// The DCE wordmark (cap on the D, check mark in the C). The PNG is transparent, so it works on white or in a chip.
// variant="light" is the lightness-inverted logo for dark backgrounds (dark reds become light, bright red stays).
export default function BrandLogo({ height = 40, className = '', variant = 'default' }) {
  return (
    <img className={`brand-logo ${className}`} src={variant === 'light' ? '/dce-logo-light.png' : '/dce-logo.png'} alt={BRAND_NAME} height={height}
      width={Math.round(height * (720 / 370))} decoding="async" />
  );
}
