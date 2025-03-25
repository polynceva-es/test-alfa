import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { Products } from "../pages/Products/Products";

interface CardType  {
  id: string;
  isLiked: boolean;
}

export interface ProductType extends CardType  {
  awardYear: string;
  category: {
    en: string;
    no?: string;
    se?: string;
  };
  categoryFullName: {
    en: string;
    no?: string;
    se?: string;
  };
  dateAwarded: string;
  prizeAmount: number;
  prizeAmountAdjusted: number;
  links: [
    {
      rel: string;
      href: string;
      action: string;
      types: string;
    }
  ];
  laureates: [
    {
      id: string;
      knownName: {
        en: string;
      };
      fullName?: {
        en: string;
      };
      orgName?: {
        en: string;
        no?: string;
      };
      portion: string;
      sortOrder: string;
      motivation: {
        en: string;
        se?: string;
      };
      links: [
        {
          rel: string;
          href: string;
          action: string;
          types: string;
        }
      ];
    }
  ];
};

type State = {
  products: ProductType[];
};

type Actions = {
  getProducts: () => void;
  liked: (id: string) => void;
  deleted: (id: string) => void;
  addNew: () => void
};

export const useStore = create<State & Actions>((set) => ({
  products: [],
  getProducts: async () => {
    try {
      const response = await fetch(
        "https://api.nobelprize.org/2.1/nobelPrizes",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const res = await response.json().then((res) => res.nobelPrizes);
        const products: ProductType[] = [];
        res.map((el: ProductType) => {
          el.id = uuid();
          el.isLiked = false;
          products.push(el);
        });
        set({ products: products });
      } else {
        throw new Error("Error 2");
      }
    } catch (error) {
      throw new Error("Error 1" + error);
    }
  },
  liked: (id: string) => {
    set((state) => {
      return {products: state.products.map(el => {
        if (el.id === id) {
          el.isLiked = !el.isLiked
        }
        return el
      })}
    })
  } ,
  deleted: (id: string) => set((state) => ({ products: state.products.filter(el => el.id !== id) })),
  addNew: () => set({}),
}));
