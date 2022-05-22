import styled from "styled-components";
import React, { useState } from "react";
import TodoListItem from "./TodoListItem";
import CheckCalendar from "./CheckCalendar";
import { useEffect } from "react";

const ListContainer = styled.div`
  border: 1px solid black;
  width: 40%;
  height: 110px;
  margin: 1% 0 0 12%;
`;
const Container = styled.div`
  /* border: 1px solid black; */
  width: 35%;

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 30%;
  left: 55%;
`;

const CheckBox = styled.div``;
const Start = styled.input``;
const End = styled.input``;
const Complete = styled.input``;
const Tag = styled.input``;

function TodoList({
  closeHandler,
  openModalHandler,
  todo,
  setTodo,
  isOpen,
  addTodo,
  onToggle,
  check,
}) {
  let arr = [];
  for (let i = 1; i < 50; i++) {
    if (JSON.parse(localStorage.getItem(i)) === null) {
      continue;
    } else {
      arr.push(JSON.parse(localStorage.getItem(i)));
    }
  }

  const [todoCheck, setTodoCheck] = useState({
    start: false,
    end: false,
    complete: false,
    tag: false,
  });

  // const onCheck = () => {
  //   if (todoCheck.start) {
  //   }
  // };

  // const onCheckBox = (id) => {
  //   setTodo(
  //     arr.map((user) =>
  //       user.id === id ? { ...user, active: !user.active } : user
  //     )
  //   );
  // };

  //생성일 순 누르면 input태그의 상태가 true, {input 태그의 상태가 트루일때 ? 생성일로 오름차순 정렬 맵 : 일반 정렬}

  return (
    <>
      <div>
        <CheckBox>
          <span>생성일 순</span>
          <Start type="checkbox"></Start>
          <span>완료일 순</span>
          <End type="checkbox"></End>
          <span>완료된 항목</span>
          <Complete type="checkbox"></Complete>
          <span>태그</span>
          <Tag type="checkbox"></Tag>
        </CheckBox>

        {arr.map((todoList, idx) => {
          return (
            <ListContainer key={idx}>
              <TodoListItem
                todo={todo}
                setTodo={setTodo}
                todoList={todoList}
                title={todoList.title}
                tag={todoList.tag}
                currentDate={todoList.date}
                dueDate={todoList.dueDate}
                openModalHandler={openModalHandler}
                closeHandler={closeHandler}
                isOpen={isOpen}
                addTodo={addTodo}
                onToggle={onToggle}
                check={check}
                arr={arr}
              />
            </ListContainer>
          );
        })}
      </div>
      <Container>
        <CheckCalendar todo={todo} />
      </Container>
    </>
  );
}

export default TodoList;
