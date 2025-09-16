import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";

interface InteractiveMapProps {
  onLocationClick?: (location: { lat: number; lng: number; name?: string }) => void;
}

const InteractiveMap = ({ onLocationClick }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim() || !map.current) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxToken}&country=IN`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        const placeName = data.features[0].place_name;
        
        map.current.flyTo({
          center: [lng, lat],
          zoom: 10,
          duration: 2000
        });

        // Add marker
        new mapboxgl.Marker({ color: 'var(--primary)' })
          .setLngLat([lng, lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${placeName}</h3>`))
          .addTo(map.current);

        onLocationClick?.({ lat, lng, name: placeName });
        toast.success(`Found: ${placeName}`);
      } else {
        toast.error('Location not found');
      }
    } catch (error) {
      toast.error('Search failed');
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [78.9629, 20.5937], // Center of India
      zoom: 4.5,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add click handler
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      
      // Add marker on click
      new mapboxgl.Marker({ color: 'hsl(var(--primary))' })
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<div class="p-2">
              <h3 class="font-semibold">Location</h3>
              <p>Lat: ${lat.toFixed(4)}</p>
              <p>Lng: ${lng.toFixed(4)}</p>
            </div>`
          )
        )
        .addTo(map.current!);

      onLocationClick?.({ lat, lng });
      toast.success(`Location selected: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    });

    // Add sample groundwater data points
    map.current.on('load', () => {
      // Sample data points for different groundwater levels
      const dataPoints = [
        { coordinates: [77.1025, 28.7041], level: 'excellent', name: 'Delhi' },
        { coordinates: [72.8777, 19.0760], level: 'moderate', name: 'Mumbai' },
        { coordinates: [77.5946, 12.9716], level: 'good', name: 'Bangalore' },
        { coordinates: [88.3639, 22.5726], level: 'critical', name: 'Kolkata' },
        { coordinates: [80.2707, 13.0827], level: 'poor', name: 'Chennai' },
      ];

      dataPoints.forEach(point => {
        const el = document.createElement('div');
        el.className = `w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer`;
        el.style.backgroundColor = `hsl(var(--data-${point.level}))`;

        new mapboxgl.Marker(el)
          .setLngLat(point.coordinates as [number, number])
          .setPopup(
            new mapboxgl.Popup().setHTML(
              `<div class="p-2">
                <h3 class="font-semibold">${point.name}</h3>
                <p class="text-sm">Groundwater: ${point.level}</p>
              </div>`
            )
          )
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, onLocationClick]);

  if (!mapboxToken) {
    return (
      <div className="p-4 bg-card rounded-lg border border-border">
        <h3 className="font-semibold mb-2">Mapbox Token Required</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Please enter your Mapbox public token to use the interactive map.
          Get yours from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
        </p>
        <div className="flex gap-2">
          <Input
            type="password"
            placeholder="Enter Mapbox public token (pk.eyJ1...)"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="flex-1"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search locations in India..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Search
        </button>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div ref={mapContainer} className="w-full h-64 rounded-lg overflow-hidden" />
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm p-3 rounded-lg border border-border">
          <h4 className="font-semibold text-sm mb-2">Groundwater Levels</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-data-excellent rounded-full" />
              <span>Excellent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-data-good rounded-full" />
              <span>Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-data-moderate rounded-full" />
              <span>Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-data-poor rounded-full" />
              <span>Poor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-data-critical rounded-full" />
              <span>Critical</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;