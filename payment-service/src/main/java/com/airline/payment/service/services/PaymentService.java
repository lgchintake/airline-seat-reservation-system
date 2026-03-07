package com.airline.payment.service.services;

import com.airline.payment.service.entity.Payment;
import com.airline.payment.service.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    /**
     * Retrieves all payments.
     *
     * @return a list of all payments
     */
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    /**
     * Retrieves a payment by its ID.
     *
     * @param id the ID of the payment to retrieve
     * @return an Optional containing the payment if found, or empty if not
     */
    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    /**
     * Saves a new payment or updates an existing one.
     *
     * @param payment the payment to save
     * @return the saved payment
     */
    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    /**
     * Deletes a payment by its ID.
     *
     * @param id the ID of the payment to delete
     */
    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}