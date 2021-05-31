import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header(props) {
  const onLogoutClick = () => {
    localStorage.removeItem("token");
  };

  const onFireReportClick = () => {
    alert("화재신고가 완료됐습니다.");
  };

  return (
    <div className="header">
      <Link style={{ color: "white" }} to="/monitor">
        <Typography variant="h4">Last7</Typography>
      </Link>
      <Typography variant="h6">{props.address}</Typography>
      <div style={{ display: "flex" }}>
        <Typography
          variant="h6"
          style={{ cursor: "pointer" }}
          onClick={onFireReportClick}
        >
          화재신고
        </Typography>
        <div style={{ width: "40px" }} />
        <Link to="/mypage" style={{ color: "white" }}>
          <Typography variant="h6" style={{ right: "0" }}>
            마이페이지
          </Typography>
        </Link>
        <div style={{ width: "40px" }} />
        <Link style={{ color: "white" }} to="/" onClick={onLogoutClick}>
          <Typography variant="h6">로그아웃</Typography>
        </Link>
      </div>
    </div>
  );
}

export default Header;
