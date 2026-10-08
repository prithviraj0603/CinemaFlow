package com.moviebooking.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Table(name = "cinemas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cinema {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    @Column(nullable = false)
    private String name;

    private String brand;
    private String address;
    private String imagePath;

    @ManyToMany
    @JoinTable(
        name = "cinema_formats",
        joinColumns = @JoinColumn(name = "cinema_id"),
        inverseJoinColumns = @JoinColumn(name = "format_id")
    )
    private Set<Format> formats;
}
