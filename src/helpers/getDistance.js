function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // km 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  if (d > 1) return Math.round(d) + " km away";
  else if (d <= 1) return Math.round(d * 1000) + " m away";
  return d;
};

export default getDistance
