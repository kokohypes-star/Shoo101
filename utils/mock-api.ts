// utils/mock-api.ts
export const mockApi = {
  async login(phone: string) {
    return {
      success: true,
      token: "mock_token_123",
      customer: {
        id: 1,
        phone,
        email: "mock@example.com",
      },
    };
  },

  async createOrder(customerId: number, items: any[]) {
    return {
      success: true,
      id: "MOCK-ORDER-" + Date.now(),
      receiptUrl: "/storefront/receipt?id=MOCK",
    };
  },

  async getReceipt() {
    return `
      <h2>Mock Receipt</h2>
      <p>This is a fallback receipt because backend is offline.</p>
    `;
  },
};
