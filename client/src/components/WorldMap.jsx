import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const OPERATING_COUNTRIES = [
  { name: 'Sri Lanka', lat: 7.8731, lng: 80.7718 },
  { name: 'Australia', lat: -25.2744, lng: 133.7751 },
  { name: 'Japan', lat: 36.2048, lng: 138.2529 },
];

const WorldMap = () => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Guard: don't initialise twice (React StrictMode fires effects twice in dev)
    if (mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [20, 10],
      zoom: 2,
      minZoom: 2,
      maxZoom: 2,
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: false,
      doubleClickZoom: false,
      touchZoom: false,
      keyboard: false,
      boxZoom: false,
      attributionControl: false,
    });

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 18,
      }
    ).addTo(map);

    OPERATING_COUNTRIES.forEach((country) => {
      const marker = L.circleMarker([country.lat, country.lng], {
        color: '#93c5fd',
        fillColor: '#1e3a8a',
        fillOpacity: 0.95,
        weight: 2.5,
        radius: 9,
      });

      marker.bindTooltip(country.name, {
        direction: 'top',
        offset: L.point(0, -10),
        opacity: 1,
        className: 'leaflet-world-tooltip',
      });

      marker.addTo(map);
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      style={{ height: '500px' }}
    />
  );
};

export default WorldMap;
