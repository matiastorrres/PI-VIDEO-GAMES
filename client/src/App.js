import LandingPage from "./pages/LandingPage/LandingPage";
import Main from "./pages/Main/Main";
import Create from "./pages/Create/Create";
import Detail from "./pages/Detail/Detail";
import Page404 from "./pages/Page404/Page404";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Main} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route path="*" component={Page404} />
      </Switch>
    </div>
  );
}

export default App;
