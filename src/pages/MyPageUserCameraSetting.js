import { Typography } from "@material-ui/core";
import React, { useState } from "react";

function MyPageUserCameraSetting() {
  const [inputList, setInputList] = useState([{ serialNumber: "", location: "" }]);

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
    <div>
        <Typography variant="h4">
            CCTV 추가하기
        </Typography>
      {inputList.map((x, i) => {
        return (
          <div>
            <input
              name="serialNumber"
              placeholder="시리얼 번호를 입력하세요"
              value={x.serialNumber}
              onChange={(e) => handleInputChange(e, i)}
            />
            <input
              name="location"
              placeholder="CCTV 위치를 입력하세요"
              value={x.location}
              onChange={(e) => handleInputChange(e, i)}
            />
            <div>
              {inputList.length !== 1 && (
                <button onClick={() => handleRemoveClick(i)}>
                  Remove
                </button>
              )}
              {inputList.length - 1 === i && (
                <button onClick={handleAddClick}>Add</button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MyPageUserCameraSetting;
