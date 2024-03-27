import { useState, type FC, useEffect } from "react";
import { data } from "../api/data";
import { useRouter } from "next/router";
import { IFilm } from "@/interfaces";
import { Montserrat } from "next/font/google";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import FilmCard from "@/components/FilmCard";

const montserrat = Montserrat({ subsets: ["latin"] });

const MediaID: FC = () => {
  const [visibleMedia, setVisibleMedia] = useState<boolean>(false);
  const { query } = useRouter();

  const trailer = data.find((media) => media.id === query.id) as IFilm;

  useEffect(() => {
    const video = document.getElementById("player") as HTMLVideoElement;
    if (visibleMedia) {
      video.play();
    }
  }, [visibleMedia]);

  return (
    <Wrapper className={montserrat.className}>
      {trailer ? (
        <>
          <Row>
            <Cover>
              <Image
                src={trailer.cover}
                alt="trailer-cover"
                width={180}
                height={180}
              />
            </Cover>
            <Column>
              <Title>{trailer.title}</Title>
              <Info>
                {trailer.year}, {trailer.tags}
              </Info>
              <Description>{trailer.description}</Description>
            </Column>
          </Row>
          <Title>Смотреть трейлер</Title>
          {visibleMedia ? (
            <Video id="player" controls src={trailer.src}></Video>
          ) : (
            <Placeholder>
              <Button onClick={() => setVisibleMedia(true)}>Смотреть</Button>
              <Image
                alt="placeholder"
                src={trailer.cover}
                width={300}
                height={200}
              />
            </Placeholder>
          )}

          <Title>Также посмотрите</Title>
          <MediaGrid>
            {data
              .filter((media) => media.id !== query.id)
              .map((media) => (
                <Link href={`/media/${media.id}`} key={media.id}>
                  <FilmCard
                    title={media.title}
                    cover={media.cover}
                    year={media.year}
                    tags={media.tags}
                    src={media.src}
                    description={media.description}
                    id={media.id}
                  />
                </Link>
              ))}
          </MediaGrid>
        </>
      ) : (
        <>
          <Row>
            <Fallback $width="180px" $height="180px" />
            <Column>
              <Fallback $width="220px" $height="25px" />

              <Fallback $width="220px" $height="25px" />

              <Fallback $width="220px" $height="25px" />
            </Column>
          </Row>
          <Title>Смотреть трейлер</Title>
          <Fallback $width="96vw" $height="320px" />
        </>
      )}
    </Wrapper>
  );
};

export default MediaID;

const Wrapper = styled.section`
  padding: 10px 10px 50px 10px;
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
  margin-bottom: 16px;
  border-radius: 10px;
  background-color: #000;
`;

const Cover = styled.div`
  margin-top: 16px;
  min-width: 180px;
  min-height: 180px;
  width: 180px;
  height: 180px;
  max-width: 180px;
  max-height: 180px;
  border-radius: 15px;
  box-shadow: 0 11px 14px #00000045;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9;
  background-color: #a8a8a8;

  img {
    width: 100%;
    height: max-content;
  }
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

const Fallback = styled.div<{ $width: string; $height: string }>`
  background: #a8a8a8;
  border-radius: 15px;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  margin: 4px;

  @keyframes Animation {
    0% {
      background: #a8a8a8;
    }

    50% {
      background: #c0c0c0;
    }

    100% {
      background: #a8a8a8;
    }
  }

  animation: Animation 1s infinite;
`;

const Placeholder = styled.div`
  width: 96vw;
  height: 303px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 10px;
  z-index: 10;

  img {
    width: 100%;
    height: max-content;
    filter: brightness(0.5);
  }
`;

const Button = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  border-radius: 15px;
  background: #9f6bc9;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  z-index: 11;
  position: absolute;
  width: 300px;
  height: 40px;
  box-shadow: 0 0px 20px #9f6bc966;
`;

const MediaGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media only screen and (max-width: 530px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
