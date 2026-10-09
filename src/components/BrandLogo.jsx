import { BRAND_NAME } from '../config/site';

// The DCE wordmark (cap on the D, check mark in the C). The PNG is transparent, so it works on white or in a chip.
export default function BrandLogo({ height = 40, className = '' }) {
  return (
    <img className={`brand-logo ${className}`} src="/dce-logo.png" alt={BRAND_NAME} height={height}
      width={Math.round(height * (720 / 370))} decoding="async" />
  );
}
