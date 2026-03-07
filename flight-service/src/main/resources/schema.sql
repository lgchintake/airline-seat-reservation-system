CREATE DATABASE IF NOT EXISTS flight_service_db;

USE flight_service_db;

CREATE TABLE airlines
(
    airline_id BIGINT auto_increment PRIMARY KEY,
    name       VARCHAR(150) NOT NULL,
    iata_code  VARCHAR(10) UNIQUE,
    icao_code  VARCHAR(10),
    country    VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
    engine=innodb;

CREATE TABLE airports
(
    airport_id BIGINT auto_increment PRIMARY KEY,
    name       VARCHAR(200) NOT NULL,
    iata_code  VARCHAR(10) UNIQUE NOT NULL,
    city       VARCHAR(100),
    country    VARCHAR(100),
    timezone   VARCHAR(50)
)
    engine=innodb;

CREATE TABLE aircraft
(
    aircraft_id BIGINT auto_increment PRIMARY KEY,
    airline_id  BIGINT,
    model       VARCHAR(100),
    total_seats INT,
    CONSTRAINT fk_aircraft_airline FOREIGN KEY (airline_id) REFERENCES airlines
        (airline_id)
)
    engine=innodb;

CREATE TABLE seat_layout
(
    seat_layout_id BIGINT auto_increment PRIMARY KEY,
    aircraft_id    BIGINT,
    seat_number    VARCHAR(10),
    seat_class     ENUM('ECONOMY', 'BUSINESS', 'FIRST'),
    seat_type      ENUM('WINDOW', 'AISLE', 'MIDDLE'),
    CONSTRAINT fk_layout_aircraft FOREIGN KEY (aircraft_id) REFERENCES aircraft
        (aircraft_id)
)
    engine=innodb;

CREATE TABLE flights
(
    flight_id              BIGINT auto_increment PRIMARY KEY,
    airline_id             BIGINT,
    flight_number          VARCHAR(20),
    source_airport_id      BIGINT,
    destination_airport_id BIGINT,
    departure_time         TIME,
    arrival_time           TIME,
    aircraft_id            BIGINT,
    status                 ENUM('SCHEDULED', 'CANCELLED', 'COMPLETED'),
    CONSTRAINT fk_flight_airline FOREIGN KEY (airline_id) REFERENCES airlines(
                                                                              airline_id),
    CONSTRAINT fk_source_airport FOREIGN KEY (source_airport_id) REFERENCES
        airports(airport_id),
    CONSTRAINT fk_dest_airport FOREIGN KEY (destination_airport_id) REFERENCES
        airports(airport_id),
    CONSTRAINT fk_aircraft FOREIGN KEY (aircraft_id) REFERENCES aircraft(
                                                                         aircraft_id)
)
    engine=innodb;

CREATE TABLE flight_instances
(
    flight_instance_id BIGINT auto_increment PRIMARY KEY,
    flight_id          BIGINT,
    departure_date     DATE,
    status             ENUM('SCHEDULED', 'CANCELLED', 'COMPLETED'),
    CONSTRAINT fk_instance_flight FOREIGN KEY (flight_id) REFERENCES flights(
                                                                             flight_id)
)
    engine=innodb;

CREATE TABLE fare_classes
(
    fare_class_id BIGINT auto_increment PRIMARY KEY,
    name          VARCHAR(50),
    description   TEXT
)
    engine=innodb;

CREATE TABLE fares
(
    fare_id            BIGINT auto_increment PRIMARY KEY,
    flight_instance_id BIGINT,
    fare_class_id      BIGINT,
    price              DECIMAL(10, 2),
    available_seats    INT,
    CONSTRAINT fk_fare_instance FOREIGN KEY (flight_instance_id) REFERENCES
        flight_instances(flight_instance_id),
    CONSTRAINT fk_fare_class FOREIGN KEY (fare_class_id) REFERENCES
        fare_classes(fare_class_id)
)