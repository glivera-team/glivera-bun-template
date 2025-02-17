/* eslint-disable no-array-constructor */
export const MAP_STYLES = [
	{
		featureType: 'all',
		elementType: 'labels',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'all',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'all',
		elementType: 'geometry',
		stylers: [
			{
				color: '#101626',
			},
		],
	},
	{
		featureType: 'all',
		elementType: 'labels.text.fill',
		stylers: [
			{
				gamma: 0.01,
			},
			{
				lightness: 20,
			},
			{
				weight: '1.39',
			},
			{
				color: '#99c1b8',
			},
		],
	},
	{
		featureType: 'all',
		elementType: 'labels.text.stroke',
		stylers: [
			{
				weight: '0.96',
			},
			{
				saturation: '9',
			},
			{
				visibility: 'on',
			},
			{
				color: '#3e5964',
			},
		],
	},
	// {
	// 	featureType: 'all',
	// 	elementType: 'labels.icon',
	// 	stylers: [
	// 		{
	// 			visibility: 'off',
	// 		},
	// 	],
	// },
	{
		featureType: 'landscape',
		elementType: 'geometry',
		stylers: [
			{
				lightness: 30,
			},
			{
				saturation: '9',
			},
			{
				color: '#173c56',
			},
		],
	},
	{
		featureType: 'poi',
		elementType: 'geometry',
		stylers: [
			{
				saturation: 20,
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'geometry',
		stylers: [
			{
				lightness: 20,
			},
			{
				saturation: -20,
			},
			{
				color: '#173c56',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'geometry',
		stylers: [
			{
				lightness: 10,
			},
			{
				saturation: -30,
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#365865',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'geometry.stroke',
		stylers: [
			{
				saturation: 25,
			},
			{
				lightness: 25,
			},
			{
				weight: '0.01',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'all',
		stylers: [
			{
				lightness: -20,
			},
		],
	},
	{
		featureType: 'landscape.man_made',
		elementType: 'all',
		stylers: [
			{
				color: '#202C4B',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'labels',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
];

export const CIRCLES_STYLES = [
	{
		radiusMarker: './images/map/circle-marker-blue.svg',
		strokeColor: '#20ccf1',
		strokeOpacity: 0.8,
		fillColor: '#20ccf1',
		fillOpacity: 0.25,
		strokeWeight: 1,
	},
	{
		radiusMarker: './images/map/circle-marker.svg',
		strokeColor: '#FAD2C5',
		strokeOpacity: 0.8,
		fillColor: '#FAD2C5',
		fillOpacity: 0.25,
		strokeWeight: 1,
	},
];

export const CLUSTER_STYLES = [
	{
		threshold: 99,
		size: 1,
		icon: './images/map/blue-cluster.svg',
	},
	{
		threshold: 9,
		size: 0.7,
		icon: './images/map/orange-cluster.svg',
	},
	{
		threshold: 0,
		size: 0.5,
		icon: './images/map/pink-cluster.svg',
	},
];

export const COORDINATES_ANGLE_COEF = 111111;

export const MAP_API_KEY = 'AIzaSyBrZNofhuwJ2QPvOjleVt53ytuDRrap5KM';
export const MAP_DATA = {
	0: {
		zoom: '6.2',
		maxZoom: '15',
		lat: '-39.25591788321706',
		lng: '174.97729743575485',
		markerIcon: './images/map/marker.svg',
		markers: [
			{
				lat: '-39.52906167210764',
				lng: '174.43941622097444',
			},
			{
				lat: '-37.905689461257325',
				lng: '178.1664540074155',
			},
		],
		circles: [
			{
				center: {
					lat: '-39.52906167210764',
					lng: '174.43941622097444',
				},
				style: CIRCLES_STYLES[0],
				radius: 300000,
			},
			{
				center: {
					lat: '-37.905689461257325',
					lng: '178.1664540074155',
				},
				style: CIRCLES_STYLES[1],
				radius: 350000,
			},
		],

		responsive: {
			zoom: '5.9',
			lat: '-39.25591788321706',
			lng: '174.57729743575485',
			markers: [
				{
					lat: '-39.52906167210764',
					lng: '174.43941622097444',
				},
			],
			circles: [
				{
					center: {
						lat: '-39.52906167210764',
						lng: '174.43941622097444',
					},
					style: CIRCLES_STYLES[0],
					radius: 400000,
				},
			],
		},
	},
	1: {
		zoom: '6.2',
		maxZoom: '15',
		lat: '-39.25591788321706',
		lng: '174.97729743575485',
		markerIcon: './images/map/marker.svg',
		cluster: true,
		markers: [
			{
				lat: '-39.52906167210764',
				lng: '174.43941622097444',
			},
			{
				lat: '-39.52906167210764',
				lng: '174.43941622097444',
			},
			{
				lat: '-39.62906167210764',
				lng: '174.43941622097444',
			},
			{
				lat: '-39.72906167210764',
				lng: '174.43941622097444',
			},
			//
			...Array.from(new Array(25)).map(() => {
				return {
					lat: '-37.805689461257325',
					lng: '178.1664540074155',
				};
			}),
			//
			...Array.from(new Array(101)).map(() => {
				return {
					lat: '-39.205689461257325',
					lng: '177.1664540074155',
				};
			}),
		],
	},
	2: {
		zoom: '6',
		maxZoom: '15',
		lat: '-40.85591788321706',
		lng: '173.17729743575485',
		markers: [
			{
				lat: '-41.52906167210764',
				lng: '173.83941622097444',
				markerIcon: {
					icon: './images/map/area-1.svg',
					size: 80,
				},
			},
			{
				lat: '-41.32906167210764',
				lng: '174.83941622097444',
				markerIcon: {
					icon: './images/map/area-1.svg',
					size: 58,
				},
			},
			{
				lat: '-40.32906167210764',
				lng: '176.53941622097444',
				markerIcon: {
					icon: './images/map/area-2.svg',
					size: 58,
				},
			},
		],

		responsive: {
			zoom: '5.4',
			lat: '-40.85591788321706',
			lng: '174.47729743575485',
			markers: [
				{
					lat: '-41.52906167210764',
					lng: '173.83941622097444',
					markerIcon: {
						icon: './images/map/area-1.svg',
						size: 60,
					},
				},
				{
					lat: '-41.32906167210764',
					lng: '174.83941622097444',
					markerIcon: {
						icon: './images/map/area-1.svg',
						size: 40,
					},
				},
				{
					lat: '-40.32906167210764',
					lng: '176.53941622097444',
					markerIcon: {
						icon: './images/map/area-2.svg',
						size: 40,
					},
				},
			],
		},
	},
	3: {
		zoom: '6.2',
		maxZoom: '15',
		lat: '-39.25591788321706',
		lng: '174.97729743575485',
		markerIcon: './images/map/marker.svg',
		markers: [
			{
				lat: '-39.52906167210764',
				lng: '174.43941622097444',
			},
			{
				lat: '-37.905689461257325',
				lng: '178.1664540074155',
			},
		],
	},
	4: {
		zoom: '14.2',
		maxZoom: '40',
		lat: '-36.779510318641805',
		lng: '174.77794690594672',
		markerIcon: './images/map/marker.svg',
		cluster: true,
		markers: [
			...Array.from(new Array(16)).map(() => {
				return {
					lat: '-36.779510318641805',
					lng: '174.77794690594672',
				};
			}),
		],
	},
};
