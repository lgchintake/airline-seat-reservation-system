package com.airline.flight.service.entity;

import com.airline.flight.service.enums.FlightStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;

@Entity
@Table(name = "flights")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flight_id")
    private Long flightId;

    @ManyToOne
    @JoinColumn(name = "airline_id", referencedColumnName = "airline_id")
    private Airline airline;

    @Column(name = "flight_number", length = 20)
    private String flightNumber;

    @ManyToOne
    @JoinColumn(name = "source_airport_id", referencedColumnName = "airport_id")
    private Airport sourceAirport;

    @ManyToOne
    @JoinColumn(name = "destination_airport_id", referencedColumnName = "airport_id")
    private Airport destinationAirport;

    @Column(name = "departure_time")
    private Time departureTime;

    @Column(name = "arrival_time")
    private Time arrivalTime;

    @ManyToOne
    @JoinColumn(name = "aircraft_id", referencedColumnName = "aircraft_id")
    private Aircraft aircraft;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private FlightStatus status;
}

