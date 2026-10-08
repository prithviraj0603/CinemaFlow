package com.moviebooking.controller;

import com.moviebooking.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("movies", movieService.getAllMovies());
        return "pages/index";
    }

    @GetMapping("/discover")
    public String discover(Model model) {
        return "pages/discover";
    }
}
