package com.moviebooking.service;

import com.moviebooking.entity.Showtime;
import com.moviebooking.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShowtimeService {
    @Autowired
    private ShowtimeRepository showtimeRepository;

    public List<Showtime> getAllShowtimes() {
        return showtimeRepository.findAll();
    }

    public Showtime getShowtimeById(Long id) {
        return showtimeRepository.findById(id).orElse(null);
    }
}
