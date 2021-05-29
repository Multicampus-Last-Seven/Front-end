import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

function MyPageUserCameraSetting() {
  const [inputList, setInputList] = useState([
    { serialNumber: "", location: "" },
  ]);

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
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "40px" }}
      >
        저장하기
      </Button>
    </Container>
  );
}

export default MyPageUserCameraSetting;
