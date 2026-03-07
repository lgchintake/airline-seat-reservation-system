INSERT INTO airlines (
    name, iata_code, icao_code, country
)
VALUES
    ('Air India', 'AI', 'AIC', 'India'),
    ('IndiGo', '6E', 'IGO', 'India'),
    (
        'Emirates', 'EK', 'UAE', 'United Arab Emirates'
    );
INSERT INTO airports (
    name, iata_code, city, country, timezone
)
VALUES
    (
        'Chhatrapati Shivaji Maharaj International Airport',
        'BOM', 'Mumbai', 'India', 'Asia/Kolkata'
    ),
    (
        'Indira Gandhi International Airport',
        'DEL', 'Delhi', 'India', 'Asia/Kolkata'
    ),
    (
        'Kempegowda International Airport',
        'BLR', 'Bangalore', 'India', 'Asia/Kolkata'
    ),
    (
        'Dubai International Airport', 'DXB',
        'Dubai', 'UAE', 'Asia/Dubai'
    ),
    (
        'Heathrow Airport', 'LHR', 'London',
        'UK', 'Europe/London'
    );
INSERT INTO aircraft (airline_id, model, total_seats)
VALUES
    (1, 'Boeing 787 Dreamliner', 256),
    (2, 'Airbus A320', 180),
    (3, 'Airbus A380', 500);
INSERT INTO seat_layout (
    aircraft_id, seat_number, seat_class,
    seat_type
)
VALUES
    (1, '1A', 'FIRST', 'WINDOW'),
    (1, '1B', 'FIRST', 'AISLE'),
    (1, '10A', 'BUSINESS', 'WINDOW'),
    (1, '10B', 'BUSINESS', 'AISLE'),
    (1, '20A', 'ECONOMY', 'WINDOW'),
    (1, '20B', 'ECONOMY', 'MIDDLE'),
    (1, '20C', 'ECONOMY', 'AISLE'),
    (2, '1A', 'BUSINESS', 'WINDOW'),
    (2, '1B', 'BUSINESS', 'AISLE'),
    (2, '15A', 'ECONOMY', 'WINDOW'),
    (2, '15B', 'ECONOMY', 'MIDDLE'),
    (2, '15C', 'ECONOMY', 'AISLE');
INSERT INTO flights (
    airline_id, flight_number, source_airport_id,
    destination_airport_id, departure_time,
    arrival_time, aircraft_id, status
)
VALUES
    (
        1, 'AI101', 1, 2, '09:00:00', '11:00:00',
        1, 'SCHEDULED'
    ),
    (
        2, '6E203', 3, 1, '14:00:00', '15:30:00',
        2, 'SCHEDULED'
    ),
    (
        3, 'EK501', 4, 5, '10:00:00', '15:00:00',
        3, 'SCHEDULED'
    );
INSERT INTO flight_instances (
    flight_id, departure_date, status
)
VALUES
    (1, '2026-04-01', 'SCHEDULED'),
    (1, '2026-04-02', 'SCHEDULED'),
    (2, '2026-04-01', 'SCHEDULED'),
    (3, '2026-04-05', 'SCHEDULED');
INSERT INTO fare_classes (name, description)
VALUES
    (
        'ECONOMY', 'Standard economy seat'
    ),
    (
        'BUSINESS', 'Business class seat with premium service'
    ),
    (
        'FIRST', 'First class luxury seat'
    );
INSERT INTO fares (
    flight_instance_id, fare_class_id,
    price, available_seats
)
VALUES
    (1, 1, 5500.00, 120),
    (1, 2, 15000.00, 40),
    (1, 3, 40000.00, 10),
    (2, 1, 5600.00, 110),
    (2, 2, 15200.00, 35),
    (3, 1, 4500.00, 150),
    (3, 2, 12000.00, 30),
    (4, 1, 30000.00, 300),
    (4, 2, 70000.00, 120),
    (4, 3, 150000.00, 40);
