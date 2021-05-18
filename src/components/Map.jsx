import React, { Fragment, useCallback, useRef, useState } from 'react';
import { GOOGLE_API_KEY } from '../credentials.js';
import { mapStyles } from '../mapConfig.js';
// import { PlaceInfo } from './PlaceInfo.jsx'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { HeaderWrapper } from "./Header.jsx";

const markerLabel = {
  color: "white",
  fontFamily: "sans-serif",
  fontSize: "15px",
  fontWeight: "100",
  text: "ト",
};

const libraries = ["places"];
const mapContainerStyle = {
  height: "70vh",
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
    locationName: '目的地を入力してください',
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
    <HeaderWrapper>
      <input type='text' onChange={(e) => changeLocationName(e)} value={location.locationName} onKeyPress={(e) => changeLocationName(e)}/>
    </HeaderWrapper>
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
          <div>{selected.info}</div>
        </InfoWindow>
        ) : null}

      { /*posts.map(marker => (
        <DistanceMatrixService
        options={{
          destinations: [{ lat: 37.912039, lng: 139.061775 }],
          origins: [{ lat: 37.9133196, lng: 139.0582136 }],
          travelMode: "DRIVING",
        }}
          callback = {(response) => {console.log(response)}}
        />
      ))*/ }
      </GoogleMap>
    </Fragment>
  );
}
