package com.airline.flight.service.services;

import com.airline.flight.service.entity.Airport;
import com.airline.flight.service.repository.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AirportService {

    private final AirportRepository airportRepository;

    @Autowired
    public AirportService(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    /**
     * Retrieves all airports.
     *
     * @return a list of all airports
     */
    public List<Airport> getAllAirports() {
        return airportRepository.findAll();
    }

    /**
     * Retrieves an airport by its ID.
     *
     * @param id the ID of the airport to retrieve
     * @return an Optional containing the airport if found, or empty if not
     */
    public Optional<Airport> getAirportById(Long id) {
        return airportRepository.findById(id);
    }

    /**
     * Saves a new airport or updates an existing one.
     *
     * @param airport the airport to save
     * @return the saved airport
     */
    public Airport saveAirport(Airport airport) {
        return airportRepository.save(airport);
    }

    /**
     * Deletes an airport by its ID.
     *
     * @param id the ID of the airport to delete
     */
    public void deleteAirport(Long id) {
        airportRepository.deleteById(id);
    }
}