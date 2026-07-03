// Free geocoding via OpenStreetMap's Nominatim — no API key needed.
// Client-side counterpart to backend/src/utils/geocode.js, used for the
// interactive map picker in the Add Property flow.

export async function forwardGeocode(locationText) {
  if (!locationText || !locationText.trim()) return null;
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(locationText)}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const results = await res.json();
    if (!results.length) return null;
    return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) };
  } catch {
    return null;
  }
}

export async function reverseGeocode(lat, lng) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const result = await res.json();
    return result?.display_name || null;
  } catch {
    return null;
  }
}
