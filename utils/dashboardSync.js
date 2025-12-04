// server/storefront-backend/utils/dashboardSync.js
export async function sendOrderToDashboard(order) {
  try {
    const url = `${process.env.DASHBOARD_API_URL?.replace(/\/$/, "")}/api/orders/sync`;
    if (!process.env.DASHBOARD_API_URL || !process.env.DASHBOARD_API_SECRET) return;

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DASHBOARD_API_SECRET}`,
      },
      body: JSON.stringify(order),
    });
  } catch (err) {
    console.error("Failed to sync order to dashboard:", err);
  }
}

export async function sendCustomerToDashboard(customer) {
  try {
    const url = `${process.env.DASHBOARD_API_URL?.replace(/\/$/, "")}/api/customers/sync`;
    if (!process.env.DASHBOARD_API_URL || !process.env.DASHBOARD_API_SECRET) return;

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DASHBOARD_API_SECRET}`,
      },
      body: JSON.stringify(customer),
    });
  } catch (err) {
    console.error("Failed to sync customer to dashboard:", err);
  }
}
