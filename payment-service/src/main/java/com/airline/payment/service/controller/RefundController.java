package com.airline.payment.service.controller;

import com.airline.payment.service.entity.Refund;
import com.airline.payment.service.services.RefundService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/refunds")
@Tag(name = "Refund", description = "The Refund API")
public class RefundController {

    @Autowired
    private RefundService refundService;

    @Operation(summary = "Get all refunds", description = "Returns a list of all refunds")
    @GetMapping
    public List<Refund> getAllRefunds() {
        return refundService.getAllRefunds();
    }

    @Operation(summary = "Get a refund by ID", description = "Returns a single refund")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved refund"),
            @ApiResponse(responseCode = "404", description = "Refund not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Refund> getRefundById(@PathVariable Long id) {
        return refundService.getRefundById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a new refund", description = "Creates a new refund")
    @PostMapping
    public Refund createRefund(@RequestBody Refund refund) {
        return refundService.saveRefund(refund);
    }

    @Operation(summary = "Update an existing refund", description = "Updates an existing refund")
    @PutMapping("/{id}")
    public Refund updateRefund(@PathVariable Long id, @RequestBody Refund refund) {
        // TODO: Add logic to ensure the ID is set on the refund object before saving
        return refundService.saveRefund(refund);
    }

    @Operation(summary = "Delete a refund", description = "Deletes a refund")
    @DeleteMapping("/{id}")
    public void deleteRefund(@PathVariable Long id) {
        refundService.deleteRefund(id);
    }
}