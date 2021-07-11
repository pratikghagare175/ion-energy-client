import { Switch, Route, BrowserRouter } from "react-router-dom";
import Upload from "./Upload";
import ThermGraph from "./ThermGraph";

const NotFound = () =>{
  return <h2>404 Page Not Found</h2>;
}

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Upload />
        </Route>
        <Route exact path="/displayStats/:thermId">
          <ThermGraph />
        </Route>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
