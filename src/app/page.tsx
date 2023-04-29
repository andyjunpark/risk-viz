"use client";
import { useEffect, useState } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import Tooltip from 'react-tooltip-lite';
import * as d3 from 'd3';

const accessToken = process.env.MAPBOX_ACCESS_TOKEN;

const Map = ReactMapboxGl({
  accessToken: accessToken,
});

const colorScale = {
  low: '#1abc9c',
  medium: '#f1c40f',
  high: '#e74c3c',
};

export default function Home() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedDecade, setSelectedDecade] = useState('1970s');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsClient(true);
    d3.csv('/data.csv').then((data) => {
      setData(data);
    });
  }, []);

  const markers = isClient
    ? data
        .filter((d) => d.decade === selectedDecade)
        .map((d) => (
          <Marker key={d.id} coordinates={[d.lon, d.lat]} anchor="bottom">
            <Tooltip content={<div>{`${d.asset_name} - ${d.business_category}`}</div>}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: colorScale[d.risk_rating],
                }}
              />
            </Tooltip>
          </Marker>
        ))
    : null;

  return (
    <div className="container">
      <Map
        style="mapbox://styles/mapbox/streets-v11"
        center={[-96, 37.8]}
        zoom={[3]}
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
      >
        {markers}
      </Map>
    </div>
  );
}
