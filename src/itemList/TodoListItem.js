import { useState } from "react";
import styled from "styled-components";
import ModalOn from "./ModalOn";
import moment from "moment";

const Content = styled.div`
  /* border: 1px solid black; */
  height: 100%;
  display: flex;

  overflow: hidden;
  .content-box {
    margin: 2%;
    height: 100%;
    width: 100%;
    /* border: 1px solid black; */
  }
  .title {
    font-size: 1.3rem;
    padding-left: 7%;
  }
  .input-checkbox {
    position: relative;
    bottom: 25%;
  }
  .edit {
    position: relative;
    left: 70%;
    bottom: 25%;
  }
  .tag {
    position: relative;
    padding-left: 7%;
    bottom: 15%;
  }
  .remove {
    position: relative;
    left: 70%;
    bottom: 25%;
  }
  .current-date {
    display: flex;
    position: relative;
    bottom: 8%;
    left: 7%;
  }
  .due-date {
    display: flex;
    position: relative;
    left: 50%;
    bottom: 28%;
  }
`;

const TagBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 20px;
  width: 70%;
  border-radius: 3px;
  .tag {
    width: auto;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 0 8px;
    font-size: 14px;
    list-style: none;
    border-radius: 3px;
    margin-right: 10px;
    background: #54bd54;
  }
`;
//태그 달아줘야됨
const TodoListItem = ({ todo, todoList, setTodo, addTodo, onToggle, arr }) => {
  const [current, setCurrent] = useState([]);

  const { id, active, currentDate, dueDate, tag, text, title } = todoList;

  const onChangeRemove = () => {
    const { id } = todoList;
    const filtered = todo.filter((item) => item.id !== id);
    if (window.confirm("정말 삭제하시겠습니까?")) {
      localStorage.removeItem(id);
      setTodo(filtered);
    }
    return;
  };

  const day = Number(moment().format("DD"));
  const month = Number(moment().format("MM"));
  const year = Number(moment().format("YYYY"));
  const dueDay = arr.map((day) => Object.assign({}, day.dueDate.split("-")));
  const startDay = new Date(year, month, day);
  const endDay = dueDay.map((day) => {
    let endYear = Number(day[0]);
    let endMonth = Number(day[1]);
    let end = Number(day[2]);
    return new Date(endYear, endMonth, end);
  });
  const btMs = endDay.map((el) => el.getTime() - startDay.getTime());
  const btDay = btMs.map((el) => el / (1000 * 60 * 60 * 24));

  // let index;
  let localIdx = [];
  //넘버
  const check = btDay.filter((day, idx) => {
    if (day <= 3) {
      // index = idx + 1;
      localIdx.push(idx + 1);
    }
  });

  localStorage.setItem("num", localIdx);
  const getIdx = localStorage.getItem("num").split(",");
  let numIdxArr = getIdx.filter((el) => {
    let local = Number(el);
    if (local === id) {
      return true;
    } else return false;
  });

  const [isOnOpen, setIsOnOpen] = useState(false);

  const onOpenClick = () => {
    setIsOnOpen(true);
  };

  const onCloseClick = () => {
    setIsOnOpen(false);
  };

  const onEditClick = () => {
    const { id } = todoList;

    let check = todo.filter((item) => item.id === id);
    setCurrent(check);
    onOpenClick();
  };

  return (
    <>
      <Content
        style={{
          background: active ? "#9e9e9e" : "none",
        }}
      >
        <div className="content-box">
          <div
            className="title"
            style={{ textDecoration: active ? "line-through" : "none" }}
          >
            {title}
          </div>
          <input
            className="input-checkbox"
            type="checkbox"
            onClick={() => onToggle(id)}
            defaultChecked={active}
          ></input>

          {active ? (
            <button
              className="edit"
              onClick={onEditClick}
              style={{ visibility: "hidden" }}
            >
              수정
            </button>
          ) : (
            <button className="edit" onClick={onEditClick}>
              수정
            </button>
          )}

          <button className="remove" onClick={onChangeRemove}>
            삭제
          </button>
          <TagBox className="tag">
            {tag.map((tag, idx) => (
              <li
                key={idx}
                className="tag"
                style={{ background: active ? "#cccccc" : "#54bd54" }}
              >
                <span style={{ color: active ? "black" : "white" }}>{tag}</span>
              </li>
            ))}
          </TagBox>
          <div className="current-date"> 생성일 : {currentDate}</div>
          <div
            className="due-date"
            style={{
              textDecoration: active ? "line-through" : "none",
              color: Number(numIdxArr) === id ? "red" : "none",
            }}
          >
            예정 완료시기 : {dueDate}
          </div>
        </div>
      </Content>
      {isOnOpen && (
        <ModalOn
          current={current}
          onCloseClick={onCloseClick}
          todo={todo}
          todoList={todoList}
          setTodo={setTodo}
          addTodo={addTodo}
          title={title}
          text={text}
          tag={tag}
          id={id}
          currentDate={currentDate}
          dueDate={dueDate}
        />
      )}
    </>
  );
};

export default TodoListItem;
