package org.pubpasim.backend.repository;

import java.util.List;
import java.util.Optional;

import org.pubpasim.backend.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;


public interface HotelRepository extends JpaRepository<Hotel, Long>{
    Optional<Hotel> findById(Long id);
    List<Hotel> findByCity(String city);
}
