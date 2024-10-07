package org.pubpasim.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String type;
    private String city;
    private String address;
    private Long price;
    private String picture;
    private String description;
    private Integer roomAvailable;
    private String email;
    private String password;

    public Hotel() {}

    public Hotel(Long id, String name, String type, String city, String address, Long price, String picture,
            String description, Integer roomAvailable, String email, String password) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.city = city;
        this.address = address;
        this.price = price;
        this.picture = picture;
        this.description = description;
        this.roomAvailable = roomAvailable;
        this.email = email;
        this.password = password;
    }
}
