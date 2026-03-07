package com.airline.flight.service.controller;

import com.airline.flight.service.entity.Airport;
import com.airline.flight.service.services.AirportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/airports")
@Tag(name = "Airport", description = "The Airport API")
public class AirportController {

    @Autowired
    private AirportService airportService;

    @Operation(summary = "Get all airports", description = "Returns a list of all airports")
    @GetMapping
    public List<Airport> getAllAirports() {
        return airportService.getAllAirports();
    }

    @Operation(summary = "Get an airport by ID", description = "Returns a single airport")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved airport"),
            @ApiResponse(responseCode = "404", description = "Airport not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Airport> getAirportById(@PathVariable Long id) {
        return airportService.getAirportById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a new airport", description = "Creates a new airport")
    @PostMapping
    public Airport createAirport(@RequestBody Airport airport) {
        return airportService.saveAirport(airport);
    }

    @Operation(summary = "Update an existing airport", description = "Updates an existing airport")
    @PutMapping("/{id}")
    public Airport updateAirport(@PathVariable Long id, @RequestBody Airport airport) {
        // TODO: Add logic to ensure the ID is set on the airport object before saving
        return airportService.saveAirport(airport);
    }

    @Operation(summary = "Delete an airport", description = "Deletes an airport")
    @DeleteMapping("/{id}")
    public void deleteAirport(@PathVariable Long id) {
        airportService.deleteAirport(id);
    }
}