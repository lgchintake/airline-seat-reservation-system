package com.airline.flight.service.services;

import com.airline.flight.service.entity.Aircraft;
import com.airline.flight.service.repository.AircraftRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AircraftService {
    private final AircraftRepository aircraftRepository;

    /**
     * Retrieves all aircraft.
     *
     * @return a list of all aircraft
     */
    public List<Aircraft> getAllAircraft() {
        return aircraftRepository.findAll();
    }

    /**
     * Retrieves an aircraft by its ID.
     *
     * @param id the ID of the aircraft to retrieve
     * @return an Optional containing the aircraft if found, or empty if not
     */
    public Optional<Aircraft> getAircraftById(Long id) {
        return aircraftRepository.findById(id);
    }

    /**
     * Saves a new aircraft or updates an existing one.
     *
     * @param aircraft the aircraft to save
     * @return the saved aircraft
     */
    public Aircraft saveAircraft(Aircraft aircraft) {
        return aircraftRepository.save(aircraft);
    }

    /**
     * Deletes an aircraft by its ID.
     *
     * @param id the ID of the aircraft to delete
     */
    public void deleteAircraft(Long id) {
        aircraftRepository.deleteById(id);
    }
}