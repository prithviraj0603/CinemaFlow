package com.moviebooking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class SeatPickerController {

    @GetMapping("/showtimes/{showtimeId}/seats")
    public String seatPicker(@PathVariable Long showtimeId, Model model) {
        model.addAttribute("showtimeId", showtimeId);
        // We mock the theatre layout for demonstration purposes
        return "pages/seat-picker";
    }
}
