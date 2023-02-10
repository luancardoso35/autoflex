package com.api.autoflextest.services;

import com.api.autoflextest.models.Product;
import com.api.autoflextest.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {
    final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Optional<Product> findById(UUID id) {
        return productRepository.findById(id);
    }

    public boolean existsByName(String name) {
        return productRepository.existsByName(name);
    }

    public void delete(Product product) {
        productRepository.delete(product);
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProductsOrderedByValue() {
        return productRepository.findAllByOrderByValueDesc();
    }
}
