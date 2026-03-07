

                +----------------------+
                |      React UI        |
                +----------+-----------+
                           |
                           v
                    +-------------+
                    | API Gateway |
                    +-------------+
                           |
      -------------------------------------------------
      |            |            |           |          |
      v            v            v           v          v
+-----------+ +------------+ +-----------+ +----------+ +-------------+
| Flight    | | Search     | | Booking   | | Payment  | | Notification|
| Service   | | Service    | | Service   | | Service  | | Service     |
+-----------+ +------------+ +-----------+ +----------+ +-------------+
      |             |             |
      v             v             v
+-----------+  +------------+ +-----------+
| Flight DB |  | Search DB  | | Booking DB|
+-----------+  +------------+ +-----------+

        +-------------------------------------+
        |         Event / Message Bus         |
        |           (Kafka / RabbitMQ)        |
        +-------------------------------------+


##Booking Flow

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

##Miscellaneous

Start Mysql:

brew services start mysql