package com.airline.flight.service.repository;

import com.airline.flight.service.entity.FlightInstance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightInstanceRepository extends JpaRepository<FlightInstance, Long> {
}