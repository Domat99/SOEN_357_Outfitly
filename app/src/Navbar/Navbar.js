import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { MenuData } from "./MenuData";
import "./NavbarStyles.css";
import logo from "../assets/images/OutfitlyLogo.png";

class Navbar extends Component {
    state = { clicked: false };

    handleClick = () => this.setState({ clicked: !this.state.clicked });
    handlePageOpened = () => this.setState({ clicked: false });

    render() {
        return (
            <nav className="NavbarItems">
                <Link to="/" className="pageName">
                    <img className="logo" src={logo} alt="Outfitly Logo" />
                </Link>
                <div className="menuIcones" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <ul className={this.state.clicked ? "navMenu active" : "navMenu"}>
                    {MenuData.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.url}
                                className={({ isActive }) =>
                                    isActive ? "navlinks active" : "navlinks"
                                }
                                onClick={this.handlePageOpened}
                                end
                            >
                                <i className={item.icon}></i> {item.title}
                            </NavLink>
                        </li>
                    ))}

                    {this.props.loggedInUser ? (
                        <li>
                            <Link
                                onClick={this.props.handleLogout}
                                className="navLogOut"
                                to="/"
                            >
                                Sign Out
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login" className="navLogIn">
                                Log In
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        );
    }
}

export default Navbar;