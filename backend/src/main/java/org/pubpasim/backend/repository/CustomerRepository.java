package org.pubpasim.backend.repository;

import java.util.Optional;

import org.pubpasim.backend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepository extends JpaRepository<Customer, Long>{
    @Query(value = "SELECT * FROM customer ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Customer findLastUser();

    Optional<Customer> findByEmail(String email);
    
}
