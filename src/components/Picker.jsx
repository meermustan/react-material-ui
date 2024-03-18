import React from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

const Picker = ({ onChange, optionGroups, valueGroups }) => {
  console.log({ optionGroups });
  console.log({ valueGroups });

  const options = Object.keys(optionGroups);
  const { title, firstName, secondName } = optionGroups;

  const renderList = (arr) => {
    return arr.map((item) => <PickerItem key={uuid()}>{item}</PickerItem>);
  };

  const renderColumns = options.map((option) => (
    <PickerColumn style={{ backgroundColor: "white" }} key={uuid()}>
      {renderList(optionGroups[option])}
    </PickerColumn>
  ));

  return (
    <PickerContainer>
      <ColumnContainer>{renderColumns}</ColumnContainer>
    </PickerContainer>
  );
};

export default Picker;

const PickerContainer = styled.div`
  display: flex;
  justify-content: center;
  /* background-color: pink; */
  align-items: flex-end;
  height: 400px;
`;

const PickerColumn = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0px;
  background-color: white !important;
  margin: 2px;
`;

const PickerItem = styled.li`
  padding: 10px;
`;

const ColumnContainer = styled.div`
  /* background-color: yellow; */
  display: flex;
  justify-content: center;
`;
