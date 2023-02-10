package com.api.autoflextest.dtos;

import jakarta.validation.constraints.NotBlank;

public class ComponentDTO {
    @NotBlank
    private String name;
    @NotBlank
    private int stockQuantity;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
}
