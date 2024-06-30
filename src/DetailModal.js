import styled from "styled-components";

const ModalLayer = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalBox = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 10%;
  left: 30%;
  width: 700px;
  height: 850px;
  border: 1px solid black;
  border-radius: 5rem;
  background-color: #ffff;
`;

const PosterBox = styled.div`
  width: 185px;
  height: 260px;
  border: 1px solid black;
`;

const GenreBox = styled.div`
  width: 50%;
  height: fit-contents;
  border: 1px solid black;
  text-align: center;
  font-size: 16px;
  margin-top: 1rem;
`;

const GenreText = styled.span`
  font-size: 16px;
  margin: 0.3rem;
`;

const CloseBtn = styled.div`
  position: absolute;
  bottom: 3rem;
  width: 100px;
  height: 40px;
  border: 1px solid black;
  border-radius: 2rem;
  text-align: center;
  line-height: 40px;
  background-color: black;
  color: #ffff;
  transition: 1s ease;

  &:hover {
    cursor: pointer;
    background-color: #ffff;
    color: black;
  }
`;

const onClickDetialModalCloseHandler = (setIsModalOpen) => {
  setIsModalOpen(false);
};

function DetailModal({ setIsModalOpen, movieInfo }) {
  return (
    <ModalLayer>
      <ModalBox>
        <PosterBox></PosterBox>
        <GenreBox>
          장르 :
          {movieInfo.genres.map((genre, i) => (
            <GenreText key={i}>{genre.genreNm}</GenreText>
          ))}
        </GenreBox>
        <CloseBtn
          onClick={() => {
            onClickDetialModalCloseHandler(setIsModalOpen);
            setIsModalOpen(false);
          }}
        >
          닫기
        </CloseBtn>
      </ModalBox>
    </ModalLayer>
  );
}

export default DetailModal;
