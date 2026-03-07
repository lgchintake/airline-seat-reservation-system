package com.airline.flight.service.services;

import com.airline.flight.service.entity.SeatLayout;
import com.airline.flight.service.repository.SeatLayoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeatLayoutService {

    private final SeatLayoutRepository seatLayoutRepository;

    @Autowired
    public SeatLayoutService(SeatLayoutRepository seatLayoutRepository) {
        this.seatLayoutRepository = seatLayoutRepository;
    }

    /**
     * Retrieves all seat layouts.
     *
     * @return a list of all seat layouts
     */
    public List<SeatLayout> getAllSeatLayouts() {
        return seatLayoutRepository.findAll();
    }

    /**
     * Retrieves a seat layout by its ID.
     *
     * @param id the ID of the seat layout to retrieve
     * @return an Optional containing the seat layout if found, or empty if not
     */
    public Optional<SeatLayout> getSeatLayoutById(Long id) {
        return seatLayoutRepository.findById(id);
    }

    /**
     * Saves a new seat layout or updates an existing one.
     *
     * @param seatLayout the seat layout to save
     * @return the saved seat layout
     */
    public SeatLayout saveSeatLayout(SeatLayout seatLayout) {
        return seatLayoutRepository.save(seatLayout);
    }

    /**
     * Deletes a seat layout by its ID.
     *
     * @param id the ID of the seat layout to delete
     */
    public void deleteSeatLayout(Long id) {
        seatLayoutRepository.deleteById(id);
    }
}