package org.pubpasim.backend.controller;

import java.util.List;
import java.util.Optional;

import org.pubpasim.backend.model.Booking;
import org.pubpasim.backend.model.Customer;
import org.pubpasim.backend.model.Hotel;
import org.pubpasim.backend.repository.BookingRepositoy;
import org.pubpasim.backend.repository.CustomerRepository;
import org.pubpasim.backend.repository.HotelRepository;
import org.pubpasim.backend.service.MidtransService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    HotelRepository hotelRepository;

    @Autowired
    private MidtransService midtransService;

    public BookingController(BookingRepositoy bookingRepositoy, CustomerRepository customerRepository, MidtransService midtransService, HotelRepository hotelRepository) {
        this.bookingRepositoy = bookingRepositoy;
        this.customerRepository = customerRepository;
        this.midtransService = midtransService;
        this.hotelRepository = hotelRepository;
    }

    @GetMapping
    public List<Booking> getAllBooking() {
        return bookingRepositoy.findAll();
    }

    @GetMapping("{id}")
    public Optional<Booking> getBookingById(@PathVariable String id) {
        return bookingRepositoy.findById(id);
    }

    @GetMapping("bycust/{id}")
    public List<Booking> getBookingByCustomerId(@PathVariable Long id) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer tidak ditemukan dengan ID = " + id));
        return bookingRepositoy.findByCustomerId(customer);
    }

    @GetMapping("byhotel/{id}")
    public List<Booking> getBookingByHotelId(@PathVariable Long id) {
        Hotel hotel = hotelRepository.findById(id).orElseThrow(() -> new RuntimeException("Hotel tidak ditemukan dengan ID = " + id));
        return bookingRepositoy.findByHotelId(hotel);
    }

    @GetMapping("last")
    public Booking getBookingLastIndex() {
        return bookingRepositoy.findFirstByOrderByIdDesc();
    }

    @PostMapping("add")
    public Booking addNewBooking(@RequestBody Booking booking) {
        System.out.println(booking);
        return bookingRepositoy.save(booking);
    }

    @PostMapping
    public ResponseEntity<String> createBooking(@RequestBody Booking bookingRequest) {
        try {
            // Menyimpan booking ke database
            // Booking savedBooking = bookingRepositoy.save(bookingRequest);
            Booking booking = new Booking();
            booking.setId(bookingRequest.getId());
            booking.setCustomerId(customerRepository.findById(bookingRequest.getCustomerId().getId()).get());
            booking.setHotelId(hotelRepository.findById(bookingRequest.getHotelId().getId()).get());
            booking.setCheckIn(bookingRequest.getCheckIn());
            booking.setCheckOut(bookingRequest.getCheckOut());
            booking.setNumberOfGuest(bookingRequest.getNumberOfGuest());
            booking.setNights(bookingRequest.getNights());
            booking.setTotalPrice(bookingRequest.getTotalPrice());
            // bookingRepositoy.save(booking);
            System.out.println(booking.getCustomerId().getFirstName());
            System.out.println(booking.getCustomerId().getLastName());
            System.out.println(booking.getHotelId().getName());

            // Mendapatkan Snap Token dari Midtrans
            String snapToken = midtransService.getSnapToken(booking);
            if (snapToken == null) {
                return ResponseEntity.status(500).body("Failed to generate Snap Token");
            }
            return ResponseEntity.ok(snapToken);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }


    @PutMapping("{id}")
    public Booking updateBooking(@PathVariable String id, @RequestBody Booking booking) {
        return bookingRepositoy.findById(id)
                .map(bookingData -> {
                    bookingData.setCustomerId(booking.getCustomerId());
                    bookingData.setHotelId(booking.getHotelId());
                    bookingData.setCheckIn(booking.getCheckIn());
                    bookingData.setCheckOut(booking.getCheckOut());
                    bookingData.setNumberOfGuest(booking.getNumberOfGuest());
                    bookingData.setNights(booking.getNights());
                    bookingData.setTotalPrice(booking.getTotalPrice());
                    return bookingRepositoy.save(bookingData);
                })
                .orElseThrow(() -> new RuntimeException("Booking tidak ditemukan dengan ID = " + id));
    }

    @DeleteMapping("{id}")
    public void deleteBooking(@PathVariable String id) {
        bookingRepositoy.deleteById(id);
    }
}
