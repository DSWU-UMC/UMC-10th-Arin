import { create } from 'zustand';
import cartItems from '../constants/cartItems';
import type { CartItems } from '../types/cart';

interface CartStore {
    cartItems: CartItems;
    amount: number;
    total: number;
    increase: (id: string) => void;
    decrease: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    calculateTotals: () => void;
    // 모달
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const useCartStore = create<CartStore>((set) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,

    increase: (id) => set((state) => ({
        cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, amount: item.amount + 1 } : item
        ),
    })),

    decrease: (id) => set((state) => ({
        cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, amount: item.amount - 1 } : item
        ),
    })),

    removeItem: (id) => set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

    clearCart: () => set({ cartItems: [] }),

    calculateTotals: () => set((state) => {
        let amount = 0;
        let total = 0;
        state.cartItems.forEach((item) => {
            amount += item.amount;
            total += item.amount * item.price;
        });
        return { amount, total };
    }),

    // 모달
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}));

export default useCartStore;