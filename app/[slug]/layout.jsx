import MenuButton from "../components/Navbar";
import getLeagueStandings from "../api/newApiFetch";
import { LeagueProvider } from "@/app/context/LeagueContext";

export default async function Template({ children, params }) {
  const labelsMap = {
    gvl: "G-Vegas",
    it: "Logistically, IT's complicated",
    family: "League of Family Drama",
    hockey: "Full Contact Turf Hockey",
  };

  const leagueValues = {
    gvl: 1248073066,
    it: 601844230,
    family: 283159008,
    hockey: 1335739020,
  };

  const leagueStandings = await getLeagueStandings(leagueValues[params.slug]);

  return (
    <LeagueProvider value={{ leagueStandings }}>
      <section className="pageTitle">
        <h1>{labelsMap[params.slug]}<br /></h1>
        <MenuButton slug={[params.slug]} />
        <h6>Fantasy Football stats</h6>
      </section>
      <section>{children}</section>
    </LeagueProvider>
  );
}
