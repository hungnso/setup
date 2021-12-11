import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";

import { FaSearch, FaStore, FaShoppingCart, FaChevronDown, FaRegUserCircle } from "react-icons/fa";
import { FiLogOut, FiHeart } from "react-icons/fi";
import { RiMoonClearFill, RiHistoryFill, RiAdminLine } from "react-icons/ri";

import Tooltip from "./Tooltip";

function Header() {
  const { pathname } = useLocation();
  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => ({ ...state }));

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.replace("/login");
  };

  const renderHeaderNav = () => {
    return (
      <div className="header-nav">
        <ul>
          <li className={"item"} key="dark-mode">
            <RiMoonClearFill size={30} />
            <Tooltip content="Dark" />
          </li>
          <li className={pathname === "/store" ? "item show" : "item"} key="store">
            <Link to="/store">
              <FaStore size={30} />
            </Link>
            <Tooltip content="Store" />
          </li>
          <li className={pathname === "/cart" ? "item show" : "item"} key="cart">
            <Link to="/cart">
              <FaShoppingCart size={28} />
            </Link>
            <Tooltip content="Cart" />
            <div className="item-badge">1</div>
          </li>
        </ul>
      </div>
    );
  };

  const renderLoginWrapper = () => {
    return (
      <>
        <Link data-key="login" to="/login" className="btn btn-login">
          Login
        </Link>
        <Link data-key="register" to="/register" className="btn btn-register">
          Register
        </Link>
      </>
    );
  };

  const renderDropdownMenu = () => {
    return (
      <div className="dropdown">
        <div className="dropdown-select">
          <div className="header-avatar">
            <img src={user.picture} alt="avatar" />
          </div>
          <span className="header-name">{user.name}</span>
          <FaChevronDown className="dropdown-caret" />
        </div>
        <ul className="dropdown-list">
          {user.role !== "admin" ? (
            <>
              <li className="dropdown-item">
                <Link to="/user/history" className="dropdown-text">
                  <span>View profile</span>
                  <FaRegUserCircle className="dropdown-icon" />
                </Link>
              </li>
              <li className="dropdown-item">
                <Link to="/user/wishlist" className="dropdown-text">
                  <span>Wishlist</span>
                  <FiHeart className="dropdown-icon" />
                </Link>
              </li>
              <li className="dropdown-item">
                <Link to="/user/history" className="dropdown-text">
                  <span>History</span>
                  <RiHistoryFill className="dropdown-icon" />
                </Link>
              </li>
            </>
          ) : (
            <li className="dropdown-item">
              <Link to="/admin/dashboard" className="dropdown-text">              
                <span>Dashboard</span>
                <RiAdminLine className="dropdown-icon" />
              </Link>
            </li>
          )}

          <li className="dropdown-item" onClick={logout}>
            <span className="dropdown-text">
              Logout <FiLogOut className="dropdown-icon" />
            </span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-left">
          <div className="header-logo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/ecommerce-62fba.appspot.com/o/index.svg?alt=media&token=4582b9e5-16e0-4de1-a742-e1f0da3d3d62"
              alt="logo"
            />
            <Link to="/">SetUpStore</Link>
          </div>
        </div>
        <div className="header-center">
          <form>
            <input type="text" placeholder="Type your product ..." />
            <button>
              <FaSearch size={18} />
            </button>
          </form>
        </div>
        <div className="header-right">
          {!user ? renderLoginWrapper() : renderDropdownMenu()}
          {renderHeaderNav()}
        </div>
      </div>
    </header>
  );
}
export default Header;