package com.airline.booking.service.controller;

import com.airline.booking.service.entity.SeatInventory;
import com.airline.booking.service.services.SeatInventoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seat-inventories")
@Tag(name = "Seat Inventory", description = "The Seat Inventory API")
public class SeatInventoryController {

    @Autowired
    private SeatInventoryService seatInventoryService;

    @Operation(summary = "Get all seat inventories", description = "Returns a list of all seat inventories")
    @GetMapping
    public List<SeatInventory> getAllSeatInventories() {
        return seatInventoryService.getAllSeatInventories();
    }

    @Operation(summary = "Get a seat inventory by ID", description = "Returns a single seat inventory")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved seat inventory"),
            @ApiResponse(responseCode = "404", description = "Seat inventory not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<SeatInventory> getSeatInventoryById(@PathVariable Long id) {
        return seatInventoryService.getSeatInventoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a new seat inventory", description = "Creates a new seat inventory")
    @PostMapping
    public SeatInventory createSeatInventory(@RequestBody SeatInventory seatInventory) {
        return seatInventoryService.saveSeatInventory(seatInventory);
    }

    @Operation(summary = "Update an existing seat inventory", description = "Updates an existing seat inventory")
    @PutMapping("/{id}")
    public SeatInventory updateSeatInventory(@PathVariable Long id, @RequestBody SeatInventory seatInventory) {
        // TODO: Add logic to ensure the ID is set on the seatInventory object before saving
        return seatInventoryService.saveSeatInventory(seatInventory);
    }

    @Operation(summary = "Delete a seat inventory", description = "Deletes a seat inventory")
    @DeleteMapping("/{id}")
    public void deleteSeatInventory(@PathVariable Long id) {
        seatInventoryService.deleteSeatInventory(id);
    }
}