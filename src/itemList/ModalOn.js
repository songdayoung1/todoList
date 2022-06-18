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

  .add-tag {
    display: flex;
    align-items: center;
    border: none;
    outline: none;
    color: #666666;
    font-size: 1.2rem;
    margin-bottom: 2%;
  }
`;
const CloseButton = styled.button`
  border: none;
  outline: none;
  position: relative;
  left: 92%;
  top: 3%;
  width: 5%;
  height: 5%;
  cursor: pointer;
  background: #cccccc;
  border-radius: 4px;
`;
const ModalForm = styled.div`
  margin-top: 5%;
  height: 80%;
  padding-left: 15%;
`;
const Title = styled.input`
  width: 70%;
  height: 15%;
  font-size: 2.5rem;
  margin: 0;
  border: none;
  font-weight: 700;
`;

const TextBox = styled.div`
  width: 80%;
  height: 30%;
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  color: #666666;
  .content {
  }
`;
const Text = styled.textarea`
  width: 75%;
  height: 100%;
  margin-left: 2%;
  border: none;
  outline: none;
  font-size: 1.2rem;
`;
const Date = styled.div`
  display: flex;
  color: #666666;
  font-size: 1.2rem;
  margin-bottom: 2%;
  .duedate {
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
  border: none;
  outline: none;

  :focus {
    /* outline: transparent; */
  }
`;
const Warning = styled.div`
  width: 400px;
  height: 20px;
  font-size: 0.5rem;
  margin-top: 1%;
  /* justify-content: flex-start; */
  color: red;
`;
const AddDate = styled.div``;
const EditDate = styled.div``;
const Check = styled.button`
  border: none;
  outline: none;
  position: relative;
  left: 45%;
  bottom: 7%;
  width: 10%;
  height: 5%;
  cursor: pointer;
  background: #cccccc;
  border-radius: 4px;
`;

function ModalOn({ current, todo, todoList, onCloseClick, setTodo }) {
  const { title, text, tag, dueDate, id } = todoList;
  const [tags, setTags] = useState([...tag]); // ['아주 중요']
  const [newText, setNewText] = useState({ ...todoList });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setNewText({
      ...newText,
      [name]: value,
    });
  };

  const removeTags = (indexToRemove) => {
    const newTag = [...tags];
    const removetags = newTag.filter((el) => newTag[indexToRemove] !== el);
    setTags(removetags);
  };

  const addTags = (e) => {
    const newTag = [...tags];
    const filter = newTag.filter((el) => el === e.target.value);
    if (e.target.value !== "" && filter.length === 0) {
      if (newTag.length < 4) {
        setTags([...newTag, e.target.value]);
      }
    }
    e.target.value = "";
  };

  //
  const checkText = (title) => {
    const validation = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s]+$/;
    return validation.test(title);
  };

  const newHandleChange = () => {
    const newTodo = [...todo];
    const result = newTodo.map((item) => {
      if (item.id === id) {
        item.id = newText.id;
        item.title = newText.title;
        item.text = newText.text;
        item.tag = tags;
        item.currentDate = newText.currentDate;
        item.dueDate = newText.dueDate;
      }
      return item;
    });

    setTodo([...result]);
    localStorage.setItem("list", JSON.stringify(result));
    onCloseClick();
  };

  return (
    <>
      <ModalBackground>
        <ModalContainer>
          <CloseButton onClick={onCloseClick}>닫기</CloseButton>
          <ModalForm>
            <Title
              onChange={handleInput}
              name="title"
              defaultValue={title}
            ></Title>
            {checkText(title) || !title ? (
              <Warning></Warning>
            ) : (
              <Warning>특수문자는 입력할 수 없습니다.</Warning>
            )}

            <TextBox>
              <span className="content">상세 내용:</span>
              <Text
                onChange={handleInput}
                name="text"
                defaultValue={text}
              ></Text>
            </TextBox>
            <Date>
              <span type="date" className="duedate">
                마감일:
              </span>
              <DueDate
                type="date"
                name="dueDate"
                defaultValue={dueDate}
              ></DueDate>
            </Date>
            <span className="add-tag">태그 입력:</span>
            <TagBox>
              {tags.map((tag, index) => (
                <li key={index} className="tag">
                  <span className="tag-title">{tag}</span>
                  <span
                    onClick={() => removeTags(index)}
                    className="tag-close-icon"
                  >
                    &times;
                  </span>
                </li>
              ))}
              <Tag
                placeholder="태그를 작성해보세요."
                onKeyUp={(e) => (e.key === "Enter" ? addTags(e) : null)}
                name="tag"
                onChange={handleInput}
              ></Tag>
            </TagBox>
            <AddDate></AddDate>
            <EditDate></EditDate>
          </ModalForm>
          <Check onClick={newHandleChange}> 수정 </Check>
        </ModalContainer>
      </ModalBackground>
    </>
  );
}

export default ModalOn;
