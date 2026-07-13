import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVICES, PICKUP_SLOTS, DELIVERY_FEE } from "../data";

const AppContext = createContext(null);

const KEYS = {
  cart: "suds_cart",
  orders: "suds_orders",
  user: "suds_user",
  slot: "suds_slot",
};

export function AppProvider({ children }) {
  const [ready, setReady] = useState(false);

  // navigation: simple stack of { screen, params }
  const [stack, setStack] = useState([{ screen: "splash", params: {} }]);

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(PICKUP_SLOTS[0]);

  // ---- load persisted state ----
  useEffect(() => {
    (async () => {
      try {
        const [c, o, u, s] = await Promise.all([
          AsyncStorage.getItem(KEYS.cart),
          AsyncStorage.getItem(KEYS.orders),
          AsyncStorage.getItem(KEYS.user),
          AsyncStorage.getItem(KEYS.slot),
        ]);
        if (c) setCart(JSON.parse(c));
        if (o) setOrders(JSON.parse(o));
        if (u) setUser(JSON.parse(u));
        if (s) setSelectedSlot(JSON.parse(s));
      } catch (e) {
        // ignore — fall back to defaults
      } finally {
        setReady(true);
      }
    })();
  }, []);

  useEffect(() => { if (ready) AsyncStorage.setItem(KEYS.cart, JSON.stringify(cart)); }, [cart, ready]);
  useEffect(() => { if (ready) AsyncStorage.setItem(KEYS.orders, JSON.stringify(orders)); }, [orders, ready]);
  useEffect(() => { if (ready) AsyncStorage.setItem(KEYS.user, JSON.stringify(user)); }, [user, ready]);
  useEffect(() => { if (ready) AsyncStorage.setItem(KEYS.slot, JSON.stringify(selectedSlot)); }, [selectedSlot, ready]);

  // ---- navigation helpers ----
  const navigate = useCallback((screen, params = {}) => {
    setStack((s) => [...s, { screen, params }]);
  }, []);

  const goBack = useCallback(() => {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);

  const resetToTab = useCallback((screen) => {
    setStack([{ screen, params: {} }]);
  }, []);

  const replace = useCallback((screen, params = {}) => {
    setStack((s) => [...s.slice(0, -1), { screen, params }]);
  }, []);

  // ---- cart helpers ----
  const addToCart = useCallback((serviceId, qty, addons) => {
    setCart((c) => [
      ...c,
      { lineId: "l" + Date.now() + Math.floor(Math.random() * 999), serviceId, qty, addons },
    ]);
  }, []);

  const incLine = useCallback((lineId) => {
    setCart((c) => c.map((l) => (l.lineId === lineId ? { ...l, qty: l.qty + 1 } : l)));
  }, []);

  const decLine = useCallback((lineId) => {
    setCart((c) => c.map((l) => (l.lineId === lineId && l.qty > 1 ? { ...l, qty: l.qty - 1 } : l)));
  }, []);

  const removeLine = useCallback((lineId) => {
    setCart((c) => c.filter((l) => l.lineId !== lineId));
  }, []);

  const lineTotal = useCallback((line) => {
    const svc = SERVICES.find((s) => s.id === line.serviceId);
    let total = svc.price * line.qty;
    line.addons.forEach((a) => (total += a.price));
    return total;
  }, []);

  const cartSubtotal = useCallback(() => cart.reduce((sum, l) => sum + lineTotal(l), 0), [cart, lineTotal]);

  const placeOrder = useCallback(() => {
    const subtotal = cartSubtotal();
    const order = {
      id: "SD-" + (1000 + orders.length + 1),
      items: cart.map((line) => {
        const svc = SERVICES.find((s) => s.id === line.serviceId);
        return { name: svc.name, emoji: svc.emoji, qty: line.qty, unit: svc.unit, total: lineTotal(line) };
      }),
      subtotal,
      delivery: DELIVERY_FEE,
      total: subtotal + DELIVERY_FEE,
      slot: selectedSlot,
      status: 1,
      createdAt: new Date().toISOString(),
    };
    setOrders((o) => [order, ...o]);
    setCart([]);
    return order;
  }, [cart, orders, selectedSlot, cartSubtotal, lineTotal]);

  // ---- auth ----
  const login = useCallback((phone) => {
    setUser((u) => u || { name: "Jane Wanjiru", phone: phone || "0712 345 678" });
  }, []);

  const signup = useCallback((name, phone) => {
    setUser({ name: name || "New Customer", phone: phone || "0700 000 000" });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = {
    ready,
    stack,
    current: stack[stack.length - 1],
    navigate,
    goBack,
    resetToTab,
    replace,
    cart,
    orders,
    user,
    selectedSlot,
    setSelectedSlot,
    addToCart,
    incLine,
    decLine,
    removeLine,
    lineTotal,
    cartSubtotal,
    placeOrder,
    login,
    signup,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
