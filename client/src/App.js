import LandingPage from './components/LandingPage/LandingPage';
import Main from "./components/Main/Main";
import Header from './components/Header/Header';
import Create from "./components/Create/Create";
import Aside from './components/Aside/Aside';
import Nav from './components/Nav/Nav';
import Detail from './components/Detail/Detail';
import {Route} from "react-router-dom";


function App() {
  return (
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Header}/>
      <Route exact path="/home" component={Aside}/>
      <Route exact path="/home" component={Nav}/>
      <Route exact path="/home" component={Main}/>
      <Route exact path="/create" component={Create}/>
      <Route exact path="/detail/:id" component={Detail}/>
    </div>
  );
}

export default App;
