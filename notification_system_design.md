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


# Stage 3

 Query Analysis

 > The query is correct, but it may become slow when notification count increases.

Reasons:
- SELECT * fetches unnecessary columns
- sorting large rows is expensive 
- without indexes DB scans more rows

 Improved Query

```sql
SELECT id, title, created_at
FROM notifications
WHERE student_id = 1042
AND is_read = false
ORDER BY created_at DESC;
```
Only required fields are fetched which reduces DB load.


 # Recommended Index
```sql
CREATE INDEX idx_notification_lookup
ON notifications(student_id, is_read, created_at);
```
This improves unread notification lookup and sorting performance.

Should We Add Indexes On Every Column?
 My ans - NO.

Too many indexes can:
- slow inserts and updates
- increase storage usage

Indexes should only be added for frequently searched columns.

# Placement Notification Query
```sql
SELECT DISTINCT student_id
FROM notifications
WHERE type = 'PLACEMENT'
AND created_at >= NOW() - INTERVAL '7 days';
```

# My recomendations to improve according to my experience
- pagination can reduce DB load
- old notifications can be archived
- caching unread counts can improve performance