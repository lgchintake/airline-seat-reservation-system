CREATE DATABASE IF NOT EXISTS notification_service_db;

USE notification_service_db;

CREATE TABLE notifications
(
    notification_id   BIGINT auto_increment PRIMARY KEY,
    booking_id        BIGINT,
    user_id           BIGINT,
    notification_type ENUM('EMAIL', 'SMS', 'PUSH'),
    status            ENUM('PENDING', 'SENT', 'FAILED'),
    message           TEXT,
    sent_at           TIMESTAMP
)
    engine=innodb;