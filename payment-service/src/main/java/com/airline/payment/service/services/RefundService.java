package com.airline.payment.service.services;

import com.airline.payment.service.entity.Refund;
import com.airline.payment.service.repository.RefundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RefundService {

    private final RefundRepository refundRepository;

    @Autowired
    public RefundService(RefundRepository refundRepository) {
        this.refundRepository = refundRepository;
    }

    /**
     * Retrieves all refunds.
     *
     * @return a list of all refunds
     */
    public List<Refund> getAllRefunds() {
        return refundRepository.findAll();
    }

    /**
     * Retrieves a refund by its ID.
     *
     * @param id the ID of the refund to retrieve
     * @return an Optional containing the refund if found, or empty if not
     */
    public Optional<Refund> getRefundById(Long id) {
        return refundRepository.findById(id);
    }

    /**
     * Saves a new refund or updates an existing one.
     *
     * @param refund the refund to save
     * @return the saved refund
     */
    public Refund saveRefund(Refund refund) {
        return refundRepository.save(refund);
    }

    /**
     * Deletes a refund by its ID.
     *
     * @param id the ID of the refund to delete
     */
    public void deleteRefund(Long id) {
        refundRepository.deleteById(id);
    }
}