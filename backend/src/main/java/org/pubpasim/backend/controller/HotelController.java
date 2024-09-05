package org.pubpasim.backend.controller;

import java.util.List;
import java.util.Optional;

import org.pubpasim.backend.model.Hotel;
import org.pubpasim.backend.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public HotelController(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    @GetMapping
    public List<Hotel> getAllRooms() {
        return hotelRepository.findAll();
    }

    @GetMapping("{id}")
    public Optional<Hotel> getHotelById(@PathVariable Long id) {
        return hotelRepository.findById(id);
    }

    @PostMapping
    public Hotel addNewHotel(@RequestBody Hotel hotel) {
        return hotelRepository.save(hotel);
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
                    return hotelRepository.save(hotel);
                })
                .orElseThrow(() -> new RuntimeException("Hotel tidak ditemukan dengan ID = " + id));
    }

    @DeleteMapping("{id}")
    public void deleteHotel(@PathVariable Long id) {
        hotelRepository.deleteById(id);
    }
}
