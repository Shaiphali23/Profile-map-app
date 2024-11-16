import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useContext } from "react";
import { ProfilesContext } from "../ContextAPI/ProfilesContext";

const MapComponent = ({ address }) => {
  const { coordinates } = useContext(ProfilesContext);
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = coordinates
    ? { lat: coordinates.lat, lng: coordinates.lng }
    : { lat: 0, lng: 0 };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
