package com.api.autoflextest.controllers;

import com.api.autoflextest.dtos.ComponentDTO;
import com.api.autoflextest.models.Component;
import com.api.autoflextest.services.ComponentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/components")
public class ComponentController {
    final ComponentService componentService;

    public ComponentController(ComponentService componentService) {
        this.componentService = componentService;
    }

    @PostMapping
    public ResponseEntity<Object> saveComponent(@RequestBody ComponentDTO componentDTO) {
        if (componentService.existsByName(componentDTO.getName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Component with the same name already registered");
        }

        var component = new Component();
        component.setName(componentDTO.getName());
        component.setStockQuantity(componentDTO.getStockQuantity());
        return ResponseEntity.status(HttpStatus.CREATED).body(componentService.save(component));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateComponent(@PathVariable(value = "id") UUID id,
                                                  @RequestBody Component componentDTO) {
        Optional<Component> optionalComponent = componentService.findById(id);
        if (optionalComponent.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This component doesn't exist");
        }

        System.out.println(componentDTO);

        var updatedComponent = new Component();
        updatedComponent.setName(componentDTO.getName());
        updatedComponent.setStockQuantity(componentDTO.getStockQuantity());
        updatedComponent.setId(optionalComponent.get().getId());

        return ResponseEntity.status(HttpStatus.OK).body(componentService.save(updatedComponent));
    }

    @GetMapping
    public ResponseEntity<Object> getAllComponents() {
        return ResponseEntity.status(HttpStatus.OK).body(componentService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getComponent(@PathVariable(value = "id") UUID id) {
        Optional<Component> optionalComponent = componentService.findById(id);
        if (optionalComponent.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This component doesn't exist");
        }

        return ResponseEntity.status(HttpStatus.OK).body(optionalComponent.get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteComponent(@PathVariable(value = "id") UUID id) {
        Optional<Component> optionalComponent = componentService.findById(id);
        if (optionalComponent.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This component doesn't exist");
        }

        componentService.delete(optionalComponent.get());
        return ResponseEntity.status(HttpStatus.OK).body("Deleted succesfully");

    }
}
