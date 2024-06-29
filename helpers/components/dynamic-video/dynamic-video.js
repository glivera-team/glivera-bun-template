import Plyr from 'plyr';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import 'plyr/dist/plyr.css';
import 'ScssComponents/dynamic-video.scss';

gsap.registerPlugin(ScrollTrigger);

/**
 * Standard javascript dynamic video
 * based on scroll trigger
 * supports local HTML5 Video
 * for videos from YouTube or Vimeo, you must specify data-plyr-provider and data-plyr-embed-id
 * specify playOnScroll (true/false) as an argument when calling the function
 */

const dynamicVideo = (playOnScroll) => {
	const $videoContainers = document.querySelectorAll('.js-dynamic-video');

	if (!$videoContainers) return;

	$videoContainers.forEach(($videoContainer) => {
		let template;
		let isPlayerBuilt = false;

		const videoPath = $videoContainer.dataset.videoSrc;
		const posterPath = $videoContainer.dataset.poster;
		const videoProvider = $videoContainer.dataset.plyrProvider;
		const videoId = $videoContainer.dataset.plyrEmbedId;

		if (videoPath && posterPath) {
			template = `<video class="video_in" playsinline controls data-poster="${posterPath}"><source src="${videoPath}" type="video/mp4"></video>`;
		}

		if (videoProvider && videoId) {
			template = `<div class="video_in" data-plyr-provider=${videoProvider} data-plyr-embed-id=${videoId}></div>`;
		}

		if (!template) return;

		const buildDynamicVideo = () => {
			$videoContainer.insertAdjacentHTML('beforeend', template);

			const $video = $videoContainer.querySelector('.video_in');
			const $poster = $videoContainer.querySelector('.js-video-poster');

			const player = new Plyr($video);
			player.on('ready', () => {
				player.play();
				$poster.classList.add('hidden');
			});
		};

		if (playOnScroll) {
			ScrollTrigger.create({
				trigger: $videoContainer,
				start: 'top bottom',
				end: 'bottom top',
				onEnter: () => {
					if (isPlayerBuilt) return;

					buildDynamicVideo();
					isPlayerBuilt = true;
				},
			});
		} else {
			$videoContainer.addEventListener('click', buildDynamicVideo, { once: true });
		}
	});
};

export default dynamicVideo;
