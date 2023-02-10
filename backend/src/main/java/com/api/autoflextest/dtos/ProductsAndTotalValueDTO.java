package com.api.autoflextest.dtos;

import java.util.ArrayList;
import java.util.List;

public class ProductsAndTotalValueDTO {
    private List<OrderedProductsDTO> mappedPossibilities = new ArrayList<>();
    private double totalValue;

    public ProductsAndTotalValueDTO(List<OrderedProductsDTO> mappedPossibilities, double totalValue) {
        this.mappedPossibilities = mappedPossibilities;
        this.totalValue = totalValue;
    }

    public List<OrderedProductsDTO> getMappedPossibilities() {
        return mappedPossibilities;
    }

    public void setMappedPossibilities(List<OrderedProductsDTO> mappedPossibilities) {
        this.mappedPossibilities = mappedPossibilities;
    }

    public double getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(double totalValue) {
        this.totalValue = totalValue;
    }
}
