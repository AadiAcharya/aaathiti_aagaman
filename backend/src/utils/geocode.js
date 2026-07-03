// Free geocoding via OpenStreetMap's Nominatim — no API key needed.
// Usage policy requires a descriptive User-Agent and caps us at ~1 req/sec,
// which is fine here since it only runs on room create/update, not per-request.
exports.geocodeLocation = async (locationText) => {
  if (!locationText || !locationText.trim()) return null;

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(locationText)}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'AathitiAagaman/1.0 (property rental booking app)' },
    });
    if (!res.ok) return null;

    const results = await res.json();
    if (!results.length) return null;

    return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) };
  } catch {
    return null; // geocoding is best-effort; never block room creation on it
  }
};
