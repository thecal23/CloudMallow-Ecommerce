import React , {useEffect} from 'react'
import AdminNav2 from '../components/AdminNav2'
import ProductTable from '../components/ProductTable'

function Products() {
    const checkForAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:4000/admin", {
                mode: 'cors',
                credentials: 'include'
            })
            const data = await response.json()
            console.log(data)
            
            if (data.url === "http://localhost:3000/admin/login") {
                window.location.href = data.url
            }
            
            return;

        } catch (error) {
            console.log("Error: " , error)
        }
    }

    useEffect(() => {
        checkForAuthentication();
    }, []);

    return (
        <>
            <div><AdminNav2 /></div>
            <div className="container mt-5">
                <ProductTable />
            </div>
        </>
    )
}

export default Products