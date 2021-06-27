import React, { Fragment, useCallback, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  leafletContainer: {
    width: '100vw',
    height: '75vh',
  }
});

export const Map = () => {

  const classes = useStyles()

  const position = new LatLng(51.505, -0.09);
  return (
    <div className={classes.root}>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} className={classes.leafletContainer}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
