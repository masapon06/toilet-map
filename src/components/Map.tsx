import React from 'react';
import { makeStyles } from '@mui/styles';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { PlaceType } from "../entity/types";
 
const placeholder = L.icon({
  iconUrl: 'placeholder.png',
  iconSize: [40, 40],
  iconAnchor: [13, 41],
  popupAnchor: [7, -40],
  // shadowUrl: '必要であれば'
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

interface MapProps {
  places: PlaceType[]
}

export const Map: React.FC<MapProps> = props => {
  const { places } = props

  const classes = useStyles()

  const position = new LatLng(37.9120388, 139.0595863);
  return (
    <div className={classes.root}>
      <MapContainer center={position} zoom={13} zoomControl={false}className={classes.leafletContainer}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places.map(place => (
          <Marker position={new LatLng(place.latitude, place.longitude)} icon={placeholder}>
          <Popup>
            ここから{place.distance}km
            <br/><br/>
            {place.placeName}
          </Popup>
          </Marker>
        ))
        }
      </MapContainer>
    </div>
  );
}
