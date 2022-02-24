import React, { useEffect, useState } from "react";

function Practice() {
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);
  useEffect(() => {
    if (count < 3) {
      setAge(age + 1);
    }
  });

  return (
    <div>
      <div> 안녕하십니까 전 {age}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        누르면 한살 먹기
      </button>
    </div>
  );
}

export default Practice;
