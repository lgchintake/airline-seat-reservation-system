## Flight Search
sequenceDiagram
    participant Customer
    participant APIGateway as API Gateway
    participant FlightSearchService as Flight Search Service
    participant FlightDB as Flight Database

    Customer->>APIGateway: GET /flights?source=...&destination=...&date=...
    activate APIGateway
    APIGateway->>FlightSearchService: GET /flights/search
    activate FlightSearchService
    FlightSearchService->>FlightDB: Query Available Flights
    activate FlightDB
    FlightDB-->>FlightSearchService: List of Flights
    deactivate FlightDB
    FlightSearchService-->>APIGateway: Flight Results
    deactivate FlightSearchService
    APIGateway-->>Customer: Display Flights
    deactivate APIGateway

## Seat Availability Check

sequenceDiagram
    participant Customer
    participant APIGateway as API Gateway
    participant FlightSearchService as Flight Search Service
    participant SeatLockService as Seat Lock Service
    participant Redis as Redis (Seat Cache)

    Customer->>APIGateway: GET /flights/{id}/seats
    activate APIGateway
    APIGateway->>FlightSearchService: GET /seats/availability
    activate FlightSearchService
    FlightSearchService->>SeatLockService: Check Seat Status
    activate SeatLockService
    SeatLockService->>Redis: GET seat_status_{flightId}_{seatId}
    activate Redis
    Redis-->>SeatLockService: Status (Available/Locked/Booked)
    deactivate Redis
    SeatLockService-->>FlightSearchService: Seat Availability Info
    deactivate SeatLockService
    FlightSearchService-->>APIGateway: Seat Map
    deactivate FlightSearchService
    APIGateway-->>Customer: Display Seat Map
    deactivate APIGateway

## Seat Booking and Confirmation

sequenceDiagram
    participant Customer
    participant APIGateway as API Gateway
    participant BookingService as Booking Service
    participant Kafka as Apache Kafka
    participant SeatLockService as Seat Lock Service
    participant Redis as Redis (Seat Cache)
    participant BookingDB as Booking Database
    participant PaymentService as Payment Service
    participant PaymentGateway as Payment Gateway (External)
    participant TicketService as Ticket Service
    participant NotificationService as Notification Service

    Customer->>APIGateway: POST /bookings (flightId, seatId, passengerDetails)
    activate APIGateway
    APIGateway->>BookingService: Create Booking Request
    activate BookingService

    BookingService->>Kafka: Publish "seat-lock-request"
    activate Kafka
    Kafka-->>SeatLockService: Consume "seat-lock-request"
    deactivate Kafka
    activate SeatLockService

    SeatLockService->>Redis: SET seat_lock_{flightId}_{seatId} (TTL=10m)
    activate Redis
    Redis-->>SeatLockService: OK
    deactivate Redis

    SeatLockService->>Kafka: Publish "seat-locked"
    deactivate SeatLockService
    activate Kafka
    Kafka-->>BookingService: Consume "seat-locked"
    deactivate Kafka

    BookingService->>BookingDB: Insert Booking Record (Status: PENDING)
    activate BookingDB
    BookingDB-->>BookingService: Booking ID
    deactivate BookingDB

    BookingService->>Kafka: Publish "booking-created"
    deactivate BookingService
    activate Kafka
    Kafka-->>PaymentService: Consume "booking-created"
    deactivate Kafka
    activate PaymentService

    PaymentService->>PaymentGateway: Initiate Payment
    activate PaymentGateway
    PaymentGateway-->>PaymentService: Payment Success
    deactivate PaymentGateway

    PaymentService->>Kafka: Publish "payment-success"
    deactivate PaymentService
    activate Kafka

    par Ticket Generation
        Kafka-->>TicketService: Consume "payment-success"
        activate TicketService
        TicketService->>TicketService: Generate Ticket
        TicketService->>Kafka: Publish "ticket-issued"
        deactivate TicketService
    and Notification
        Kafka-->>NotificationService: Consume "payment-success"
        activate NotificationService
        NotificationService->>Customer: Send Booking Confirmation (Email/SMS)
        deactivate NotificationService
    end

    APIGateway-->>Customer: Booking Confirmed
    deactivate APIGateway

## Booking Cancellation Flow

sequenceDiagram
    participant Customer
    participant APIGateway as API Gateway
    participant BookingService as Booking Service
    participant BookingDB as Booking Database
    participant Kafka as Apache Kafka
    participant SeatLockService as Seat Lock Service
    participant Redis as Redis (Seat Cache)
    participant PaymentService as Payment Service
    participant PaymentGateway as Payment Gateway (External)
    participant NotificationService as Notification Service

    Customer->>APIGateway: POST /bookings/{id}/cancel
    activate APIGateway
    APIGateway->>BookingService: Cancel Booking Request
    activate BookingService

    BookingService->>BookingDB: Update Status to CANCELLED
    activate BookingDB
    BookingDB-->>BookingService: Updated
    deactivate BookingDB

    BookingService->>Kafka: Publish "booking-cancelled"
    deactivate BookingService
    activate Kafka

    par Release Seat
        Kafka-->>SeatLockService: Consume "booking-cancelled"
        activate SeatLockService
        SeatLockService->>Redis: DEL seat_lock_{flightId}_{seatId}
        activate Redis
        Redis-->>SeatLockService: OK
        deactivate Redis
        deactivate SeatLockService
    and Initiate Refund
        Kafka-->>PaymentService: Consume "booking-cancelled"
        activate PaymentService
        PaymentService->>PaymentGateway: Process Refund
        activate PaymentGateway
        PaymentGateway-->>PaymentService: Refund Success
        deactivate PaymentGateway
        deactivate PaymentService
    and Notify Customer
        Kafka-->>NotificationService: Consume "booking-cancelled"
        activate NotificationService
        NotificationService->>Customer: Send Cancellation Confirmation
        deactivate NotificationService
    end

    APIGateway-->>Customer: Cancellation Processed
    deactivate APIGateway
