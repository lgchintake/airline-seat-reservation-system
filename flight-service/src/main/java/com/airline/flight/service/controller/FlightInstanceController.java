package com.airline.flight.service.controller;

import com.airline.flight.service.entity.FlightInstance;
import com.airline.flight.service.services.FlightInstanceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/flight-instances")
@Tag(name = "Flight Instance", description = "The Flight Instance API")
public class FlightInstanceController {

    @Autowired
    private FlightInstanceService flightInstanceService;

    @Operation(summary = "Get all flight instances", description = "Returns a list of all flight instances")
    @GetMapping
    public List<FlightInstance> getAllFlightInstances() {
        return flightInstanceService.getAllFlightInstances();
    }

    @Operation(summary = "Get a flight instance by ID", description = "Returns a single flight instance")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved flight instance"),
            @ApiResponse(responseCode = "404", description = "Flight instance not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<FlightInstance> getFlightInstanceById(@PathVariable Long id) {
        return flightInstanceService.getFlightInstanceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a new flight instance", description = "Creates a new flight instance")
    @PostMapping
    public FlightInstance createFlightInstance(@RequestBody FlightInstance flightInstance) {
        return flightInstanceService.saveFlightInstance(flightInstance);
    }

    @Operation(summary = "Update an existing flight instance", description = "Updates an existing flight instance")
    @PutMapping("/{id}")
    public FlightInstance updateFlightInstance(@PathVariable Long id, @RequestBody FlightInstance flightInstance) {
        // TODO: Add logic to ensure the ID is set on the flightInstance object before saving
        return flightInstanceService.saveFlightInstance(flightInstance);
    }

    @Operation(summary = "Delete a flight instance", description = "Deletes a flight instance")
    @DeleteMapping("/{id}")
    public void deleteFlightInstance(@PathVariable Long id) {
        flightInstanceService.deleteFlightInstance(id);
    }
}