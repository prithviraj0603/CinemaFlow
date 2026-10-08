package com.moviebooking.controller;

import com.moviebooking.entity.Showtime;
import com.moviebooking.service.ShowtimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/showtimes")
@CrossOrigin(origins = "*")
public class ShowtimeApiController {
    @Autowired
    private ShowtimeService showtimeService;

    @GetMapping
    public List<Showtime> getAllShowtimes() {
        return showtimeService.getAllShowtimes();
    }

    @GetMapping("/{id}")
    public Showtime getShowtimeById(@PathVariable Long id) {
        return showtimeService.getShowtimeById(id);
    }
}
