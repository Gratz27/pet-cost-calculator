/**
 * Postal/Zip code lookup utility using Zippopotam.us API
 * Free API with no authentication required
 */

export interface LocationData {
  city: string;
  state: string;
  country: string;
  countryCode: string;
}

/**
 * Look up location information from postal/zip code
 * Supports multiple countries including US, CA, AU, NZ, UK, etc.
 */
export async function lookupPostalCode(
  postalCode: string
): Promise<LocationData | null> {
  try {
    // Clean the postal code
    const cleanCode = postalCode.trim().replace(/\s+/g, "");
    
    if (!cleanCode) {
      return null;
    }

    // Try to detect country and format appropriately
    const countryCodes = detectCountryFromPostalCode(cleanCode);
    
    // Try each country in order
    for (const countryCode of countryCodes) {
      try {
        const response = await fetch(
          `https://api.zippopotam.us/${countryCode}/${cleanCode}`
        );

        if (response.ok) {
          const data = await response.json();
          const result = parseZippopotamResponse(data);
          if (result) {
            return result;
          }
        }
      } catch (err) {
        // Continue to next country
        continue;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Postal code lookup error:", error);
    return null;
  }
}

/**
 * Detect country code from postal code format
 * Returns array of possible countries to try in order
 */
function detectCountryFromPostalCode(code: string): string[] {
  const countries: string[] = [];
  
  // Canada: A1A 1A1 format (most specific, check first)
  if (/^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i.test(code)) {
    return ["ca"];
  }
  
  // UK: Various formats
  if (/^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i.test(code)) {
    return ["gb"];
  }
  
  // 4 digits: Could be NZ or AU
  if (/^\d{4}$/.test(code)) {
    // Try NZ first for codes starting with 0 or 1
    if (/^[01]\d{3}$/.test(code)) {
      countries.push("nz", "au");
    } else {
      countries.push("au", "nz");
    }
    return countries;
  }
  
  // 5 digits: Could be US
  if (/^\d{5}(-?\d{4})?$/.test(code)) {
    return ["us"];
  }
  
  // Default: try common countries
  return ["us", "gb", "ca", "au", "nz"];
}

/**
 * Parse Zippopotam API response
 */
function parseZippopotamResponse(data: any): LocationData | null {
  try {
    const place = data.places?.[0];
    if (!place) {
      return null;
    }

    return {
      city: place["place name"] || "",
      state: place["state abbreviation"] || place["state"] || "",
      country: getCountryName(data["country abbreviation"]),
      countryCode: data["country abbreviation"],
    };
  } catch (error) {
    return null;
  }
}

/**
 * Get full country name from country code
 */
function getCountryName(code: string): string {
  const countryNames: Record<string, string> = {
    US: "United States",
    CA: "Canada",
    GB: "United Kingdom",
    AU: "Australia",
    NZ: "New Zealand",
    DE: "Germany",
    FR: "France",
    ES: "Spain",
    IT: "Italy",
    JP: "Japan",
    MX: "Mexico",
    BR: "Brazil",
    IN: "India",
    CN: "China",
  };

  return countryNames[code] || code;
}

/**
 * Format location for display
 */
export function formatLocation(location: LocationData): string {
  const parts = [];
  
  if (location.city) {
    parts.push(location.city);
  }
  
  if (location.state) {
    parts.push(location.state);
  }
  
  if (location.country) {
    parts.push(location.country);
  }
  
  return parts.filter(p => p).join(", ");
}

