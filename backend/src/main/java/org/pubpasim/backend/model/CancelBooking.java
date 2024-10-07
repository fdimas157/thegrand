// package org.pubpasim.backend.model;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import lombok.Getter;
// import lombok.Setter;

// @Entity
// @Getter
// @Setter
// public class CancelBooking {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @ManyToOne
//     @JoinColumn(name = "booking_id", referencedColumnName = "id")
//     private Booking bookingId;

//     @ManyToOne
//     @JoinColumn(name = "customer_id", referencedColumnName = "id")
//     private Customer customerId;
// }
