package org.pubpasim.backend.repository;

import java.util.List;
import java.util.Optional;

import org.pubpasim.backend.model.Booking;
import org.pubpasim.backend.model.Customer;
import org.pubpasim.backend.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepositoy extends JpaRepository<Booking, String>{
    
    List<Booking> findByCustomerId(Customer customer);
    List<Booking> findByHotelId(Hotel hotel);
    List<Booking> findByHotelId(Optional <Hotel> hotel);
    Booking findFirstByOrderByIdDesc();
}
