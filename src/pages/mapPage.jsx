// // MapPage.js
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { useEffect, useState } from "react";
// import "leaflet/dist/leaflet.css";
// import L from 'leaflet';


function MapPage() {
//   const [userPosition, setUserPosition] = useState([51.505, -0.09]); // Default

//   delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((pos) => {
//       const { latitude, longitude } = pos.coords;
//       setUserPosition([latitude, longitude]);
//     });
//   }, []);

//   return (
//       userPosition ? (
//         <MapContainer center={userPosition} zoom={13} style={{ height: "100vh", width: "100%" }}>
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker position={userPosition}>
//             <Popup>Du bist hier</Popup>
//           </Marker>
//         </MapContainer>
//       ) : <div>Lade Karte...</div>
//     );
    
}

export default MapPage;
