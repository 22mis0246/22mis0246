const BASE_URL = "http://4.224.186.213/evaluation-service";

const MY_EMAIL = "naveenraj.m2022@vit.ac.in";
const MY_NAME = "Naveen Raj";
const MY_ROLL = "22MIS0246";
const ACCESS_CODE = "SfFuWg";

const CLIENT_ID = "e624e2e3-d858-4633-a61d-e875be7be0d7";
const CLIENT_SECRET = "bJWCRwzrrKeRkNYS";

const priorityWeight = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function getToken() {
  const res = await fetch(`${BASE_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: MY_EMAIL,
      name: MY_NAME,
      rollNo: MY_ROLL,
      accessCode: ACCESS_CODE,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    }),
  });
  const data = await res.json();
  return data.access_token;
}

async function fetchTopNotifications(token) {
  const res = await fetch(`${BASE_URL}/notifications`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  const notifications = data.notifications || [];

  const sorted = notifications.sort((a, b) => {
    const wa = priorityWeight[a.Type] || 0;
    const wb = priorityWeight[b.Type] || 0;
    if (wa !== wb) return wb - wa;
    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });

  const top10 = sorted.slice(0, 10);
  console.log("Top 10 Priority Notifications");
  console.log("==============================");
  top10.forEach((n, i) => {
    console.log(`${i + 1}. [${n.Type}] ${n.Message}`);
    console.log(`   Time : ${n.Timestamp}`);
    console.log("------------------------------");
  });
}

async function main() {
  const token = await getToken();
  console.log("Token ready!\n");
  await fetchTopNotifications(token);
}

main();