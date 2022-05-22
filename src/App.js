import { useState } from "react";
import TodoList from "./itemList/TodoList";
import Header from "./itemList/Header";
import moment from "moment";
import { useEffect } from "react";

function App() {
  const [todo, setTodo] = useState([
    {
      id: 1,
      title: "제목",
      text: "확인",
      date: "2022-05-19",
      dueDate: "2022-05-23",
      tag: ["조금 중요"],
      active: false,
      hurryUp: false,
    },
    {
      id: 2,
      title: "제목입니다.",
      text: "확인입니다",
      date: "2022-05-11",
      dueDate: "2022-05-30",
      tag: ["빨간색"],
      active: false,
      hurryUp: false,
    },
    {
      id: 3,
      title: "제목하나 더",
      text: "확인도 한번 더 ",
      date: "2022-05-13",
      dueDate: "2022-05-27",
      tag: ["내일까지"],
      active: false,
      hurryUp: false,
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  todo.map((item) => {
    localStorage.setItem(`${item.id}`, JSON.stringify(item));
  });

  const addTodo = (newTodo) => {
    setTodo([...todo, newTodo]);
  };

  let arr = [];
  for (let i = 1; i < 50; i++) {
    if (JSON.parse(localStorage.getItem(i)) === null) {
      continue;
    } else {
      arr.push(JSON.parse(localStorage.getItem(i)));
    }
  }

  const onToggle = (id) => {
    setTodo(
      arr.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const nowTime = moment().format("YYYY-MM-DD").slice(-2);
  const orderedDate = todo.sort((a, b) => new Date(a.date) - new Date(b.date));
  const reversedOrderedDate = todo.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      <Header
        addTodo={addTodo}
        todo={todo}
        isOpen={isOpen}
        openModalHandler={openModalHandler}
        closeHandler={closeHandler}
      ></Header>
      <TodoList
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        todo={todo}
        setTodo={setTodo}
        openModalHandler={openModalHandler}
        closeHandler={closeHandler}
        addTodo={addTodo}
        onToggle={onToggle}
      ></TodoList>
      {/* // <ModalOn /> */}
    </>
  );
}

export default App;
