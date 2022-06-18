import styled from "styled-components";
import React from "react";
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
  left: 77%;
  position: relative;
`;

function Header({
  addTodo,
  todo,
  isOpen,
  openModalHandler,
  closeHandler,
  setIsOpen,
}) {
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
          setIsOpen={setIsOpen}
          closeHandler={closeHandler}
          addTodo={addTodo}
          todo={todo}
        />
      )}
    </>
  );
}

export default Header;
