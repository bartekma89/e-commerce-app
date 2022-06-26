export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(
  value: number,
  language: string,
  options: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat(language, { ...options }).format(value);
}
