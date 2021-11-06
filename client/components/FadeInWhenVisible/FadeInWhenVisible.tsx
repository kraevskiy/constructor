import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FadeInWhenVisibleProps } from './FadeInWhenVisible.props';

export const FadeInWhenVisible = ({children, tag, className}: FadeInWhenVisibleProps): JSX.Element => {
	const controls = useAnimation();
	const [ref, inView] = useInView();

	useEffect(() => {
		if (inView) {
			controls.start('visible');
		}
	}, [controls, inView]);
	switch (tag) {
		case 'h1':
			return (
				<motion.h1
					className={className}
					ref={ref}
					animate={controls}
					initial="hidden"
					transition={{duration: 0.6}}
					variants={{
						visible: {opacity: 1, scale: 1},
						hidden: {opacity: 0, scale: 0}
					}}
				>
					{children}
				</motion.h1>
			);
		case 'h2':
			return (
				<motion.h2
					ref={ref}
					animate={controls}
					initial="hidden"
					transition={{duration: 0.6}}
					variants={{
						visible: {opacity: 1, scale: 1},
						hidden: {opacity: 0, scale: 0}
					}}
				>
					{children}
				</motion.h2>
			);
		case 'h3':
			return (
				<motion.h3
					ref={ref}
					animate={controls}
					initial="hidden"
					transition={{duration: 0.6}}
					variants={{
						visible: {opacity: 1, scale: 1},
						hidden: {opacity: 0, scale: 0}
					}}
				>
					{children}
				</motion.h3>
			);
		case 'h4':
			return (
				<motion.h4
					ref={ref}
					animate={controls}
					initial="hidden"
					transition={{duration: 0.6}}
					variants={{
						visible: {opacity: 1, scale: 1},
						hidden: {opacity: 0, scale: 0}
					}}
				>
					{children}
				</motion.h4>
			);
		case 'li':
			return (
				<motion.li
					ref={ref}
					animate={controls}
					initial="hidden"
					transition={{duration: 0.6}}
					variants={{
						visible: {opacity: 1, scale: 1},
						hidden: {opacity: 0, scale: 0}
					}}
				>
					{children}
				</motion.li>
			);
		default:
			return (
				<motion.div
					ref={ref}
					animate={controls}
					initial="hidden"
					transition={{duration: 0.6}}
					variants={{
						visible: {opacity: 1, scale: 1},
						hidden: {opacity: 0, scale: 0}
					}}
				>
					{children}
				</motion.div>
			);
	}
};
