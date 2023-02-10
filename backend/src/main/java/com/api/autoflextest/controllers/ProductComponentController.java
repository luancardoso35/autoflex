package com.api.autoflextest.controllers;

import com.api.autoflextest.dtos.OrderedProductsDTO;
import com.api.autoflextest.dtos.ProductComponentDTO;
import com.api.autoflextest.dtos.ProductComponentAssociationDTO;
import com.api.autoflextest.dtos.ProductsAndTotalValueDTO;
import com.api.autoflextest.models.Component;
import com.api.autoflextest.models.Product;
import com.api.autoflextest.models.ProductComponent;
import com.api.autoflextest.services.ComponentService;
import com.api.autoflextest.services.ProductComponentService;
import com.api.autoflextest.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/component-product")
public class ProductComponentController {

    private ProductComponentService productComponentService;
    private ProductService productService;
    private ComponentService componentService;

    public ProductComponentController(ProductComponentService productComponentService, ProductService productService, ComponentService componentService) {
        this.productComponentService = productComponentService;
        this.productService = productService;
        this.componentService = componentService;
    }

    @PostMapping
    public ResponseEntity<Object> saveProductComponent(@RequestBody ProductComponentAssociationDTO productComponentAssociationDTO) {

        Optional<Product> optionalProduct = productService.findById(productComponentAssociationDTO.getProductID());
        Optional<Component> optionalComponent = componentService.findById(productComponentAssociationDTO.getComponentID());

        if (optionalProduct.isEmpty() || optionalComponent.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong product or component name");
        }

        ProductComponent productComponent = new ProductComponent();
        productComponent.setComponent(optionalComponent.get());
        productComponent.setProduct(optionalProduct.get());
        productComponent.setQuantity(productComponentAssociationDTO.getQuantity());

        return ResponseEntity.status(HttpStatus.CREATED).body(productComponentService.saveProductComponent(productComponent));
    }

    @GetMapping
    public ResponseEntity<List<ProductComponent>> getAllProductComponents() {
        return ResponseEntity.status(HttpStatus.OK).body(productComponentService.getAllProductComponents());
    }

    @GetMapping("{id}")
    public ResponseEntity<Object> getProductComponent(@PathVariable(value = "id") UUID id) {
        Optional<ProductComponent> optionalProductComponent = productComponentService.findById(id);
        if (optionalProductComponent.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This product doesn't exist");
        }

        return ResponseEntity.status(HttpStatus.OK).body(optionalProductComponent.get());
    }

    @PutMapping("{id}") ResponseEntity<Object> editProductComponent(@PathVariable (value = "id") UUID id,
                                                                       @RequestBody ProductComponentDTO productComponentDTO) {
        Optional<ProductComponent> optionalProductComponent = productComponentService.findById(id);

        if (optionalProductComponent.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong ID");
        }

        var product = new Product();
        product.setValue(productComponentDTO.getProduct().getValue());
        product.setName(productComponentDTO.getProduct().getName());
        product.setId(optionalProductComponent.get().getProduct().getId());

        var component = new Component();
        component.setId(optionalProductComponent.get().getComponent().getId());
        component.setStockQuantity(productComponentDTO.getComponent().getStockQuantity());
        component.setName(productComponentDTO.getComponent().getName());

        var productComponent = new ProductComponent(id, product, component, productComponentDTO.getQuantity());

        return ResponseEntity.status(HttpStatus.OK).body(productComponentService.saveProductComponent(productComponent));
    }

    @DeleteMapping("/{id}") ResponseEntity<Object> deleteProductComponent(@PathVariable (value = "id") UUID id) {
        Optional<ProductComponent> optionalProductComponent = productComponentService.findById(id);

        if (optionalProductComponent.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong ID");
        }

        productComponentService.deleteProductComponent(optionalProductComponent.get());
        return ResponseEntity.status(HttpStatus.OK).body("Deleted succesfully");
    }

    @GetMapping("/order")
    public ResponseEntity<Object> getAllProductsOrderedByValue() {
        List<OrderedProductsDTO> mappedPossibilities = new ArrayList<>();
        List<Product> productList = productService.getAllProductsOrderedByValue();
        int productQuantity;
        double totalValue = 0;

        for (Product product: productList) {
            List<ProductComponent> productComponentList = productComponentService.getAllProductComponentsByProduct(product);

            if (productComponentList.size() == 0) {
                mappedPossibilities.add(new OrderedProductsDTO(product, 0));
                continue;
            }

            productQuantity = -1;

            for (ProductComponent componentOfProduct : productComponentList) {
                if (componentOfProduct.getQuantity() > componentOfProduct.getComponent().getStockQuantity()) {
                    break;
                } else {
                    int auxQuantity = componentOfProduct.getComponent().getStockQuantity() / componentOfProduct.getQuantity();

                    if (auxQuantity < productQuantity || productQuantity == -1) {
                        productQuantity = auxQuantity;
                    }
                }
            }

            if (productQuantity == -1) {
                productQuantity = 0;
            }

            totalValue += productQuantity * product.getValue();

            mappedPossibilities.add(new OrderedProductsDTO(product, productQuantity));
        }



        ProductsAndTotalValueDTO productsAndTotalValueDTO = new ProductsAndTotalValueDTO(mappedPossibilities, totalValue);

        return ResponseEntity.status(HttpStatus.OK).body(productsAndTotalValueDTO);
    }
}
