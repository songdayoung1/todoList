import styled from "styled-components";
import React, { useState } from "react";
import TodoListItem from "./TodoListItem";
import CheckCalendar from "./CheckCalendar";

const ListContainer = styled.div`
  border: 1px solid black;
  width: 40%;
  height: 110px;
  margin: 1% 0 0 12%;
`;
const Container = styled.div`
  width: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 25%;
  left: 55%;
`;

const CheckBox = styled.div`
  margin: 1% 0 0 12%;
`;
const Start = styled.input``;
const End = styled.input``;
const Complete = styled.input``;
const Tag = styled.input``;

function TodoList({
  todo,
  setTodo,
  isOpen,
  addTodo,
  onToggle,
  reversedOrderedDate,
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

  const onCheckBox = (e) => {
    if (e.target.value === "start") {
      setTodoCheck({
        ...todoCheck,
        start: !todoCheck.start,
      });
    }
    if (e.target.value === "end") {
      setTodoCheck({
        ...todoCheck,
        end: !todoCheck.end,
      });
    }
    if (e.target.value === "complete") {
      setTodoCheck({
        ...todoCheck,
        complete: !todoCheck.complete,
      });
    }
    if (e.target.value === "tag") {
      setTodoCheck({
        ...todoCheck,
        tag: !todoCheck.tag,
      });
    }
  };

  // const orderedDate = arr.sort(
  //   (a, b) => new Date(a.currentDate) - new Date(b.currentDate)
  // );

  return (
    <>
      <div>
        <CheckBox>
          <span>생성일 순</span>
          <Start
            type="checkbox"
            defaultChecked={todoCheck.start}
            value="start"
            onClick={onCheckBox}
          ></Start>
          <span>완료일 순</span>
          <End
            type="checkbox"
            defaultChecked={todoCheck.end}
            value="end"
            onClick={onCheckBox}
          ></End>
          <span>완료된 항목</span>
          <Complete
            type="checkbox"
            defaultChecked={todoCheck.complete}
            value="complete"
            onClick={onCheckBox}
          ></Complete>
          <span>태그</span>
          <Tag
            type="checkbox"
            defaultChecked={todoCheck.tag}
            value="tag"
            onClick={onCheckBox}
          ></Tag>
        </CheckBox>
        {todoCheck.end
          ? reversedOrderedDate.map((todoList) => (
              <ListContainer key={todoList.id}>
                <TodoListItem
                  todo={todo}
                  setTodo={setTodo}
                  todoList={todoList}
                  isOpen={isOpen}
                  addTodo={addTodo}
                  onToggle={onToggle}
                  arr={arr}
                />
              </ListContainer>
            ))
          : arr.map((todoList, idx) => {
              return (
                <ListContainer key={idx}>
                  <TodoListItem
                    todo={todo}
                    setTodo={setTodo}
                    todoList={todoList}
                    isOpen={isOpen}
                    addTodo={addTodo}
                    onToggle={onToggle}
                    arr={arr}
                  />
                </ListContainer>
              );
            })}
      </div>
      <Container>
        <CheckCalendar arr={arr} />
      </Container>
    </>
  );
}

export default TodoList;
