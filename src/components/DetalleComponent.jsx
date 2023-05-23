import { useSelector, useDispatch } from "react-redux";

const DetalleComponent = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemones.unPokemon);
  console.log(pokemon);
  return (
    <>
      <h2 className="my-3 font-extrabold text-2xl text-center">
        Detalle Pokémon
      </h2>
      <div className="border border-gray-100 flex flex-col ">
        <div className=" grid place-items-center">
          <img className="" src={pokemon.imagen} alt="" />
        </div>
        <div className="text-center">
          <h3 className="capitalize font-semibold text-2xl">
            {pokemon.nombre}
          </h3>
          <p>
            Alto: {pokemon.altura} | Peso: {pokemon.peso}
          </p>
        </div>
      </div>
    </>
  );
};
export default DetalleComponent;
