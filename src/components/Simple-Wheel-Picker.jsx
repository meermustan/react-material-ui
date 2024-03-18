import React from "react";
import WheelPicker from "react-simple-wheel-picker";

// import "./styles.css";
import styled from "styled-components";

export default function WheelPickerExample() {
  const setKeyValue = (arr) => {
    return arr.map((item) => {
      const dataSet = {
        id: item,
        value: item
      };
      return dataSet;
    });
  };

  const newOptionGroups = (optionGroups) => {
    let groups = {};
    for (const group in optionGroups) {
      groups[group] = setKeyValue(optionGroups[group]);
    }
    return groups;
  };
  const optionGroups = {
    hours: [
      "00",
      "01",
      "02",
      "03",
      "04",
      "06",
      "07",
      "08",
      "09",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "21",
      "22",
      "23"
    ],
    minutes: [
      "00",
      "01",
      "02",
      "03",
      "04",
      "06",
      "07",
      "08",
      "09",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "21",
      "22",
      "23",
      "24",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
      "49",
      "50",
      "51",
      "52",
      "53",
      "54",
      "55",
      "56",
      "57",
      "58",
      "59"
    ],
    seconds: [
      "00",
      "01",
      "02",
      "03",
      "04",
      "06",
      "07",
      "08",
      "09",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "21",
      "22",
      "23",
      "24",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
      "49",
      "50",
      "51",
      "52",
      "53",
      "54",
      "55",
      "56",
      "57",
      "58",
      "59"
    ]
  };

  const opGroups = newOptionGroups(optionGroups);

  let pickerColumn = [];
  const handleOnChange = (target) => {
    console.log(target.id);
    if (typeof target.id === "number")
      console.log(optionGroups.hours[target.id]);
  };
  for (const group in opGroups) {
    const data = opGroups[group];

    pickerColumn.push(
        <div style={{display: 'flex',flexDirection:'column'}}>
            <h5>Pick {[group]}</h5>
            <StyledWheelPicker
                data={data}
                onChange={handleOnChange}
                height={100}
                width={100}
                titleText="Enter value same as aria-label"
                itemHeight={36}
                selectedID={data[0].id}
                color="#999999"
                activeColor="#fff"
                
                backgroundColor="black"
                shadowColor="none"
            />
        </div>
    );
  }

  return (
    <div >
      <h1>Time Picker</h1>
      <PickerContainer>{pickerColumn}</PickerContainer>
    </div>
  );
}

const PickerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledWheelPicker = styled(WheelPicker)`
  box-shadow: none;
  background-color: red;
`;
