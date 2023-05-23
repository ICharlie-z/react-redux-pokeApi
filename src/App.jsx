import PokemonsComponent from "./components/PokemonsComponent";
import store from "./redux/store";
import { Provider } from "react-redux";
const App = () => {
  return (
    <div className="container mx-auto">
      <Provider store={store}>
        <PokemonsComponent />
      </Provider>
    </div>
  );
};
export default App;
