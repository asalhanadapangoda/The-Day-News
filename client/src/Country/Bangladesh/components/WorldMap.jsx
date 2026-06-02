import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const OPERATING_COUNTRIES = [
  { name: 'Australia', lat: -25.2744, lng: 133.7751 },
  { name: 'Bangladesh', lat: 23.6850, lng: 90.3563 },
  { name: 'Sri Lanka', lat: 7.8731, lng: 80.7718 },
  { name: 'Japan', lat: 36.2048, lng: 138.2529 },
  { name: 'India', lat: 20.5937, lng: 78.9629 },
  { name: 'USA', lat: 37.0902, lng: -95.7129 },
  { name: 'Thailand', lat: 15.8700, lng: 100.9925 },
  { name: 'Denmark', lat: 56.2639, lng: 9.5018 },
  { name: 'South Africa', lat: -30.5595, lng: 22.9375 },
  { name: 'New Zealand', lat: -40.9006, lng: 174.8860 },
  { name: 'Samoa', lat: -13.7590, lng: -172.1046 },
];

const WorldMap = () => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Guard: don't initialise twice
    if (mapRef.current) return;

    const isMobile = window.innerWidth < 768;
    const initialHeight = isMobile ? 320 : 500;

    const map = L.map(containerRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: false,
      doubleClickZoom: false,
      touchZoom: false,
      keyboard: false,
      boxZoom: false,
      attributionControl: false,
      minZoom: 1,
      maxZoom: 8,
      zoomSnap: 0.1,
    });

    L.tileLayer(
      'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_Black_Marble/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png',
      {
        attribution: '&copy; <a href="https://earthdata.nasa.gov/gibs">NASA GIBS</a>',
        maxZoom: 8,
      }
    ).addTo(map);

    const markerGroup = L.featureGroup();

    OPERATING_COUNTRIES.forEach((country) => {
      // Glow layer
      L.circleMarker([country.lat, country.lng], {
        color: '#4f46e5',
        fillColor: '#4f46e5',
        fillOpacity: 0.2,
        weight: 0,
        radius: isMobile ? 12 : 18,
      }).addTo(markerGroup);

      // Core point
      const marker = L.circleMarker([country.lat, country.lng], {
        color: '#fbbf24',
        fillColor: '#fbbf24',
        fillOpacity: 0.9,
        weight: 1.5,
        radius: isMobile ? 5 : 8,
      });

      marker.bindTooltip(country.name, {
        direction: 'top',
        offset: L.point(0, -8),
        opacity: 1,
        className: 'leaflet-world-tooltip',
      });

      marker.addTo(markerGroup);
    });

    markerGroup.addTo(map);

    // Dynamic focus function
    const focusOnMarkers = () => {
      if (!mapRef.current) return;
      const bounds = markerGroup.getBounds();
      // Add extra padding for small screens to ensure we see some context
      const padding = [0, 0];
      map.fitBounds(bounds, { padding: padding, animate: true });
    };

    // Initial focus
    const timeoutId = setTimeout(focusOnMarkers, 200);

    // Update on resize
    const handleResize = () => {
      if (!mapRef.current) return;
      map.invalidateSize();
      focusOnMarkers();
    };

    window.addEventListener('resize', handleResize);
    mapRef.current = map;

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
      if (mapRef.current) {
        const instance = mapRef.current;
        mapRef.current = null;
        instance.remove();
      }
    };
  }, []);

  // Determine height based on initial width
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const height = isMobile ? '320px' : '500px';

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      style={{ height: height }}
    />
  );
};

export default WorldMap;
