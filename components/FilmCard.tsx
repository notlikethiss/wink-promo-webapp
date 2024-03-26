import type { IFilm } from "@/interfaces";
import type { FC } from "react";
import styled from "styled-components";

const FilmCard: FC<IFilm> = ({ cover, title, year, tags, src }) => {
  return (
    <Wrapper>
      <Tag>Трейлер</Tag>
      <Cover $img={cover} />
      <Title>{title}</Title>
      <Info>
        {year}, {tags}
      </Info>
    </Wrapper>
  );
};

export default FilmCard;

const Wrapper = styled.div`
  width: 140px;
  height: max-content;
  display: flex;
  flex-direction: column;
`;

const Cover = styled.div<{ $img: string }>`
  width: 140px;
  height: 140px;
  max-width: 140px;
  max-height: 140px;
  border-radius: 15px;
  background-image: ${(props) => `url(${props.$img})`};
  background-size: cover;
  background-position: center;
  box-shadow: 0 11px 14px #00000045;
`;

const Title = styled.h1`
  margin-top: 5px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
`;

const Info = styled.p`
  margin-top: 2px;
  font-size: 10px;
  font-weight: 500;
  color: #a8a8a8;
`;

const Tag = styled.div`
  margin: 8px;
  position: absolute;
  background: #9f6bc9;
  border-radius: 6px;
  width: 43px;
  height: 15px;
  font-size: 8px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;
