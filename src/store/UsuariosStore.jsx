import { create } from "zustand";
import { EditarTemaMonedaUser, MostrarUsuarios } from "../index";

export const useUsuariosStore = create((set, get) => ({
  datausuarios: [],
  mostrarUsuarios: async () => {
    const response = await MostrarUsuarios();
    set({ datausuarios: response });
    if(response){
      return response;
    }else{
      return [];
    }
   
  },
  editartemamonedauser: async (p) => {
    // actualizo la base y luego vuelvo a traer el usuario para refrescar el estado
    await EditarTemaMonedaUser(p);
    const { mostrarUsuarios } = get();
    // `mostrarUsuarios` es una función que retorna el usuario, así que la ejecutamos
    const response = await mostrarUsuarios();
    set({ datausuarios: response });
  },

}));