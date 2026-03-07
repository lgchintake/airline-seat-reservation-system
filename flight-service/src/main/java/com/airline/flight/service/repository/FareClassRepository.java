package com.airline.flight.service.repository;

import com.airline.flight.service.entity.FareClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FareClassRepository extends JpaRepository<FareClass, Long> {
}