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
  const [loaded, setLoaded] = useState<boolean>(false);
  const { query } = useRouter();

  const trailer = data.find((media) => media.id === query.id) as IFilm;

  useEffect(() => {
    const video = document.getElementById("player") as HTMLVideoElement;
    if (visibleMedia) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }

      video.play();
    }
  }, [visibleMedia]);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 300);
  }, []);

  return (
    <Wrapper className={montserrat.className} $loaded={loaded}>
      {trailer ? (
        <>
          <MainImage>
            <Gradient $top="0" $deg="180deg" />

            <Image
              className="cover"
              src={trailer.cover}
              alt="cover"
              width={400}
              height={400}
            />
            <PrevTitle>{trailer.title}</PrevTitle>
            <PrevInfo>
              {trailer.year}, {trailer.tags}
            </PrevInfo>

            <Gradient $top={"160px"} $deg="0deg" />
          </MainImage>
          <Container>
            <Description>{trailer.description}</Description>
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
          </Container>
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

const Wrapper = styled.section<{ $loaded: boolean }>`
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.$loaded ? "1" : "0")};
  transition: all 0.3s ease-in-out;
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
  margin-top: 16px;
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
  justify-content: space-around;
  grid-template-columns: repeat(3, 160px);
  gap: 16px;

  @media only screen and (max-width: 530px) {
    grid-template-columns: repeat(2, 160px);
  }
`;

const MainImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  height: 300px;

  .cover {
    z-index: 9;
    position: relative;
    width: 100vw;
    height: max-content;
    top: -190px;
  }

  .wink-wame-logo {
    margin-top: 20px;
    filter: drop-shadow(2px 4px 6px black);
  }
`;

const Gradient = styled.div<{ $deg: string; $top: string }>`
  width: 100vw;
  height: 150px;
  position: absolute;
  z-index: 10;
  top: ${(props) => props.$top};
  background: ${(props) =>
    `linear-gradient(${props.$deg}, rgb(27, 27, 27), rgba(200, 200, 200, 0));`};
`;

const PrevTitle = styled.h1`
  position: absolute;
  top: 200px;
  font-size: 32px;
  font-weight: 600;
  color: #fff;
  z-index: 11;
  filter: drop-shadow(2px 4px 6px black);
`;

const PrevInfo = styled.p`
  position: absolute;
  top: 245px;
  font-size: 20px;
  font-weight: 500;
  color: #c0c0c0;
  z-index: 11;
  filter: drop-shadow(2px 4px 6px black);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px 50px 10px;
`;

const Description = styled.p`
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #a8a8a8;
`;
