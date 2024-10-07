package org.pubpasim.backend.controller;

import java.util.List;
import java.util.Optional;

import org.pubpasim.backend.model.Booking;
import org.pubpasim.backend.model.Hotel;
import org.pubpasim.backend.repository.BookingRepositoy;
import org.pubpasim.backend.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/hotel")
public class HotelController {
    @Autowired
    HotelRepository hotelRepository;

    @Autowired
    BookingRepositoy bookingRepositoy;

    public HotelController(HotelRepository hotelRepository, BookingRepositoy bookingRepositoy) {
        this.hotelRepository = hotelRepository;
        this.bookingRepositoy = bookingRepositoy;
    }

    @GetMapping
    public List<Hotel> getAllRooms() {
        return hotelRepository.findAll();
    }

    @GetMapping("byid/{id}")
    public Optional<Hotel> getHotelById(@PathVariable Long id) {
        return hotelRepository.findById(id);
    }

    @GetMapping("bycity/{city}")
    public List<Hotel> getHotelById(@PathVariable String city) {
        return hotelRepository.findByCity(city);
    }
    
    @GetMapping("byemail/{email}")
    public Optional<Hotel> getHotelByEmail(@PathVariable String email) {
        return hotelRepository.findByEmail(email);
    }

    @PostMapping
    public Hotel addNewHotel(@RequestBody Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    @PutMapping("update/{id}")
    public Hotel updateRoom(@PathVariable Long id, @RequestBody Hotel hotel) {
        return hotelRepository.findById(id)
                .map(hotelData -> {
                    hotelData.setRoomAvailable(hotel.getRoomAvailable() - 1);
                    return hotelRepository.save(hotelData);
                })
                .orElseThrow(() -> new RuntimeException("Hotel tidak ditemukan dengan ID = " + id));
    }

    @PutMapping("{id}")
    public Hotel updateHotel(@PathVariable Long id, @RequestBody Hotel hotelData) {
        return hotelRepository.findById(id)
                .map(hotel -> {
                    hotel.setName(hotelData.getName());
                    hotel.setType(hotelData.getType());
                    hotel.setCity(hotelData.getCity());
                    hotel.setAddress(hotelData.getAddress());
                    hotel.setPrice(hotelData.getPrice());
                    hotel.setPicture(hotelData.getPicture());
                    hotel.setDescription(hotelData.getDescription());
                    hotel.setRoomAvailable(hotelData.getRoomAvailable());
                    hotel.setEmail(hotelData.getEmail());
                    hotel.setPassword(hotelData.getPassword());
                    return hotelRepository.save(hotel);
                })
                .orElseThrow(() -> new RuntimeException("Hotel tidak ditemukan dengan ID = " + id));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteHotel(@PathVariable Long id) {
        try {
            // Mengecek apakah hotel dengan ID yang diberikan ada
            Optional<Hotel> hotel = hotelRepository.findById(id);

            if (hotel.isPresent()) {
                // Hapus semua booking terkait sebelum menghapus hotel
                List<Booking> bookings = bookingRepositoy.findByHotelId(hotel);
                if (!bookings.isEmpty()) {
                    bookingRepositoy.deleteAll(bookings); // Menghapus semua booking terkait
                }

                // Menghapus hotel jika tidak ada booking terkait atau setelah dihapus
                hotelRepository.deleteById(id);

                return ResponseEntity.ok("Hotel dengan ID " + id + " berhasil dihapus beserta booking terkait.");
            } else {
                // Mengembalikan response 404 jika hotel tidak ditemukan
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hotel dengan ID " + id + " tidak ditemukan.");
            }
        } catch (DataIntegrityViolationException e) {
            // Menangani error constraint seperti foreign key yang melarang penghapusan
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Tidak dapat menghapus hotel dengan ID " + id + " karena terkait dengan data lain.");
        } catch (Exception e) {
            // Logging untuk error tak terduga
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Terjadi kesalahan pada server saat menghapus hotel dengan ID " + id + ".");
        }
    }

}
