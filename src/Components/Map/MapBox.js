import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken =
  'pk.eyJ1Ijoib3NtYW5zdWZ5IiwiYSI6ImNrbWhqYWczczA3dHoydW1xdDh4Nm13bHIifQ.FkJoh9xdJsWAqPIM_WIr5A';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(90.399452);
  const [lat, setLat] = useState(23.777176);
  const [zoom, setZoom] = useState(8);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
useEffect(()=>{
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/dhaka.json?access_token=${mapboxgl.accessToken}`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        setLat(data.features[0].center[1])
        setLng(data.features[0].center[0])
    
    })
 
},[])
  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;