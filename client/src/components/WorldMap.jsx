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
      'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_Black_Marble/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png',
      {
        attribution: '&copy; <a href="https://earthdata.nasa.gov/gibs">NASA GIBS</a>',
        maxZoom: 8,
      }
    ).addTo(map);

    OPERATING_COUNTRIES.forEach((country) => {
      // Glow layer
      L.circleMarker([country.lat, country.lng], {
        color: '#4f46e5', // Brand purple glow
        fillColor: '#4f46e5',
        fillOpacity: 0.25,
        weight: 0,
        radius: 16,
      }).addTo(map);

      // Core point
      const marker = L.circleMarker([country.lat, country.lng], {
        color: '#fbbf24', // Gold core
        fillColor: '#fbbf24',
        fillOpacity: 0.9,
        weight: 1.5,
        radius: 7,
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
