package com.api.autoflextest.dtos;

import com.api.autoflextest.models.Component;
import com.api.autoflextest.models.Product;
import jakarta.validation.constraints.NotBlank;

public class ProductComponentDTO {
    @NotBlank
    private ProductDTO product;
    @NotBlank
    private ComponentDTO component;
    @NotBlank
    private int quantity;

    public ProductComponentDTO(ProductDTO product, ComponentDTO component, int quantity) {
        this.product = product;
        this.component = component;
        this.quantity = quantity;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    public ComponentDTO getComponent() {
        return component;
    }

    public void setComponent(ComponentDTO component) {
        this.component = component;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


}
