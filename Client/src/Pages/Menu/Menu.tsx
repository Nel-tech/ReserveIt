import { useState, useEffect } from 'react';
import { MenuData } from '../../Helpers/Data';
import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import {
  addToCart,
  removeFromCart,
} from '../../Services/Cart/CartServices';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../../Services/Auth/config';

type userProps = {
  userId: string;
};

export type Dish = {
  Name: string;
  BasePrice: number;
  Picture: string;
};

function Menu({ userId }: userProps) {
  const [Category, setCategory] = useState('');
  const [cartItems, setCartItems] = useState<Dish[]>([]);
  const [total, setTotal] = useState(0);

  const filteredMenu = Category
    ? MenuData.filter((menu) => menu.Category === Category)
    : MenuData;

  // Set up real-time listener for cart items
 useEffect(() => {
  const cartRef = collection(db, `users/${userId}/cart`);
  const unsubscribe = onSnapshot(cartRef, (snapshot) => {
    const items = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,  
        Name: data.Name,
        BasePrice: data.BasePrice,
        Picture: data.Picture,
      } as Dish; 
    });
    setCartItems(items); 
  });

  return () => unsubscribe(); 
}, [userId]);

  // Function to handle adding a dish to the cart
  const handleAddToCart = async (dish: Dish) => {
    const itemId = dish.Name;
    const itemData = {
      Name: dish.Name,
      BasePrice: dish.BasePrice,
      Picture: dish.Picture,
    };

    try {
      await addToCart(userId, itemId, itemData);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeCart = async (dish: Dish) => {
    const itemId = dish.Name;
    try {
      await removeFromCart(userId, itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Recalculate total when cartItems change
  useEffect(() => {
    const totalCost = cartItems
      .map((cost) => cost.BasePrice)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setTotal(totalCost);
  }, [cartItems]);

  return (
    <div>
      <header className="fixed top-0 z-50 w-full bg-white shadow-md">
        <nav className="flex items-center justify-between px-6 py-4">
          <a href="/">
            <h1 className="text-2xl font-extrabold text-[#AD343E]">Dine</h1>
          </a>

          <FaShoppingCart className="h-[2rem] w-[2rem] cursor-pointer text-[#AD343E]" />
        </nav>
      </header>

      <main className="container mt-[6rem] flex flex-col items-center">
        {/* Category Filter Buttons */}
        <div className="scrollbar-hide xs:hide mb-8 flex flex-wrap gap-4 overflow-x-auto whitespace-nowrap px-4 xs:overflow-x-auto xs:whitespace-nowrap">
          <button
            onClick={() => setCategory('')}
            className={`rounded-full border-2 border-[#AD343E] px-6 py-2 text-[#AD343E] transition-all duration-300 ease-in-out hover:bg-[#AD343E] hover:text-white ${
              Category === '' ? 'bg-[#AD343E] text-white' : ''
            } `}
          >
            All
          </button>

          {MenuData.map((menu) => (
            <button
              key={menu.id}
              onClick={() => setCategory(menu.Category)}
              className={`rounded-full border-2 border-[#AD343E] px-6 py-2 text-[#AD343E] transition-all duration-300 ease-in-out hover:bg-[#AD343E] hover:text-white ${
                Category === menu.Category ? 'bg-[#AD343E] text-white' : ''
              }`}
            >
              {menu.Category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="m-[2rem] flex flex-wrap justify-between gap-4">
          {filteredMenu.map((menu) => (
            <section key={menu.id} className="w-full">
              <div className="flex flex-wrap justify-between gap-4 xs:flex-col sm:flex-col">
                {menu.Dishes.map((dish) => (
                  <div
                    key={dish.Name}
                    className="flex w-[30%] flex-col items-center rounded-lg border p-4 shadow-md xs:w-[100%] sm:w-[100%]"
                  >
                    <img
                      src={dish.Picture}
                      alt={dish.Name}
                      className="mb-4 h-40 w-full rounded-lg object-cover"
                    />
                    <h1 className="text-center text-lg font-bold">
                      {dish.Name}
                    </h1>
                    <p className="text-center text-gray-600">{`₦${dish.BasePrice}`}</p>

                    <button
                      className="mt-4 rounded bg-[#AD343E] px-4 py-2 text-white transition-colors hover:bg-[#8b2a34]"
                      onClick={() => handleAddToCart(dish)}
                    >
                      Order
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <div className="fixed right-8 top-16 w-[20rem] rounded-lg border bg-white p-4 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-[#AD343E]">Cart</h2>
        <div className="space-y-4">
          {/* Iterate through cartItems */}
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b p-2 last:border-none"
              >
                <div className="flex items-center gap-[3rem] self-center">
                  <img
                    src={item.Picture}
                    alt={item.Name}
                    className="h-[3rem] w-[3rem] rounded-md object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">{item.Name}</p>
                    <p className="text-xs text-gray-600">₦{item.BasePrice}</p>
                  </div>

                  <div className="absolute right-3">
                    <FaTrashAlt className="h-[1rem] w-[1rem] cursor-pointer text-[#AD343E]" onClick={() => removeCart(item)} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Your cart is empty</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <div>
              <p>Total</p>
              <p>{total}</p>
            </div>

            <div className="mt-4">
              <button
                className="w-full rounded bg-[#AD343E] py-2 text-white transition-colors hover:bg-[#8b2a34]"
                onClick={() => {}}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Menu;
