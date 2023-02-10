package com.api.autoflextest.controllers;

import com.api.autoflextest.dtos.ProductDTO;
import com.api.autoflextest.models.Product;
import com.api.autoflextest.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/products")
public class ProductController {

        final ProductService productService;

        public ProductController(ProductService productService) {
            this.productService = productService;
        }

        @PostMapping
        public ResponseEntity<Object> saveProduct(@RequestBody ProductDTO productDTO) {
            if (productService.existsByName(productDTO.getName())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Product with the same name already registered");
            }

            var product = new Product();
            product.setName(productDTO.getName());
            product.setValue(productDTO.getValue());
            return ResponseEntity.status(HttpStatus.CREATED).body(productService.save(product));
        }

        @PutMapping("/{id}")
        public ResponseEntity<Object> updateProduct(@PathVariable(value = "id") UUID id,
                                                      @RequestBody ProductDTO productDTO) {
            Optional<Product> optionalProduct = productService.findById(id);
            if (optionalProduct.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This product doesn't exist");
            }

            var updatedProduct = new Product();
            updatedProduct.setName(productDTO.getName());
            updatedProduct.setValue(productDTO.getValue());
            updatedProduct.setId(optionalProduct.get().getId());

            return ResponseEntity.status(HttpStatus.OK).body(productService.save(updatedProduct));
        }

        @GetMapping
        public ResponseEntity<Object> getAllProducts() {
            return ResponseEntity.status(HttpStatus.OK).body(productService.findAll());
        }

        @GetMapping("/{id}")
        public ResponseEntity<Object> getProduct(@PathVariable(value = "id") UUID id) {
            Optional<Product> optionalProduct = productService.findById(id);
            if (optionalProduct.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This product doesn't exist");
            }

            return ResponseEntity.status(HttpStatus.OK).body(optionalProduct.get());
        }



        @DeleteMapping("/{id}")
        public ResponseEntity<Object> deleteProduct(@PathVariable(value = "id") UUID id) {
            Optional<Product> optionalProduct = productService.findById(id);
            if (optionalProduct.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This product doesn't exist");
            }

            productService.delete(optionalProduct.get());
            return ResponseEntity.status(HttpStatus.OK).body("Deleted succesfully");

        }
}
