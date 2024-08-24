'use client'
import Link from "next/link";
import Image from "next/image";



export default function Home({ params }) {
  return (

    <main>
      <section className="siteTitle">
        <br/>
        <h1>Fantasy Football Stats<br /></h1>
        <h6>Come see how bad you're doing.</h6>
        <hr />
      </section>

      <section>
        <h2 className="chartTitle">Choose your league</h2>
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
            <h4>Logistically, IT&apos;s{<br />}complicated</h4>
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