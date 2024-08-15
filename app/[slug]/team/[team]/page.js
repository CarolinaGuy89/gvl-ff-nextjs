'use client'

export default function Home({ params }) {
  return (

    <main>
      <div>
        Hello World: {params.slug} <br/>
        Team - ID {params.team}
      </div>

    </main>
  );
}