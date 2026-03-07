package com.airline.flight.service.entity;

import com.airline.flight.service.enums.FlightStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Table(name = "flight_instances")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightInstance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flight_instance_id")
    private Long flightInstanceId;

    @ManyToOne
    @JoinColumn(name = "flight_id", referencedColumnName = "flight_id")
    private Flight flight;

    @Column(name = "departure_date")
    private Date departureDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private FlightStatus status;
}