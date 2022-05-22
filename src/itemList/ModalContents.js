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
    /* border: 1px solid black; */
    height: 100%;
    display: flex;
    align-items: center;
    border: none;
    outline: none;
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
  border: none;
  outline: none;

  /* :focus {
    outline: transparent;
  } */
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
const Check = styled.button``;

function ModalContents({ closeHandler, addTodo, todo }) {
  const [input, setInput] = useState({
    title: "",
    text: "",
    tag: "",
    date: "",
    dueDate: "",
  });
  const nowTime = moment().format("YYYY-MM-DD");
  const [tags, setTags] = useState(["아주 중요"]);
  const { title, text, tag } = input;

  const removeTags = (indexToRemove) => {
    const removetags = tags.filter((el) => tags[indexToRemove] !== el);
    setTags(removetags);
  };

  const addTags = (e) => {
    const filter = tags.filter((el) => el === e.target.value);
    // console.log(filter, "filter");
    if (e.target.value !== "" && filter.length === 0) {
      if (tags.length < 4) {
        setTags([...tags, e.target.value]);
      }
    }
    e.target.value = "";
  };

  const checkText = (title) => {
    // const validation = /^[~!@#$%^&*()_+|<>?:{}]/;
    const validation = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    return validation.test(title);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onButtonClick = () => {
    let newTodo = {
      id: todo.length + 1,
      title: input.title,
      tag: tags,
      text: input.text,
      date: nowTime,
      dueDate: input.date,
    };
    if (!newTodo.title || !newTodo.text || !newTodo.date) {
      alert("빈 내용을 채워주세요!");
    } else {
      addTodo(newTodo);
      // localStorage.setItem(`${newTodo.id}`, JSON.stringify(newTodo));
      closeHandler();
    }
  };

  return (
    <>
      <ModalBackground>
        <ModalContainer>
          <CloseButton onClick={closeHandler}>닫기</CloseButton>
          <ModalForm>
            <Title
              placeholder="제목 없음"
              onChange={handleInput}
              name="title"
              value={title}
            ></Title>
            {checkText(input.title) || !input.title ? (
              <Warning></Warning>
            ) : (
              <Warning>특수문자는 입력할 수 없습니다.</Warning>
            )}
            <TextBox>
              <span className="content">상세 내용:</span>
              <Text
                type="text"
                placeholder="내용을 입력해주세요."
                onChange={handleInput}
                name="text"
                value={text}
              ></Text>
            </TextBox>
            <Date>
              <span className="duedate">마감일:</span>
              <DueDate
                id="offerdate"
                type="date"
                // defaultValue={nowTime}
                name="date"
                onChange={handleInput}
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
                onChange={handleInput}
                onKeyUp={(e) => (e.key === "Enter" ? addTags(e) : null)}
                name="tag"
                value={tag}
              ></Tag>
            </TagBox>
            <AddDate></AddDate>
            <EditDate></EditDate>
          </ModalForm>
          <Check onClick={onButtonClick}>일정 등록</Check>
        </ModalContainer>
      </ModalBackground>
    </>
  );
}

export default ModalContents;
