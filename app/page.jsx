import LeagueSelect from "./components/leagueselect";

export default function Home() {
  return (

    <main>
      <div className="absolute top-0 right-0 h-16">
      <LeagueSelect />
      </div>

      <div className="flex min-h-screen flex-col items-center">
        Hello World
      </div>

      <div>
      </div>
    </main>
  );
}
