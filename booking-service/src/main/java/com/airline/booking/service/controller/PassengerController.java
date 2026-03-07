package com.airline.booking.service.controller;

import com.airline.booking.service.entity.Passenger;
import com.airline.booking.service.services.PassengerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/passengers")
@Tag(name = "Passenger", description = "The Passenger API")
public class PassengerController {

    @Autowired
    private PassengerService passengerService;

    @Operation(summary = "Get all passengers", description = "Returns a list of all passengers")
    @GetMapping
    public List<Passenger> getAllPassengers() {
        return passengerService.getAllPassengers();
    }

    @Operation(summary = "Get a passenger by ID", description = "Returns a single passenger")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved passenger"),
            @ApiResponse(responseCode = "404", description = "Passenger not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Passenger> getPassengerById(@PathVariable Long id) {
        return passengerService.getPassengerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a new passenger", description = "Creates a new passenger")
    @PostMapping
    public Passenger createPassenger(@RequestBody Passenger passenger) {
        return passengerService.savePassenger(passenger);
    }

    @Operation(summary = "Update an existing passenger", description = "Updates an existing passenger")
    @PutMapping("/{id}")
    public Passenger updatePassenger(@PathVariable Long id, @RequestBody Passenger passenger) {
        // TODO: Add logic to ensure the ID is set on the passenger object before saving
        return passengerService.savePassenger(passenger);
    }

    @Operation(summary = "Delete a passenger", description = "Deletes a passenger")
    @DeleteMapping("/{id}")
    public void deletePassenger(@PathVariable Long id) {
        passengerService.deletePassenger(id);
    }
}