import styled from "styled-components";
import React, { useState } from "react";
import ModalContents from "./ModalContents";

const Title = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin: 3% 0 0 0;
  padding-left: 10%;
`;
const Content = styled.div`
  display: flex;
  margin: 5% 0 0 0;
  padding: 0 0 1% 11%;
  border-bottom: 1px solid gray;
`;
const View = styled.span`
  font-weight: bold;
`;
const AddButton = styled.button`
  left: 75%;
  position: relative;
`;

function Header({
  addTodo,
  todo,
  isOpen,
  openModalHandler,
  closeHandler,
  onCompelte,
}) {
  //완료한 항목 : active === true면 완료 / false면 진행 중 === display: none

  return (
    <>
      <Title>Daily todolist</Title>
      <Content>
        <View>Board View</View>
        <AddButton onClick={openModalHandler} isOpen={isOpen}>
          새로 만들기
        </AddButton>
      </Content>

      {isOpen && (
        <ModalContents
          closeHandler={closeHandler}
          addTodo={addTodo}
          todo={todo}
        />
      )}
    </>
  );
}

export default Header;
