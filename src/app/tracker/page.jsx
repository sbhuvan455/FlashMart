"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function Page() {

    const [coordinates, setCoordinates] = useState({
        lat: '',
        lng: ''
    });

    const [value, setValue] = useState(null);


    const selectCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((success) => {
            console.log(success.coords.latitude, success.coords.longitude);
            setCoordinates({
                lat:success.coords.latitude,
                lng:success.coords.longitude
            })

            window.open(`/tracking?lat=${success.coords.latitude}&lng=${success.coords.longitude}`);
        })
    }

    const getLatLng = (place) => {
        console.log(place);
        const placeId = place.value.place_id;
        const service = new google.maps.places.PlacesService(document.createElement('div'));

        service.getDetails({placeId}, (place) => {
            console.log('latitude: ' + place.geometry.location.lat())
            console.log('longitude: ' + place.geometry.location.lng())

            setCoordinates({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            })

            window.open(`/tracking?lat=${place.geometry.location.lat()}&lng=${place.geometry.location.lng()}`);
        })
    }

    return (
        <div className="flex justify-center items-center min-h-[90vh] bg-gray-100">
            <div className="w-[80vw] max-w-lg p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Enter Delivery Address
                </h1>
                <button onClick={selectCurrentLocation} className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out mb-4">
                    Choose your current location
                </button>
                <div className="text-center text-gray-500 my-4">Or</div>
                <GooglePlacesAutocomplete
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                    selectProps={{
                        value,
                        onChange: (place) => {
                            getLatLng(place);
                            setValue(place)
                        },
                        isClearable: true
                    }}
                />
            </div>
        </div>
    )
}

export default page