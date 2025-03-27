import { create } from "zustand";
import { v4 as uuid } from "uuid";

interface CardType {
  id: string;
  isLiked: boolean;
}
export interface ProductType extends CardType {
  awardYear: string;
  category: string;
  laureates: string;
  motivation: string;
  url: string;
}
export interface DataType {
  awardYear: string;
  category: string;
  laureates: string;
  motivation: string;
  url: string;
}
type State = {
  products: ProductType[];
};
type Actions = {
  getProducts: () => void;
  liked: (id: string) => void;
  deleted: (id: string) => void;
  addNew: (data: DataType) => void;
  update: (data: DataType, id: string) => void;
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
        res.map((el: any) => {
          let element: ProductType = {
            awardYear: "",
            category: "",
            laureates: "",
            motivation: "",
            id: "",
            isLiked: false,
            url: "",
          };
          element.id = uuid();
          element.isLiked = false;
          element.url =
            "https://images.unsplash.com/photo-1741988766604-04b6f1b3236d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D";
          element.awardYear = el.awardYear;
          element.category = el.categoryFullName.en;
          element.laureates = el.laureates[0].fullName?.en;
          element.motivation = el.laureates[0].motivation.en;
          products.push(element);
        });
        set({ products: products });
      } else {
        throw new Error("Error 2");
      }
    } catch (error) {
      throw new Error("Error 1");
    }
  },
  liked: (id: string) => {
    set((state) => ({
      products: state.products.map((el) => {
        if (el.id === id) {
          el.isLiked = !el.isLiked;
        }
        return el;
      }),
    }));
  },
  deleted: (id: string) => {
    set((state) => ({
      products: state.products.filter((el) => el.id !== id),
    }));
  },
  addNew: (data: DataType) => {
    let element: ProductType = {
      awardYear: "",
      category: "",
      laureates: "",
      motivation: "",
      id: "",
      isLiked: false,
      url: "",
    };
    element.id = uuid();
    element.isLiked = false;
    element.url = data.url;
    element.awardYear = data.awardYear;
    element.category = data.category;
    element.laureates = data.laureates;
    element.motivation = data.motivation;
    set((state) => ({
      products: [element, ...state.products],
    }));
  },
  update: (data: DataType, id: string) => {
    set((state) => ({
      products: state.products.map((element) => {
        if (element.id === id) {
          element.url = data.url;
          element.awardYear = data.awardYear;
          element.category = data.category;
          element.laureates = data.laureates;
          element.motivation = data.motivation;
        }
        return element;
      }),
    }));
  },
}));
