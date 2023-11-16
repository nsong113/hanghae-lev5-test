// import { addTodo, deleteTodo } from "./redux/modules/todosSlice";

export const waitTwoSeconds = (payload, thunkAPI, actionCreator) =>
  //promise: 처리가 끝나면 알려달라는 약속
  //new연산자로 호출한 promise의 인자로 넘어가는 콜백은 바로 실행됨
  //내부에 resolve, reject가 있다.
  //then, catch 로 트레킹 가능

  new Promise((resolve) => {
    setTimeout(() => {
      thunkAPI.dispatch(actionCreator(payload));
      resolve(payload);
    }, 2000);
  });
