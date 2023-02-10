package com.api.autoflextest.repositories;

import com.api.autoflextest.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    boolean existsByName(String name);
    List<Product> findAllByOrderByValueDesc();
}
