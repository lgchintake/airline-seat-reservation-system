package com.airline.flight.service.services;

import com.airline.flight.service.entity.Flight;
import com.airline.flight.service.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

    private final FlightRepository flightRepository;

    @Autowired
    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    /**
     * Retrieves all flights.
     *
     * @return a list of all flights
     */
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    /**
     * Retrieves a flight by its ID.
     *
     * @param id the ID of the flight to retrieve
     * @return an Optional containing the flight if found, or empty if not
     */
    public Optional<Flight> getFlightById(Long id) {
        return flightRepository.findById(id);
    }

    /**
     * Saves a new flight or updates an existing one.
     *
     * @param flight the flight to save
     * @return the saved flight
     */
    public Flight saveFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    /**
     * Deletes a flight by its ID.
     *
     * @param id the ID of the flight to delete
     */
    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }
}