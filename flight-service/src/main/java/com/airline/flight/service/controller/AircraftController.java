package com.airline.flight.service.controller;

import com.airline.flight.service.entity.Aircraft;
import com.airline.flight.service.services.AircraftService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/aircrafts")
@Tag(name = "Aircraft", description = "The Aircraft API")
public class AircraftController {

    @Autowired
    private AircraftService aircraftService;

    @Operation(summary = "Get all aircraft", description = "Returns a list of all aircraft")
    @GetMapping
    public List<Aircraft> getAllAircraft() {
        return aircraftService.getAllAircraft();
    }

    @Operation(summary = "Get an aircraft by ID", description = "Returns a single aircraft")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved aircraft"),
            @ApiResponse(responseCode = "404", description = "Aircraft not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Aircraft> getAircraftById(@PathVariable Long id) {
        return aircraftService.getAircraftById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a new aircraft", description = "Creates a new aircraft")
    @PostMapping
    public Aircraft createAircraft(@RequestBody Aircraft aircraft) {
        return aircraftService.saveAircraft(aircraft);
    }

    @Operation(summary = "Update an existing aircraft", description = "Updates an existing aircraft")
    @PutMapping("/{id}")
    public Aircraft updateAircraft(@PathVariable Long id, @RequestBody Aircraft aircraft) {
        // TODO: Add logic to ensure the ID is set on the aircraft object before saving
        return aircraftService.saveAircraft(aircraft);
    }

    @Operation(summary = "Delete an aircraft", description = "Deletes an aircraft")
    @DeleteMapping("/{id}")
    public void deleteAircraft(@PathVariable Long id) {
        aircraftService.deleteAircraft(id);
    }
}