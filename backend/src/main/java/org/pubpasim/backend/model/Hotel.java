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

}
