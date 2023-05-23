import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  anteriorPokemonAccion,
  detallePokemonAccion,
  obtenerPokemonesAccion,
  obtenerSiguientesAccion,
} from "../redux/PokemonDuck";
import DetalleComponent from "./DetalleComponent";

const PokemonsComponent = () => {
  const pokes = useSelector((state) => state.pokemones.results);
  const next = useSelector((state) => state.pokemones.next);
  const previous = useSelector((state) => state.pokemones.previous);
  const dispatch = useDispatch();
  return (
    <div className="flex">
      <div className="flex-auto px-3">
        <h2 className="my-3 text-center font-extrabold text-2xl">
          Lista de Pokémones
        </h2>
        <div className="mb-2 flex justify-between">
          {pokes.length === 0 && (
            <button
              className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-md"
              onClick={() => dispatch(obtenerPokemonesAccion())}
            >
              get pokes
            </button>
          )}

          {previous ? (
            <button
              className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-md"
              onClick={() => dispatch(anteriorPokemonAccion())}
            >
              Anterior
            </button>
          ) : (
            <div className=""></div>
          )}
          {next && (
            <button
              className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-md "
              onClick={() => dispatch(obtenerSiguientesAccion())}
            >
              Siguiente
            </button>
          )}
        </div>

        <div className="">
          <ul className="bg-gray-100">
            {pokes.map((poke) => (
              <li
                className="border border-gray-400 rounded-md text-left h-20 px-4 flex mb-2 shadow-md"
                key={poke.name}
              >
                <p className="grow pt-5 capitalize">{poke.name}</p>
                <button
                  className="bg-blue-500 my-6 rounded-full px-3 text-white shadow-sm hover:shadow-lg"
                  onClick={() => dispatch(detallePokemonAccion(poke.url))}
                >
                  Info
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-auto px-3">
        <DetalleComponent />
      </div>
    </div>
  );
};
export default PokemonsComponent;
