import { NavLink, Outlet } from "react-router"


const Layout = () => {
    return (
        <div>
            <nav className="d-flex  gap-3 p-3 bg-light">
                <NavLink to="/" className={({ isActive }) => isActive ? "text-primary" : ""}>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? "text-primary" : ""}>About</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? "text-primary" : ""}>Contact</NavLink>

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