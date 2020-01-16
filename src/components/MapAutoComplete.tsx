import React, { useState } from 'react'
import Geosuggest, { Suggest } from 'react-geosuggest'
import Map from './Map'

const defaultCenter: google.maps.LatLngLiteral = {
  lat: 48.864716,
  lng: 2.349014,
}

interface Position {
  latitude: string
  longitude: string
}

interface Address {
  streetNumber: string
  streetName: string
  zipCode: string
  city: string
  country: string
}

const emptyPosition: Position = {
  latitude: '',
  longitude: '',
}

const emptyAddress: Address = {
  streetNumber: '',
  streetName: '',
  zipCode: '',
  city: '',
  country: '',
}

const MapAutoComplete: React.FC = () => {
  // STATE
  const [position, setPosition] = useState<Position>(emptyPosition)
  const [address, setAddress] = useState<Address>(emptyAddress)

  /**
   * Get the desired address component "long_name" from a gmapsAddress and the type of address component
   * @param gmapsAddress - "gmaps" key of the object returned by "onSuggestSelect" of "Geosuggest", with indivation about the address of the place
   * @param type - type of the desired address component, e.g. "street_name" or "postal_code"
   * @returns the desired address component "long_name"
   */
  const findAddressComponent = (
    gmapsAddress: Array<google.maps.GeocoderAddressComponent> | undefined,
    type: string
  ): string | undefined => {
    const addressComponent = gmapsAddress?.find(currentAddressComponent =>
      currentAddressComponent.types.some(currentType => currentType === type)
    )
    return addressComponent?.long_name
  }

  /**
   * Function executed on clic on a suggestion from Geosuggest, giving access to a "suggest" object with indivation about the place (e.g. address)
   * Extract the address & latitude & longitude of the place put them in the state
   * @param suggest - object returned by "onSuggestSelect" of "Geosuggest", with indivation about the address of the place
   */
  const onSuggestSelect = (suggest: Suggest): void => {
    if (!suggest) {
      return
    }

    const newPosition: Position = {
      latitude: suggest.location.lat.toString(),
      longitude: suggest.location.lng.toString(),
    }

    const gmapsAddress = suggest.gmaps?.address_components
    const newAddress = {
      streetNumber: findAddressComponent(gmapsAddress, 'street_number') || '',
      streetName: findAddressComponent(gmapsAddress, 'route') || '',
      zipCode: findAddressComponent(gmapsAddress, 'postal_code') || '',
      city: findAddressComponent(gmapsAddress, 'locality') || '',
      country: findAddressComponent(gmapsAddress, 'country') || '',
    }

    setPosition(newPosition)
    setAddress(newAddress)
  }

  // Check if the position in state is valid
  const isPositionValid =
    !isNaN(parseFloat(position.latitude)) &&
    !isNaN(parseFloat(position.longitude))
  const center: google.maps.LatLngLiteral = isPositionValid
    ? {
        lat: parseFloat(position.latitude),
        lng: parseFloat(position.longitude),
      }
    : defaultCenter

  // RENDER
  return (
    <div>
      {/* TITLE */}
      <h1>Google Maps - Get Place & Display Location</h1>

      {/* GEOSUGGEST */}
      <div>
        <label>Search with Google Maps:</label>
        <Geosuggest onSuggestSelect={onSuggestSelect} />
      </div>

      {/* INFORMATION */}
      <p>Street number: {address.streetNumber}</p>
      <p>Street name: {address.streetName}</p>
      <p>Zip code: {address.zipCode}</p>
      <p>City: {address.city}</p>
      <p>Country: {address.country}</p>
      <p>Latitude: {position.latitude}</p>
      <p>Longitude: {position.longitude}</p>

      {/* MAP */}
      <Map
        defaultCenter={defaultCenter}
        center={center}
        isMarkerShown={isPositionValid}
        containerElement={<div style={styles.map}>containerElement</div>}
        mapElement={<div style={styles.map}>mapElement</div>}
      />
    </div>
  )
}

const styles = {
  map: {
    width: '400px',
    height: '400px',
  },
}

export default MapAutoComplete
