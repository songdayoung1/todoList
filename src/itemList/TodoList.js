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

function TodoList({ todo, setTodo, isOpen, addTodo, reversedOrderedDate }) {
  const [status, setStatus] = useState([]);
  const [todoCheck, setTodoCheck] = useState("전체 보기");
  const [noItem, setNoItem] = useState(false);
  const checkList = ["전체 보기", "셍성일 순", "완료일 순", "완료리스트"];

  const options = checkList.map((fruit) => {
    return <option value={fruit}>{fruit}</option>;
  });

  // useEffect(() => {
  //   todoDefault();
  // }, []);

  const handleSelect = (event) => {
    setTodoCheck(event.target.value);
    if (event.target.value === "전체 보기") {
      // 기본 설정
      return;
    }
    if (event.target.value === "완료리스트") {
      //완료된 항목
      return todoComplete();
    }
    if (event.target.value === "생성일 순") {
      // todo 생성일 순으로 볼 때
      return;
    }
    if (event.target.value === "완료일 순") {
      //  todo 마감일 순으로 볼 때
      return;
    }
  };

  const todoDefault = () => {
    const list = JSON.parse(localStorage.getItem("list"));
    if (list) {
      setStatus(list);
    }
  };

  const todoStart = () => {};

  const todoEnd = () => {};

  const todoComplete = () => {
    const completeList = status.filter((item) => item.active === true);
    if (completeList) {
      setNoItem(false);
      setStatus(completeList);
    } else {
      setNoItem(true);
    }
  };

  const onToggle = (id) => {
    const list = [...todo];
    const result = list.map((user) =>
      user.id === id ? { ...user, active: !user.active } : user
    );

    setTodo(result);
    localStorage.setItem("list", JSON.stringify(result));
  };

  // 생성일 순으로 정렬
  // const orderedDate = () => {
  //  todo.sort(
  //   (a, b) => new Date(a.currentDate) - new Date(b.currentDate)
  // );
  // }

  return (
    <>
      <select onChange={handleSelect}>{options}</select>
      <div>
        {/* {noItem ? <></> : <></>} */}
        {todo.map((todoList, idx) => {
          return (
            <ListContainer key={idx}>
              <TodoListItem
                key={todoList.id}
                todo={todo}
                setTodo={setTodo}
                todoList={todoList}
                isOpen={isOpen}
                addTodo={addTodo}
                onToggle={onToggle}
              />
            </ListContainer>
          );
        })}
      </div>
      <Container>{/* <CheckCalendar /> */}</Container>
    </>
  );
}

export default TodoList;
