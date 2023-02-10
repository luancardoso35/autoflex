package com.api.autoflextest.repositories;

import com.api.autoflextest.models.Product;
import com.api.autoflextest.models.ProductComponent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductComponentRepository extends JpaRepository<ProductComponent, UUID> {
    List<ProductComponent> findAllByProduct(Product product);
}
