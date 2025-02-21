import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import { db } from "./FirebaseInit";
import { collection, getDocs } from "firebase/firestore";
// import * as firestore from "firebase";

// import firebase from "firebase/app";
// import { firebase } from "./FirebaseInit";
// import "firebase/firestore";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      products: [],
    };
  }
  // componentDidMount(){
  //   db
  //   .firestore()
  //   .collection('Products')
  //   .get()
  //   .then((snapshot)=>{
  //     console.log(snapshot,"snapshot")
  //   })
  // }

  async componentDidMount() {
    try {
      const querySnapshot = await getDocs(collection(db, "Products"));

      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,

        ...doc.data(),
      }));

      console.log("products", products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // componentDidMount() {
  //   getDocs(collection(db, "products"))
  //     .then((snapshot) => snapshot.docs) // Extract only the document snapshots
  //     .then((docs) => console.log(docs)) // Log the extracted documents
  //     .catch((error) => console.error("Error fetching products: ", error));
  // }

  handleIncreaseQuantity = (product) => {
    // console.log("Increase Quantity ",product.title)
    const { products } = this.state;
    const index = products.indexOf(product);
    products[index].quantity += 1;

    this.setState({
      products: products,
    });
  };
  handleDecreaseQuantity = (product) => {
    // console.log("Increase Quantity ",product.title)
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].quantity < 1) {
      return;
    }
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      quantity: updatedProducts[index].quantity - 1,
    };

    this.setState({
      products: updatedProducts,
    });
  };
  handleDeleteProduct = (id) => {
    const { products } = this.state;
    const items = products.filter((item) => item.id != id);
    this.setState({
      products: items,
    });
  };
  getCartCount = () => {
    const { products } = this.state;

    let count = 0;
    products.forEach((product) => {
      count += product.quantity;
    });
    return count;
  };
  getTotalPrice = () => {
    const { products } = this.state;
    let cartTotal = 0;
    products.map((product) => {
      cartTotal += product.quantity * product.price;
    });
    return cartTotal;
  };
  render() {
    const { products } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <div style={{ fontSize: 20, padding: 5 }}>
          Total:{this.getTotalPrice()}
        </div>
      </div>
    );
  }
}

export default App;
