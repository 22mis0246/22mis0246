const BASE_URL = "http://4.224.186.213/evaluation-service";
let cachedToken = null;

export async function getToken() {
  if (cachedToken) return cachedToken;
  const res = await fetch(`${BASE_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "naveenraj.m2022@vit.ac.in",
      name: "Naveen Raj",
      rollNo: "22MIS0246",
      accessCode: "SfFuWg",
      clientID: "e624e2e3-d858-4633-a61d-e875be7be0d7",
      clientSecret: "bJWCRwzrrKeRkNYS",
    }),
  });
  const data = await res.json();
  cachedToken = data.access_token;
  return cachedToken;
}
export { BASE_URL };