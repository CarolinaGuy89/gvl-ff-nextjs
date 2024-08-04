import LeagueSelect from '../../components/leagueselect'

export default function Page({ params }) {
    return (
    <main>
      <div className="absolute top-0 right-0 h-16">
        <LeagueSelect />
      </div>
      <div className="flex min-h-screen flex-col items-center">
        My Post: {params.slug}
      </div>
    </main>
  )
}