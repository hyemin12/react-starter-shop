import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { connect } from "react-redux";
import "../css/Detail.scss";

function Detail(props) {
  // let [inputData, inputDataChange] = useState([]);
  let [alertShow, alertHide] = useState(true);

  useEffect(() => {
    // 2초 후에 실행
    let timer = setTimeout(() => {
      alertHide(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  let { id } = useParams();

  let history = useHistory();

  let shoesId = props.shoes.find((shoesData) => {
    return shoesData.id == id;
  });
  console.log(shoesId);

  function rmStock() {
    let i = shoesId.id;
    var stockCopy = [...props.stock];
    stockCopy[i] = stockCopy[i] - 1;
    props.stockChange(stockCopy);
  }
  return (
    <div className="container">
      {alertShow === true ? (
        <div className="my-alert-yellow">
          <p>재고가 얼마 남지 않았습니다.</p>
        </div>
      ) : null}

      {/* {inputData}
      <input
        onChange={(e) => {
          inputDataChange(e.target.value);
        }}
      /> */}

      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (shoesId.id + 1) +
              ".jpg"
            }
            width="100%"
            alt=""
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{shoesId.id.title}</h4>
          <p>{shoesId.id.content}</p>
          <p>{shoesId.id.price}</p>
          <InfoStock stock={props.stock} />
          <button
            className="btn btn-danger"
            onClick={() => {
              rmStock();
              props.dispatch({
                type: "항목추가",
                data: { id: shoesId.id, name: shoesId.title, quan: 1 },
              });
              history.push("/cart");
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-grey"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}
function InfoStock(props) {
  return <p>재고 : {props.stock[0]} </p>;
}

function storeProps(state) {
  return {
    state: state,
  };
}

export default connect(storeProps)(Detail);
// export default Detail;
