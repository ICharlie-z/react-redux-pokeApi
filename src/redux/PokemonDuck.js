import axios from "axios";

// Constantes
const dataInicial = {
  count: 0,
  next: null,
  previus: null,
  results: [],
  unPokemon: {
    nombre: null,
    altura: null,
    peso: null,
    imagen:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
};

const OBTENER_POKEMONES_EXITO = "OBTENER_POKEMONES_EXITO";
const SIGUIENTE_POKEMONES_EXITO = "SIGUIENTE_POKEMONES_EXITO";
const DETALLE_POKEMON_EXITO = "DETALLE_POKEMON_EXITO";

// Reducer
const pokeReducer = (state = dataInicial, action) => {
  switch (action.type) {
    case OBTENER_POKEMONES_EXITO:
      return { ...state, ...action.payload };
    case SIGUIENTE_POKEMONES_EXITO:
      return {
        ...state,
        ...action.payload,
      };
    case DETALLE_POKEMON_EXITO:
      return { ...state, unPokemon: action.payload };
    default:
      return state;
  }
};

//Acciones
export const obtenerPokemonesAccion = () => async (dispatch) => {
  if (localStorage.getItem("offset=0")) {
    dispatch({
      type: OBTENER_POKEMONES_EXITO,
      payload: JSON.parse(localStorage.getItem("offset=0")),
    });
    return;
  }

  try {
    const res = await axios(
      "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0"
    );
    dispatch({
      type: OBTENER_POKEMONES_EXITO,
      payload: res.data,
    });
    localStorage.setItem("offset=0", JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const obtenerSiguientesAccion = () => async (dispatch, getState) => {
  const { next } = getState().pokemones;
  const attrs = next.split("?");
  const offset = attrs[1].split("&")[0];

  if (localStorage.getItem(offset)) {
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: JSON.parse(localStorage.getItem(offset)),
    });
    return;
  }

  try {
    const res = await axios(next);
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: res.data,
    });
    localStorage.setItem(offset, JSON.stringify(res.data));
  } catch (e) {
    console.log(e);
  }
};

export const anteriorPokemonAccion = () => async (dispatch, getState) => {
  const { previous } = getState().pokemones;
  const attrs = previous.split("?");
  const offset = attrs[1].split("&")[0];

  if (localStorage.getItem(offset)) {
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: JSON.parse(localStorage.getItem(offset)),
    });
    return;
  }

  try {
    const res = await axios(previous);
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: res.data,
    });
    localStorage.setItem(offset, JSON.stringify(res.data));
  } catch (e) {
    console.log(e);
  }
};

export const detallePokemonAccion = (url) => async (dispatch) => {
  if (localStorage.getItem(url)) {
    dispatch({
      type: DETALLE_POKEMON_EXITO,
      payload: JSON.parse(localStorage.getItem(url)),
    });
    return;
  }
  try {
    const res = await axios(url);
    const detalle = {
      nombre: res.data.name,
      altura: res.data.height,
      peso: res.data.weight,
      imagen: res.data.sprites.front_default,
    };
    dispatch({
      type: DETALLE_POKEMON_EXITO,
      payload: { ...detalle },
    });
    localStorage.setItem(url, JSON.stringify(detalle));
  } catch (e) {
    console.log(e);
  }
};
export default pokeReducer;
