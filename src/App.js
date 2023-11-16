import React, { useState } from "react";
import {
  Button,
  InputContainer,
  PageWrapper,
  TodoCard,
  TodoContainer,
  TodoHeader,
  TodoListContainer,
} from "./components/styles";
import nextId from "react-id-generator";
import { useDispatch, useSelector } from "react-redux";
import {
  __addToDo,
  __deleteTodo,
  __resetTodo,
} from "./redux/modules/todosSlice";

function App() {
  const id = nextId();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.list);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onAddTodo = () => {
    //여기서 dispatch를 사용해서 action creator를 호출 payload 담아서 보내기
    dispatch(__addToDo({ title, body, id }));
    /**
     * 시험 문제 1.
     * 이곳에서 추가하기 기능을 구현해주세요.
     */
  };

  const onDeleteTodo = (id) => {
    dispatch(__deleteTodo(id));
    console.log("payload", id);
    /**
     * 시험 문제 2.
     * 이곳에서 삭제하기 기능을 구현해주세요.
     */
  };

  const resetInputs = (todos) => {
    /**
     * 입력 값을 초기화하고 싶다면 사용하세요.
     */
    dispatch(__resetTodo(todos));
    setTitle("");
    setBody("");
  };
  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeBody = (e) => setBody(e.target.value);
  return (
    <PageWrapper>
      <TodoContainer>
        <TodoHeader>🐢 SLOW TODO LIST 🐢</TodoHeader>
        <InputContainer>
          <span>제목: </span>
          <input
            value={title}
            placeholder="할 일 제목"
            onChange={onChangeTitle}
          />
          <span>내용: </span>
          <input
            value={body}
            placeholder="할 일 내용"
            onChange={onChangeBody}
          />

          <Button onClick={onAddTodo}>+ 추가하기</Button>
          <Button onClick={resetInputs}> 리셋하기</Button>
        </InputContainer>
        <TodoListContainer>
          {todos.map((todo) => (
            <TodoCard key={todo.id}>
              <span>제목: {todo.title}</span>
              <span>할 일: {todo.body}</span>
              <Button onClick={() => onDeleteTodo(todo.id)}>삭제하기</Button>
            </TodoCard>
          ))}
        </TodoListContainer>
      </TodoContainer>
    </PageWrapper>
  );
}

export default App;
