package org.pubpasim.backend.repository;
 
import java.util.Optional;

import org.pubpasim.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
