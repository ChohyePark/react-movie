import { useEffect, useState } from "react";
import styled from "styled-components";
import DetailModal from "./DetailModal";

// style 영역
const Container = styled.div`
  margin: auto;
  width: 50%;
  min-height: 920px;
  height: 100%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const InputBox = styled.div`
  width: 80%;
  height: 40px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Input = styled.input`
  width: 60%;
  height: 80%;
  border: none;
  border-radius: 20px;
  border-bottom: 2px solid #e0e0e0;
  padding: 6px;
  font-size: 16px;
`;

const Btn = styled.button`
  width: 60px;
  border: 1.2px solid black;
  border-radius: 15px;
  background-color: #ffff;
  transition: 1s;

  &:hover {
    background-color: black;
    color: #ffff;
    cursor: pointer;
  }
`;

const RecentKeyWord = styled.div`
  width: 70%;
  height: 20px;
  border: 1px solid black;
  margin-top: 26px;
`;

const MovieListContainer = styled.div`
  positio: relatve;
  width: 50%;
`;

const MovieBox = styled.div`
  position: relative;
  height: 700px;
  width: 100%;
`;

const Movie = styled.div`
  border: 1px solid black;
  height: 650px;
  width: 100%;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MovieLayer = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 1rem;
  height: 660px;
  width: 100%;
  opacity: 0;
  transition: 0.3s ease;
  ${MovieBox}:hover & {
    opacity: 1;
  }
`;

const MovieTitle = styled.h3`
  margin: 8px;
  padding: 0;
  font-size: 24px;
`;

const MovieDetailBtn = styled.div`
  position: relative;
  top: 60%;
  width: 120px;
  height: 30px;
  border: 1px solid black;
  background-color: #90caf9;
  border-radius: 10px;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  font-weight: 800;
  color: #2f4f4f;
  &:hover {
    cursor: pointer;
  }
`;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyWord, setKeyWord] = useState([]);
  const [movieNm, setMovieNm] = useState("");
  const [searchMovieList, setSearchMovieList] = useState([]);

  // 영화 목록 불러오는 이벤트
  const onClickgetMoviesHandler = async () => {
    if (movieNm === "") {
      alert("영화 제목을 입력해주세요");
      return;
    }
    try {
      const response = await fetch(
        "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=d0c9be4aa298af875c88061a400b0b62&movieNm=" +
          movieNm,
      );
      const data = await response.json();
      searchMovieViewHandler(data);
      if (data.movieListResult.totCnt === 0) {
        alert("해당 영화는 존재하지 않습니다.");
        return;
      }
    } catch (error) {
      console.log("Error", error);
    }
    recentMovieKeywordHandler();
  };

  // 최근 검색어
  const recentMovieKeywordHandler = () => {
    setKeyWord((preKeyword) => {
      if (preKeyword.length >= 5) {
        return preKeyword.slice(1).concat(movieNm);
      } else {
        return [...preKeyword, movieNm];
      }
    });
  };

  const searchMovieViewHandler = (data) => {
    setSearchMovieList((prev) => [...prev, ...data.movieListResult.movieList]);
  };

  // 상세 보기 버튼 이벤트
  const onClickDetailMovieHandler = async (code) => {
    try {
      const response = await fetch(
        `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=d0c9be4aa298af875c88061a400b0b62&movieCd=${code}`,
      );
      const data = await response.json();
      console.log(data);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {isModalOpen ? <DetailModal></DetailModal> : ""}
      <Title>검색</Title>
      <InputBox>
        <Input
          value={movieNm}
          onChange={(e) => {
            setMovieNm(e.target.value);
          }}
        ></Input>
        <Btn onClick={onClickgetMoviesHandler}>검색</Btn>
      </InputBox>
      <RecentKeyWord>
        <span>
          최근 검색어 :
          {keyWord.map((keyword, i) => (
            <span key={i}>{keyword}</span>
          ))}
        </span>
      </RecentKeyWord>
      <MovieListContainer>
        {searchMovieList.map((movie, i) => (
          <MovieBox key={i}>
            <Movie>
              <MovieTitle>{movie.prdtYear}</MovieTitle>
              <MovieTitle>{movie.movieNm}</MovieTitle>
            </Movie>
            <MovieLayer>
              <MovieDetailBtn
                onClick={() => {
                  onClickDetailMovieHandler(movie.movieCd);
                }}
              >
                상세보기
              </MovieDetailBtn>
            </MovieLayer>
          </MovieBox>
        ))}
      </MovieListContainer>
    </Container>
  );
}

export default App;
