package com.api.autoflextest.dtos;

import jakarta.validation.constraints.NotBlank;

public class ProductDTO {

    @NotBlank
    private String name;
    @NotBlank
    private double value;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}
