package com.airline.booking.service.controller;

import com.airline.booking.service.entity.BookingPassenger;
import com.airline.booking.service.services.BookingPassengerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking-passengers")
@Tag(name = "Booking Passenger", description = "The Booking Passenger API")
public class BookingPassengerController {

    @Autowired
    private BookingPassengerService bookingPassengerService;

    @Operation(summary = "Get all booking passengers", description = "Returns a list of all booking passengers")
    @GetMapping
    public List<BookingPassenger> getAllBookingPassengers() {
        return bookingPassengerService.getAllBookingPassengers();
    }

    @Operation(summary = "Get a booking passenger by ID", description = "Returns a single booking passenger")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved booking passenger"),
            @ApiResponse(responseCode = "404", description = "Booking passenger not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<BookingPassenger> getBookingPassengerById(@PathVariable Long id) {
        return bookingPassengerService.getBookingPassengerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a new booking passenger", description = "Creates a new booking passenger")
    @PostMapping
    public BookingPassenger createBookingPassenger(@RequestBody BookingPassenger bookingPassenger) {
        return bookingPassengerService.saveBookingPassenger(bookingPassenger);
    }

    @Operation(summary = "Update an existing booking passenger", description = "Updates an existing booking passenger")
    @PutMapping("/{id}")
    public BookingPassenger updateBookingPassenger(@PathVariable Long id, @RequestBody BookingPassenger bookingPassenger) {
        // TODO: Add logic to ensure the ID is set on the bookingPassenger object before saving
        return bookingPassengerService.saveBookingPassenger(bookingPassenger);
    }

    @Operation(summary = "Delete a booking passenger", description = "Deletes a booking passenger")
    @DeleteMapping("/{id}")
    public void deleteBookingPassenger(@PathVariable Long id) {
        bookingPassengerService.deleteBookingPassenger(id);
    }
}