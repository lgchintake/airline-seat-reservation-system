package com.airline.booking.service.entity;

import com.airline.booking.service.enums.SeatClass;
import com.airline.booking.service.enums.SeatStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "seat_inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatInventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_inventory_id")
    private Long seatInventoryId;

    @Column(name = "flight_instance_id")
    private Long flightInstanceId;

    @Column(name = "seat_number", length = 10)
    private String seatNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "seat_class")
    private SeatClass seatClass;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private SeatStatus status;

    @Column(name = "locked_until")
    private Timestamp lockedUntil;
}