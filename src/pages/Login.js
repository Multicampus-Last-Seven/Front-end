import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect }from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Last7"}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const onLogin = async (userid, password, setLogged, setLoginSuccess) => {
  await axios.post(
    "http://localhost:8000/api/login",
    {
      "userid": userid,
      "password": password
    }
  ).then(res => {
    localStorage.setItem('token', res.data.token);
    setLogged(true);

  }).catch(error => {
    setLoginSuccess(0);
  });
}

export default function SignIn(props) {
  const classes = useStyles();
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(-1);

  const onSignInButtonClick = (e) => {
      e.preventDefault();
      onLogin(uid, password, props.setLogged, setLoginSuccess);
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {props.logged && <Redirect to='/monitor' />}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userid"
            label="사용자 ID"
            name="userid"
            autoComplete="userid"
            autoFocus
            onChange = {(e) => setUid(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange = {(e) => setPassword(e.target.value)}
          />
          {loginSuccess === 0 && "아이디 또는 비밀번호가 올바르지 않습니다."}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {e => onSignInButtonClick(e)}
          >
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/' >
                아이디/비밀번호를 분실하셨나요?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" >
                {"회원가입"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
