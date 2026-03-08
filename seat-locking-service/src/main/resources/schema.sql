CREATE DATABASE IF NOT EXISTS booking_service_db;

USE booking_service_db;

CREATE TABLE passengers
(
    passenger_id    BIGINT auto_increment PRIMARY KEY,
    first_name      VARCHAR(100),
    last_name       VARCHAR(100),
    dob             DATE,
    passport_number VARCHAR(50),
    nationality     VARCHAR(50)
)
    engine=innodb;

CREATE TABLE bookings
(
    booking_id         BIGINT auto_increment PRIMARY KEY,
    booking_reference  VARCHAR(20) UNIQUE,
    user_id            BIGINT,
    flight_instance_id BIGINT,
    status             ENUM('INITIATED', 'CONFIRMED', 'CANCELLED'),
    total_price        DECIMAL(10, 2),
    created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
    engine=innodb;

CREATE TABLE booking_passengers
(
    booking_passenger_id BIGINT auto_increment PRIMARY KEY,
    booking_id           BIGINT,
    passenger_id         BIGINT,
    seat_number          VARCHAR(10),
    fare_class           VARCHAR(20),
    ticket_number        VARCHAR(50),
    CONSTRAINT fk_booking_passenger_booking FOREIGN KEY (booking_id) REFERENCES
        bookings(booking_id),
    CONSTRAINT fk_booking_passenger_passenger FOREIGN KEY (passenger_id)
        REFERENCES passengers(passenger_id)
)
    engine=innodb;

CREATE TABLE seat_inventory
(
    seat_inventory_id  BIGINT auto_increment PRIMARY KEY,
    flight_instance_id BIGINT,
    seat_number        VARCHAR(10),
    seat_class         ENUM('ECONOMY', 'BUSINESS', 'FIRST'),
    status             ENUM('AVAILABLE', 'LOCKED', 'BOOKED'),
    locked_until       TIMESTAMP,
    UNIQUE KEY uniq_seat (flight_instance_id, seat_number),
    INDEX idx_seat_status (status)
)
    engine=innodb;