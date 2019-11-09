export function formatPrice(price: number, symbol: string = "VND") {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: symbol
  });
  return formatter.format(price);
}
