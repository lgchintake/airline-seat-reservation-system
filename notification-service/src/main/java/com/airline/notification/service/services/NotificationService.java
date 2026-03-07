package com.airline.notification.service.services;

import com.airline.notification.service.entity.Notification;
import com.airline.notification.service.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    /**
     * Retrieves all notifications.
     *
     * @return a list of all notifications
     */
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    /**
     * Retrieves a notification by its ID.
     *
     * @param id the ID of the notification to retrieve
     * @return an Optional containing the notification if found, or empty if not
     */
    public Optional<Notification> getNotificationById(Long id) {
        return notificationRepository.findById(id);
    }

    /**
     * Saves a new notification or updates an existing one.
     *
     * @param notification the notification to save
     * @return the saved notification
     */
    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    /**
     * Deletes a notification by its ID.
     *
     * @param id the ID of the notification to delete
     */
    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
}