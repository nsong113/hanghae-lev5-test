import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from "../../utils";

//1. 쳥크 함수를 만들기- createAsyncThunk -RTK 내장함수
//쳥크 이름은 보통 앞에 __를 둔다.
//('이름', 콜백함수)
export const __addToDo = createAsyncThunk(
  "__addToDo",
  //(컴포넌트에서 보내 줄 페이로드, 쳥크에서 가지고 있는 내장 api)
  async (payload, thunkAPI) => {
    //수행하고 싶은 동작을 넣기 : 2초를 기다리게 할 예정
    waitTwoSeconds(payload, thunkAPI, addTodo);
  }
);

export const __resetTodo = createAsyncThunk(
  "__resetToDo",
  async (payload, thunkAPI) => {
    waitTwoSeconds(payload, thunkAPI, resetTodo);
  }
);

export const __deleteTodo = createAsyncThunk(
  "__deleteToDo",
  async (payload, thunkAPI) => {
    waitTwoSeconds(payload, thunkAPI, deleteTodo);
  }
);

const initialState = {
  list: [],
};

//2. createSlice안에 extraReducer에 thunk 등록
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list = [
        ...state.list,
        {
          title: action.payload.title,
          body: action.payload.body,
          id: action.payload.id,
        },
      ];
    },
    resetTodo: (state, action) => {
      state.list = [];
    },
    deleteTodo: (state, action) => {
      console.log(state);
      console.log(action);
      const deleteItem = state.list.filter((a) => {
        return a.id !== action.payload;
      });
      console.log(deleteItem);
      state.list = [...deleteItem];
    },
  },
});

//3. dispatch 하기 이 안에 함수를 넣을 것

export const { addTodo, deleteTodo, resetTodo } = todosSlice.actions;
export default todosSlice.reducer;
