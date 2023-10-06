import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AllRouting } from "./Routing/AllRouting";
import Header from "./component/structure/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AllRouting />
      </BrowserRouter>
    </div>
  );
}

export default App;
