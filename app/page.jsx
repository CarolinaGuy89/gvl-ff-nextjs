'use client'
import Link from "next/link";
import Image from "next/image";



export default function Home({ params }) {
  return (

    <main>
      <div>
      <section>
        <h1>Choose your league below:<br /></h1>
        <h6>Fantasy Football stats</h6>
      </section>
      <section>
      <div><Link href="gvl/home"><h4>G-Vegas</h4></Link>
      <Image
          src="/gvl.svg"
          alt="Next.js Logo"
          width={180}
          height={50}
          priority
        />
      </div>
      
      <div><Link href="family/home"><h4>League of Family Drama</h4></Link>
      <Image
          src="/family.svg"
          alt="Next.js Logo"
          width={180}
          height={50}
          priority
        />
      </div>

      <div><Link href="it/home"><h4>Logistically, IT's complicated</h4></Link>
      <Image
          src="/computer.svg"
          alt="Next.js Logo"
          width={180}
          height={50}
          priority
        />
      </div>
      
      <div><Link href="hockey/home"><h4>Full Contact Turf Hockey</h4></Link>
      <Image
          src="/hockey.svg"
          alt="Next.js Logo"
          width={180}
          height={50}
          priority
        />
        </div>
      </section>
      </div>

    </main>
  );
}