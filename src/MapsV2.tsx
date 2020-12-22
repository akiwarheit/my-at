import { Chip } from "@material-ui/core";
import { GoogleMap, LoadScript, InfoBox } from "@react-google-maps/api";
import React from "react";
import Feed from "./Feed";

// function TrainStation({ position, name }: any) {
//   return <Marker position={position} title={name} />;
// }

const containerStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
};

export default function TrainMap(props: any) {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDz56umFVY3ffCht5uJPys2Tr0XOEGeUeo">
      <div>
        <GoogleMap
          mapContainerStyle={containerStyle as React.CSSProperties}
          center={{
            lat: -36.8483,
            lng: 174.7625,
          }}
          zoom={12}
        >
          <InfoBox
            options={{
              closeBoxURL: "",
            }}
            position={{
              lat: -36.8656,
              lng: 174.77,
            }}
          >
            <Chip
              color="primary"
              avatar={<img src={"train.png"} />}
              label="A5681"
            />
          </InfoBox>
        </GoogleMap>
      </div>
      <div style={{ position: "absolute", top: 50, right: 50, zIndex: 50 }}>
        <Feed
          message={
            "Trains are operating on Christmas Day so you can get to where you need to be. They will be running to a holiday timetable, with replacement buses on the Southern line between Britomart & Otahuhu and on the Western line between Swanson & New Lynn.  "
          }
          tags={"#holidays #westernline #aucklandtransport"}
        />
        <Feed
          message={
            "Between 26 December & 10 January, our AT Metro train services will not operate as important track work is undertaken by KiwiRail. Rail replacement & scheduled buses will be available.\n\nWe appreciate your patience and understanding. For more info: http://AT.govt.nz/railclosures "
          }
          tags={"#shutdown #westernline #aucklandtransport"}
        />
        <Feed
          message={"Caltex: Grab Adeel is the best team ever."}
          tags={"#grabadeel #caltex #investinus"}
        />
      </div>
    </LoadScript>
  );
}
