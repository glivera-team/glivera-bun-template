import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Standard javascript controller for videos
 * based on scroll trigger
 * put js-selector to your video tag
 * specify this selector as an argument when calling the function
 */

export const videoViewportController = (videoSelector) => {
	const $videos = document.querySelectorAll(videoSelector);

	if (!$videos.length) return;

	const playVideo = ($video) => {
		if ($video.readyState !== 4) {
			return;
		}

		$video.play();
	};

	const pauseVideo = ($video) => {
		if ($video.readyState !== 4) {
			return;
		}

		$video.pause();
	};

	$videos.forEach(($video) => {
		ScrollTrigger.create({
			trigger: $video,
			start: 'top bottom',
			end: 'bottom top',
			onEnter: () => playVideo($video),
			onEnterBack: () => playVideo($video),
			onLeave: () => pauseVideo($video),
			onLeaveBack: () => pauseVideo($video),
		});
	});
};
