import { useState } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/Login";
import Monitor from "./pages/Monitor";
import SignUp from "./pages/Signup";

function App() {
  const [logged, setLogged] = useState(false);
  return (
    <Router>      
        <Route exact path='/'>
          <SignIn setLogged={setLogged} logged={logged}/>
        </Route>
        <Route exact path='/signup'>
          <SignUp />
        </Route>
        <Route exact path='/monitor'>
          <Monitor />
        </Route> 
    </Router>
  );
}

export default App;
