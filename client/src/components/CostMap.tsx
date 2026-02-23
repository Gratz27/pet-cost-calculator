import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { regionalCosts } from '@/data/regionalCosts';
import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Locate } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { convertCurrency, formatCurrency as formatCurrencyWithSymbol } from '@/lib/currency';

// Fix for default marker icon in Leaflet with Webpack/Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Hack to fix Leaflet icon issue
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function LocationMarker() {
  const map = useMap();
  const [position, setPosition] = useState<[number, number] | null>(null);

  const handleLocate = () => {
    map.locate().on("locationfound", function (e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    });
  };

  return (
    <div className="absolute top-4 right-4 z-[1000]">
      <Button 
        onClick={handleLocate} 
        variant="secondary" 
        size="sm"
        className="shadow-md bg-white hover:bg-gray-100 text-black"
      >
        <Locate className="w-4 h-4 mr-2" />
        Locate Me
      </Button>
      {position === null ? null : (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      )}
    </div>
  );
}

export default function CostMap() {
  const { currency } = useCurrency();

  const formatCost = (amount: number) => {
    const converted = convertCurrency(amount, currency);
    return formatCurrencyWithSymbol(converted, currency);
  };

  return (
    <div className="relative h-[600px] w-full rounded-xl overflow-hidden border shadow-lg">
      <MapContainer 
        center={[39.8283, -98.5795]} 
        zoom={4} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        {regionalCosts.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup className="min-w-[250px]">
              <div className="p-1">
                <h3 className="font-bold text-lg mb-1">{loc.name}</h3>
                <div className="inline-block px-2 py-0.5 rounded text-xs font-bold text-white mb-3"
                  style={{
                    backgroundColor: 
                      loc.costLevel === 'Very High' ? '#ef4444' : 
                      loc.costLevel === 'High' ? '#f97316' : 
                      loc.costLevel === 'Medium' ? '#eab308' : '#22c55e'
                  }}
                >
                  {loc.costLevel} Cost Area
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-muted-foreground">Exam Fee:</span>
                    <span className="font-medium">{formatCost(loc.examFee[0])} - {formatCost(loc.examFee[1])}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-muted-foreground">Vaccines:</span>
                    <span className="font-medium">{formatCost(loc.vaccines[0])} - {formatCost(loc.vaccines[1])}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-muted-foreground">Spay/Neuter:</span>
                    <span className="font-medium">{formatCost(loc.spayNeuter[0])} - {formatCost(loc.spayNeuter[1])}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dental:</span>
                    <span className="font-medium">{formatCost(loc.dentalCleaning[0])} - {formatCost(loc.dentalCleaning[1])}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 italic">
                  *Estimated ranges based on local averages. Actual prices may vary by clinic.
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
