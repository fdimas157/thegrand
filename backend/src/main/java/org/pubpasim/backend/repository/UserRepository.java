package org.pubpasim.backend.repository;
 
import org.pubpasim.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{
    
}
