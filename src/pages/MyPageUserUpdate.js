import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DaumPostcode from "react-daum-postcode";
import { Modal, RootRef } from "@material-ui/core";
import axios from "axios";
import toAddr from "./Info";

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

function MyPageUserUpdate() {
  const classes = useStyles();
  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState("");
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [userid, setUserid] = useState('');
  const [isIdUnique, setIsIdUnique] = useState(-1);
  const [isChecked, setIsChecked] = useState(-1);
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [isCorrectPassword, setIsCorrectPassword] = useState(-1);

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

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      {searchButtonClicked && <FindAddr />}
      <div className={classes.paper}>
        <Typography variant="h4">
          회원정보 수정
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={4}>
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
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            수정하기
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default MyPageUserUpdate;