CREATE DATABASE IF NOT EXISTS payment_service_db;

USE payment_service_db;

CREATE TABLE payments
(
    payment_id            BIGINT auto_increment PRIMARY KEY,
    booking_id            BIGINT,
    payment_status        ENUM('INITIATED', 'SUCCESS', 'FAILED', 'REFUNDED'),
    payment_method        VARCHAR(50),
    amount                DECIMAL(10, 2),
    transaction_reference VARCHAR(100),
    payment_time          TIMESTAMP
)
    engine=innodb;

CREATE TABLE refunds
(
    refund_id   BIGINT auto_increment PRIMARY KEY,
    booking_id  BIGINT,
    amount      DECIMAL(10, 2),
    status      ENUM('INITIATED', 'COMPLETED', 'FAILED'),
    refund_date TIMESTAMP
)
    engine=innodb;