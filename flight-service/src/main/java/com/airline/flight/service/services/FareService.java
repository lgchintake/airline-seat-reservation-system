package com.airline.flight.service.services;

import com.airline.flight.service.entity.Fare;
import com.airline.flight.service.repository.FareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FareService {

    private final FareRepository fareRepository;

    @Autowired
    public FareService(FareRepository fareRepository) {
        this.fareRepository = fareRepository;
    }

    /**
     * Retrieves all fares.
     *
     * @return a list of all fares
     */
    public List<Fare> getAllFares() {
        return fareRepository.findAll();
    }

    /**
     * Retrieves a fare by its ID.
     *
     * @param id the ID of the fare to retrieve
     * @return an Optional containing the fare if found, or empty if not
     */
    public Optional<Fare> getFareById(Long id) {
        return fareRepository.findById(id);
    }

    /**
     * Saves a new fare or updates an existing one.
     *
     * @param fare the fare to save
     * @return the saved fare
     */
    public Fare saveFare(Fare fare) {
        return fareRepository.save(fare);
    }

    /**
     * Deletes a fare by its ID.
     *
     * @param id the ID of the fare to delete
     */
    public void deleteFare(Long id) {
        fareRepository.deleteById(id);
    }
}