package com.airline.flight.service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "fares")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fare_id")
    private Long fareId;

    @ManyToOne
    @JoinColumn(name = "flight_instance_id", referencedColumnName = "flight_instance_id")
    private FlightInstance flightInstance;

    @ManyToOne
    @JoinColumn(name = "fare_class_id", referencedColumnName = "fare_class_id")
    private FareClass fareClass;

    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "available_seats")
    private Integer availableSeats;
}