import { HTMLInputTypeAttribute, useEffect, useState } from "react"
import axios, { all } from "axios"
import "../styles/ProductsPage.css"
import "../styles/global.css"

interface Product {
    id: string,
    name: string,
    value: number
}

interface ProductsAndQuantity {
    product: Product,
    quantity: number
}

export function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]) 
    const [productsAndQuantities, setProductsAndQuantities] = useState<ProductsAndQuantity[]>([]) 
    const [selectedOption, setSelectedOption] = useState<string>("findAll")
    const [productName, setProductName] = useState<string>("")
    const [productValue, setProductValue] = useState<number>(0);
    const [productID, setProductID] = useState<string>("");
    const [errorID, setErrorID] = useState<boolean>(false)
    const [allFieldsError, setAllFieldsError] = useState<boolean>(false);
    const [componentToAssociateID, setComponentToAssociateID] = useState<string>("")
    const [componentQuantity, setComponentQuantity] = useState<number>(0)
    const [newProductToEdit, setNewProductToEdit] = useState<Product>({
        id: "",
        name: "",
        value: 0
    }) 

    useEffect(() => {
        
            async function getAllProducts() {
                try {
                    const response = await axios.get("http://localhost:8080/products", {
                        headers: {'Content-Type': "application/json"}
                    })
                    return response.data
                } catch(err) {
                    console.log(err);
                }
            }

            if (selectedOption === "findAll") {
                getAllProducts().then(response => setProducts(response))
            }
    }, [selectedOption])

    useEffect(() => { 
        async function getOrderedProducts() {
            try {
                const response = await axios.get("http://localhost:8080/component-product/order")
                return response.data
            } catch(err) {
                console.log(err);
            }
            
        
        }

        if (selectedOption === "order") {

            getOrderedProducts().then(response => {
                console.log(response)
                setProductsAndQuantities(response)
            })
        }
    }, [selectedOption])

    const registerNewProduct = async() => {
        try {
            const response = await axios.post("http://localhost:8080/products", {
                name: productName,
                value: productValue,
            })
            return response.data
        } catch(err) {
            console.log(err);
        }
    }

    const deleteProduct = async(event: React.FormEvent<HTMLFormElement>) => {
        setErrorID(false)
        setAllFieldsError(false)
        event.preventDefault()
        if (!productID) {
            setErrorID(true)
            return
        }

        try {
            await axios.get(`http://localhost:8080/products/${productID}`)

            try {
                await axios.delete(`http://localhost:8080/products/${productID}`)
                window.location.reload();
            } catch(err) {
                return
            }
        } catch(err) {
            setErrorID(true)
            return
        }

        
    }

    const editProduct = async(event: React.FormEvent<HTMLFormElement>) => {
        setErrorID(false)
        event.preventDefault()
        setAllFieldsError(false)
        if (!newProductToEdit.id || !newProductToEdit.name || !newProductToEdit.value) {
            setAllFieldsError(true)
            return
        }


        try {
            await axios.get(`http://localhost:8080/products/${newProductToEdit.id}`)

            try {
                await axios.put(`http://localhost:8080/products/${newProductToEdit.id}`, {
                    name: newProductToEdit.name,
                    value: newProductToEdit.value
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

    
    

    return (
        <div id="container">
            <h1>Products page</h1>

            <div>
                <a href="/">Initial Page</a>
                <a href="/products">Products Page</a>
                <a href="/components">Components Page</a>
                <a href="/component-product">Products and Components Page</a>
            </div>
            
            <h2>Select an option: </h2>


            <select id="select" onChange={(event) => {
                setSelectedOption(event.target.value)
            }} value={selectedOption}> 
                <option value="findAll">Show all products</option>
                <option value="save">Register new product</option>
                <option value="delete">Delete product</option>
                <option value="edit">Edit product</option>
                <option value="order">Show how many products can be made</option>
                <option value="associate">Associate a product with a component</option>
            </select>

            {
                selectedOption === "findAll"
                &&
                <table id="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Value (USD)</th>
                        </tr>
                    </thead>
                    {products.map(product => {
                        return (
                            <tbody key={product.id}>
                                <tr>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.value}</td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            }

            {
                selectedOption === "save" 
                &&
                <form className="form inputs-container" onSubmit={registerNewProduct}>
                    <div>
                        <label>Product Name</label>
                        <input type="text" value={productName} onChange={(event) => setProductName(event.target.value)}/>
                    </div>
                    <div>
                        <label>Product value</label>
                        <input type="number" min={0} value={productValue} step="any" onChange={(event) => setProductValue(parseFloat(event.target.value))}/>
                    </div>
                    <button type="submit">Save</button>
                </form>
            }

            {
                selectedOption === "delete"
                &&
                <>
                    <form className="form" onSubmit={deleteProduct}>
                        <div className="id-container">
                            <label>Product ID</label>
                            <input type="text" onChange={(event) => setProductID(event.target.value)}/>
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
                    <form className="form inputs-container" onSubmit={editProduct}>
                        <div className="id-container">
                            <label>Product ID</label>
                            <input type="text" onChange={(event) => 
                            {
                                setNewProductToEdit({
                                    id: event.target.value,
                                    name: newProductToEdit.name,
                                    value: newProductToEdit.value
                                })
                            }}/>
                        </div>

                        <div className="id-container">
                            <label>Product name</label>
                            <input type="text" onChange={(event) => 
                            {
                                setNewProductToEdit({
                                    id: newProductToEdit.id,
                                    name: event.target.value,
                                    value: newProductToEdit.value
                                })
                            }}/>
                        </div>

                        <div className="id-container">
                            <label>Product value</label>
                            <input min={0} type="number" step="any" onChange={(event) => 
                            {
                                setNewProductToEdit({
                                    id: newProductToEdit.id,
                                    name: newProductToEdit.name,
                                    value: parseFloat(event.target.value)
                                })
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

            
        </div>
    )
}