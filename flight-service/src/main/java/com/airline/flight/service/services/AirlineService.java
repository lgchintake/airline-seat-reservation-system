package com.airline.flight.service.services;

import com.airline.flight.service.entity.Airline;
import com.airline.flight.service.repository.AirlineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AirlineService {

    private final AirlineRepository airlineRepository;

    @Autowired
    public AirlineService(AirlineRepository airlineRepository) {
        this.airlineRepository = airlineRepository;
    }

    /**
     * Retrieves all airlines.
     *
     * @return a list of all airlines
     */
    public List<Airline> getAllAirlines() {
        return airlineRepository.findAll();
    }

    /**
     * Retrieves an airline by its ID.
     *
     * @param id the ID of the airline to retrieve
     * @return an Optional containing the airline if found, or empty if not
     */
    public Optional<Airline> getAirlineById(Long id) {
        return airlineRepository.findById(id);
    }

    /**
     * Saves a new airline or updates an existing one.
     *
     * @param airline the airline to save
     * @return the saved airline
     */
    public Airline saveAirline(Airline airline) {
        return airlineRepository.save(airline);
    }

    /**
     * Deletes an airline by its ID.
     *
     * @param id the ID of the airline to delete
     */
    public void deleteAirline(Long id) {
        airlineRepository.deleteById(id);
    }
}