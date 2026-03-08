package com.airline.booking.service.services;

import com.airline.booking.service.entity.Passenger;
import com.airline.booking.service.repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PassengerService {

    private final PassengerRepository passengerRepository;

    @Autowired
    public PassengerService(PassengerRepository passengerRepository) {
        this.passengerRepository = passengerRepository;
    }

    /**
     * Retrieves all passengers.
     *
     * @return a list of all passengers
     */
    public List<Passenger> getAllPassengers() {
        return passengerRepository.findAll();
    }

    /**
     * Retrieves a passenger by its ID.
     *
     * @param id the ID of the passenger to retrieve
     * @return an Optional containing the passenger if found, or empty if not
     */
    public Optional<Passenger> getPassengerById(Long id) {
        return passengerRepository.findById(id);
    }

    /**
     * Saves a new passenger or updates an existing one.
     *
     * @param passenger the passenger to save
     * @return the saved passenger
     */
    public Passenger savePassenger(Passenger passenger) {
        return passengerRepository.save(passenger);
    }

    /**
     * Deletes a passenger by its ID.
     *
     * @param id the ID of the passenger to delete
     */
    public void deletePassenger(Long id) {
        passengerRepository.deleteById(id);
    }
}