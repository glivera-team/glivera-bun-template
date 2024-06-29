import { Loader } from '@googlemaps/js-api-loader';
import { exist } from '../utils/index';

/**
 * Google map initialization sample
 * text to the manager about the API key
 * docs - {@link https://developers.google.com/maps/documentation Google Docs}
 */

const initMap = () => {
	const SELECTORS = {
		map: '#map',
	};

	const $map = document.querySelector(SELECTORS.map);
	if (!exist($map) || !$map.dataset.key) return;

	const latValue = parseFloat($map.dataset.lat || 0);
	const lngValue = parseFloat($map.dataset.lng || 0);

	const loader = new Loader({
		apiKey: $map.dataset.key,
		version: 'weekly',
		libraries: ['places'],
	});

	const mapOptions = {
		center: {
			lat: latValue,
			lng: lngValue,
		},
		zoom: parseFloat($map.dataset.zoom),
	};

	let markerIcon;

	loader
		.load()
		.then((google) => {
			let map = new google.maps.Map($map, mapOptions);
			const marker = new google.maps.Marker({
				position: new google.maps.LatLng(latValue, lngValue),
				map,
			});
		})
		.catch((e) => {
			console.log(e);
		});
};

export default initMap;
