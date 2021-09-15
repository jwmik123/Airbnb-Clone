import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function Search({ searchResults }) {

    const router = useRouter();

    // ES6 Destructioring
    const { location, checkIn, checkOut, noOfGuests } = router.query;

    const formattedCheckIn = format(new Date(checkIn), "dd MMMM");
    const formattedCheckOut = format(new Date(checkOut), "dd MMMM");
    const range = `${formattedCheckIn} tot ${formattedCheckOut}`;

    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${noOfGuests} gast(en)`} />
            
            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">50+ accommodaties - {range} - {noOfGuests} gast(en)</p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">Verblijven in {location}</h1>
                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">Gratis annuleren</p>
                        <p className="button">Type ruimte</p>
                        <p className="button">Prijs</p>
                        <p className="button">Direct reserveren</p>
                        <p className="button">Meer filters</p>
                    </div>

                    <div className="flex flex-col">
                    {searchResults.map(({img, location, title, description, star, price, total}) => (
                        <InfoCard 
                            key={img}
                            img={img}
                            location={location}
                            title={title}
                            description={description}
                            star={star}
                            price={price}
                            total={total}
                        />
                    ))}
                    </div>
                </section>

                <section className="hidden lg:inline-flex lg:min-w-[600px]">
                    <Map searchResults={searchResults} />
                </section>
            </main>
            
            <Footer />
        </div>
   )
}

export default Search;

export async function getServerSideProps(context) {
    const searchResults = await fetch("https://links.papareact.com/isz")
        .then(
            (res) => res.json()
        );

    return {
        props: {
            searchResults
        }
    }
};