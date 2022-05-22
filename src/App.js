import { useState } from "react";
import TodoList from "./itemList/TodoList";
import Header from "./itemList/Header";

function App() {
  const [todo, setTodo] = useState([
    {
      id: 1,
      title: "오늘의 할 일",
      text: "오늘의 내용",
      currentDate: "2022-05-21",
      dueDate: "2022-05-25",
      tag: ["조금 중요"],
      active: false,
      checked: false,
    },
    {
      id: 2,
      title: "어제의 할 일",
      text: "어제의 내용",
      currentDate: "2022-05-20",
      dueDate: "2022-05-30",
      tag: ["아주 중요"],
      active: false,
      checked: false,
    },
    {
      id: 3,
      title: "내일의 할 일",
      text: "내일의 내용",
      currentDate: "2022-05-21",
      dueDate: "2022-05-27",
      tag: ["긴급"],
      active: false,
      checked: false,
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

  const reversedOrderedDate = arr.sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  const onToggle = (id) => {
    setTodo(
      arr.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  return (
    <>
      <Header
        addTodo={addTodo}
        todo={todo}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
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
        reversedOrderedDate={reversedOrderedDate}
      ></TodoList>
      {/* // <ModalOn /> */}
    </>
  );
}

export default App;
