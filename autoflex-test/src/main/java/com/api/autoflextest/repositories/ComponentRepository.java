package com.api.autoflextest.repositories;

import com.api.autoflextest.models.Component;
import com.api.autoflextest.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface ComponentRepository extends JpaRepository<Component, UUID> {
    boolean existsByName(String name);
    Optional<Component> findComponentByName(String name);
}
