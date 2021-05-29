import { useState } from "react";
import { Route, BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Header from "./pages/header/Header";
import SignIn from "./pages/Login";
import Monitor from "./pages/Monitor";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";
import NoPage from "./pages/NotFound";
import SignUp from "./pages/Signup";

function App() {
  const [logged, setLogged] = useState(false);
  return (
    <Router>
      <Switch>     
        <Route exact path='/'>
          <SignIn setLogged={setLogged} logged={logged}/>
        </Route>
        <Route exact path='/signup'>
          <SignUp />
        </Route>
        <Route exact path='/monitor'>
          <Header />
          <Monitor />
        </Route>
        <Route exact path='/mypage'>
          <MyPage />
        </Route>
        <Route exact component={NotFound} />
        </Switch>
    </Router>
  );
}

export default App;
