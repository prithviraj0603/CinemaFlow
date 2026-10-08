package com.moviebooking.controller;

import com.moviebooking.entity.Movie;
import com.moviebooking.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ShowtimeController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/movies/{id}/showtimes")
    public String selectShowtime(@PathVariable Long id, Model model) {
        Movie movie = movieService.getMovieById(id);
        if (movie == null) {
            return "redirect:/";
        }
        model.addAttribute("movie", movie);
        // For now, we will mock the cinemas and showtimes in the template directly
        // since we didn't seed any cinemas or showtimes into the database yet
        return "pages/showtimes";
    }
}
