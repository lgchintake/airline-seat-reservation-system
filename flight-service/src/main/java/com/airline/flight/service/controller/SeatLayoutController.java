package com.airline.flight.service.controller;

import com.airline.flight.service.entity.SeatLayout;
import com.airline.flight.service.services.SeatLayoutService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seat-layouts")
@Tag(name = "Seat Layout", description = "The Seat Layout API")
public class SeatLayoutController {

    @Autowired
    private SeatLayoutService seatLayoutService;

    @Operation(summary = "Get all seat layouts", description = "Returns a list of all seat layouts")
    @GetMapping
    public List<SeatLayout> getAllSeatLayouts() {
        return seatLayoutService.getAllSeatLayouts();
    }

    @Operation(summary = "Get a seat layout by ID", description = "Returns a single seat layout")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved seat layout"),
            @ApiResponse(responseCode = "404", description = "Seat layout not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<SeatLayout> getSeatLayoutById(@PathVariable Long id) {
        return seatLayoutService.getSeatLayoutById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a new seat layout", description = "Creates a new seat layout")
    @PostMapping
    public SeatLayout createSeatLayout(@RequestBody SeatLayout seatLayout) {
        return seatLayoutService.saveSeatLayout(seatLayout);
    }

    @Operation(summary = "Update an existing seat layout", description = "Updates an existing seat layout")
    @PutMapping("/{id}")
    public SeatLayout updateSeatLayout(@PathVariable Long id, @RequestBody SeatLayout seatLayout) {
        // TODO: Add logic to ensure the ID is set on the seatLayout object before saving
        return seatLayoutService.saveSeatLayout(seatLayout);
    }

    @Operation(summary = "Delete a seat layout", description = "Deletes a seat layout")
    @DeleteMapping("/{id}")
    public void deleteSeatLayout(@PathVariable Long id) {
        seatLayoutService.deleteSeatLayout(id);
    }
}