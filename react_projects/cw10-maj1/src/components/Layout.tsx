import { NavLink, Outlet } from "react-router"


const Layout = () => {
    return (
        <div>
            <nav className="d-flex  gap-3 p-3 bg-light">
                <NavLink to="/" className="myNav-link">Home</NavLink>
                <NavLink to="/about" className="myNav-link">About</NavLink>
                <NavLink to="/contact" className="myNav-link">Contact</NavLink>

            </nav>
            <main>
                <Outlet />
            </main>
            <footer>
                <p>&copy; 2026 My App. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Layout