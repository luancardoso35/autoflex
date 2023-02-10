package com.api.autoflextest.services;

import com.api.autoflextest.models.Component;
import com.api.autoflextest.models.Product;
import com.api.autoflextest.models.ProductComponent;
import com.api.autoflextest.repositories.ProductComponentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductComponentService {
    private ProductComponentRepository productComponentRepository;

    public ProductComponentService(ProductComponentRepository productComponentRepository) {
        this.productComponentRepository = productComponentRepository;
    }
    public List<ProductComponent> getAllProductComponents() {
        return productComponentRepository.findAll();
    }

    public ProductComponent saveProductComponent(ProductComponent productComponent) {
        return productComponentRepository.save(productComponent);
    }

    public Optional<ProductComponent> findById(UUID id) {
        return productComponentRepository.findById(id);
    }

    public void deleteProductComponent(ProductComponent productComponent) {
        productComponentRepository.delete(productComponent);
    }

    public ProductComponent editProductComponent(ProductComponent productComponent) {
        return productComponentRepository.save(productComponent);
    }

    public List<ProductComponent> getAllProductComponentsByProduct(Product product) {
        return productComponentRepository.findAllByProduct(product);
    }
}
