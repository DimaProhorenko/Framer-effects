import { IconType } from 'react-icons';
import {
	SiGoogle,
	SiShopify,
	SiApple,
	SiAdobe,
	SiFacebook,
	SiSoundcloud,
	SiTiktok,
	SiLinkedin,
	SiInstagram,
} from 'react-icons/si';
import { useAnimate } from 'framer-motion';

type LinkBoxProps = {
	Icon: IconType;
	href: string;
};

const NO_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)';

const BOTTOM_RIGHT_CLIP = 'polygon(0 0, 100% 0, 0 0, 0% 100%)';

const TOP_RIGHT_CLIP = 'polygon(0 0, 0 100%, 100% 100%, 0% 100%)';

const BOTTOM_LEFT_CLIP = 'polygon(100% 100%, 100% 0, 100% 100%, 0 100%)';

const TOP_LEFT_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 100% 0)';

const ENTRANCE_KEYFRAMES = {
	left: [BOTTOM_RIGHT_CLIP, NO_CLIP],

	bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],

	top: [BOTTOM_RIGHT_CLIP, NO_CLIP],

	right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
	left: [NO_CLIP, TOP_RIGHT_CLIP],

	bottom: [NO_CLIP, TOP_RIGHT_CLIP],

	top: [NO_CLIP, TOP_RIGHT_CLIP],

	right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const ClipPathLinks = () => {
	return (
		<div className='max-w-2xl mx-auto pt-12'>
			<div className='border border-neutral-900 divide-y divide-neutral-900'>
				<div className='divide-x divide-neutral-900 grid grid-cols-2'>
					<LinkBox Icon={SiGoogle} href='/' />
					<LinkBox Icon={SiShopify} href='/' />
				</div>
				<div className='divide-x divide-neutral-900 grid grid-cols-4'>
					<LinkBox Icon={SiApple} href='/' />
					<LinkBox Icon={SiAdobe} href='/' />
					<LinkBox Icon={SiFacebook} href='/' />
					<LinkBox Icon={SiSoundcloud} href='/' />
				</div>
				<div className='divide-x divide-neutral-900 grid grid-cols-3'>
					<LinkBox Icon={SiTiktok} href='/' />
					<LinkBox Icon={SiLinkedin} href='/' />
					<LinkBox Icon={SiInstagram} href='/' />
				</div>
			</div>
		</div>
	);
};

const LinkBox = ({ Icon, href }: LinkBoxProps) => {
	const [scope, animate] = useAnimate();

	const getNearestSide = (e) => {
		const box = e.target.getBoundingClientRect();

		const proximityToLeft = {
			proximity: Math.abs(box.left - e.clientX),

			side: 'left',
		};

		const proximityToRight = {
			proximity: Math.abs(box.right - e.clientX),

			side: 'right',
		};

		const proximityToTop = {
			proximity: Math.abs(box.top - e.clientY),

			side: 'top',
		};

		const proximityToBottom = {
			proximity: Math.abs(box.bottom - e.clientY),

			side: 'bottom',
		};

		const sortedProximity = [
			proximityToLeft,

			proximityToRight,

			proximityToTop,

			proximityToBottom,
		].sort((a, b) => a.proximity - b.proximity);

		return sortedProximity[0].side;
	};

	const handleMouseEnter = (e) => {
		const side = getNearestSide(e);

		animate(scope.current, {
			clipPath: ENTRANCE_KEYFRAMES[side],
		});
	};

	const handleMouseLeave = (e) => {
		const side = getNearestSide(e);

		animate(scope.current, {
			clipPath: EXIT_KEYFRAMES[side],
		});
	};

	return (
		<a
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			href={href}
			className='relative flex items-center justify-center w-full h-20 sm:h-28 md:h-36'
		>
			<Icon className='text-xl sm:text-3xl md:text-4xl' />
			<div
				ref={scope}
				className='absolute inset-0 flex items-center justify-center bg-neutral-900'
				style={{
					clipPath: 'polygon(0 0, 100% 0, 0 0, 0% 100%)',
				}}
			>
				<Icon className='text-xl sm:text-3xl md:text-4xl text-white' />
			</div>
		</a>
	);
};

export default ClipPathLinks;
