import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

function MyPageUserCameraSetting(props) {
  const [inputList, setInputList] = useState([
    { serialNumber: "", location: "" },
  ]);
  const [onSaveSuccess, setOnSuccessSave] = useState(-1);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { serialNumber: "", location: "" }]);
  };

  const onSaveButtonClick = () => {
    console.log(inputList);
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
    axios
      .post(`http://localhost:8000/api/${props.userId}/iots`, {
        "userid": props.userId,
        "iots": [...inputList],
      })
      .then((res) => {
        props.setIots([...inputList]);
        setOnSuccessSave(1);
      })
      .catch((error) => {
        console.log(error.response.data.detail)
        setOnSuccessSave(0);
      });
  };

  useEffect(()=>{
    setInputList(props.iots)
  },[])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography variant="h4" style={{ marginTop: "40px" }}>
        CCTV 추가하기
      </Typography>
      {inputList.map((x, i) => {
        return (
          <div style={{ marginTop: "40px" }}>
            <TextField
              variant="outlined"
              margin="normal"
              name="serialNumber"
              required
              placeholder="시리얼 번호를 입력하세요"
              value={x.serialNumber}
              onChange={(e) => handleInputChange(e, i)}
              fullWidth
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              name="location"
              placeholder="CCTV 위치를 입력하세요"
              value={x.location}
              onChange={(e) => handleInputChange(e, i)}
              fullWidth
            />
            {inputList.length !== 1 && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "20px" }}
                  onClick={() => handleRemoveClick(i)}
                >
                  삭제하기
                </Button>
                <span style={{ marginLeft: "20px" }} />
              </>
            )}
            {inputList.length - 1 === i && (
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
                onClick={handleAddClick}
              >
                추가하기
              </Button>
            )}
          </div>
        );
      })}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "40px" }}
        onClick={onSaveButtonClick}
      >
        저장하기
      </Button>
      {onSaveSuccess === 0 && (
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          CCTV가 존재하지않습니다.
        </Typography>
      )}
      {onSaveSuccess === 1 && (
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          CCTV가 등록됐습니다.
        </Typography>
      )}
    </Container>
  );
}

export default MyPageUserCameraSetting;
