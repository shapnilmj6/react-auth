import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from "../../images/mybg.jpg";
import './Header.css';


const Header = () => {
    return (
        <div style={{ backgroundImage: ` url(${backgroundImage})` }} className="header">
            <nav className="nav">
                <ul>
                    <li className="top-text">
                        <h1>Travel Dude</h1>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link className="Destination" to="/destination">Destination</Link>
                    </li>
                    <li>
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link className="btn-book">Book</Link>
                    </li>
                </ul>
            </nav>
            <div className="title-container">
                <h1>Buy a ticket now!</h1>
            </div>
        </div>
    );
};

export default Header;