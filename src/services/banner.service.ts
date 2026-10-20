import { bannersData } from "@/mocks/banner";
import type { Banner } from "@/types/catalog";

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false";

export async function getBanners(): Promise<Banner[]> {
  if (USE_MOCK_DATA) {
    return bannersData;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("API URL is not configured.");
  }

  const response = await fetch(`${apiUrl}/banners`);

  if (!response.ok) {
    throw new Error("Failed to fetch banners.");
  }

  const result = await response.json();

  return Array.isArray(result) ? result : result.data;
}
