
import ProductTable from "../components/ProductTable";
import AdminNavbar from "../components/AdminNavbar";

function AdminDashboard(){
    return(
        <div className="row">
            <container className="vh-100 col-2">
                <AdminNavbar />
            </container>
            <container className="vh-100 col overflow-auto m-3">
                <h1>Admin Dashboard</h1>
                <ProductTable/>
            </container>
        </div>
    )
}

export default AdminDashboard;