import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import { db } from "./FirebaseInit";
import { collection, addDoc, onSnapshot, query, where, getDocs,doc,updateDoc,deleteDoc  } from "firebase/firestore";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      products: [],
      loading: true,
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

  // async componentDidMount() {
  //   try {
  //     onSnapshot(collection(db, "Products"), (querySnapshot) => {
  //       const products = querySnapshot.docs.map((doc) => {
  //         return { ...doc.data(), id: doc.id };
  //       });

  //       this.setState({
  //         products: products,
  //         loading: false
  //       });

  //       console.log("Products updated:", products);
  //     });
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // }
  async componentDidMount() {
    try {
      this.unsubscribe = onSnapshot(
        collection(db, "Products"),
        (querySnapshot) => {
          const products = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          this.setState({
            products: products,
            loading: false,
          });

          console.log("Products updated:", products);
        }
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe(); // Properly cleans up the listener
    }
  }

  // addProduct = async () => {
  //   try {

  //     // 🔹 Check if "Washing Machine" already exists in Firestore
  //     const productQuery = query(collection(db, "Products"), where("title", "==", "Books"));
  //     const existingProducts = await getDocs(productQuery);

  //     if (!existingProducts.empty) {
  //       console.warn("Product already exists, not adding duplicate.");
  //       return; // Exit function if product exists
  //     }

  //     // 🔹 Add new product to Firestore
  //     await addDoc(collection(db, "Products"), {
  //       price: 900,
  //       title: "Books",
  //       quantity: 1,
  //       img:'https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip'
  //     });

  //     console.log("Product added successfully!");
  //   } catch (error) {
  //     console.error("Error adding product:", error);
  //   }
  // };


  // componentDidMount() {
  //   getDocs(collection(db, "products"))
  //     .then((snapshot) => snapshot.docs) // Extract only the document snapshots
  //     .then((docs) => console.log(docs)) // Log the extracted documents
  //     .catch((error) => console.error("Error fetching products: ", error));
  // }

  // handleIncreaseQuantity = (product) => {
  //   // console.log("Increase Quantity ",product.title)
  //   const { products } = this.state;
  //   const index = products.indexOf(product);
  //   products[index].quantity += 1;

  //   this.setState({
  //     products: products,
  //   });
  // };

  handleIncreaseQuantity = async (product) => {
    try {
      // 🔹 Get document reference for the product
      const docRef = doc(db, "Products", product.id);
  
      // 🔹 Update quantity in Firestore
      await updateDoc(docRef, {
        quantity: product.quantity + 1
      });
  
      console.log(`Increased quantity of ${product.title}`);
  
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  
  // handleDecreaseQuantity = (product) => {
  //   // console.log("Increase Quantity ",product.title)
  //   const { products } = this.state;
  //   const index = products.indexOf(product);
  //   if (products[index].quantity < 1) {
  //     return;
  //   }
  //   const updatedProducts = [...products];
  //   updatedProducts[index] = {
  //     ...updatedProducts[index],
  //     quantity: updatedProducts[index].quantity - 1,
  //   };

  //   this.setState({
  //     products: updatedProducts,
  //   });
  // };
  handleDecreaseQuantity = async (product) => {
    if (product.quantity <= 1) {
      return; // Prevents quantity from going below 1
    }
  
    try {
      // 🔹 Get document reference for the product
      const docRef = doc(db, "Products", product.id);
  
      // 🔹 Update quantity in Firestore
      await updateDoc(docRef, {
        quantity: product.quantity - 1
      });
  
      console.log(`Decreased quantity of ${product.title}`);
  
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };
  
  // handleDeleteProduct = (id) => {
  //   const { products } = this.state;
  //   const items = products.filter((item) => item.id != id);
  //   this.setState({
  //     products: items,
  //   });
  // };

  handleDeleteProduct = async (id) => {
    try {
      // 🔹 Get document reference for the product
      const docRef = doc(db, "Products", id);
  
      // 🔹 Delete the document from Firestore
      await deleteDoc(docRef);
  
      console.log(`Product with ID ${id} deleted successfully`);
  
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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


// addProduct = () => {
//   addDoc(collection(db, "Products"), {
//     img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcThqgPWYUqggXNeHKKqDwyn6txVoHwhugHDyU5LfYaMNQbe3QkOmDegpPvAeWsF-5gzb50mroh13eJ2tQnv_OsxwRh1rvYc0R3aHmEH0E7SPyisNXuesjo3fGCaPEueP7atnpFp7w&usqp=CAc",
//     price: 900,
//     title: "Washing Machine",
//     quantity: 1
//   })
//     .then(() => {
//       console.log("Product added successfully!");
//     })
//     .catch((error) => {
//       console.error("Error adding product:", error);
//     });
// };

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button onClick={this.addProduct} style={{padding:20,fontSize:20}}>Add a Product</button> */}
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{ fontSize: 20, padding: 5 }}>
          Total:{this.getTotalPrice()}
        </div>
      </div>
    );
  }
}

export default App;
