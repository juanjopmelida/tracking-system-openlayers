import React, { useState } from "react";
import "./App.css";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import {
  Circle as CircleStyle,
  Fill,
  Icon,
  RegularShape,
  Stroke,
  Style,
} from "ol/style";
import { osm, vector } from "./Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Controls, FullScreenControl, AttributionControl } from "./Controls";

import LastMarker from "./assets/png/current-location-regular-24.png";
import FirstMarker from "./assets/png/error-regular-48.png";

let styles = {
  PathLine: new Style({
    stroke: new Stroke({
      color: "#aaff00",
      width: 5,
      lineCap: "square",
      lineJoin: "bevel",
      lineDash: [5, 8],
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),

  FirstMarker: new Style({
    image: new Icon({
      src: FirstMarker,
    }),
  }),

  LastMarker: new Style({
    image: new Icon({
      src: LastMarker,
    }),
  }),
};

const lastPositions = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "LineString",
    coordinates: [
      [-3.919308185577392, 40.71250421371713],
      [-3.9192545413970947, 40.7127115888789],
      [-3.919184803962707, 40.7129311618756],
      [-3.9191150665283203, 40.71302874964173],
      [-3.919672966003418, 40.71321579246032],
      [-3.920043110847473, 40.71330931367258],
      [-3.9202845096588135, 40.71332964435351],
      [-3.920450806617737, 40.71321579246032],
      [-3.920568823814392, 40.71260180210901],
      [-3.92062783241272, 40.71228057311295],
      [-3.9206331968307495, 40.71210166008873],
      [-3.920670747756958, 40.711849554556856],
    ],
  },
};

const firstPosition = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [-3.919318914413452, 40.71250014753102],
  },
};

const lastPosition = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [-3.920670747756958, 40.711849554556856],
  },
};

const App = () => {
  const [center, setCenter] = useState([-3.919308185577392, 40.71250421371713]);
  const [zoom, setZoom] = useState(18);
  const [showLayer1, setShowLayer1] = useState(true);

  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          {showLayer1 && (
            <>
              <VectorLayer
                source={vector({
                  features: new GeoJSON().readFeatures(lastPositions, {
                    featureProjection: get("EPSG:3857"),
                  }),
                })}
                style={styles.PathLine}
              />
              <VectorLayer
                source={vector({
                  features: new GeoJSON().readFeatures(firstPosition, {
                    featureProjection: get("EPSG:3857"),
                  }),
                })}
                style={styles.FirstMarker}
              />
              <VectorLayer
                source={vector({
                  features: new GeoJSON().readFeatures(lastPosition, {
                    featureProjection: get("EPSG:3857"),
                  }),
                })}
                style={styles.LastMarker}
              />
            </>
          )}
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
    </div>
  );
};

export default App;
