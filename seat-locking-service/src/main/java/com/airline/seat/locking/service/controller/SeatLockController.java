package com.airline.seat.locking.service.controller;

import com.airline.seat.locking.service.services.SeatLockService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/lock")
@RequiredArgsConstructor
public class SeatLockController {

    private final SeatLockService seatLockService;

    /**
     * Locks a seat for a given flight instance.
     *
     * @param flightInstanceId    the ID of the flight instance
     * @param seatNumber          the seat number to lock
     * @param lockDurationMinutes the duration to lock the seat in minutes
     * @return a map with seat numbers as keys and a boolean indicating if the lock was successful as value
     */
    @Operation(summary = "Lock a seat", description = "Locks a seat for a given flight instance")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Returns a map with seat numbers as keys and a boolean indicating if the lock was successful as value",
                    content = @Content(schema = @Schema(implementation = Map.class)))
    })
    @PostMapping("/lock")
    public ResponseEntity<Map<String, Boolean>> lockSeat(@RequestParam Long flightInstanceId, @RequestParam String[] seatNumber, @RequestParam(defaultValue = "5") long lockDurationMinutes) {
        Map<String, Boolean> locked = seatLockService.lockSeat(flightInstanceId, seatNumber, lockDurationMinutes);
        return ResponseEntity.ok(locked);
    }

    /**
     * Gets the status of a seat.
     *
     * @param flightInstanceId the ID of the flight instance
     * @param seatNumber       the seat number
     * @return the status of the seat, or "AVAILABLE" if not locked
     */
    @Operation(summary = "Get seat status", description = "Gets the status of a seat")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Returns a map with seat numbers as keys and the status of the seat as value",
                    content = @Content(schema = @Schema(implementation = Map.class)))
    })
    @GetMapping("/status")
    public ResponseEntity<Map<String, String>> getSeatStatus(@RequestParam Long flightInstanceId, @RequestParam String[] seatNumber) {
        Map<String, String> locked = seatLockService.getSeatStatus(flightInstanceId, seatNumber);
        return ResponseEntity.ok(locked);
    }
}
