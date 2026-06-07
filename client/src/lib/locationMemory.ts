const LOCATION_KEY = 'pet_calc_location';
const LOCATION_DATA_KEY = 'pet_calc_location_data';

export interface SavedLocation {
  postalCode: string;
  city: string;
  state: string;
  country: string;
  timestamp: number;
}

export function saveLocation(location: SavedLocation): void {
  try {
    localStorage.setItem(LOCATION_KEY, location.postalCode);
    localStorage.setItem(LOCATION_DATA_KEY, JSON.stringify(location));
  } catch (error) {
    console.error('Failed to save location:', error);
  }
}

export function getSavedLocation(): SavedLocation | null {
  try {
    const data = localStorage.getItem(LOCATION_DATA_KEY);
    if (!data) return null;
    
    const location = JSON.parse(data) as SavedLocation;
    
    // Check if location is less than 30 days old
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    if (location.timestamp < thirtyDaysAgo) {
      clearLocation();
      return null;
    }
    
    return location;
  } catch (error) {
    console.error('Failed to load location:', error);
    return null;
  }
}

export function clearLocation(): void {
  try {
    localStorage.removeItem(LOCATION_KEY);
    localStorage.removeItem(LOCATION_DATA_KEY);
  } catch (error) {
    console.error('Failed to clear location:', error);
  }
}

