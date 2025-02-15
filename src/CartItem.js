import React from "react";

const CartItem =(props)=> {
   
   {
    const {price,title,quantity,img} = props.product
    const{product,onIncreaseQuantity,onDecreaseQuantity,onDeleteProduct}=props
    return (
      <div className="cart-item">
        <div className="left-block">
          <img style={Styles.image} src={product.img}/>
        </div>
        <div className="right-block">
          <div style={{ fontSize: 25 }}>{title}</div>
          <div style={{ color: "#777" }}>Qnty:{quantity}</div>
          <div style={{ color: "#777" }}>Rs:{price}</div>

          <div className="cart-item-actions">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3303/3303893.png"
            alt="increase"
            className="actions-icons"
            onClick={()=>onIncreaseQuantity(product)}
          />
          <img
            src="https://cdn-icons-png.flaticon.com/128/1828/1828906.png"
            alt="decrease"
            className="actions-icons"
            onClick={()=>onDecreaseQuantity(product)}
          />
          <img
            src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
            alt="delete"
            className="actions-icons"
            onClick={()=>onDeleteProduct(product.id)}
          />
        </div>
        </div>
        
      </div>
    );
  }
}

const Styles = {
  image: {
    height: 110,
    width: 110,
    borderRadius: 4,
    backgroundColor: "#ccc",
  },
};
export default CartItem;
