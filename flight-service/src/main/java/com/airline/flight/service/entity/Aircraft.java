package com.airline.flight.service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "aircraft")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Aircraft {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "aircraft_id")
    private Long aircraftId;

    @ManyToOne
    @JoinColumn(name = "airline_id", referencedColumnName = "airline_id")
    private Airline airline;

    @Column(name = "model", length = 100)
    private String model;

    @Column(name = "total_seats")
    private Integer totalSeats;
}