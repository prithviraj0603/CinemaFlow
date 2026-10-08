package com.moviebooking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PaymentController {

    @GetMapping("/payment")
    public String paymentPage(@RequestParam(required = false, defaultValue = "280") Double amount,
            @RequestParam(required = false, defaultValue = "B4") String seats,
            Model model) {

        double convenienceFee = Math.round((amount * 0.10) * 100.0) / 100.0;
        double gst = Math.round((convenienceFee * 0.18) * 100.0) / 100.0;
        double totalPayable = Math.round((amount + convenienceFee + gst) * 100.0) / 100.0;

        model.addAttribute("amount", String.format("%.2f", amount));
        model.addAttribute("seats", seats);
        model.addAttribute("convenienceFee", String.format("%.2f", convenienceFee));
        model.addAttribute("gst", String.format("%.2f", gst));
        model.addAttribute("totalPayable", String.format("%.2f", totalPayable));

        return "pages/payment";
    }
}
