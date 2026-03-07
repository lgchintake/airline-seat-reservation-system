package com.airline.booking.service.services;

import com.airline.booking.service.entity.SeatInventory;
import com.airline.booking.service.repository.SeatInventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeatInventoryService {

    private final SeatInventoryRepository seatInventoryRepository;

    @Autowired
    public SeatInventoryService(SeatInventoryRepository seatInventoryRepository) {
        this.seatInventoryRepository = seatInventoryRepository;
    }

    /**
     * Retrieves all seat inventories.
     *
     * @return a list of all seat inventories
     */
    public List<SeatInventory> getAllSeatInventories() {
        return seatInventoryRepository.findAll();
    }

    /**
     * Retrieves a seat inventory by its ID.
     *
     * @param id the ID of the seat inventory to retrieve
     * @return an Optional containing the seat inventory if found, or empty if not
     */
    public Optional<SeatInventory> getSeatInventoryById(Long id) {
        return seatInventoryRepository.findById(id);
    }

    /**
     * Saves a new seat inventory or updates an existing one.
     *
     * @param seatInventory the seat inventory to save
     * @return the saved seat inventory
     */
    public SeatInventory saveSeatInventory(SeatInventory seatInventory) {
        return seatInventoryRepository.save(seatInventory);
    }

    /**
     * Deletes a seat inventory by its ID.
     *
     * @param id the ID of the seat inventory to delete
     */
    public void deleteSeatInventory(Long id) {
        seatInventoryRepository.deleteById(id);
    }
}