import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { ownersByLeague } from '@/app/components/constants';

export default function Home({ params }) {

const owners = ownersByLeague[params.slug] || [];

  return (
    <main>
      <hr/>
      <section className="selectLeague">
      {owners.map((owner, index) => {
          let teamId = index + 1;
          if (params.slug == "hockey" && teamId >= 8) {
            teamId += 1;
          }
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
