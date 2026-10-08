package com.moviebooking.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "formats")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Format {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;
}
