package org.pubpasim.backend.repository;

import org.pubpasim.backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepositoy extends JpaRepository<Booking, Long>{
    
}
