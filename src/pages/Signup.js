import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DaumPostcode from "react-daum-postcode";
import { Modal, RootRef } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import toAddr from "./Info";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  check: {
    width: "100%",
  },
  modal: {
    display: "flex",
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState("");
  const [detailAddr, setDetailAddr] = useState("");
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [userid, setUserid] = useState('');
  const [isIdUnique, setIsIdUnique] = useState(-1);
  const [isChecked, setIsChecked] = useState(-1);
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [isCorrectPassword, setIsCorrectPassword] = useState(-1);
  const [email, setEmail] = useState("");
  const [myName, setMyName] = useState("");

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setIsZoneCode(data.zonecode);
    setIsAddress(fullAddress);
    setSearchButtonClicked(false);
  };

  const FindAddr = () => {
    const postCodeStyle = {
      zIndex: "100",
      padding: "10%",
    };

    const rootRef = React.useRef(null);
    return (
      <div ref={rootRef}>
        <Modal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          open
          aria-labelledby="server-modal-title"
          aria-describedby="server-modal-description"
          className={classes.modal}
          container={() => RootRef.current}
        >
          <DaumPostcode
            onComplete={handleComplete}
            style={postCodeStyle}
            height={700}
          />
        </Modal>
      </div>
    );
  };

  const comparePassword = () => {
      if(passwordAgain.length === 0) return;
      if(password === passwordAgain) setIsCorrectPassword(1);
      else setIsCorrectPassword(0);      
  }

  const onSearchButtonClick = () => {
    setSearchButtonClicked(true);
  };

  const onIdCheckButtonClick = () => {
      axios.post(
          `http://${toAddr}/api/userid-check`,
          {"userid": userid}
      ).then(res => {
          setIsIdUnique(1);
          setIsChecked(1);
      }).catch(error => {
          setIsIdUnique(0);
          setIsChecked(0);
      })
  }

  const onSignupButtonClick = (e) => {
    e.preventDefault();    
    if(!userid) alert('사용자 ID를 입력하세요.');
    else if(isIdUnique !== 1 || isChecked !== 1) alert('사용자 중복확인을 하세요.');
    else if(!myName) alert("성함을 입력하세요.");
    else if(!email) alert('이메일을 입력하세요.');
    else if(!password) alert('비밀번호를 입력하세요.');
    else if(isCorrectPassword !== 1) alert('비밀번호가 일치하는지 확인하세요.');
    else if(!isAddress) alert('도로명 주소를 입력하세요.');
    else if(!detailAddr) alert('상세주소를 입력하세요.');
    else{
      axios.post(
        `http://${toAddr}/api/signup`,
        {
          "userid": userid,
          "name": myName,
          "email": email,
          "password": password,
          "road_addr": isAddress,
          "detail_addr": detailAddr,
        }
      ).then(res =>{
        props.setOnSignupSuccess(1);                
      }).catch(error =>{
        console.log(error.response.data);
      });
    }
  }

  useEffect(() => {
    if(password !== '' && password === passwordAgain) setIsCorrectPassword(1);
    else if(password === '') setIsCorrectPassword(-1);
    else setIsCorrectPassword(0);
  }, [password, passwordAgain, isCorrectPassword])

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      {searchButtonClicked && <FindAddr />}
      {props.onSignupSuccess === 1 && <Redirect to='/' />}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={8}>
              <TextField
                autoComplete="userid"
                name="userid"
                variant="outlined"
                required
                fullWidth
                id="userid"
                label="사용자 ID"
                autoFocus
                value={userid}
                onChange={(e)=>{
                    setUserid(e.target.value);
                    setIsChecked(0);
                }}
              />
            {isIdUnique === 0 && <div>이미 존재하는 ID입니다.</div>}
            {isIdUnique === 1 && <div>사용가능한 ID입니다.</div>}
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.check}
                onClick={() => onIdCheckButtonClick()}
              >
                중복확인
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="성함"
                autoFocus
                onChange={e => setMyName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                name="email"
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordAgain"
                label="비밀번호 재입력"
                type="password"
                id="passwordAgain"
                autoComplete="current-password-again"
                onChange={(e)=>{
                    setPasswordAgain(e.target.value);
                    comparePassword()
                }}
              />
              {isCorrectPassword === 1 && <div>비밀번호가 일치합니다.</div>}
              {isCorrectPassword === 0 && <div>비밀번호가 일치하지 않습니다.</div>}
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                autoComplete="roadAddr"
                name="roadAddr"
                variant="outlined"
                required
                fullWidth
                id="roadAddr"
                label="도로명주소"
                autoFocus
                value={isAddress}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.check}
                onClick={() => onSearchButtonClick()}
              >
                찾아보기
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="detailAddr"
                name="detailAddr"
                variant="outlined"
                required
                fullWidth
                id="detailAddr"
                label="상세주소"
                autoFocus
                onChange={e => setDetailAddr(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e)=>onSignupButtonClick(e)}
          >
            회원가입
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/' >
                계정이 이미 있으신가요? 로그인
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
