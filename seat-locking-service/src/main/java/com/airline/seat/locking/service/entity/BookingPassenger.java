package com.airline.booking.service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "booking_passengers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingPassenger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_passenger_id")
    private Long bookingPassengerId;

    @ManyToOne
    @JoinColumn(name = "booking_id", referencedColumnName = "booking_id")
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "passenger_id", referencedColumnName = "passenger_id")
    private Passenger passenger;

    @Column(name = "seat_number", length = 10)
    private String seatNumber;

    @Column(name = "fare_class", length = 20)
    private String fareClass;

    @Column(name = "ticket_number", length = 50)
    private String ticketNumber;
}