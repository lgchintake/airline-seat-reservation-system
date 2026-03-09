package com.airline.seat.locking.service.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class SeatLockService {

    private final StringRedisTemplate redisTemplate;

    @Autowired
    public SeatLockService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**
     * Locks a seat for a given flight instance.
     *
     * @param flightInstanceId    the ID of the flight instance
     * @param seatNumber          the seat number to lock
     * @param lockDurationMinutes the duration to lock the seat in minutes
     * @return a map with seat numbers as keys and a boolean indicating if the lock was successful as value
     */
    public Map<String, Boolean> lockSeat(Long flightInstanceId, String[] seatNumber, long lockDurationMinutes) {
        Map<String, Boolean> lockStatus = new HashMap<>();
        for (String seat : seatNumber) {
            String key = "seat-lock:" + flightInstanceId + ":" + seat.toUpperCase();
            Boolean locked = redisTemplate.opsForValue().setIfAbsent(key, "LOCKED", lockDurationMinutes, TimeUnit.MINUTES);
            lockStatus.put(seat.toUpperCase(), locked != null && locked);
        }
        return lockStatus;
    }

    /**
     * Gets the status of a seat.
     *
     * @param flightInstanceId the ID of the flight instance
     * @param seatNumber       the seat number
     * @return a map with seat numbers as keys and the status of the seat as value
     */
    public Map<String, String> getSeatStatus(Long flightInstanceId, String[] seatNumber) {
        Map<String, String> lockStatus = new HashMap<>();
        for (String seat : seatNumber) {
            String key = "seat-lock:" + flightInstanceId + ":" + seat.toUpperCase();
            String status = redisTemplate.opsForValue().get(key);
            lockStatus.put(seat.toUpperCase(), status != null ? status : "AVAILABLE");
        }
        return lockStatus;
    }
}
