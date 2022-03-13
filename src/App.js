import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/index";
import MainApp from "./main";

function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;
