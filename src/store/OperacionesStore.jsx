import { create } from "zustand";
import {v} from "../index";
export const useOperaciones = create((set) => ({
  tipo: "i",
  tituloBtnDes: "Categorias ingresos",
colorCategoria: ()=> v.colorIngresos,
  bgCategoria: ()=>  v.colorbgingresos,
  setTipo: (p) => {
    set({ tipo: p.tipo});
    set({
        tituloBtnDes: p.text,
    });
    set({
        colorCategoria: p.color,
    });
    set({
        bgCategoria: p.bgcolor,
    });
  },

}));