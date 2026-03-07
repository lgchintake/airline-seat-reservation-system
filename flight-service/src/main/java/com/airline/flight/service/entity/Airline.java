package com.airline.flight.service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "airlines")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Airline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "airline_id")
    private Long airlineId;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "iata_code", unique = true, length = 10)
    private String iataCode;

    @Column(name = "icao_code", length = 10)
    private String icaoCode;

    @Column(name = "country", length = 100)
    private String country;

    @Column(name = "created_at", insertable = false, updatable = false)
    private Timestamp createdAt;
}