import React from "react";
// import "./Navbar.css";

const Navbar =(props)=> {
  {
    return (
      <nav className="navbar" style={styles.navbar}>
        <h1 className="navbar-title" style={styles.title}>My Shop</h1>
        <div className="cart-container" style={styles.cartContainer}>
          <img
            src="https://www.shutterstock.com/shutterstock/photos/2343232515/display_1500/stock-vector-shopping-cart-icon-vector-shopping-trolley-icon-shopping-cart-logo-container-for-goods-and-2343232515.jpg"
            alt="cart-icon"
            className="cart-icon" style={styles.cartIcon}
          />
          <span className="cart-badge" style={styles.cartBadge}>{props.count}</span>
        </div>
      </nav>
    );
  }
}


const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "#2d3748",
    color: "white",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  cartContainer: {
    position: "relative",
  },
  cartIcon: {
    height: "40px",
    width: "40px",
  },
  cartBadge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    backgroundColor: "red",
    color: "white",
    fontSize: "0.75rem",
    borderRadius: "50%",
    padding: "0.25rem 0.5rem",
  },
};

export default Navbar;
