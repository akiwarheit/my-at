import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

function TrainStation({ position, name, id }: any) {
  return <Marker id={id} position={position} name={name} />;
}

export function TrainMap(props: any) {
  return (
    <div>
      <Map
        google={props.google}
        initialCenter={{
          lat: -36.8483,
          lng: 174.7625,
        }}
      >
        {[
          {
            position: {
              lat: 1,
              lng: 2,
            },
            id: 1,
            name: "Britomart",
          },
        ].map((station) => (
          <Marker {...station} />
        ))}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "",
})(TrainMap);
