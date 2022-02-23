import { createStore, combineReducers } from "redux";

// let alertDefault = true;

// function reducer2(state = alertDefault, action) {
//   if (action.type === "닫기") {
//     return (alertDefault = false);
//   } else {
//     return state;
//   }
// }

let defaultState = [
  { id: 0, name: "운동화", quan: 2 },
  { id: 1, name: "하이힐", quan: 1 },
  { id: 3, name: "장화", quan: 3 },
];

function reducer(state = defaultState, action) {
  if (action.type === "항목추가") {
    let copy = [...state];
    copy.push(action.payload);
    return copy;
  } else if (action.type === "수량증가") {
    let copy = [...state];
    copy[0].quan++;
    return copy;
  } else if (action.type === "수량감소" && state[0].quan > 0) {
    let copy = [...state];
    copy[0].quan--;
    return copy;
  } else {
    return state;
  }
}

const store = createStore(reducer);

export default store;

// let store = createStore(combineReducers(reducer, reducer2));
