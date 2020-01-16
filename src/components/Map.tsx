import React from 'react'
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps'

interface MapProps {
  isMarkerShown: boolean
  defaultCenter: google.maps.LatLngLiteral
  center: google.maps.LatLngLiteral
}

const Map: React.FC<MapProps> = props => {
  const { isMarkerShown, defaultCenter, center } = props
  return (
    <div className="root">
      <GoogleMap
        defaultZoom={15}
        defaultCenter={defaultCenter}
        center={center}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        defaultOptions={{
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
        }}
      >
        {isMarkerShown && <Marker position={center} />}
      </GoogleMap>
    </div>
  )
}

const WithGoogleMap = withGoogleMap(Map)

export default WithGoogleMap
