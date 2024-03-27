import type { FC } from "react";
import { data } from "../api/data";
import { useRouter } from "next/router";
import { IFilm } from "@/interfaces";
import { Montserrat } from "next/font/google";
import styled from "styled-components";
import Image from "next/image";

const montserrat = Montserrat({ subsets: ["latin"] });

const MediaID: FC = () => {
  const { query } = useRouter();

  const trailer = data.find((media) => media.id === query.id) as IFilm;

  return (
    <Wrapper className={montserrat.className}>
      <Row>
        <Cover $img={trailer.cover} />
        <Column>
          <Title>{trailer.title}</Title>
          <Info>
            {trailer.year}, {trailer.tags}
          </Info>
          <Description>{trailer.description}</Description>
        </Column>
      </Row>
      <Title>Смотреть трейлер</Title>
      <Video controls src={trailer.src}></Video>
    </Wrapper>
  );
};

export default MediaID;

const Wrapper = styled.section`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-top: 16px;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
`;

const Video = styled.video`
  margin-top: 16px;
  border-radius: 10px;
`;

const Cover = styled.div<{ $img: string }>`
  margin-top: 16px;
  min-width: 180px;
  min-height: 180px;
  max-width: 180px;
  max-height: 180px;
  border-radius: 15px;
  background-image: ${(props) => `url(${props.$img})`};
  background-size: cover;
  background-position: center;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 32px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Info = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #a8a8a8;
`;

const Description = styled.p`
  margin-top: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #a8a8a8;
`;
