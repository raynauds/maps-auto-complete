## Description

Example of Google Maps autocomplete and display of address in a map.
Inspired by Ben Awad [react-geosuggest](https://youtu.be/-QQnzDVcTCo) & [react-google-maps](https://youtu.be/xLlIgokKiLc)
To run this project, rename `index.sample.html` in `/public` folder to `index.html` and replace `YOUR_API_KEY` in this file by your Google Maps API key ([Get a Google Maps API key here](https://cloud.google.com/maps-platform))

## Implementation

Initialize a React project with typescript and go to the app folder.

```
npx create-react-app my-app --template typescript
```

Install [react-geosuggest](https://github.com/ubilabs/react-geosuggest) and [react-google-maps](https://github.com/tomchentw/react-google-maps)

```
npm i react-google-maps
npm i react-geosuggest
```

Add Google Maps script in `/public/index.html`. This is required for `react-geosuggest`.
As a result, `withScriptjs` of `react-google-maps` is not used.

```html
<!-- Google Maps -->
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
```

[Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/start), [Google Places API Web Service](https://developers.google.com/places/web-service/intro) and [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial) must be enabled for your API key. If they are not enabled, go to the [Google Maps console](https://console.cloud.google.com/google/maps-apis/overview), find them using the search field at the top and enable them.

Geosuggest HTML structure

```html
<div class="geosuggest">
  <div class="geosuggest__suggests-wrapper">
    <input class="geosuggest__input" />
  </div>
  <div class="geosuggest__suggests-wrapper">
    <!-- if not focused: <ul class="geosuggest__suggests geosuggest__suggests--hidden">  -->
    <ul class="geosuggest__suggests">
      <li class="geosuggest__item">
        <span> <b class="geosuggest__item__matched-text">Ne</b>w York </span>
      </li>
    </ul>
  </div>
</div>
```
