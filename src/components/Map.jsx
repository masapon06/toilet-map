import React, { Fragment, useCallback, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
 
const placeholder = L.icon({
  iconUrl: 'placeholder.png',
  iconSize: [40, 40],
  iconAnchor: [13, 41],
  popupAnchor: [7, -40],
  // shadowUrl: 'favicon2.png',
  shadowSize: [30, 60],
  shadowAnchor: [8, 60]
});

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  leafletContainer: {
    width: '100vw',
    height: '81vh',
  }
});

export const Map = ({posts}) => {

  const classes = useStyles()

  const position = new LatLng(37.9120388, 139.0595863);
  return (
    <div className={classes.root}>
      <MapContainer center={position} zoom={13} zoomControl={false}className={classes.leafletContainer}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {posts.map(marker => (
          <Marker position={new LatLng(Number(marker.latitude), Number(marker.longitude))} icon={placeholder}>
          <Popup>
            ここから{marker.distance}km
            <br/><br/>
            {marker.info}
          </Popup>
          </Marker>
        ))
        }
      </MapContainer>
    </div>
  );
}
