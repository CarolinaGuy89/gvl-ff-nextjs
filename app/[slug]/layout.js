import MenuButton from "../components/Navbar"

export default function Template({ children, params }) {
    const labelsMap = {
        gvl: "G-Vegas",
        it: "Logistically, IT's complicated",
        family: "League of Family Drama",
        hockey: "Full Contact Turf Hockey",
      }
    
    return <div>
        <section className="pageTitle">
            <h1>{labelsMap[params.slug]}<br /></h1>
            <MenuButton slug={[params.slug]} />
            <h6>Fantasy Football stats</h6>
        </section>

        {children}</div>
}