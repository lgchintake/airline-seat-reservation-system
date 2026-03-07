CREATE DATABASE IF NOT EXISTS search_service_db;

USE search_service_db;

CREATE TABLE flight_search_index
(
    flight_instance_id  BIGINT PRIMARY KEY,
    airline_name        VARCHAR(150),
    flight_number       VARCHAR(20),
    source_airport      VARCHAR(10),
    destination_airport VARCHAR(10),
    departure_time      DATETIME,
    arrival_time        DATETIME,
    fare_class          VARCHAR(50),
    price               DECIMAL(10, 2),
    available_seats     INT,
    INDEX idx_route (source_airport, destination_airport),
    INDEX idx_departure (departure_time)
)
    engine=innodb;