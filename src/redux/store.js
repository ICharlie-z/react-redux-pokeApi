import { configureStore } from "@reduxjs/toolkit";
import pokeReducer from "./PokemonDuck";

export default configureStore({
  reducer: {
    pokemones: pokeReducer,
  },
});
