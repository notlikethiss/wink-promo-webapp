import { Montserrat } from "next/font/google";
import Image from "next/image";
import styled from "styled-components";
import { data } from "./api/data";
import FilmCard from "@/components/FilmCard";
import Link from "next/link";
import { useRouter } from "next/router";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  const { push } = useRouter();

  return (
    <Wrapper className={montserrat.className}>
      <MainImage>
        <Gradient $top="0" $deg="180deg" />
        <Image
          className="wink-wame-logo"
          alt="wink-wame-logo"
          src={"/WinkXWame.svg"}
          width={320}
          height={50}
        />
        <Exclusive>Эксклюзивно в Telegram</Exclusive>
        <Image
          className="cover"
          src={data[0].cover}
          alt="cover"
          width={400}
          height={400}
        />
        <Title>{data[0].title}</Title>
        <Info>
          {data[0].year}, {data[0].tags}
        </Info>
        <Button onClick={() => push(`/media/${data[0].id}`)}>
          Смотреть трейлер
        </Button>
        <Gradient $top={"250px"} $deg="0deg" />
      </MainImage>
      <MediaGrid>
        {data.map((media) => (
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
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px 50px 10px;
`;

const MediaGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
`;

const Exclusive = styled.p`
  margin: 8px 0;
  font-size: 12px;
  font-weight: 300;
  color: #fff;
  z-index: 10;
  filter: drop-shadow(2px 4px 6px black);
`;

const MainImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  height: 400px;

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
  top: 340px;
  box-shadow: 0 0px 20px #9f6bc966;
`;

const Title = styled.h1`
  position: absolute;
  top: 250px;
  font-size: 30px;
  font-weight: 600;
  color: #fff;
  z-index: 11;
  filter: drop-shadow(2px 4px 6px black);
`;

const Info = styled.p`
  position: absolute;
  top: 285px;
  font-size: 18px;
  font-weight: 500;
  color: #c0c0c0;
  z-index: 11;
  filter: drop-shadow(2px 4px 6px black);
`;
