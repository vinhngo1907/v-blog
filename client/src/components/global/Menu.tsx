import { useSelector } from "react-redux"
import { RootStore } from "../../utils/TypeScript"
import { Link, useLocation } from "react-router-dom";
// import { useState } from "react";

export default function Menu() {
    const { auth } = useSelector((state: RootStore) => state);
    const afLoginLinks = [
        { label: 'Home', path: '/' },
        { label: 'CreateBlog', path: '/create_blog' }
    ]
    const bfLoginLinks = [
        { label: 'Login', path: '/login' },
        { label: 'Register', path: '/register' }
    ]

    const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks;
    const { pathname } = useLocation()
    const isActive = (pn: string) => {
        if (pn === pathname) return 'active';
    }


    return (
        <ul className="navbar-nav ms-auto">
            {
                navLinks.map((link, index) => (
                    <li key={index} className={`nav-item ${isActive(link.path)}`}>
                        <Link className="nav-link" to={link.path}>{link.label}</Link>
                    </li>
                ))
            }
            {
                auth.user?.role === 'admin' &&
                <li className={`nav-item ${isActive("/category")}`}>
                    <Link to="/category" className="nav-link">Category</Link>
                </li>
            }
        </ul>
    )
}