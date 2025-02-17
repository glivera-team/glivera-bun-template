/* eslint-disable */

import { Loader } from '@googlemaps/js-api-loader';
import { CLUSTER_STYLES, COORDINATES_ANGLE_COEF, MAP_API_KEY, MAP_DATA, MAP_STYLES } from './constants';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { distBetweenPoints } from './utils';
import gsap from 'gsap';

const createMap = ({ google, mapData, $map, isMobile }) => {
	const latValue = parseFloat(mapData.lat || 0);
	const lngValue = parseFloat(mapData.lng || 0);
	const markerSrc = mapData.markerIcon;
	const maxZoom = parseFloat(mapData.maxZoom) || 15;

	const mapOptions = {
		maxZoom,
		mapTypeControl: false,
		zoom: parseFloat(mapData.zoom),
		styles: MAP_STYLES,
		center: {
			lat: latValue,
			lng: lngValue,
		},
	};

	console.log(mapOptions); //!

	const map = new google.maps.Map($map, mapOptions);

	const markers = mapData.markers.map(({ lat, lng, markerIcon }) => {
		const marker = new google.maps.Marker({
			map,
			position: new google.maps.LatLng(lat, lng),
			icon: markerIcon
				? {
						url: markerIcon.icon,
						anchor: new google.maps.Point(markerIcon.size / 2, markerIcon.size / 2),
						scaledSize: new google.maps.Size(markerIcon.size, markerIcon.size),
				  }
				: markerSrc,
		});

		return marker;
	});

	if (mapData.cluster) {
		const clusterer = new MarkerClusterer({ markers, map });

		const applyClusterStyle = () => {
			clusterer.clusters.forEach((cluster) => {
				const clusterSize = cluster.markers.length;

				if (clusterSize <= 1) return;

				const clusterStyles = CLUSTER_STYLES.find((style) => clusterSize > style.threshold);

				const iconSize = 120 * clusterStyles.size;

				cluster.marker.setIcon({
					url: clusterStyles.icon,
					scaledSize: new google.maps.Size(iconSize, iconSize),
					anchor: new google.maps.Point(iconSize / 2, iconSize / 2),
				});
				cluster.marker.setLabel({
					text: clusterSize.toString(),
					className: 'map-marker-label',
					fontSize: '1.6rem',
					fontFamily: 'Outfit',
					fontWeight: '600',
				});
			});
		};
		google.maps.event.addListener(clusterer, 'clusteringend', applyClusterStyle);
	}

	if (mapData.circles) {
		mapData.circles.forEach(({ center, radius, style }) => {
			const { lat, lng } = center;

			const circlePosition = [lat, lng];
			const radiusMarkerPos = [Number(lat), Number(lng) + radius / COORDINATES_ANGLE_COEF];
			const distRadius = distBetweenPoints(radiusMarkerPos, circlePosition);

			const circle = new google.maps.Circle({
				...style,
				center: new google.maps.LatLng(...circlePosition),
				map,
				radius: distRadius * 1000,
				editable: false,
			});

			const radiusMarker = new google.maps.Marker({
				map,
				position: new google.maps.LatLng(...radiusMarkerPos),
				zIndex: 100,
				icon: {
					url: style.radiusMarker,
					anchor: new google.maps.Point(8, 8),
					scaledSize: null,
					labelOrigin: null,
					size: new google.maps.Size(16, 16),
				},
				draggable: true,
			});
			const handleRadMarkerDrag = (e) => {
				const newRadius = distBetweenPoints([e.latLng.lat(), e.latLng.lng()], circlePosition);
				circle.setRadius(newRadius * 1000);
			};

			google.maps.event.addListener(radiusMarker, 'drag', handleRadMarkerDrag);
		});
	}

	return map;

	// CLUSTERS.forEach(({ markers, map }) => {});
};

export function maps() {
	const SELECTORS = {
		map: '.js-map',
	};

	const loader = new Loader({
		apiKey: MAP_API_KEY,
		version: 'weekly',
		libraries: ['places'],
	});

	const $maps = document.querySelectorAll(SELECTORS.map);
	const matchMedia = gsap.matchMedia();

	loader
		.load()
		.then((google) => {
			$maps.forEach(($map) => {
				const dataId = $map.dataset.id || 0;

				let mapInstance = null;

				const handleMatchMedia = (isMobile) => {
					let mapData = MAP_DATA[dataId];

					if (!mapData) return;

					if (mapData.responsive && isMobile) {
						mapData = {
							...mapData,
							...mapData.responsive,
						};
					}

					mapInstance = createMap({ google, mapData, $map, isMobile });
				};
				handleMatchMedia();

				matchMedia.add('(max-width: 1023px)', () => handleMatchMedia(true));
				matchMedia.add('(min-width: 1024px)', () => handleMatchMedia(false));
			});
		})
		.catch((e) => {
			console.log(e);
		});
}

export default maps;
