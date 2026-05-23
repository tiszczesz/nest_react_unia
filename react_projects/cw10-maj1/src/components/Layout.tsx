import { NavLink, Outlet } from "react-router"


const Layout = () => {
    return (
        <div>
            <nav className="d-flex  gap-3 p-3 bg-light">
                <NavLink to="/" className="myNav-link">Home</NavLink>
                <NavLink to="/about" className="myNav-link">About</NavLink>
                <NavLink to="/contact" className="myNav-link">Contact</NavLink>
                <NavLink to="/form1" className="myNav-link">FormRef</NavLink>
                <NavLink to="/form2" className="myNav-link">FormAction</NavLink>
                <NavLink to="/products" className="myNav-link">Products</NavLink>

            </nav>
            <main className="container mt-4">
                <Outlet />
            </main>
            <footer style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                textAlign: "center",
                padding: "1rem",
                backgroundColor: "#f8f9fa",
            }}>
                <p>&copy; 2026 My App. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Layout