package com.airline.flight.service.entity;

import com.airline.flight.service.enums.SeatClass;
import com.airline.flight.service.enums.SeatType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "seat_layout")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatLayout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_layout_id")
    private Long seatLayoutId;

    @ManyToOne
    @JoinColumn(name = "aircraft_id", referencedColumnName = "aircraft_id")
    private Aircraft aircraft;

    @Column(name = "seat_number", length = 10)
    private String seatNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "seat_class")
    private SeatClass seatClass;

    @Enumerated(EnumType.STRING)
    @Column(name = "seat_type")
    private SeatType seatType;
}

