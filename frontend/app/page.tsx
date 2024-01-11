import Image from "next/image";
import Navbar from "./components/navbar/navbar";
import Main from "./components/general/main";
import Button from "./components/general/button";

export default function Home() {
  return (
    <>
      <Navbar />
      <Main>
        <section className="flex items-center justify-between">
          <div className="flex flex-col gap-28">
            <h2 className="font-bold text-6xl leading-normal">
              Vote smarter.
              <br /> Vote with the Blockchain.
              <br /> Vote with <span className="text-orange-400">NoName</span>.
            </h2>
            <Button big title="Discover now"></Button>
          </div>
          <Image
            alt="voting drawing"
            src="/voting.webp"
            width={600}
            height={600}
          />
        </section>
      </Main>
    </>
  );
}
