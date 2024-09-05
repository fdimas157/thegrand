package org.pubpasim.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customerId;

    @ManyToOne
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Hotel hotelId;

    private String checkIn;
    private String checkOut;
    private Integer numberOfGuest;
    private Long totalPrice;

}
