import { Montserrat } from "next/font/google";
import Image from "next/image";
import styled from "styled-components";
import { data } from "./api/data";
import FilmCard from "@/components/FilmCard";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  return (
    <Wrapper className={montserrat.className}>
      <Image
        className="wink-wame-logo"
        alt="wink-wame-logo"
        src={"/WinkXWame.svg"}
        width={250}
        height={40}
      />
      <MediaGrid>
        {data.map((media, id) => (
          <FilmCard
            key={id}
            title={media.title}
            cover={media.cover}
            year={media.year}
            tags={media.tags}
            src={media.src}
          />
        ))}
      </MediaGrid>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  .wink-wame-logo {
    margin-left: 10px;
  }
`;

const MediaGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;
