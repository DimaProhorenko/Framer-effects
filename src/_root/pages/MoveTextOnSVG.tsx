import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MotionValue } from 'framer-motion';
import { useRef, useEffect } from 'react';

const MoveTextOnSVG = () => {
	const container = useRef(null);
	const texts = useRef<(SVGTextPathElement | null)[]>([]);

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start end', 'end end'],
	});

	useEffect(() => {
		scrollYProgress.on('change', (e: number) => {
			if (texts.current) {
				texts.current.forEach((text, i) => {
					text?.setAttribute(
						'startOffset',
						-40 + i * 40 + e * 40 + '%'
					);
				});
			}
		});
	}, []);

	useEffect(() => {
		const lenis = new Lenis();

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	}, []);

	return (
		<>
			<div className='h-screen'></div>
			<div className='' ref={container}>
				<svg className='w-full' viewBox='0 0 250 90'>
					<path
						fill='none'
						d='m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68'
						id='curve'
					/>
					<text className='text-[8px] uppercase'>
						{[...Array(3)].map((_, i) => (
							<textPath
								ref={(ref) => (texts.current[i] = ref)}
								href='#curve'
								startOffset={i * 40 + '%'}
								style={{
									fill: '#333',
								}}
							>
								Lorem ipsum dolor sit
							</textPath>
						))}
					</text>
				</svg>
				<Footer scrollProgress={scrollYProgress} />
			</div>
		</>
	);
};
export default MoveTextOnSVG;

type INavsType = {
	id: number;
	label: string;
};

const navs = [
	{ id: 0, label: 'Home' },
	{ id: 1, label: 'About' },
	{ id: 2, label: 'Works' },
	{ id: 3, label: 'Contact' },
];

const Footer = ({
	scrollProgress,
}: {
	scrollProgress: MotionValue<number>;
}) => {
	const y = useTransform(scrollProgress, [0, 1], [-700, 0]);

	return (
		<footer className='h-[200px] overflow-hidden bg-black flex items-center justify-center'>
			<motion.ul
				style={{ y }}
				className='w-full h-full bg-inherit flex gap-6 items-center justify-center'
			>
				{navs.map((item: INavsType) => (
					<li
						key={item.id}
						className='text-white text-2xl uppercase font-medium'
					>
						{item.label}
					</li>
				))}
			</motion.ul>
		</footer>
	);
};
