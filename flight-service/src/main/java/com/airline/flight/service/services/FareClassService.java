package com.airline.flight.service.services;

import com.airline.flight.service.entity.FareClass;
import com.airline.flight.service.repository.FareClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FareClassService {

    private final FareClassRepository fareClassRepository;

    @Autowired
    public FareClassService(FareClassRepository fareClassRepository) {
        this.fareClassRepository = fareClassRepository;
    }

    /**
     * Retrieves all fare classes.
     *
     * @return a list of all fare classes
     */
    public List<FareClass> getAllFareClasses() {
        return fareClassRepository.findAll();
    }

    /**
     * Retrieves a fare class by its ID.
     *
     * @param id the ID of the fare class to retrieve
     * @return an Optional containing the fare class if found, or empty if not
     */
    public Optional<FareClass> getFareClassById(Long id) {
        return fareClassRepository.findById(id);
    }

    /**
     * Saves a new fare class or updates an existing one.
     *
     * @param fareClass the fare class to save
     * @return the saved fare class
     */
    public FareClass saveFareClass(FareClass fareClass) {
        return fareClassRepository.save(fareClass);
    }

    /**
     * Deletes a fare class by its ID.
     *
     * @param id the ID of the fare class to delete
     */
    public void deleteFareClass(Long id) {
        fareClassRepository.deleteById(id);
    }
}