"use client"
import { useEffect, useRef } from "react";
import "ol/ol.css"; // Import OpenLayers styles
import { Map as OlMap, View } from "ol";
import ImageLayer from "ol/layer/Image";
import { getCenter } from "ol/extent";
import Projection from "ol/proj/Projection";
import { Coordinate } from "ol/coordinate";
import Static from "ol/source/ImageStatic";

const OpenLayersMap = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<OlMap | null>(null); // To hold map instance

    useEffect(() => {
        if (!mapRef.current) return;

        const width = 15360;
        const height = 15361;
        const extent = [0, 0, width, height];

        const customProjection = new Projection({
            code: "static-image",
            units: "pixels",
            extent: extent,
        });

        const map = new OlMap({
            target: mapRef.current as HTMLElement,
            layers: [
                new ImageLayer({
                    source: new Static({
                        url: "https://the8meta.com/masterplannew/0_01.jpg",
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

        // Add click event listener to zoom in on the clicked point
        map.on('click', (event) => {
            const view = map.getView();
            const clickedCoordinate: Coordinate = event.coordinate;
            view.setCenter(clickedCoordinate);
            view.setZoom(view.getZoom()! + 1); // Increase zoom level
        });

        mapInstance.current = map; // Store map instance

        return () => {
            map.setTarget(undefined);
        };
    }, []);

    const handleFullscreen = () => {
        if (mapRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                mapRef.current.requestFullscreen();
            }
        }
    };

    const handleZoomIn = () => {
        if (mapInstance.current) {
            const view = mapInstance.current.getView();
            view.setZoom(view.getZoom()! + 1);
        }
    };

    const handleZoomOut = () => {
        if (mapInstance.current) {
            const view = mapInstance.current.getView();
            view.setZoom(view.getZoom()! - 1);
        }
    };

    return (
        <div
            ref={mapRef}
            className="relative w-full h-screen overflow-hidden"
        >
            {/* Fullscreen Button */}
            <button
                onClick={handleFullscreen}
                className="z-50 absolute bottom-28 right-4 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 3H5a2 2 0 00-2 2v3m0 10v3a2 2 0 002 2h3m10-18h3a2 2 0 012 2v3m0 10v3a2 2 0 01-2 2h-3"
                    />
                </svg>
            </button>

            {/* Zoom In Button */}
            <button
                onClick={handleZoomIn}
                className="z-50 absolute bottom-16 right-4 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                    />
                </svg>
            </button>

            {/* Zoom Out Button */}
            <button
                onClick={handleZoomOut}
                className="z-50 absolute bottom-4 right-4 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 12H4"
                    />
                </svg>
            </button>
        </div>
    );
};

export default OpenLayersMap;
