package com.airline.flight.service.controller;

import com.airline.flight.service.entity.Flight;
import com.airline.flight.service.services.FlightService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/flights")
@Tag(name = "Flight", description = "The Flight API")
public class FlightController {

    @Autowired
    private FlightService flightService;

    @Operation(summary = "Get all flights", description = "Returns a list of all flights")
    @GetMapping
    public List<Flight> getAllFlights() {
        return flightService.getAllFlights();
    }

    @Operation(summary = "Get a flight by ID", description = "Returns a single flight")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved flight"),
            @ApiResponse(responseCode = "404", description = "Flight not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Flight> getFlightById(@PathVariable Long id) {
        return flightService.getFlightById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a new flight", description = "Creates a new flight")
    @PostMapping
    public Flight createFlight(@RequestBody Flight flight) {
        return flightService.saveFlight(flight);
    }

    @Operation(summary = "Update an existing flight", description = "Updates an existing flight")
    @PutMapping("/{id}")
    public Flight updateFlight(@PathVariable Long id, @RequestBody Flight flight) {
        // TODO: Add logic to ensure the ID is set on the flight object before saving
        return flightService.saveFlight(flight);
    }

    @Operation(summary = "Delete a flight", description = "Deletes a flight")
    @DeleteMapping("/{id}")
    public void deleteFlight(@PathVariable Long id) {
        flightService.deleteFlight(id);
    }
}