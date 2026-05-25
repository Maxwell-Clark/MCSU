interface NominatimResult {
  lat: string;
  lon: string;
}

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
  const trimmed = address.trim();
  if (!trimmed) {
    throw new Error('Address is required to geocode');
  }

  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('format', 'json');
  url.searchParams.set('q', trimmed);
  url.searchParams.set('limit', '1');

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'MCSU-Admin/1.0 (class location geocoder)',
      'Accept-Language': 'en',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Geocoding service returned ${response.status}`);
  }

  const results = (await response.json()) as NominatimResult[];
  if (!results.length) {
    throw new Error(`Could not find coordinates for address: ${trimmed}`);
  }

  const lat = parseFloat(results[0].lat);
  const lng = parseFloat(results[0].lon);
  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    throw new Error('Geocoding service returned invalid coordinates');
  }

  return { lat, lng };
}
