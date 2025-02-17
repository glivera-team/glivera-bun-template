export function distBetweenPoints(mk1, mk2) {
	const R = 6371.071; // Radius of the Earth in KM
	const rlat1 = mk1[0] * (Math.PI / 180); // Convert degrees to radians
	const rlat2 = mk2[0] * (Math.PI / 180); // Convert degrees to radians
	const difflat = rlat2 - rlat1; // Radian difference (latitudes)
	const difflon = (mk2[1] - mk1[1]) * (Math.PI / 180); // Radian difference (longitudes)

	const d =
		2 *
		R *
		Math.asin(
			Math.sqrt(
				Math.sin(difflat / 2) * Math.sin(difflat / 2) +
					Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2),
			),
		);
	return d;
}
