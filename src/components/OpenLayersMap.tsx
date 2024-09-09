"use client";

import { useEffect, useRef } from "react";
import "ol/ol.css"; // Import OpenLayers styles
import { Map as OlMap, View } from "ol";
import ImageLayer from "ol/layer/Image";
import ImageStatic from "ol/source/ImageStatic";
import { getCenter } from "ol/extent";
import Projection from "ol/proj/Projection";

const OpenLayersMap = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        // Define the extent of the image (in coordinates)
        const width = 15360;
        const height = 15361;
        const extent = [0, 0, width, height]; // Adjust to match your image size and coordinates

        // Create a custom projection based on the image's extent
        const customProjection = new Projection({
            code: 'static-image',
            units: 'pixels',
            extent: extent,
        });

        // Initialize the map when the component is mounted
        const map = new OlMap({
            target: mapRef.current as HTMLElement,
            layers: [
                // Image Layer for the custom image
                new ImageLayer({
                    source: new ImageStatic({
                        url: 'https://the8meta.com/masterplannew/0_01.jpg', // Replace with your high-resolution image URL
                        imageExtent: extent,
                        projection: customProjection,
                    }),
                }),
            ],
            view: new View({
                projection: customProjection,
                center: getCenter(extent),
                zoom: 1,
                maxZoom: 6,
                enableRotation: false,
                extent,
                smoothExtentConstraint: false,
            }),
            controls: [],
        });

        // Clean up the map when the component is unmounted
        return () => {
            map.setTarget(undefined);
        };
    }, []);

    return (
        <div
            ref={mapRef}
            style={{
                width: "100%",
                height: "100vh",
                position: "relative",
                overflow: "hidden",
            }}
        ></div>
    );
};

export default OpenLayersMap;
