package com.airline.booking.service.services;

import com.airline.booking.service.entity.Booking;
import com.airline.booking.service.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    /**
     * Retrieves all bookings.
     *
     * @return a list of all bookings
     */
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    /**
     * Retrieves a booking by its ID.
     *
     * @param id the ID of the booking to retrieve
     * @return an Optional containing the booking if found, or empty if not
     */
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    /**
     * Saves a new booking or updates an existing one.
     *
     * @param booking the booking to save
     * @return the saved booking
     */
    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    /**
     * Deletes a booking by its ID.
     *
     * @param id the ID of the booking to delete
     */
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}