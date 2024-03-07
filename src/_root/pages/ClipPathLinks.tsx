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

const NO_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
const BOTTOM_RIGHT_CLIP = 'polygon(100% 100%, 100% 0, 100% 100%, 0% 100%)';
const BOTTOM_LEFT_CLIP = 'polygon(100% 100%, 0 100%, 0 0, 0% 100%)';
const TOP_LEFT_CLIP = 'polygon(0 0, 0 100%, 0 0, 100% 0)';
const TOP_RIGHT_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 100% 0)';

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

	const handleMouseEnter = (e) => {
		animate(scope.current, {
			clipPath: [BOTTOM_RIGHT_CLIP, NO_CLIP],
		});
	};

	const handleMouseLeave = (e) => {
		animate(scope.current, {
			clipPath: [NO_CLIP, BOTTOM_RIGHT_CLIP],
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
