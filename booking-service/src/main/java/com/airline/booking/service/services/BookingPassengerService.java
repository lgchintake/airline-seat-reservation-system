package com.airline.booking.service.services;

import com.airline.booking.service.entity.BookingPassenger;
import com.airline.booking.service.repository.BookingPassengerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingPassengerService {

    private final BookingPassengerRepository bookingPassengerRepository;

    @Autowired
    public BookingPassengerService(BookingPassengerRepository bookingPassengerRepository) {
        this.bookingPassengerRepository = bookingPassengerRepository;
    }

    /**
     * Retrieves all booking passengers.
     *
     * @return a list of all booking passengers
     */
    public List<BookingPassenger> getAllBookingPassengers() {
        return bookingPassengerRepository.findAll();
    }

    /**
     * Retrieves a booking passenger by its ID.
     *
     * @param id the ID of the booking passenger to retrieve
     * @return an Optional containing the booking passenger if found, or empty if not
     */
    public Optional<BookingPassenger> getBookingPassengerById(Long id) {
        return bookingPassengerRepository.findById(id);
    }

    /**
     * Saves a new booking passenger or updates an existing one.
     *
     * @param bookingPassenger the booking passenger to save
     * @return the saved booking passenger
     */
    public BookingPassenger saveBookingPassenger(BookingPassenger bookingPassenger) {
        return bookingPassengerRepository.save(bookingPassenger);
    }

    /**
     * Deletes a booking passenger by its ID.
     *
     * @param id the ID of the booking passenger to delete
     */
    public void deleteBookingPassenger(Long id) {
        bookingPassengerRepository.deleteById(id);
    }
}