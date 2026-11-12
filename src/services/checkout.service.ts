export interface CheckoutProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  country: string;
}

export async function getCheckoutProfile(): Promise<CheckoutProfile> {
  // Mock customer data for frontend development.
  // Replace this with your Laravel API later.
  return {
    firstName: "Mai",
    lastName: "Seyha",
    email: "seyha@example.com",
    phone: "+855 12 345 678",
    address: "123 Street",
    city: "Phnom Penh",
    district: "Chamkar Mon",
    country: "Cambodia",
  };
}
