import React, { Fragment, useCallback, useRef } from 'react';
import { GOOGLE_API_KEY } from '../credentials.js';
import { mapStyles } from '../mapStyle.js';
import { PlaceInfo } from './PlaceInfo.jsx'
import { GoogleMap, useLoadScript, LoadScript } from "@react-google-maps/api";
// import mapStyles from "./mapUtils/mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  height: "85vh",
  width: "100%",
};

// 地図の大きさを指定します。

const center = {
    lat: 43.048225,
    lng: 141.49701,
  };

const position_1 = {
    lat: 37.9133196,
    lng: 139.0582136,
  };

const position_2 = {
    lat: 37.9127904,
    lng: 139.0843233,
  };

/*
const markerLabel = {
    color: "white",
    fontFamily: "sans-serif",
    fontSize: "15px",
    fontWeight: "100",
    text: "ト",
  };
  */

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  // デフォルトUI（衛星写真オプションなど）をキャンセルします。
  zoomControl: true,
};

/*
export const Map = () => {

    return (
      <Fragment>
      <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={17}
          options={options}
          // onLoad={onMapLoad}
        >
          <PlaceInfo />
        </GoogleMap>
      </LoadScript>
      </Fragment>
    )
  };
*/


export const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,

    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    console.log('callback');
  }, []);
  //API読み込み後に再レンダーを引き起こさないため、useStateを使わず、useRefとuseCallbackを使っています。

  if (loadError) return "Error";
  if (!isLoaded) return "ロード中...";

  return (
    <Fragment>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
　　　　　// デフォルトズーム倍率を指定します。
        center={center}
　　　　　// 札幌周辺にデフォルトのセンターを指定しました。
        options={options}
        onLoad={onMapLoad}
      >
        <PlaceInfo/>
      </GoogleMap>
    </Fragment>
  );
}
