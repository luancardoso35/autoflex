package com.api.autoflextest.models;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "TB_PRODUCT_COMPONENT")
public class ProductComponent {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "component_id", referencedColumnName = "id")
    private Component component;

    @Column
    private int quantity;

    public ProductComponent(UUID id, Product product, Component component, int quantity) {
        this.id = id;
        this.product = product;
        this.component = component;
        this.quantity = quantity;
    }

    public ProductComponent() {
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Component getComponent() {
        return component;
    }

    public void setComponent(Component component) {
        this.component = component;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int stockQuantity) {
        this.quantity = stockQuantity;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
