package com.airline.booking.service.services;

import com.airline.booking.service.entity.SeatInventory;
import com.airline.booking.service.repository.SeatInventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
public class SeatInventoryService {

    private final SeatInventoryRepository seatInventoryRepository;
    private final StringRedisTemplate redisTemplate;

    @Autowired
    public SeatInventoryService(SeatInventoryRepository seatInventoryRepository, StringRedisTemplate redisTemplate) {
        this.seatInventoryRepository = seatInventoryRepository;
        this.redisTemplate = redisTemplate;
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

    /**
     * Locks a seat for a given flight instance.
     *
     * @param flightInstanceId the ID of the flight instance
     * @param seatNumber the seat number to lock
     * @param lockDurationMinutes the duration to lock the seat in minutes
     * @return true if the seat was successfully locked, false otherwise
     */
    public boolean lockSeat(Long flightInstanceId, String seatNumber, long lockDurationMinutes) {
        String key = "seat-lock:" + flightInstanceId + ":" + seatNumber;
        Boolean locked = redisTemplate.opsForValue().setIfAbsent(key, "LOCKED", lockDurationMinutes, TimeUnit.MINUTES);
        return locked != null && locked;
    }

    /**
     * Gets the status of a seat.
     *
     * @param flightInstanceId the ID of the flight instance
     * @param seatNumber the seat number
     * @return the status of the seat, or "AVAILABLE" if not locked
     */
    public String getSeatStatus(Long flightInstanceId, String seatNumber) {
        String key = "seat-lock:" + flightInstanceId + ":" + seatNumber;
        String status = redisTemplate.opsForValue().get(key);
        return status != null ? status : "AVAILABLE";
    }
}