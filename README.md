# State Management Redux (Vanilla JS)

# Awal

Berbicara tentang state management adalah menjadi bahasan yang sangat krusial dan penting. Mengapa? karena dalam pengembangan sebuah aplikasi Front-End kewajiban kita harus paham apa apa, bagaiamana dan cara untuk melakukan manajeman state dalam aplikasi yang dibuat, karena aplikasi Front-End sebenernya terdiri dari sebuah **UI** dan **STATE** terkhusus untuk **React.JS**.

Berbicara tentang state management, mengetahui dan penggunaan **Redux** sangatlah penting, karena Redux itu sendiri menyediakan solusi yang solid, stabil, dan matang untuk masalah pengelolaan state, khususnya pada aplikasi React. Melalui beberapa konsep yang ada di dalamnya, Redux dapat mengubah keruwetan dalam pengelolaan state menjadi sangat terkelola, terprediksi, dan mudah dipahami melalui sintaksis JavaScript modern.

## Persiapan

Buka terminal lakukan npm init:

```bash
npm init --y
```

Kemudian tambahkan `type:"module"` dan buat script `start` pada `packge.json`. Setelah itu buat folder `src`. Detailnya sebagai berikut:

```json
{
  "name": "redux-native-sandbox",
  "version": "1.0.0",
  "description": "# Awal",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node src/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module"
}
```

## State Container (Store)

Pada dasarnya, aplikasi terdiri dari dua hal, yaitu UI dan state. Keduanya harus saling sinkron agar aplikasi dapat berjalan sesuai harapan. Keduanya harus saling sinkron agar aplikasi dapat berjalan sesuai harapan. Contohnya, bila ada aplikasi yang menampilkan daftar to-do, kemudian user mengubah state seperti menambahkan to-do baru, UI harus mengadaptasi perubahannya dan menampilkan to-do baru ke dalam daftar.

Kadangkala bugs pada aplikasi terjadi karena UI dan state sudah tidak sinkron lagi. Hal ini bisa terjadi karena perubahan state yang tidak terprediksi. Contohnya, ketika aplikasi berharap state berubah menjadi X, tetapi malah menjadi Y. Biasanya, jika UI dan state sudah tidak sinkron lagi, solusinya adalah mereset aplikasi tersebut agar UI dan state kembali ke keadaan semula.

Jadi **Store** adalah sebuah konsep yang menampung state tree dan antarmuka, seperti mengambil nilai state, men-subscribe perubahan nilai state, dan memperbarui nilai state. Dalam store inilah state dari aplikasi hidup dan dikelola.

Kegunaan dari Store adalah:

1. State Tree (state).
2. Mendapatkan nilai state.
3. Men-subscribe perubahan nilai state.
4. Mengubah nilai state.

Mari kita buat dahulu store nya, buat 2 buah file dalam folder `src` dengan nama `CreateStore.js` dan `index.js`. Pertama pada file `CreateStore.js` kodenya adalah sebagai berikut:

```js
function createStore() {
  /**
   * Store memiliki 4 hal
   * 1. State
   * 2. Mendapatkan state
   * 3. Men-subscribe perubahan state
   * 4. Memperbarui state
   */

  let state;
  // subscriptions -> menampung seluruh listener proses subscription
  let listeners = [];

  const getState = () => state;

  // proses subscribe untuk memasukkan listener ke dalam arrray listeners
  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      // proses un-subscribe
      listeners = listeners.filter((listenerItem) => listenerItem !== listener);
    };
  };

  // the store
  return {
    getState,
    subscribe,
  };
}

export { createStore };
```

Kemudian pada file `index.js` kodenya adalah sebagai berikut:

```js
import { createStore } from "./CreateStore";

// consume
const store = createStore();

// getting the state
store.getState();

// subscribe state changed
store.subscribe(() => {
  console.log("state changed!", store.getState());
});
```

## Action

Tujuan akhir dari pemisahan antara UI dan state adalah meningkatkan prediktabilitas saat state berubah. Oleh sebab itu, selain memisahkan state, kita butuh memperketat cara memperbaruinya agar lebih terkendali. Salah satunya dengan mendefinisikan kejadian-kejadian (events) yang boleh menyebabkan state tersebut berubah. Contoh, jika state adalah data to-do list, event yang boleh dilakukan adalah menambahkan, menandai selesai, dan menghapus to-do. Redux menyebut event tersebut dengan istilah action.

Action dibutuhkan oleh store untuk memperbarui state. Bentuk dari action sebenarnya hanyalah objek JavaScript yang menampung informasi cara state harus diubah. Redux sendiri menetapkan convention bahwa objek action setidaknya harus memiliki satu properti, yaitu **type.** Nilai dari properti type merepresentasikan tipe event yang akan dilakukan, bentuknya bisa seperti `ADD_TODO`, `TOGGLE_TODO`, ataupun `REMOVE_TODO`.

Berikutnya buat file baru dalam folder `src` dengan nama `Action.js` kode nya adalah sebagai berikut:

```js
function addTodoActionCreator({ id, name, complete }) {
  return {
    type: "ADD_TODO",
    payload: {
      id,
      name,
      complete,
    },
  };
}

function toggleTodoActionCreator(id) {
  return {
    type: "TOGGLE_TODO",
    payload: {
      id,
    },
  };
}

function removeTodoActionCreator(id) {
  return {
    type: "REMOVE_TODO",
    payload: {
      id,
    },
  };
}

export {
  addTodoActionCreator,
  toggleTodoActionCreator,
  removeTodoActionCreator,
};
```

## Reducer Function

Saat ini, kita sudah mengenal action sebagai objek yang dibutuhkan untuk mengubah state, kita juga sudah mengenal store sebagai tempat menampung state aplikasi. Selanjutnya, kita perlu memikirkan cara agar dua konsep ini bisa saling berinteraksi dan menciptakan perubahan state yang terprediksi, tetapi bagaimana caranya, ya?

![Reducer Funciton](https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/academy/dos:1c8856efe5ac571860626bdd42cd9a5620221110074032.png)

Sebelum masuk lebih lanjut, kita harus memahami apa itu `pure function` kenapa demikian, karena reducer yang baik itu bersifat `pure` alasannya adalah untuk meningkatkan prediktabilitas.

### Pure Function

Contoh sederhana pure function:

```js
function multiply(operand1, operand2) {
  return operand1 * operand2;
}
```

Penjelasan:

- Fungsi multiply() merupakan pure function karena hasil dari pemanggilannya akan selalu sama bila kita memberikan argumen yang sama. Tidak ada ketergantungan dari hal lain untuk menghasilkan nilainya. Jadi, kita bisa memprediksi nilai yang dihasilkan setiap kali menggunakannya.

Contoh lain (bukan `pure`):

```js
const taxPercentage = 0.1;

function calculateTax(amount) {
  return amount * taxPercentage;
}
```

Penjelasan:

- Fungsi calculateTax() bukanlah pure function karena dalam menghasilkan sebuah nilai, ia memiliki ketergantungan terhadap nilai taxPercentage yang berasal dari luar fungsi. Kita tidak bisa memprediksi hasilnya jika kita tidak tahu berapa nilai persentase pajak saat ini.

Solusinya jika ingin menjadi `pure` adalah sebagai berikut:

```js
function calculateTax(amount, taxPercentage = 0.1) {
  return amount * taxPercentage;
}
```

Selain itu, pure function tidak boleh menimbulkan efek samping, termasuk mengubah nilai argumen yang notabene nilai tersebut berasal dari luar.

Contohnya (pada `object`):

```js
const oldCar = {
  license: "a 11 aaa",
  manufacture: "Tesla",
  type: "Model S",
};

// impure function
function cloneCarWithNewLicense(car, newLicense) {
  car.license = newLicense;
  return car;
}

const newCar = cloneCarWithNewLicense(oldCar, "b 11 bbb");

console.log(oldCar.license); // b 11 bbb
console.log(newCar.license); // b 11 bbb
```

Solusinya adalah sebagai berikut:

```js
const oldCar = {
  license: "a 11 aaa",
  manufacture: "Tesla",
  type: "Model S",
};

// pure function
function cloneCarWithNewLicense(car, newLicense) {
  return { ...car, license: newLicense };
}

const newCar = cloneCarWithNewLicense(oldCar, "b 11 bbb");

console.log(oldCar.license); // a 11 aaa
console.log(newCar.license); // b 11 bbb
```

Jadi, untuk menghubungkan store dengan action, kita membutuhkan fungsi bersifat pure, alasannya adalah untuk meningkatkan prediktabilitas. Fungsi tersebut harus bisa menghasilkan state baru berdasarkan kalkulasi dari state saat ini dan action yang kita berikan. Redux menyebut pure function ini dengan sebutan ”reducer”.

![](https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/academy/dos:d9c6536876a36a2cd5fb373acc3bbb4820221110074055.png)

Reducer merupakan fungsi yang menerima nilai current state dan action sebagai argumen, lalu ia mengembalikan nilai state baru sebagai hasil perubahan berdasarkan action.type.

Berikutnya buat file baru di folder `src` dengan nama `Reducer.js` kodenya adalah sebagai berikut:

```js
function todosReducer(todos = [], action = {}) {
  if (action.type === "ADD_TODO") {
    return [...todos, action.payload];
  }

  if (action.type === "TOGGLE_TODO") {
    return todos.map((todo) => {
      if (todo.id === action.payload.id) {
        return { ...todo, complete: !todo.complete };
      }

      return todo;
    });
  }

  if (action.type === "REMOVE_TODO") {
    return todos.filter(({ id }) => id !== action.payload.id);
  }

  return todos;
}

export { todosReducer };
```

Dari contoh fungsi di atas, Anda bisa lihat bahwa todosReducer() menerima dua argumen, yaitu todos dan action. Argumen todos merupakan current state, kondisi ketika nilai default pada argumen tersebut menjadi nilai awal state. Kemudian, argumen action merupakan objek JavaScript yang berisi informasi cara state harus diubah. Selain itu, Anda juga bisa melihat bahwa todosReducers() selalu mengembalikan nilai baru daripada mengubah nilai state sebelumnya secara langsung, hal ini guna menghindari adanya efek samping.

## Dispatch

Bertugas untuk men-trigger store untuk mengubah state sesuai dengan action yang diberikan pada argumen. Selain itu, dispatch juga akan memanggil seluruh listeners dalam store dengan tujuan untuk memberitahu bahwa state dalam store berubah. Jadi, nantinya UI bisa secara reaktif me-render setiap kali ada perubahan state.

Buka file `CreateStore.js` tambahkan fungsi `dispatch` kodenya adalah sebagai berikut:

```js
const dispatch = (action) => {
  state = reducer(state, action);
  listeners.forEach((listener) => listener());
};

// the store
return {
  getState,
  subscribe,
  dispatch,
};
```

Kemudian pada funcion `CreateStore` kita tambahkan sebuah argumen yang menerima sebuah `reducer` kodenya adalah sebagai berikut:

```js
function createStore(reducer) {}
```

Buka file `Action.js` ubah menjadi berikut:

```js
function addTodoActionCreator({ id, name }) {
  return {
    type: "ADD_TODO",
    payload: {
      id,
      name,
      complete: false,
    },
  };
}

function toggleTodoActionCreator(id) {
  return {
    type: "TOGGLE_TODO",
    payload: {
      id,
    },
  };
}

function removeTodoActionCreator(id) {
  return {
    type: "REMOVE_TODO",
    payload: {
      id,
    },
  };
}

export {
  addTodoActionCreator,
  toggleTodoActionCreator,
  removeTodoActionCreator,
};
```

Terakhir pada file `index.js` buat seperti berikut:

```js
import { addTodoActionCreator, removeTodoActionCreator } from "./Action.js";
import { createStore } from "./CreateStore.js";
import { todosReducer } from "./Reducer.js";

// consume
const store = createStore(todosReducer);

// getting the state
store.getState();

// subscribe state changed
const unsubscribe = store.subscribe(() => {
  console.log("state changed!", store.getState());
});

// coba 1 per satu ya
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
store.dispatch(removeTodoActionCreator(3));

// mengubah Learn React menjadi complete
store.dispatch(toggleTodoActionCreator(1));
```

Jalankan pada `console`

```bash
node src/index.js
```

Langkah demi langkah sudah kita lalui untuk membangun fungsi `createStore()`, tetapi ketahuilah bahwa `createStore()` sebenarnya merupakan fungsi yang ada dalam library Redux. Kami sangat mengapresiasi usaha Anda yang sudah bertahan hingga tahap ini karena membuat dan memahami fungsi `createStore()` bukanlah hal yang mudah. Wajar bila Anda sulit dalam mengikutinya. Namun, dengan membuat fungsi tersebut dari awal, semoga Anda bisa memahami secara mendalam cara kerja store dalam mengelola state pada Redux.

## Root Reducer (Multiple Reducer)

Pada latihan sebelumnya, kita sudah berhasil membuat fungsi `createStore()`, tetapi store yang dihasilkan hanya mengelola satu state saja, yaitu todos. Nah, sekarang kita akan coba buat aplikasi lebih kompleks lagi dengan menambahkan state baru, yaitu goals (to-do jangka panjang).

Dalam konsep store, setiap state harus memiliki fungsi reducer-nya masing-masing. Saat ini, kita sudah memiliki fungsi `todosReducer()` untuk state todos dan kita perlu membuat satu fungsi reducer baru, yakni goalsReducer() untuk state goals. Namun, masalahnya adalah fungsi `createStore()` yang kita buat hanya menerima satu reducer fungsi saja. Contohnya seperti ini.

```js
// createStore hanya menerima satu fungsi reducer sebagai argumen
const store = createStore(todosReducer);
```

Kita tidak bisa memanggil fungsi `createStore()` dengan cara seperti ini.

```js
// cara ini tidak bisa dilakukan
const store = createStore(todosReducer, goalsReducer);
```

Oke. Kita dapat masalah baru, bagaimana cara menyelesaikannya? Sebelum menjawab kita akan memodifikasi project yang sudah dibuat sebelumnya. Pertama kita akan pisahkan antara `todo` dan `goal` maka dari itu struktur projectnya menjadi berikut:

```bash
src/
  Todo/
    - TodoAction.js
    - TodoReducer.js
  Goal/
    - GoalAction.js
    - GoalReducer.js
  index.js
  Store.js
package.json
README.md
```

Berikutnya buat 2 buah file baru di dalam folder `Goal` dengan nama `GoalAction.js` dan `GoalReducer.js` berikut kodenya:

```js
// GoalAction
function addGoalActionCreator({ id, text }) {
  return {
    type: "ADD_GOAL",
    payload: {
      id,
      text,
    },
  };
}

function deleteGoalActionCreator(id) {
  return {
    type: "DELETE_GOAL",
    payload: {
      id,
    },
  };
}

export { addGoalActionCreator, deleteGoalActionCreator };
```

```js
// GoalReducer
function goalsReducer(goals = [], action = {}) {
  if (action.type === "ADD_GOAL") {
    return [...goals, action.payload];
  }

  if (action.type === "DELETE_GOAL") {
    return goals.filter((goal) => goal.id !== action.payload.id);
  }

  return goals;
}

export { goalsReducer };
```

Berikutnya bagaimana cara menggabungkan beberapa reducer ? Beirkut simulasi gambarnya:
![Root Reducer](https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/academy/dos:d92a238c0174694d51b2338a829ac43820221110074219.png)

Berarti kita buat file `RootReducer` sejajar dengan `index.js`, isi kodenya adalah sebagai berikut:

```js
import { goalsReducer } from "./Goal/GoalReducer.js";
import { todosReducer } from "./Todo/TodoReducer.js";

function rootReducer(state = {}, action = {}) {
  return {
    todos: todosReducer(state.todos, action),
    goals: goalsReducer(state.goals, action),
  };
}

export { rootReducer };
```

Kemudian pada `index.js` menjadi berikut:

```js
import {
  addGoalActionCreator,
  deleteGoalActionCreator,
} from "./Goal/GoalAction.js";
import { rootReducer } from "./RootReducer.js";
import { createStore } from "./Store.js";
import {
  addTodoActionCreator,
  removeTodoActionCreator,
  toggleTodoActionCreator,
} from "./Todo/TodoAction.js";

// consume
const store = createStore(rootReducer);

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
store.dispatch(removeTodoActionCreator(3));

// mengubah Learn React menjadi complete
store.dispatch(toggleTodoActionCreator(1));

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

store.dispatch(deleteGoalActionCreator(1));
```

Jalankan diterminal, hasilnya akan seperti berikut:

```bash
npm start

state changed! {
  todos: [ { id: 1, name: 'Learn React', complete: false } ],
  goals: []
}
state changed! {
  todos: [
    { id: 1, name: 'Learn React', complete: false },
    { id: 2, name: 'Learn Redux', complete: false }
  ],
  goals: []
}
state changed! {
  todos: [
    { id: 1, name: 'Learn React', complete: false },
    { id: 2, name: 'Learn Redux', complete: false },
    { id: 3, name: 'Learn JavaScript', complete: false }
  ],
  goals: []
}
state changed! {
  todos: [
    { id: 1, name: 'Learn React', complete: false },
    { id: 2, name: 'Learn Redux', complete: false }
  ],
  goals: []
}
state changed! {
  todos: [
    { id: 1, name: 'Learn React', complete: true },
    { id: 2, name: 'Learn Redux', complete: false }
  ],
  goals: []
}
state changed! {
  todos: [
    { id: 1, name: 'Learn React', complete: true },
    { id: 2, name: 'Learn Redux', complete: false }
  ],
  goals: [ { id: 1, text: 'Get a Doctorate' } ]
}
state changed! {
  todos: [
    { id: 1, name: 'Learn React', complete: true },
    { id: 2, name: 'Learn Redux', complete: false }
  ],
  goals: [
    { id: 1, text: 'Get a Doctorate' },
    { id: 2, text: 'Be an Entrepreneur' }
  ]
}
state changed! {
  todos: [
    { id: 1, name: 'Learn React', complete: true },
    { id: 2, name: 'Learn Redux', complete: false }
  ],
  goals: [ { id: 2, text: 'Be an Entrepreneur' } ]
}
```

## Library Redux

Kabar baik! Sejauh ini, kita sudah membuat fungsi `createStore()` secara manual. Mungkin Anda tidak sadar bahwa kita membuat fungsinya identik seperti API yang disediakan oleh Redux. Dalam arti lain, kita sudah belajar Redux tanpa menggunakan Redux. Hal yang luar biasa, ‘kan?

Untuk membuktikannya, pada latihan kali ini, kita akan mencoba menggunakan Redux dan mengganti penggunaan `createStore()` dari yang kita buat sendiri menjadi library Redux.

Install dependensi dulu:

```bash
npm install redux
```

Setelah library Redux terpasang, sekarang ganti sumber impor dari fungsi `createStore()` menjadi `'redux'`. Sehingga pada file `index.js` menjadi berikut ya importnya:

```js
import { createStore } from "redux";

// consume
const store = createStore(rootReducer);
```

**Note**:

- `createStore()` dari redux sudah `deprecated` tetapi masih bisa digunakan kok.
- Solusi lain sebenernya kita bisa menggunakan `Redux Toolkit` tetapi kita tidak sampai situ ya.
- Karena sudah menggunakan `createStore` dari `redux` maka file `Store.js` tidak digunakan lagi

Jika semua sudah, silahkan jalankan program.

## Redux Toolkit

Redux Toolkit sebenarnya adalah sebuah paket (package) yang dibangun di atas Redux core. Dalam arti lain, Redux Toolkit tidak sepenuhnya berbeda dengan Redux core, melainkan menyediakan utilitas dan fitur tambahan untuk memudahkan penggunaan Redux.

Beberapa perbedaan antara Redux Toolkit dan Redux core adalah:

Redux Toolkit menyediakan konfigurasi default untuk membuat store Redux, sehingga pengguna tidak perlu lagi menuliskan boilerplate code yang banyak.
Redux Toolkit menyediakan fitur createAction untuk mempermudah pembuatan action creator hanya dengan satu baris kode.
Redux Toolkit menyediakan fitur createReducer untuk mempermudah pembuatan reducer dengan sintaks yang lebih mudah dipahami.
Redux Toolkit menyediakan fitur createSlice yang memungkinkan pembuatan reducer dan action creator dalam satu file, serta otomatis menghasilkan action types dan action creators yang terkait.
Dengan menggunakan Redux Toolkit, pengguna Redux dapat lebih efisien dalam membangun aplikasi dengan Redux, karena beberapa kode boilerplate telah disederhanakan oleh Redux Toolkit. Namun, pada dasarnya, Redux Toolkit masih mempergunakan konsep dan prinsip dasar Redux core, seperti store, action, reducer, dan middleware.

Untuk menggunakanya instalasi dulu ya:

```bash
npm install @reduxjs/toolkit
```

Kemudian kita modifikasi sedikit pada file `index.js` menjadi berikut:

```js
import pkg from "@reduxjs/toolkit";
const { configureStore } = pkg;
```

Penjelasan:

- Untuk import kenapa demikian, karena kita menggunakan standar `type:"module"` dan harus ada akhiran `.js` nya pada import. Karena tidak memungkinkan, makanya caranya adalah di atas.

Kemudian pada pemanggilan sebelumnya yang `createStore()` kita ubah menjadi `configureStore()` caranya adalah sebagai berikut:

```js
const store = configureStore({
  reducer: rootReducer,
});
```

Jalankan lagi aplikasi dan pastikan program berjalan dengan baik.
