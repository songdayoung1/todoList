import { useState } from "react";
import TodoList from "./itemList/TodoList";
import Header from "./itemList/Header";
import { useEffect } from "react";

function App() {
  const [todo, setTodo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getLocalStorage();
  }, []);

  const openModalHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  const getLocalStorage = () => {
    const list = JSON.parse(localStorage.getItem("list"));

    if (list) {
      setTodo(list);
    }
  };

  const addTodo = (newTodo) => {
    const list = JSON.parse(localStorage.getItem("list"));

    if (list) {
      setTodo([...list, newTodo]);
      localStorage.setItem("list", JSON.stringify([...list, newTodo]));
    } else {
      setTodo([newTodo]);
      localStorage.setItem("list", JSON.stringify([newTodo]));
    }

    // 먼저  'list' 로컬스토리지를 불러온다.
    // 'list'가 있나없나 체크 해야된다.
    // 'list'에 값이 있으면 => localStorage.setItem
    // 만약 값이 없으면 그냥 바로 setTodo(값) 을 넣어준다. => localStorage.setItem
  };

  // 완료일 순으로 정렬
  // const reversedOrderedDate = () => {
  //   const arr = [...todo];
  //   arr.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  // };

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
        setTodo={setTodo}
        todo={todo}
        openModalHandler={openModalHandler}
        closeHandler={closeHandler}
        addTodo={addTodo}
      ></TodoList>
      {/* // <ModalOn /> */}
    </>
  );
}

export default App;
