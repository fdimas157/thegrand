package org.pubpasim.backend.repository;

import java.util.Optional;

import org.pubpasim.backend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long>{
    Optional<Customer> findByEmail(String email);
    
}
