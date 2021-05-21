import React, { Fragment, useCallback, useRef, useState } from 'react';
import { GOOGLE_API_KEY } from '../credentials.js';
import { mapStyles } from '../mapConfig.js';
// import { PlaceInfo } from './PlaceInfo.jsx'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import styled from 'styled-components';
import './Map.css';

import SearchIcon from '../images/searchIcon.svg';

const libraries = ["places"];

const mapContainerStyle = {
  height: "75vh",
  width: "100%",
};

/*
const center = {
  lat: 37.912039,
  lng: 139.061775,
};

onClickChangeLocation(placeName, lat, lng)

*/

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  // デフォルトUI（衛星写真オプションなど）をキャンセルします。
  zoomControl: false,
  scrollwheel: true,
};

export const Map = ({
  posts,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  // state
  const [selected, setSelected] = useState(null);
  const [location, setLocation] = useState({
    locationName: '',
    center: {
      lat: 37.912039,
      lng: 139.061775,
    }
  })

  function changeLocationName(e) {
    if (e.key === 'Enter') {
      geocode();      
      return;
    }
    setLocation({
      ...location,
      locationName: e.target.value
    });
  }
  
  function geocode() {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: location.locationName }, ( results, status ) => {
      if (status === 'OK') {
        let place = Object.assign({}, location.center);
        place = {
          lat: results[0].geometry.location.lat(), 
          lng: results[0].geometry.location.lng()
        };
        setLocation({
          ...location,
          center: {
            lat: place.lat,
            lng: place.lng,
          },
        });
        console.log(location);
      }
    });
  }

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  //API読み込み後に再レンダーを引き起こさないため、useStateを使わず、useRefとuseCallbackを使っています。

  if (loadError) return "Error";
  if (!isLoaded) return "ロード中...";

  return (
    
    <Fragment>
    <div className="map-outter">
      <div className="search-box-container">
        <div className="input-wrapper">
          <img src={SearchIcon} id="search-icon" onClick={()=>geocode()} />
          <input id="search-input" type='text' onChange={(e) => changeLocationName(e)} placeholder="目的地を入力してください" value={location.locationName} onKeyPress={(e) => changeLocationName(e)}/>
        </div>
      </div>
          <div className="map-inner">
            <GoogleMap
            id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={15}
      　　　　　// デフォルトズーム倍率を指定します。
            center={location.center}
      　　　　　// 札幌周辺にデフォルトのセンターを指定しました。
            options={options}
            onLoad={onMapLoad}
            >

            {posts.map(marker => (
              <Marker
                key={marker.latitude}
                position={{
                  lat: Number(marker.latitude),
                  lng: Number(marker.longitude),
                }}
                onClick={() => {
                  setSelected(marker);
                  // クリックで<InfoWindow>が描画されます。
                }}
                // label={markerLabel}
                /*
                icon={{
                  url: "url of icon",
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                  // ここでアイコン表示の設定ができます。
                }}
                */
              />
              ))}

            {selected ? (
              // MarkerにマウスオーバーされたときにInfoWindowが表示されます。
              <InfoWindow
                position={{
                  lat: Number(selected.latitude),
                  lng: Number(selected.longitude),
                }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div className="info-wrapper">
                  <a className="info-link" href={`http://maps.apple.com/maps?q=${selected.info}&ll=${selected.latitude},${selected.longitude}`}>{selected.info}</a>
                </div>
              </InfoWindow>
              ) : null}

            </GoogleMap>
          </div>
    </div>
    </Fragment>
  );
}
