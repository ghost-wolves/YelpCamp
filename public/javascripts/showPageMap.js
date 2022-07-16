
const goodCamp = JSON.parse(campground);

    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: goodCamp.geometry.coordinates, // starting position [lng, lat]
        zoom: 5, // starting zoom
        projection: 'globe' // display the map as a 3D globe
    });
    map.on('style.load', () => {
        map.setFog({}); // Set the default atmosphere style
    });

    new mapboxgl.Marker()
    .setLngLat(goodCamp.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${goodCamp.title}</h3><p>${goodCamp.location}</p>`
            )
    )
    .addTo(map)