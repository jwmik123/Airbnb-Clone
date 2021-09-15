import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';
import Image from 'next/image';
import { StarIcon } from "@heroicons/react/solid"

function Map({ searchResults }) {

    const [selectedLocation, setSelectedLocation] = useState({});

    // Transform the searchResults into the GeoLibCenter object
    const coords = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat
    }))

    const center = getCenter(coords);

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    });

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/jalla/cktl8l41s1hmm17myh2g5l72s"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                    >
                        <p className="bg-white rounded-full p-2 text-sm cursor-pointer 
                                        hover:scale-105 hover:shadow-sm hover:z-100
                                        transition transform duration-100 ease-in-out"
                        onClick={() => setSelectedLocation(result)}
                        aria-label="push-pin"
                        role="img">{result.total}</p>
                    </Marker>
                    {/* Popup that shows when Marker is clicked. */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                        closeOnClick={true}
                        onClose={() => setSelectedLocation({})}
                        latitude={result.lat}
                        longitude={result.long}
                        >
                            <div className="rounded-full bg-white">
                                <div className="relative h-40">
                                <Image 
                                    src={result.img}
                                    layout="fill"
                                    objectFit="cover"
                                />
                                </div>
                                
                                <div className="flex items-center pt-2">
                                <StarIcon className="h-5 text-red-400" />
                                {result.star}
                                </div>
                                <div>
                                    <p>{result.title}</p>
                                    <p className="font-semibold">{result.price}</p>
                                </div>
                            </div>
                        </Popup>
                    ) : null}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
