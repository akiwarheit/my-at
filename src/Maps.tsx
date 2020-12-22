/*global google*/
import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

const Map = (props: any) => {
  return (
      <GoogleMap
          defaultZoom={7}
          defaultCenter={{ lat: -36.8483, lng: 174.7625 }}
      >
          {props.directions && <DirectionsRenderer directions={props.directions} />}
      </GoogleMap>
  );
 }

const MapWithADirectionsRenderer = compose(
  withProps({
      containerElement: <div style={{ height: `100%` }} />,
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDz56umFVY3ffCht5uJPys2Tr0XOEGeUeo&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
      componentDidMount() {
          const DirectionsService = new google.maps.DirectionsService();
          const geoCoder = new google.maps.Geocoder();
          geoCoder.geocode({ address: "britomart train station"  }, (result, status) => {

            if(status === google.maps.GeocoderStatus.OK) {
              var originResult = result[0];
              var originLatLong = originResult.geometry.location;

              geoCoder.geocode({ address: "swanson train station"  }, (result, status) => {

                if(status === google.maps.GeocoderStatus.OK) {
                  var destinationResult = result[0];
                  var destinationLatLong = destinationResult.geometry.location;
                  
                  DirectionsService.route({
                    destination: destinationLatLong,
                    origin: originLatLong,
                    travelMode: google.maps.TravelMode.TRANSIT,
                    transitOptions: { modes: [google.maps.TransitMode.RAIL] }
                  }, (result, status) => {
                      if (status === google.maps.DirectionsStatus.OK) {
                          this.setState({
                              directions: result,
                          });
                      } else {
                          console.log(`error fetching directions ${result}`);
                      }
                  });
                }
              });
            }
          });
      }
  })
)(Map);

 
export default MapWithADirectionsRenderer;