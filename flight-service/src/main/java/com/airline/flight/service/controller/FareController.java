package com.airline.flight.service.controller;

import com.airline.flight.service.entity.Fare;
import com.airline.flight.service.services.FareService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fares")
@Tag(name = "Fare", description = "The Fare API")
public class FareController {

    @Autowired
    private FareService fareService;

    @Operation(summary = "Get all fares", description = "Returns a list of all fares")
    @GetMapping
    public List<Fare> getAllFares() {
        return fareService.getAllFares();
    }

    @Operation(summary = "Get a fare by ID", description = "Returns a single fare")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved fare"),
            @ApiResponse(responseCode = "404", description = "Fare not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Fare> getFareById(@PathVariable Long id) {
        return fareService.getFareById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a new fare", description = "Creates a new fare")
    @PostMapping
    public Fare createFare(@RequestBody Fare fare) {
        return fareService.saveFare(fare);
    }

    @Operation(summary = "Update an existing fare", description = "Updates an existing fare")
    @PutMapping("/{id}")
    public Fare updateFare(@PathVariable Long id, @RequestBody Fare fare) {
        // TODO: Add logic to ensure the ID is set on the fare object before saving
        return fareService.saveFare(fare);
    }

    @Operation(summary = "Delete a fare", description = "Deletes a fare")
    @DeleteMapping("/{id}")
    public void deleteFare(@PathVariable Long id) {
        fareService.deleteFare(id);
    }
}