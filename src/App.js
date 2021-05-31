import { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import "./App.css";
import Header from "./pages/header/Header";
import SignIn from "./pages/Login";
import Monitor from "./pages/Monitor";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/Signup";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  alertFont: {
    justifyContent: "center",
  },
}));

function App() {
  const [userId, setUserId] = useState("");
  const [iots, setIots] = useState([]);
  const [address, setAddress] = useState("");
  const [myname, setMyName] = useState("");
  const [onSignupSuccess, setOnSignupSuccess] = useState(-1);
  const classes = useStyles();

  return (
    <>
      {onSignupSuccess === 1 && (
        <Alert
          severity="warning"
          variant="filled"
          className={classes.alertFont}
        >
          회원가입이 완료됐습니다. 이메일 인증 후 로그인하세요.
        </Alert>
      )}
      <Router>
        <Switch>
          <Route exact path="/">
            <SignIn
              onSignupSuccess={onSignupSuccess}
              setOnSignupSuccess={setOnSignupSuccess}
              iots={iots}
              setIots={setIots}
              setAddress={setAddress}
              setMyName={setMyName}
              setUserId={setUserId}
            />
          </Route>
          <Route exact path="/signup">
            <SignUp
              onSignupSuccess={onSignupSuccess}
              setOnSignupSuccess={setOnSignupSuccess}
            />
          </Route>
          <Route exact path="/monitor">
            <Header address={address} />
            <Monitor iots={iots}/>
          </Route>
          <Route exact path="/mypage">
            <MyPage
            userId={userId} 
            iots={iots}
            setIots={setIots}
            />
          </Route>
          <Route exact component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
