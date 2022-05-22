import styled from "styled-components";
import React, { useState } from "react";
import moment from "moment";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
  z-index: 999;
`;
const ModalContainer = styled.div`
  width: 70%;
  height: 70%;
  background: white;
`;
const CloseButton = styled.button``;
const ModalForm = styled.div`
  margin-top: 5%;
  height: 80%;
  border: 1px solid black;
  padding-left: 15%;
`;
const Title = styled.input`
  width: 70%;
  height: 10%;
  font-size: 1.7rem;
  margin-bottom: 2%;
`;

const TextBox = styled.div`
  width: 80%;
  height: 30%;
  margin: 0;
  display: flex;
  .content {
    border: 1px solid black;
  }
`;
const Text = styled.textarea`
  width: 75%;
  height: 100%;
  margin-left: 2%;
  border: none;
  outline: none;
`;
const Date = styled.div`
  display: flex;
  .duedate {
    border: 1px solid black;
    padding-right: 2%;
  }
`;
const DueDate = styled.input`
  margin-left: 2%;
`;
const TagBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 48px;
  width: 70%;
  padding: 0 8px;
  border: 1px solid gray;
  border-radius: 3px;

  .add-tag {
    border: 1px solid black;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .tag {
    width: auto;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 0 6px;
    font-size: 14px;
    list-style: none;
    border-radius: 3px;
    margin: 8px 6px 6px 6px;
    background: gray;

    .tag-close-icon {
      display: block;
      width: 16px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      font-size: 14px;
      margin-left: 8px;
      color: gray;
      border-radius: 50%;
      background: #fff;
      cursor: pointer;
    }
  }
`;
const Tag = styled.input`
  width: 30%;
  height: 100%;
  margin: 2% 0 0 2%;

  :focus {
    outline: transparent;
  }
`;
const AddDate = styled.div``;
const EditDate = styled.div``;
const Check = styled.button``;

function ModalOn({ current, closeHandler, todo, todoList, setTodo, addTodo }) {
  const nowTime = moment().format("YYYY-MM-DD");
  const [newText, setNewText] = useState({
    title: "",
    text: "",
    tag: "",
    date: "",
    dueDate: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewText({
      ...newText,
      [name]: value,
    });
  };

  return (
    <>
      {current.map((el) => {
        return (
          <>
            <ModalBackground>
              <ModalContainer key={el.id}>
                <CloseButton onClick={closeHandler}>닫기</CloseButton>
                <ModalForm>
                  <Title onChange={handleInput} defaultValue={el.title}></Title>
                  <TextBox>
                    <span className="content">상세 내용:</span>
                    <Text defaultValue={el.text}></Text>
                  </TextBox>
                  <Date>
                    <span type="date" className="duedate">
                      마감일:
                    </span>
                    <DueDate type="date" defaultValue={nowTime}></DueDate>
                  </Date>
                  <span className="add-tag">태그 입력:</span>
                  <TagBox>
                    <Tag></Tag>
                  </TagBox>
                  <AddDate></AddDate>
                  <EditDate></EditDate>
                </ModalForm>
                <Check> 수정 </Check>
              </ModalContainer>
            </ModalBackground>
          </>
        );
      })}
    </>
  );
}

export default ModalOn;
