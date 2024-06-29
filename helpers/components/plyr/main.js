/** Plyr initialization sample */

const videoPlayer = Array.from(document.querySelectorAll('.video_block')).map(
	(p) =>
		new Plyr(p, {
			iconUrl: 'images/sprite/sprite.svg',
			invertTime: false,
			hideControls: false,
		}),
);

videoPlayer.map((item) =>
	item.on('play', () => {
		item.toggleControls(true);

		videoPlayer.map((itemA) => {
			if (itemA !== item) {
				itemA.stop();
			}
		});
	}),
);

videoPlayer.map((item) =>
	item.on('pause ready', () => {
		item.toggleControls(false);
	}),
);
