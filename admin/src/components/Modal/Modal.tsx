import { ModalProps } from './Modal.props';
import { AnimatePresence, motion } from 'framer-motion';
import cls from './Modal.module.scss';
import { Button } from '..';

const dropIn = {
	hidden: {
		y: "-100vh",
		opacity: 0,
	},
	visible: {
		y: "0",
		opacity: 1,
		transition: {
			duration: 0.1,
			type: "spring",
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		y: "100vh",
		opacity: 0,
	},
};


const Modal = ({children, handleClose, modalOpen}: ModalProps): JSX.Element => {

	return (
		<AnimatePresence
			initial={false}
			exitBeforeEnter={true}
			onExitComplete={() => null}
		>
			{modalOpen && (
				<motion.div
					onClick={handleClose}
					className={cls.backdrop}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						onClick={(e) => e.stopPropagation()}
						className={cls.body}
						variants={dropIn}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						{children}
						<Button onClick={handleClose}>X</Button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
