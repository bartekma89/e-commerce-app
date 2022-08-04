import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface CartItem {
  readonly price: number;
  readonly title: string;
  readonly count: number;
  readonly id: string;
}

interface CartState {
  readonly items: readonly CartItem[];
  readonly addItemToCart: (item: CartItem) => void;
  readonly removeItemFromCart: (id: CartItem["id"]) => void;
}

interface ComponentProps {
  children: ReactNode;
}

const getCartItemsFromStorage = () => {
  const itemFromLocalStorage = localStorage.getItem("shopping_cart");
  if (!itemFromLocalStorage) {
    return [];
  }

  try {
    const items = JSON.parse(itemFromLocalStorage);
    return items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const setCartItemsInStorage = (cartItems: CartItem[]) => {
  localStorage.setItem("shopping_cart", JSON.stringify(cartItems));
};

const addToCart = (prevState: CartItem[], item: CartItem) => {
  const existingItem = prevState.find(
    (existingItem) => existingItem.id === item.id
  );

  if (!existingItem) {
    return [...prevState, item];
  }

  return prevState.map((existingItem) =>
    existingItem.id === item.id
      ? { ...existingItem, count: existingItem.count + 1 }
      : existingItem
  );
};

const removeFromCart = (prevState: CartItem[], id: CartItem["id"]) => {
  const existingItem = prevState.find((existingItem) => existingItem.id === id);

  if (existingItem && existingItem.count <= 1) {
    return prevState.filter((item) => item.id !== id);
  }

  return prevState.map((existingItem) =>
    existingItem.id === id
      ? { ...existingItem, count: existingItem.count - 1 }
      : existingItem
  );
};

export const CartStateContext = createContext<CartState | null>(null);

export const CartStateContextProvider = ({ children }: ComponentProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const value: CartState = useMemo(
    () => ({
      items: cartItems,
      addItemToCart: (item) =>
        setCartItems((prevState) => addToCart(prevState, item)),
      removeItemFromCart: (id) =>
        setCartItems((prevState) => removeFromCart(prevState, id)),
    }),
    [cartItems]
  );

  useEffect(() => {
    setCartItems(getCartItemsFromStorage());
  }, []);

  useEffect(() => {
    setCartItemsInStorage(cartItems);
  }, [cartItems]);

  return (
    <CartStateContext.Provider value={value}>
      {children}
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const cartState = useContext(CartStateContext);
  if (!cartState) {
    throw new Error(
      "useCartState must be used within a CartStateContextProvider"
    );
  }
  return cartState;
};
