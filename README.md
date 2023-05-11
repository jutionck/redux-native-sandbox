# State Management Redux Toolkit (Vanilla JS)

## Awal

Hal yang perlu diperhatikan pada dokumen ini:

1. Dokumen ini ditunjukan full menggunakan `redux toolkit` harapanya untuk memahami sebelum ini silahkan pindah branch ke `main`.
2. Redux toolkit sendiri adalah bagian dari `redux` core jadi keseluruhan kode yang ada dalam redux core dapat digunakan juga pada `redux toolkit`.
3. Pebedaan mendasar pada `redux toolkit` adalah tidak perlu lagi kita membuat sebuah `action` penggantinya adalah `slice`.

Jadi sebelum lanjut struktur project saat ini adalah sebagai berikut:

```txt
node_modules/
src/
  Goal
    - GoalReducer.js
    - GoalSlice.js
  Todo
    - TodoReducer.js
    - TodoSlice.js
index.js
.gitignore
packge-lock.json
package.json
README.md
```

## Slice

Karena Redux Toolkit sudah tidak menggunakan `action` lagi jadi penggantinya adalah sebuah slice.

Buka file `GoalSlice.js` isi kode sebagai berikut:

```js
import pkg from "@reduxjs/toolkit";
const { createSlice } = pkg;

const goalsSlice = createSlice({
  name: "goals",
  initialState: [],
  reducers: {
    addGoalActionCreator: (state, action) => {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
      });
    },
    deleteGoalActionCreator: (state, action) => {
      return state.filter(({ id }) => id !== action.payload.id);
    },
  },
});

export const { addGoalActionCreator, deleteGoalActionCreator } =
  goalsSlice.actions;
export { goalsSlice };
```

Penjelasan:

- Kode tersebut merupakan implementasi sebuah slice pada Redux menggunakan library `@reduxjs/toolkit.` Slice sendiri adalah konsep yang digunakan untuk memecah atau mengelompokkan reducer ke dalam satu tempat yang sama dengan action dan selector yang berkaitan, sehingga memudahkan pengelolaan state pada aplikasi.
- Pada kode tersebut, kita membuat sebuah slice bernama goalsSlice yang berisi reducer dan state yang terkait dengan pengelolaan goals pada aplikasi. Slice ini memiliki nama `"goals"` dan initialState yang berupa array kosong.
- Reducer dalam slice ini terdiri dari 2 action creators, yaitu `addGoalActionCreator` dan `deleteGoalActionCreator`. `addGoalActionCreator` digunakan untuk menambahkan goal baru ke dalam state, sedangkan `deleteGoalActionCreator` digunakan untuk menghapus goal dari state. Kedua action creator tersebut menerima sebuah action yang berisi informasi yang dibutuhkan untuk melakukan aksi terkait.
- Dalam implementasinya, action creator `addGoalActionCreator` akan memodifikasi state yang sudah ada dengan menambahkan goal baru ke dalam array state menggunakan method push. Sementara itu, action creator `deleteGoalActionCreator` akan mengembalikan state baru dengan melakukan filter pada array state berdasarkan id yang diberikan dalam action. State baru ini berisi elemen array yang id-nya tidak sama dengan id goal yang diberikan.
- Setelah itu, action creator dan slice tersebut diekspor agar bisa digunakan pada file lain dalam aplikasi.

Berikutnya buka file `TodoSlice.js` kemudian buat seperti berikut:

```js
import pkg from "@reduxjs/toolkit";
const { createSlice } = pkg;

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodoActionCreator: (state, action) => {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        completed: false,
      });
    },
    toggleTodoActionCreator: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      todo.completed = !todo.completed;
    },
    removeTodoActionCreator: (state, action) => {
      return state.filter(({ id }) => id !== action.payload.id);
    },
  },
});

export const {
  addTodoActionCreator,
  toggleTodoActionCreator,
  removeTodoActionCreator,
} = todosSlice.actions;
export { todosSlice };
```

## Reducer

Buka file `TodoReducer.js` isi kode sebagai berikut:

```js
import { todosSlice } from "./TodoSlice.js";

const TodosReducer = todosSlice.reducer;
export default TodosReducer;
```

Kemudian buka file `GoalReducer.js` isi kode sebagai berikut:

```js
import { goalsSlice } from "./GoalSlice.js";

const GoalsReducer = goalsSlice.reducer;
export default GoalsReducer;
```

## Root

Kemudian pada file `index.js` modifikasi menjadi berikut:

```js
import pkg from "@reduxjs/toolkit";
const { configureStore } = pkg;
import TodosReducer from "./Todo/TodoReducer.js";
import GoalsReducer from "./Goal/GoalReducer.js";
import {
  addTodoActionCreator,
  removeTodoActionCreator,
  toggleTodoActionCreator,
} from "./Todo/TodoSlice.js";
import {
  addGoalActionCreator,
  deleteGoalActionCreator,
} from "./Goal/GoalSlice.js";

// consume
const store = configureStore({
  reducer: {
    todos: TodosReducer,
    goals: GoalsReducer,
  },
});

// getting the state
store.getState();

// subscribe state changed
store.subscribe(() => {
  console.log("state changed!", store.getState());
});

// Todo
store.dispatch(
  addTodoActionCreator({
    id: 1,
    name: "Learn React",
  })
);

store.dispatch(
  addTodoActionCreator({
    id: 2,
    name: "Learn Redux",
  })
);

store.dispatch(
  addTodoActionCreator({
    id: 3,
    name: "Learn JavaScript",
  })
);

// menghapus todo dengan id 3
store.dispatch(removeTodoActionCreator({ id: 3 }));

// mengubah Learn React menjadi complete
store.dispatch(toggleTodoActionCreator({ id: 1 }));

// Goal
store.dispatch(
  addGoalActionCreator({
    id: 1,
    text: "Get a Doctorate",
  })
);

store.dispatch(
  addGoalActionCreator({
    id: 2,
    text: "Be an Entrepreneur",
  })
);

// menghapus goal dengan id 1
store.dispatch(deleteGoalActionCreator({ id: 1 }));
```

## Run

Jalankan program di console:

```bash
npm start
```
