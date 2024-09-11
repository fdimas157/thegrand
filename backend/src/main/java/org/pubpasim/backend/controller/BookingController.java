package org.pubpasim.backend.controller;

import java.util.List;
import java.util.Optional;

import org.pubpasim.backend.model.Booking;
import org.pubpasim.backend.repository.BookingRepositoy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/booking")
public class BookingController {
    @Autowired
    BookingRepositoy bookingRepositoy;

    public BookingController(BookingRepositoy bookingRepositoy) {
        this.bookingRepositoy = bookingRepositoy;
    }

    @GetMapping
    public List<Booking> getAllBooking() {
        return bookingRepositoy.findAll();
    }

    @GetMapping("{id}")
    public Optional<Booking> getBookingById(@PathVariable Long id) {
        return bookingRepositoy.findById(id);
    }

    @PostMapping
    public Booking addNewBooking(@RequestBody Booking booking) {
        return bookingRepositoy.save(booking);
    }

    @PutMapping("{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody Booking booking) {
        return bookingRepositoy.findById(id)
                .map(bookingData -> {
                    bookingData.setCustomerId(booking.getCustomerId());
                    bookingData.setHotelId(booking.getHotelId());
                    bookingData.setCheckIn(booking.getCheckIn());
                    bookingData.setCheckOut(booking.getCheckOut());
                    bookingData.setNumberOfGuest(booking.getNumberOfGuest());
                    bookingData.setTotalPrice(booking.getTotalPrice());
                    return bookingRepositoy.save(bookingData);
                })
                .orElseThrow(() -> new RuntimeException("Booking tidak ditemukan dengan ID = " + id));
    }

    @DeleteMapping("{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingRepositoy.deleteById(id);
    }
}
