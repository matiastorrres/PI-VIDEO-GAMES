import LandingPage from './components/LandingPage/LandingPage';
import Main from "./components/Main/Main";
import Create from "./components/Create/Create";
import Detail from './components/Detail/Detail';
import Page404 from './components/Page404/Page404';
import {Route, Switch} from "react-router-dom";


function App() {
  return (
    <div>
      <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Main}/>
      <Route exact path="/create" component={Create}/>
      <Route exact path="/detail/:id" component={Detail}/>     
      <Route path="*" component={Page404}/>
      </Switch>
    </div>
  );
}

export default App;
