import { HTMLInputTypeAttribute, useEffect, useState } from "react"
import axios, { all } from "axios"
import "../styles/global.css"

interface Component {
    id: string,
    name: string,
    stockQuantity: number
}

export function ComponentsPage() {
    const [components, setComponents] = useState<Component[]>([]) 
    const [selectedOption, setSelectedOption] = useState<string>("findAll")
    const [componentName, setComponentName] = useState<string>("")
    const [componentStockQuantity, setComponentStockQuantity] = useState<number>(0);
    const [componentID, setComponentID] = useState<string>("");
    const [errorID, setErrorID] = useState<boolean>(false)
    const [allFieldsError, setAllFieldsError] = useState<boolean>(false);
    const [newComponentToEdit, setNewComponentToEdit] = useState<Component>({
        id: "",
        name: "",
        stockQuantity: 0
    }) 

    useEffect(() => {
        if (selectedOption === "findAll") {
            async function getAllComponents() {
                try {
                    const response = await axios.get("http://localhost:8080/components", {
                        headers: {'Content-Type': "application/json"}
                    })
                    return response.data
                } catch(err) {
                    console.log(err);
                }
            }

            getAllComponents().then(response => setComponents(response))
        }
    }, [selectedOption])

    const registerNewComponent = async() => {
        try {
            const response = await axios.post("http://localhost:8080/components", {
                name: componentName,
                stockQuantity: componentStockQuantity,
            })
            return response.data
        } catch(err) {
            console.log(err);
        }
    }

    const deleteComponent = async(event: React.FormEvent<HTMLFormElement>) => {
        setErrorID(false)
        setAllFieldsError(false)
        event.preventDefault()
        if (!componentID) {
            setErrorID(true)
            return
        }

        try {
            await axios.get(`http://localhost:8080/products/${componentID}`)

            try {
                await axios.delete(`http://localhost:8080/products/${componentID}`)
                window.location.reload();
            } catch(err) {
                return
            }
        } catch(err) {
            setErrorID(true)
            return
        }

        
    }

    const editComponent = async(event: React.FormEvent<HTMLFormElement>) => {
        setErrorID(false)
        setAllFieldsError(false)
        event.preventDefault()
        if (!newComponentToEdit.id || !newComponentToEdit.name || !newComponentToEdit.stockQuantity) {
            setAllFieldsError(true)
            return
        }


        try {
            await axios.get(`http://localhost:8080/components/${newComponentToEdit.id}`)

            try {
                await axios.put(`http://localhost:8080/components/${newComponentToEdit.id}`, {
                    name: newComponentToEdit.name,
                    value: newComponentToEdit.stockQuantity
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
            <h1>Components page</h1>

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
                <option value="findAll">Show all components</option>
                <option value="save">Register new component</option>
                <option value="delete">Delete component</option>
                <option value="edit">Edit component</option>
            </select>

            {
                selectedOption === "findAll"
                &&
                <table id="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Stock Quantity</th>
                        </tr>
                    </thead>
                    {components.map(component => {
                        return (
                            <tbody key={component.id}>
                                <tr>
                                    <td>{component.id}</td>
                                    <td>{component.name}</td>
                                    <td>{component.stockQuantity}</td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            }

            {
                selectedOption === "save" 
                &&
                <form className="form inputs-container" onSubmit={registerNewComponent}>
                    <div>
                        <label>Component name</label>
                        <input type="text" value={componentName} onChange={(event) => setComponentName(event.target.value)}/>
                    </div>
                    <div>
                        <label>Component stock quantity</label>
                        <input min={0} type="number" value={componentStockQuantity} step="any" onChange={(event) => setComponentStockQuantity(parseInt(event.target.value))}/>
                    </div>
                    <button type="submit">Save</button>
                </form>
            }

            {
                selectedOption === "delete"
                &&
                <>
                    <form className="form" onSubmit={deleteComponent}>
                        <div className="id-container">
                            <label>Component ID</label>
                            <input type="text" value={componentID} onChange={(event) => setComponentID(event.target.value)}/>
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
                    <form className="form inputs-container" onSubmit={editComponent}>
                        <div className="id-container">
                            <label>Component ID</label>
                            <input type="text" onChange={(event) => 
                            {
                                setNewComponentToEdit({
                                    id: event.target.value,
                                    name: newComponentToEdit.name,
                                    stockQuantity: newComponentToEdit.stockQuantity
                                })
                            }}/>
                        </div>

                        <div className="id-container">
                            <label>Component name</label>
                            <input type="text" onChange={(event) => 
                            {
                                setNewComponentToEdit({
                                    id: newComponentToEdit.id,
                                    name: event.target.value,
                                    stockQuantity: newComponentToEdit.stockQuantity
                                })
                            }}/>
                        </div>

                        <div className="id-container">
                            <label>Component value</label>
                            <input type="number"  min={0} step="any" onChange={(event) => 
                            {
                                setNewComponentToEdit({
                                    id: newComponentToEdit.id,
                                    name: newComponentToEdit.name,
                                    stockQuantity: parseInt(event.target.value)
                                })
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