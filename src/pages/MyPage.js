import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Link, Redirect } from "react-router-dom";
import MyPageUserUpdate from "./MyPageUserUpdate";
import MyPageUserUnregister from "./MyPageUserUnregister";
import MyPageUserCameraSetting from "./MyPageUserCameraSetting";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolBar: {
    height: "40px",
  },
}));

function MyPage(props) {
  const classes = useStyles();
  const [menu, setMenu] = useState(0);
  const onListItemClick = (index) => {
    if (index === 4) {
      alert("화재신고가 완료됐습니다");
      return;
    }
    setMenu(index);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link to="/monitor" style={{ color: "white" }}>
            <Typography variant="h4" noWrap>
              Last7
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {[
              "회원정보 수정",
              "카메라 설정",
              "로그아웃",
              "회원탈퇴",
              "화재신고",
            ].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => onListItemClick(index)}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {menu === 0 && <MyPageUserUpdate />}
        {menu === 1 && (
          <MyPageUserCameraSetting
            iots={props.iots}
            setIots={props.setIots}
            userId={props.userId}
          />
        )}
        {menu === 2 && <Redirect to="/" />}
        {menu === 3 && <MyPageUserUnregister />}
      </main>
    </div>
  );
}

export default MyPage;
