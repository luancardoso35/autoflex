package com.api.autoflextest.dtos;

import com.api.autoflextest.models.Product;
import jakarta.validation.constraints.NotBlank;

public class OrderedProductsDTO {
    @NotBlank
    private Product product;
    @NotBlank
    private int quantity;

    public OrderedProductsDTO(Product product, int quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
