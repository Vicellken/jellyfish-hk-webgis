import "./App.css";
import React, { useState, useEffect, useMemo } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import jellyfish from "./jf-2021"; // map data in an array of objects
import Pin from "./pin";

const mapboxAccessToken = ""; // use the mapbox access token

function App() {
  const [selectPopup, setSelectPopup] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectPopup(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const pins = useMemo(
    () =>
      jellyfish.map((record, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={record.geometry.coordinates[0]}
          latitude={record.geometry.coordinates[1]}
          anchor="bottom"
        >
          <Pin onClick={() => setSelectPopup(record)} />
        </Marker>
      )),
    []
  );

  return (
    <div className="Map">
      <Map
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={{
          longitude: 114.112,
          latitude: 22.3685,
          zoom: 10,
        }}
        mapStyle="mapbox://styles/gvrs-trial/ckzaonl9c003c15mupray04wu" // you can apply your own map style
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}

        {selectPopup && (
          <Popup
            anchor="top"
            key={selectPopup.id}
            longitude={selectPopup.geometry.coordinates[0]}
            latitude={selectPopup.geometry.coordinates[1]}
            closeOnClick={false}
            onClose={() => setSelectPopup(null)}
          >
            <div>
              <h3 style={{ fontFamily: "verdana", fontSize: "19px" }}>
                <i>{selectPopup.properties.name}</i>
              </h3>
              <p style={{ fontFamily: "verdana", fontSize: "15px" }}>
                Observed on {selectPopup.properties.obsDate} at{" "}
                {selectPopup.properties.obsLoci}
              </p>
              <p style={{ fontFamily: "verdana", fontSize: "12px" }}>
                Data submitted via {selectPopup.properties.source}
              </p>
              <p>
                <a target="_new" href={selectPopup.url}>
                  WoRMS
                </a>
              </p>
              <img width="100%" src={selectPopup.image} alt="jellyfishImg" />
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default App;
