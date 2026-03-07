package com.airline.flight.service.controller;

import com.airline.flight.service.entity.FareClass;
import com.airline.flight.service.services.FareClassService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fare-classes")
@Tag(name = "Fare Class", description = "The Fare Class API")
public class FareClassController {

    @Autowired
    private FareClassService fareClassService;

    @Operation(summary = "Get all fare classes", description = "Returns a list of all fare classes")
    @GetMapping
    public List<FareClass> getAllFareClasses() {
        return fareClassService.getAllFareClasses();
    }

    @Operation(summary = "Get a fare class by ID", description = "Returns a single fare class")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved fare class"),
            @ApiResponse(responseCode = "404", description = "Fare class not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<FareClass> getFareClassById(@PathVariable Long id) {
        return fareClassService.getFareClassById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a new fare class", description = "Creates a new fare class")
    @PostMapping
    public FareClass createFareClass(@RequestBody FareClass fareClass) {
        return fareClassService.saveFareClass(fareClass);
    }

    @Operation(summary = "Update an existing fare class", description = "Updates an existing fare class")
    @PutMapping("/{id}")
    public FareClass updateFareClass(@PathVariable Long id, @RequestBody FareClass fareClass) {
        // TODO: Add logic to ensure the ID is set on the fareClass object before saving
        return fareClassService.saveFareClass(fareClass);
    }

    @Operation(summary = "Delete a fare class", description = "Deletes a fare class")
    @DeleteMapping("/{id}")
    public void deleteFareClass(@PathVariable Long id) {
        fareClassService.deleteFareClass(id);
    }
}