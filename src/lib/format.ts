export function formatUsd(value: number | null) {
  return value === null
    ? "Liên hệ tư vấn"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(value);
}
