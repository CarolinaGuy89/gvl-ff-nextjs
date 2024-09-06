import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function Home({ params }) {

  let owners = [];
  switch (params.slug) {
    case "gvl":
      owners = ['Sam', 'Alex', 'Arthur', 'Matt', 'Ryan', 'Steven', 'Cody', 'Cale', 'Marty', 'Russ']
      break;
    case "family":
      owners = ['Steven', 'Sam', 'Brenda', 'Allison', 'Sheila', 'Josh', 'Fred', 'Kayla']
      break;
    case "it":
      owners = ['Steven', 'Jay', 'Horace', 'Charles', 'Rob', 'Ryan', 'Gouri', 'Ted', 'Markus', 'Milton']
      break;
    case "hockey":
      owners = ['Steven', 'Rob', 'Vince', 'Jack', 'Hutson', 'Alex', 'Mike', 'Markus', 'Seth', 'Milan']
      break;
  }


  return (
    <main>
      <hr/>
      <section className="selectLeague">
      {owners.map((owner, index) => {
          const teamId = index + 1;
          return (
            <Link href={`/${params.slug}/team/${teamId}`} key={teamId} passHref>
              <Button variant="primary" className="nameCard">
                <h4>{owner}</h4>
              </Button>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
