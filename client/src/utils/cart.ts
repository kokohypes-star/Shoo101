// utils/cart.ts

export function getCart() {
  return JSON.parse(localStorage.getItem("sf_cart") || "[]");
}

export function saveCart(cart: any[]) {
  localStorage.setItem("sf_cart", JSON.stringify(cart));
}

export function addToCart(item: any) {
  const cart = getCart();
  cart.push(item);
  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem("sf_cart");
}
