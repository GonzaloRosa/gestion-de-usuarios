package com.app.gonzalo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.gonzalo.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
