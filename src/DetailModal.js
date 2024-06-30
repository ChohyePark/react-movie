import styled from "styled-components";

const ModalLayer = styled.div`
  z-index: 20;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalBox = styled.div`
  position: absolute;
  top: 10%;
  left: 30%;
  width: 700px;
  height: 850px;
  border: 1px solid black;
  border-radius: 5rem;
  background-color: #ffff;
`;

function DetailModal() {
  return (
    <ModalLayer>
      <ModalBox></ModalBox>
    </ModalLayer>
  );
}

export default DetailModal;
