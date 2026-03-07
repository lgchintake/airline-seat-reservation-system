package com.airline.flight.service.services;

import com.airline.flight.service.entity.FlightInstance;
import com.airline.flight.service.repository.FlightInstanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightInstanceService {

    private final FlightInstanceRepository flightInstanceRepository;

    @Autowired
    public FlightInstanceService(FlightInstanceRepository flightInstanceRepository) {
        this.flightInstanceRepository = flightInstanceRepository;
    }

    /**
     * Retrieves all flight instances.
     *
     * @return a list of all flight instances
     */
    public List<FlightInstance> getAllFlightInstances() {
        return flightInstanceRepository.findAll();
    }

    /**
     * Retrieves a flight instance by its ID.
     *
     * @param id the ID of the flight instance to retrieve
     * @return an Optional containing the flight instance if found, or empty if not
     */
    public Optional<FlightInstance> getFlightInstanceById(Long id) {
        return flightInstanceRepository.findById(id);
    }

    /**
     * Saves a new flight instance or updates an existing one.
     *
     * @param flightInstance the flight instance to save
     * @return the saved flight instance
     */
    public FlightInstance saveFlightInstance(FlightInstance flightInstance) {
        return flightInstanceRepository.save(flightInstance);
    }

    /**
     * Deletes a flight instance by its ID.
     *
     * @param id the ID of the flight instance to delete
     */
    public void deleteFlightInstance(Long id) {
        flightInstanceRepository.deleteById(id);
    }
}