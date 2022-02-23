import React from "react";
import { Table } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";

function Cart(props) {
  let state = useSelector((state) => state);
  console.log(state);
  let dispatch = useDispatch();
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <thead>
          {state.map((a, i) => {
            return (
              <tr key={i}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.quan}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch({ type: "수량증가" });
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch({ type: "수량감소" });
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </thead>
      </Table>
      {/* {props.alterState === true ? (
        <div className="my-alert2">
          <p>지금 구매하시면 신규할인 20%</p>
          <button
            onClick={() => {
              props.dispatch({ type: "닫기" });
            }}
          >
            닫기
          </button>
        </div>
      ) : null} */}
    </div>
  );
}

// function storeProps(state) {
//   console.log(state);
//   return {
//     state: state,
//     // alterState: state.reducer2,
//   };
// }

// export default connect(storeProps)(Cart);
export default Cart;
