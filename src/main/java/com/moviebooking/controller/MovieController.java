package com.moviebooking.controller;

import com.moviebooking.entity.Movie;
import com.moviebooking.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/movies/{id}")
    public String movieDetails(@PathVariable Long id, Model model) {
        Movie movie = movieService.getMovieById(id);
        if (movie == null) {
            return "redirect:/"; // redirect to home if not found
        }
        model.addAttribute("movie", movie);
        return "pages/movie-details";
    }
}
