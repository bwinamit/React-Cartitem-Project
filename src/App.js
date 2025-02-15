import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
class App extends React.Component {
  constructor() {
    super();
    {
      this.state = {
        products: [
          {
            price: 8,
            title: "MobilePhone",
            quantity: 8,
            img: "https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            id: 1,
          },
          {
            price: 100,
            title: "Laptop",
            quantity: 1,
            img: "https://media.istockphoto.com/id/1251629816/photo/the-perfect-setting-to-complete-work.jpg?s=1024x1024&w=is&k=20&c=Cuut4-7KeL8wcCKIIolYt4RHe6ICMZtDSGmPbu5Y5m8=",
            id: 2,
          },
          {
            price: 50,
            title: "Book",
            quantity: 5,
            img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            id: 3,
          },
        ],
      };
    }
  }
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
  getTotalPrice =()=>{
    const {products}=this.state;
    let cartTotal=0
    products.map((product)=>{
      cartTotal+=product.quantity*product.price
    })
    return cartTotal
  }
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
        <div style={{fontSize:20,padding:5}}>Total:{this.getTotalPrice()}</div>
      </div>
    );
  }
}

export default App;
