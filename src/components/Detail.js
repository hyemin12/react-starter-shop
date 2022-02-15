import React from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";

let 박스 = styled.div`
  padding: 20px;
`;

let 제목 = styled.h4`
  font-size: 24px;
`;

function Detail(props) {
  let { id } = useParams();
  let history = useHistory();
  let shoesId = props.shoes.find(function (shoesData) {
    return shoesData.id == id;
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={shoesId.src} width="100%" alt="" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{shoesId.title}</h4>
          <p>{shoesId.content}</p>
          <p>{shoesId.price}</p>
          <button className="btn btn-danger">주문하기</button>
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

export default Detail;
