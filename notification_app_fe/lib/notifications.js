import { getToken, BASE_URL } from "./auth";

export async function fetchNotifications(params = {}) {
  const token = await getToken();
  const q = new URLSearchParams();
  if (params.page) q.set("page", params.page);
  if (params.limit) q.set("limit", params.limit);
  if (params.notification_type && params.notification_type !== "All")
    q.set("notification_type", params.notification_type);

  const res = await fetch(`${BASE_URL}/notifications?${q}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data = await res.json();
  return data.notifications || [];
}

export const WEIGHT = { Placement: 3, Result: 2, Event: 1 };

export function sortByPriority(list) {
  return [...list].sort((a, b) => {
    const diff = (WEIGHT[b.Type] || 0) - (WEIGHT[a.Type] || 0);
    return diff !== 0 ? diff : new Date(b.Timestamp) - new Date(a.Timestamp);
  });
}