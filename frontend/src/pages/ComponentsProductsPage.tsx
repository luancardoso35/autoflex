import { HTMLInputTypeAttribute, useEffect, useState } from "react"
import axios, { all } from "axios"
import "../styles/ProductsPage.css"
import "../styles/global.css"

interface Product {
    id?: string,
    name: string,
    value: number
}

interface Component {
    id?: string,
    name: string,
    stockQuantity: number
}

interface ProductsAndQuantity {
    product: Product,
    quantity: number
}

interface ProductComponent {
    id: string,
    product: Product,
    component: Component,
    quantity: number
}

export function ComponentsProductsPage() {
    const [productsComponents, setProductsComponents] = useState<ProductComponent[]>([])
    const [selectedOption, setSelectedOption] = useState<string>("findAll")
    const [productsAndQuantities, setProductsAndQuantities] = useState<ProductsAndQuantity[]>([]) 
    const [errorID, setErrorID] = useState<boolean>(false)
    const [allFieldsError, setAllFieldsError] = useState<boolean>(false);
    const [productID, setProductID] = useState<string>("");
    const [productComponentID, setProductComponentID] = useState<string>("")
    const [componentToAssociateID, setComponentToAssociateID] = useState<string>("")
    const [componentQuantity, setComponentQuantity] = useState<number>(0)
    const [productCmponentToEdit, setProductComponentToEdit] = useState<ProductComponent>({
        id: "",
        product: {
            name: "",
            value: 0
        },
        component: {
            name: "",
            stockQuantity: 0
        },
        quantity: 0
    })


    useEffect(() => {
        
            async function getAllProductsComponents() {
                try {
                    const response = await axios.get("http://localhost:8080/component-product", {
                        headers: {'Content-Type': "application/json"}
                    })
                    return response.data
                } catch(err) {
                    console.log(err);
                }
            }

            if (selectedOption === "findAll") {

                getAllProductsComponents().then(response => setProductsComponents(response))
            }
    }, [selectedOption])

    const deleteAssociation = async(event: React.FormEvent<HTMLFormElement>) => {
        setErrorID(false)
        setAllFieldsError(false)
        event.preventDefault()
        if (!productComponentID) {
            setErrorID(true)
            return
        }

        try {
            await axios.get(`http://localhost:8080/component-product/${productComponentID}`)

            try {
                await axios.delete(`http://localhost:8080/component-product/${productComponentID}`)
                window.location.reload();
            } catch(err) {
                return
            }
        } catch(err) {
            console.log(err)
            setErrorID(true)
            return
        }

        
    }

    const editProductComponent = async(event: React.FormEvent<HTMLFormElement>) => {
        setErrorID(false)
        event.preventDefault()
        setAllFieldsError(false)
        if (!productCmponentToEdit.quantity || !productCmponentToEdit.id) {
            setAllFieldsError(true)
            return
        }


        try {
            await axios.get(`http://localhost:8080/component-product/${productCmponentToEdit.id}`)

            try {


                await axios.put(`http://localhost:8080/component-product/${productCmponentToEdit.id}`, {
                    product: productCmponentToEdit.product,
                    component: productCmponentToEdit.component,
                    quantity: productCmponentToEdit.quantity
                })

                window.location.reload()
            } catch(err) {
                console.log(err)
                return
            }
        } catch(err) {
            console.log(err)
            setErrorID(true)
            return
        }
       
    }

    const associateProductComponent = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setErrorID(false)
        setAllFieldsError(false)
        
        try {
            await axios.get(`http://localhost:8080/products/${productID}`)
            await axios.get(`http://localhost:8080/components/${componentToAssociateID}`)

            try {
                await axios.post("http://localhost:8080/component-product", {
                    productID,
                    componentID: componentToAssociateID,
                    quantity: componentQuantity
                })
                window.location.reload()
            } catch (err) {
                console.log(err)
            }
            
        } catch (err) {
            console.log(err)
            setErrorID(true)
            return
        }

    }
    

    return (
        <div id="container">
            <h1>Products page</h1>

            <div>
                <a href="/">Initial Page</a>
                <span>|</span>
                <a href="/products">Products Page</a>
                <span>|</span>
                <a href="/components">Components Page</a>
                <span>|</span>
                <a href="/component-product">Products and Components Page</a>
            </div>
            
            <h2>Select an option: </h2>


            <select id="select" onChange={(event) => {
                setSelectedOption(event.target.value)
            }} value={selectedOption}> 
                <option value="findAll">Show all products and components association</option>
                <option value="associate">Register new association</option>
                <option value="delete">Delete association</option>
                <option value="edit">Edit quantity inside an association</option>
            </select>

            {
                selectedOption === "findAll"
                &&
                <table id="table">
                    <thead>
                        <tr>
                            <th>Product-Component (Association) ID</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Value (USD)</th>
                            <th>Component ID</th>
                            <th>Component Name</th>
                            <th>Stock Quantity</th>
                            <th>Quantity Needed</th>
                        </tr>
                    </thead>
                    {productsComponents.map(productComponent => {
                        return (
                            <tbody key={productComponent.id}>
                                <tr>
                                    <td>{productComponent.id}</td>
                                    <td>{productComponent.product.id}</td>
                                    <td>{productComponent.product.name}</td>
                                    <td>{productComponent.product.value}</td>
                                    <td>{productComponent.component.id}</td>
                                    <td>{productComponent.component.name}</td>
                                    <td>{productComponent.component.stockQuantity}</td>
                                    <td>{productComponent.quantity}</td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            }

            {
                selectedOption === "delete"
                &&
                <>
                    <form className="form" onSubmit={deleteAssociation}>
                        <div className="id-container">
                            <label>Product-Component ID</label>
                            <input type="text" onChange={(event) => setProductComponentID(event.target.value)}/>
                        </div>
                        

                        <button type="submit">Delete</button>
                    </form>

                    {errorID && <p>Please insert an valid ID</p>}
                    
                </>
            }

            {
                selectedOption === "edit"
                &&
                <>
                    <form className="form inputs-container" onSubmit={editProductComponent}>
                        <div className="id-container">
                            <label>Product-Component ID</label>
                            <input type="text" onChange={(event) => 
                            {
                                setProductComponentToEdit({
                                    ...productCmponentToEdit,
                                    id: event.target.value,
                                })
                            }}/>
                        </div>

                        <div className="id-container">
                            <label>Quantity</label>
                            <input type="text" onChange={(event) => 
                            {
                                setProductComponentToEdit(
                                    {
                                        ...productCmponentToEdit,
                                        quantity: parseInt(event.target.value)
                                    }
                                )
                            }}/>
                        </div>

                        
                        

                        <button type="submit">Change</button>
                    </form>

                    {allFieldsError && <p>Please fill all the fields</p>}

                    {errorID && <p>Please inform an valid ID</p>}
                    
                </>
            }
            {
                selectedOption === "order"
                &&
                !!productsAndQuantities
                &&
                productsAndQuantities.length > 0
                &&
                <table id="table">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Value (USD)</th>
                        <th>Quantity that can be made</th>
                    </tr>
                    {productsAndQuantities.map((product: ProductsAndQuantity) => {
                        return (
                            <tr>
                                <td>{product.product.id}</td>
                                <td>{product.product.name}</td>
                                <td>{product.product.value}</td>
                                <td>{product.quantity}</td>
                            </tr>
                        )
                    })}
                </table>
            }

            {
                selectedOption === "associate"
                &&
                <>
                    <form className="form inputs-container" onSubmit={associateProductComponent}>
                        <div className="id-container">
                            <label>Product ID</label>
                            <input type="text" onChange={(event) => 
                            {
                                setProductID(event.target.value)
                            }}/>
                        </div>

                        <div className="id-container">
                            <label>Component ID</label>
                            <input type="text" onChange={(event) => 
                            {
                                setComponentToAssociateID(event.target.value)
                            }}/>
                        </div>

                        <div className="id-container">
                            <label>Quantity</label>
                            <input min={0} type="number" step="any" onChange={(event) => 
                            {
                                setComponentQuantity(parseInt(event.target.value))
                            }}/>
                        </div>
                        

                        <button type="submit">Change</button>
                    </form>

                    {allFieldsError && <p>Please fill all the fields</p>}

                    {errorID && <p>Please inform an valid ID</p>}
                </>
            }
        </div>
    )
}