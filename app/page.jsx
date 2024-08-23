'use client'
import Link from "next/link";
import Image from "next/image";



export default function Home({ params }) {
  return (

    <main>
      <section>
        <h1>Choose your league below:<br /></h1>
        <h6>Fantasy Football stats</h6>
      </section>
      <section className="selectLeague">
        <Link href="gvl/home">
          <div className="leagueCard">
            <h4>{<br />}G-Vegas</h4>
            <Image
              src="/gvl.svg"
              alt="Next.js Logo"
              width={120}
              height={100}
              priority
            />
          </div>
        </Link>

        <Link href="family/home">
          <div className="leagueCard">
            <h4>League of {<br />}Family Drama</h4>
            <Image
              src="/family.svg"
              alt="Next.js Logo"
              width={120}
              height={100}
              priority
            />
          </div>
        </Link>

        <Link href="it/home">
          <div className="leagueCard">
            <h4>Logistically, IT's{<br />}complicated</h4>
            <Image
              src="/computer.svg"
              alt="Next.js Logo"
              width={120}
              height={100}
              priority
            />
          </div>
        </Link>

        <Link href="hockey/home">
          <div className="leagueCard">
            <h4>Full Contact {<br />}Turf Hockey</h4>
            <Image
              src="/hockey.svg"
              alt="Next.js Logo"
              width={120}
              height={100}
              priority
            />
          </div>
        </Link>
      </section>
    </main>
  );
}