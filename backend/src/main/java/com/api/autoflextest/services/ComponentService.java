package com.api.autoflextest.services;

import com.api.autoflextest.models.Component;
import com.api.autoflextest.models.Product;
import com.api.autoflextest.repositories.ComponentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ComponentService {

    final ComponentRepository componentRepository;

    public ComponentService(ComponentRepository componentRepository) {
        this.componentRepository = componentRepository;
    }

    public List<Component> findAll() {
        return componentRepository.findAll();
    }

    public Optional<Component> findById(UUID id) {
        return componentRepository.findById(id);
    }

    public boolean existsByName(String name) {
        return componentRepository.existsByName(name);
    }

    public void delete(Component component) {
        componentRepository.delete(component);
    }

    public Component save(Component component) {
        return componentRepository.save(component);
    }

    public Optional<Component> findByName(String name) {
        return componentRepository.findComponentByName(name);
    }
}
