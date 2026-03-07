package com.airline.flight.service.controller;

import com.airline.flight.service.entity.Airline;
import com.airline.flight.service.services.AirlineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/airlines")
@Tag(name = "Airline", description = "The Airline API")
public class AirlineController {

    @Autowired
    private AirlineService airlineService;

    @Operation(summary = "Get all airlines", description = "Returns a list of all airlines")
    @GetMapping
    public List<Airline> getAllAirlines() {
        return airlineService.getAllAirlines();
    }

    @Operation(summary = "Get an airline by ID", description = "Returns a single airline")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved airline"),
            @ApiResponse(responseCode = "404", description = "Airline not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Airline> getAirlineById(@PathVariable Long id) {
        return airlineService.getAirlineById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a new airline", description = "Creates a new airline")
    @PostMapping
    public Airline createAirline(@RequestBody Airline airline) {
        return airlineService.saveAirline(airline);
    }

    @Operation(summary = "Update an existing airline", description = "Updates an existing airline")
    @PutMapping("/{id}")
    public Airline updateAirline(@PathVariable Long id, @RequestBody Airline airline) {
        // TODO: Add logic to ensure the ID is set on the airline object before saving
        return airlineService.saveAirline(airline);
    }

    @Operation(summary = "Delete an airline", description = "Deletes an airline")
    @DeleteMapping("/{id}")
    public void deleteAirline(@PathVariable Long id) {
        airlineService.deleteAirline(id);
    }
}