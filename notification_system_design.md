# Stage 1 

Notification System API Design: 
 
> The platform needs APIs for creating and reading notifications also WebSocket can be used for instant notification deliver

Base URL
/api/v1

Headers

Common Request Headers: 

> Content-Type: application/json
>Authorization: Bearer <token>

Notification Schema
```json
{
  "id": "notif_101",
  "title": "TCS Placement Drive",
  "message": "Interview starts tomorrow at 9 AM",
  "type": "PLACEMENT",
  "priority": "HIGH",
  "isRead": false,
  "createdAt": "2026-05-16..."
}
```
APIs

The backend exposes REST APIs for notification management also the APIs are designed to keep frontend integration simple and predictable.

   Supported actions:
- create notification
- fetch notifications
- mark notification as read
- delete notification

Realtime Updates

WebSocket can be used for realtime notification delivery.

Instead of repeatedly calling APIs from frontend, the server pushes new notifications instantly when an event occurs.

Logging Middleware Usage

> All notification APIs pass through the custom logging middleware.

The middleware tracks:
- API endpoint
- request method
- response status
- execution time

This helps in debugging and monitoring API performance.

# Stage 2

## Database Choice
 "I have worked on PG ADMIN in full stack development so ,
For storing notifications reliably, PostgreSQL can be used as the primary database. 

Reason:
- notification data is structured
- filtering unread notifications is important
- SQL queries are easier for reporting and sorting
- indexing support helps performance as data grows

>Indexes can later be added on student_id and created_at for faster notification lookup.

For this use case, a relational database fits better than NoSQL.

---

## Notification Table Schema

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    student_id INT NOT NULL,
    title VARCHAR(255),
    message TEXT,
    type VARCHAR(50),
    priority VARCHAR(20),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);```