import { create } from "zustand";
import { v4 as uuid } from "uuid";

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
  liked: (newProducts: ProductType[]) => void;
  deleted: (newProducts: ProductType[]) => void;
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
        let products: ProductType[] = [];
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
      throw new Error("Error 1");
    }
  },
  liked: (newProducts: ProductType[] ) => set({ products: newProducts }),
  deleted: (newProducts: ProductType[] ) => set({ products: newProducts }),
  addNew: () => set({}),
}));
