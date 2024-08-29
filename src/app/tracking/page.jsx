"use client"
import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useSearchParams } from 'next/navigation';
import { io } from 'socket.io-client';

const containerStyle = {
    width: '90vw',
    height: '80vh'
};

function Tracking() {
    const socket = useMemo(() => io("http://localhost:3000"), []);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });

    const searchParams = useSearchParams();

    const latitude = parseFloat(searchParams.get('lat'));
    const longitude = parseFloat(searchParams.get('lng'));

    const center = {
        lat: latitude,
        lng: longitude
    };

    const [map, setMap] = useState(null);

    useEffect(() => {
        
        socket.on("connect", () => {
            console.log("Socket connected");
        });

        socket.emit('Order-items', center);

        return () => {
            if (socket) {
                socket.disconnect();
                console.log("Socket disconnected");
            }
        };
    }, [socket]);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, [center]);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={9}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker position={center} />
        </GoogleMap>
    ) : <></>;
}

export default Tracking;
