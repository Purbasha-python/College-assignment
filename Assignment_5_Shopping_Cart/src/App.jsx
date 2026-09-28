import React, { createContext, useReducer, useState } from "react";
import "./styles.css";

const products = [
  { id: 1, name: "React Book", price: 500 },
  { id: 2, name: "JavaScript Book", price: 450 },
  { id: 3, name: "Laptop Bag", price: 1200 },
  { id: 4, name: "USB Keyboard", price: 800 },
];

const CartContext = createContext(null);

function reducer(state, action) {
  if (action.type === "add") {
    const existing = state.find((item) => item.id === action.p.id);

    return existing
      ? state.map((item) =>
          item.id === existing.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      : [...state, { ...action.p, qty: 1 }];
  }

  if (action.type === "remove") {
    return state.filter((item) => item.id !== action.id);
  }

  if (action.type === "qty") {
    return state.map((item) =>
      item.id === action.id
        ? { ...item, qty: Math.max(1, action.qty) }
        : item
    );
  }

  return state;
}

export default function App() {
  const [cart, dispatch] = useReducer(reducer, []);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const discount = applied ? subtotal * 0.1 : 0;
  const gst = (subtotal - discount) * 0.18;
  const total = subtotal - discount + gst;

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      <main>
        <h1>Online Shopping Cart</h1>

        <section className="products">
          {products.map((product) => (
            <article key={product.id}>
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <button
                onClick={() => dispatch({ type: "add", p: product })}
              >
                Add to Cart
              </button>
            </article>
          ))}
        </section>

        <h2>Cart</h2>

        {cart.map((item) => (
          <div className="row" key={item.id}>
            {item.name} × {item.qty} = ₹{item.price * item.qty}

            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(event) =>
                dispatch({
                  type: "qty",
                  id: item.id,
                  qty: Number(event.target.value),
                })
              }
            />

            <button
              onClick={() => dispatch({ type: "remove", id: item.id })}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="summary">
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>Discount: ₹{discount.toFixed(2)}</p>
          <p>GST (18%): ₹{gst.toFixed(2)}</p>
          <h2>Grand Total: ₹{total.toFixed(2)}</h2>

          <input
            placeholder="Coupon code (SAVE10)"
            value={coupon}
            onChange={(event) => setCoupon(event.target.value)}
          />

          <button
            onClick={() =>
              setApplied(coupon.trim().toUpperCase() === "SAVE10")
            }
          >
            Apply Coupon
          </button>
        </div>
      </main>
    </CartContext.Provider>
  );
}
