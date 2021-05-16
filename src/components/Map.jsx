import React, { Fragment, useCallback, useRef, useState } from 'react';
import { GOOGLE_API_KEY } from '../credentials.js';
import { mapStyles } from '../mapConfig.js';
// import { PlaceInfo } from './PlaceInfo.jsx'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const markerLabel = {
  color: "white",
  fontFamily: "sans-serif",
  fontSize: "15px",
  fontWeight: "100",
  text: "ト",
};

const libraries = ["places"];
const mapContainerStyle = {
  height: "90vh",
  width: "100%",
};

// 地図の大きさを指定します。

const center = {
    lat: 34.7082863,
    lng: 135.4441847,
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
  zoomControl: false,
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


export const Map = ({posts}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  const [selected, setSelected] = useState(null);

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
      zoom={18}
　　　　　// デフォルトズーム倍率を指定します。
      center={center}
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
          // マウスオーバーで<InfoWindow>が描画されます。
        }}
        label={markerLabel}
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
        <div>{selected.info}</div>
      </InfoWindow>
    ) : null}
      </GoogleMap>
    </Fragment>
  );
}
