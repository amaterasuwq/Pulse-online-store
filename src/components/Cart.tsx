import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  name: string;
  price: number | string;
  image: string;
  quantity: number;
}

interface CartProps {
  isCartOpen: boolean;
  closeCart: () => void;
}

const Cart: React.FC<CartProps> = ({ isCartOpen, closeCart }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [forceCartOpen, setForceCartOpen] = useState(false);
  const navigate = useNavigate();

  const saveCart = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const calculateTotal = (items: CartItem[]) => {
    const totalPrice = items.reduce((sum, item) => {
      const numericPrice =
        typeof item.price === 'string' ? parseFloat(item.price) : item.price;
      return sum + numericPrice * item.quantity;
    }, 0);
    setTotal(totalPrice);
  };

  const handleQuantityChange = (index: number, change: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity + change }
          : item
      );

      // Check if the item quantity is zero or less
      if (updatedItems[index].quantity <= 0) {
        const filteredItems = updatedItems.filter((item) => item.quantity > 0);

        saveCart(filteredItems);
        calculateTotal(filteredItems);

        // Trigger a reload only if an item is removed
        localStorage.setItem('cartOpen', 'true');
        window.location.reload();
        return filteredItems;
      }

      // Update state normally
      saveCart(updatedItems);
      calculateTotal(updatedItems);
      return updatedItems;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((_, i) => i !== index);
      saveCart(updatedCart);
      calculateTotal(updatedCart);
      localStorage.setItem('cartOpen', 'true'); // Set flag to reopen cart
      window.location.reload();
      return updatedCart;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    setTotal(0);
    localStorage.setItem('cartOpen', 'true'); // Set flag to reopen cart
    window.location.reload();
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedItems: CartItem[] = JSON.parse(savedCart);
      setCartItems(parsedItems);
      calculateTotal(parsedItems);
    }

    const savedCartOpen = localStorage.getItem('cartOpen');
    if (savedCartOpen === 'true') {
      setForceCartOpen(true); // Open the cart if the flag is set
      localStorage.removeItem('cartOpen'); // Clear the flag after processing
    }
  }, []);

  const shouldCartBeOpen = isCartOpen || forceCartOpen;

  const handleCloseCart = () => {
    setForceCartOpen(false);
    closeCart();
  };

  if (!shouldCartBeOpen) return null;

  return (
    <div className={`cart ${shouldCartBeOpen ? 'active' : ''}`}>
      <div className="cart__header">
        <p>Your Cart</p>
        <i className="fa-solid fa-xmark cart__exit" onClick={handleCloseCart} />
      </div>

      {cartItems.length > 0 && (
        <div className="cart__delete-all" onClick={handleClearCart}>
          <p>Delete all items</p>
        </div>
      )}

      <div className="cart__items">
        {cartItems.length === 0 ? (
          <div className="cart__empty-message">
            <p>Your cart is empty</p>
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div className="cart__items__item" key={index}>
              <div className="cart__items__item__data">
                <div className="cart__items__item__data__image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart__items__item__data__info">
                  <p>{item.name}</p>
                  <p>
                    {(
                      typeof item.price === 'string'
                        ? Math.round(parseFloat(item.price))
                        : Math.round(item.price)
                    )}$
                  </p>
                </div>
              </div>
              <div className="cart__items__item__functionality">
                <div className="cart__items__item__functionality__quantity">
                  <i
                    className="fa-solid fa-plus"
                    onClick={() => handleQuantityChange(index, 1)}
                  />
                  <div className="cart__items__item__functionality__quantity__amount">
                    <p>{item.quantity}</p>
                  </div>
                  <i
                    className="fa-solid fa-minus"
                    onClick={() => handleQuantityChange(index, -1)}
                  />
                </div>
                <div onClick={() => handleRemoveItem(index)} className="cart__items__item__functionality__remove">
                  <p>Remove</p>
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart__total-checkout">
        <div className="cart__total-checkout__total">
          <p>
            Total: <span>{total.toFixed(2)}$</span>
          </p>
        </div>

        <div className="cart__total-checkout__checkout">
          <button
            onClick={() => navigate('/order')}
            disabled={cartItems.length === 0}
            style={{
              cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer',
              opacity: cartItems.length === 0 ? 0.5 : 1,
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
