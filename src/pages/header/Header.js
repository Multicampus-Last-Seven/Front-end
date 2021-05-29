import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header">
        <Link style={{color:"white"}} to='/monitor'>
        <Typography variant="h4">Last7</Typography>
        </Link>
        <div style={{width:"80%"}} />
        <Link to='/mypage' style={{color: 'white'}}>
        <Typography variant="h6">마이페이지</Typography>
        </Link>
        <div style={{width: "40px"}} />
        <Link style={{color:'white'}} to='/'>
        <Typography variant="h6">로그아웃</Typography>
        </Link>
    </div>
  );
}

export default Header;