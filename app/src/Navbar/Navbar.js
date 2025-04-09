import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MenuData } from "./MenuData";
import "./NavbarStyles.css";

class Navbar extends Component {
    state = { clicked: false };

    handleClick = () => this.setState({ clicked: !this.state.clicked });
    handlePageOpened = () => this.setState({ clicked: false });

    render() {
        return (
            <nav className="NavbarItems">
                <Link to="/" className="pageName">
                    <img className="logo" src="/" alt="Outfitly Logo" />
                </Link>
                <div className="menuIcones" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <ul className={this.state.clicked ? "navMenu active" : "navMenu"}>
                    {MenuData.map((item, index) => (
                        <li key={index}>
                            <Link to={item.url} className={item.cName} onClick={this.handlePageOpened}>
                                <i className={item.icon}></i> {item.title}
                            </Link>
                        </li>
                    ))}
                    <li>
                        {this.props.isLoggedIn ? (
                            <Link onClick={this.props.handleLogout} className="navLogOut" to="/">
                                Sign Out
                            </Link>
                        ) : (
                            <Link to="/login" className="navLogIn">Log In</Link>
                        )}
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;
