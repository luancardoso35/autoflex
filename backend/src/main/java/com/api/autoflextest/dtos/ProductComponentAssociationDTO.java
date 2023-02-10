package com.api.autoflextest.dtos;

import java.util.UUID;

public class ProductComponentAssociationDTO {

    private UUID productID;

    private UUID componentID;

    private int quantity;

    public ProductComponentAssociationDTO(UUID productID, UUID componentID, int quantity) {
        this.productID = productID;
        this.componentID = componentID;
        this.quantity = quantity;
    }

    public UUID getProductID() {
        return productID;
    }

    public void setProductID(UUID productID) {
        this.productID = productID;
    }

    public UUID getComponentID() {
        return componentID;
    }

    public void setComponentID(UUID componentID) {
        this.componentID = componentID;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
