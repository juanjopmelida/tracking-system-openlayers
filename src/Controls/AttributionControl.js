import React, { useContext, useEffect, useState } from "react";
import { Attribution } from "ol/control";
import MapContext from "../Map/MapContext";

const FullScreenControl = () => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		let attributionControl = new Attribution({visible: false});

		map.controls.push(attributionControl);

		return () => map.controls.remove(attributionControl);
	}, [map]);

	return null;
};

export default FullScreenControl;