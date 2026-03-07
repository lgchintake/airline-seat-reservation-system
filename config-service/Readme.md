## System Architecture


                    +----------------------+
                    |        Client        |
                    |  Web / Mobile / API  |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |      API Gateway     |
                    |  (Auth / Routing)    |
                    +----------+-----------+
                               |
                               v
          ----------------------------------------------
          |              |                 |          |
          v              v                 v          v
    +-----------+  +----------------+ +----------+ +-------------+
    | Flight    |  | Booking/Search | | Payment  | | Notification|
    | Service   |  | Service        | | Service  | | Service     |
    +-----------+ +-----------------+ +-----------+ +------------+
          |                 |             |
          v                 v             v
    +-----------+     +------------+   +-----------+
    | Flight DB |     | Booking DB |   | Payment DB|
    +-----------+     +------------+   +-----------+
                             |
                             v
                 +----------------------------+
                 |      Event Streaming       |
                 |      Apache Kafka          |
                 +-----------------------------+
                   |          |              |
                   v          v              v
          +-------------+ +-------------+ +-------------+
          | Ticketing   | | Notification| | Airline IT  |
          | Service     | | Service     | | Integration |
          +-------------+ +-------------+ +-------------+


## Booking Flow

```mermaid
User Search
     ↓
Search Service
     ↓
Flight Selected
     ↓
Seat Locked
     ↓
Booking Created
     ↓
Payment
     ↓
Ticket Issued
```

## Miscellaneous

Start Mysql: brew services start mysql