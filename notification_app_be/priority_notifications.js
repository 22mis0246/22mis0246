const API_URL = "http://4.224.186.213/evaluation-service/notifications";

const priorityWeight = {
    Placement: 3,
    Result: 2,
    Event: 1
};

async function fetchPriorityNotifications() {

    try {
        const response = await fetch(API_URL);

        console.log("Status:", response.status);
        const data = await response.json();
        console.log("API Connected Successfully\n");
        const notifications = data.notifications || [];

        const sortedNotifications = notifications.sort((a, b) => {
            const weightA = priorityWeight[a.Type] || 0;
            const weightB = priorityWeight[b.Type] || 0;
            if (weightA !== weightB) {
                return weightB - weightA;
            }

            return new Date(b.Timestamp) - new Date(a.Timestamp);
        });

        const topNotifications = sortedNotifications.slice(0, 10);
        console.log("Top Priority Notifications\n");
        
        topNotifications.forEach((notification, index) => {
            console.log(`${index + 1}. ${notification.Type}`);
            console.log(`Message: ${notification.Message}`);
            console.log(`Time: ${notification.Timestamp}`);
            console.log("---------------------------");
        });

    } catch (error) {

        console.log("Fetch Failed");
        console.log(error.message);
    }
}
fetchPriorityNotifications();
if (response.status === 401) {
    console.log("Protected API - Authorization token required");
    return;
}