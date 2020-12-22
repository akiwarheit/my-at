/*global google*/
import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";
import Feed from "./Feed";

const Map = (props: any) => {
  return (
    <div>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: -36.8483, lng: 174.7625 }}
      >
        {props.directions && (
          <DirectionsRenderer directions={props.directions} />
        )}
      </GoogleMap>
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
    </div>
  );
};

const MapWithADirectionsRenderer = compose(
  withProps({
    containerElement: <div style={{ height: `100%` }} />,
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDz56umFVY3ffCht5uJPys2Tr0XOEGeUeo&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();
      const geoCoder = new google.maps.Geocoder();
      geoCoder.geocode(
        { address: "britomart train station" },
        (result, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            var originResult = result[0];
            var originLatLong = originResult.geometry.location;

            geoCoder.geocode(
              { address: "swanson train station" },
              (result, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                  var destinationResult = result[0];
                  var destinationLatLong = destinationResult.geometry.location;

                  DirectionsService.route(
                    {
                      destination: destinationLatLong,
                      origin: originLatLong,
                      travelMode: google.maps.TravelMode.TRANSIT,
                      transitOptions: { modes: [google.maps.TransitMode.RAIL] },
                    },
                    (result, status) => {
                      console.log(result);
                      if (status === google.maps.DirectionsStatus.OK) {
                        this.setState({
                          directions: result,
                        });
                      } else {
                        console.log(`error fetching directions ${result}`);
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    },
  })
)(Map);

export default MapWithADirectionsRenderer;
