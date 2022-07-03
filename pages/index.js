import clsx from 'clsx'
import {motion, AnimatePresence} from 'framer-motion';
import {useEffect, useState} from 'react';
import {wrap} from 'popmotion';
import Head from 'next/head'

import {props} from 'Lib/utils/collectImgs';
import styles from 'styles/landing.module.scss'
import Toggle from 'Components/Toggle';


const variants = {
	enter: ({blurMax, videoModValue}) => {
		return {
			zIndex: 1,
			opacity: 0,
			filter: 'blur(' + !videoModValue ? blurMax : 0 + 'px)'
		}
	},
	center: {
		zIndex: 1,
		opacity: 1,
		filter: 'blur(' + 0 + 'px)'
	},
	exit: ({blurMax, videoModValue}) => {
		return {
			zIndex: 0,
			opacity: 0,
			filter: 'blur(' + !videoModValue ? blurMax : 0 + 'px)'
		}
	}
}
const variantsText = {
	enter: blurMax => {
		return {
			zIndex: 2,
			opacity: 0,
			filter: 'blur(' + blurMax + 'px)'
		}
	},
	center: {
		zIndex: 2,
		opacity: 1,
		filter: 'blur(' + 0 + 'px)'
	},
	exit: blurMax => {
		return {
			zIndex: 0,
			opacity: 0,
			filter: 'blur(' + blurMax + 'px)'
		}
	}
}

const videoMode = {
	true: {
		timer: 500,
		imageFade: 1.5,
		textFade: 0.5
	},
	false: {
		timer: 10000,
		imageFade: 3,
		textFade: 3
	}
}

const Landing = ({imagesMetadata}, blurMax = 5) => {
	const [[page], setPage] = useState([0]);
	const [videoModValue, setVideoModValue] = useState(false);

	const imageIndex = wrap(0, imagesMetadata.length, page);

	const paginate = newDirection => {
		setPage([page + newDirection, newDirection]);
	};

	useEffect(() => {
		const timer = setInterval(() => {
			paginate(1)
		}, videoMode[videoModValue].timer);

		return () => clearInterval(timer);
	});


	return (
		<>
			<Head>
				<title>lechefer</title>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			<motion.div className={clsx(styles.root, 'vw-100 vh-100 overflow-hidden')}
				custom={{blurMax, videoModValue}}
				variants={variants}
				initial="enter"
				animate="center"
				transition={{
					opacity: {duration: 3},
					repeat: 1
				}}>
				<div className={clsx(styles.backgroundSlideWrapper)}>
					<AnimatePresence>
						<motion.div
							className={clsx('mx-0 px-0 w-100 h-100 position-absolute top-0 start-0')}
							custom={{blurMax, videoModValue}}
							key={page}
							variants={variants}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{
								duration: videoMode[videoModValue].imageFade
							}}>
							<motion.img
								className={clsx(styles.backgroundSlide, 'mx-0 px-0 w-100 h-100 position-absolute top-0 start-0')}
								src={'images/' + imagesMetadata[imageIndex].fileName}
							/>
						</motion.div>
					</AnimatePresence>
				</div>

				<div
					className={clsx(styles.content, 'mx-0 px-0 w-100 h-100 position-absolute top-0 start-0')}>
					<div className={clsx(styles.remark, 'mx-0 px-0 row g-0')}
						 style={{height: '10%'}}>
						<div className={clsx('col-1 row g-0 d-flex flex-fill align-items-start')}>
							<div className={clsx(styles.textContainer, 'col align-self-start')}>
								<h6>
									Artist: <a className={clsx(styles.links)}
										href="https://www.pixiv.net/users/14801956">void_0</a>
								</h6>
							</div>
							<div
								className={clsx('col d-flex align-self-center justify-content-center')}>
								<AnimatePresence>
									<motion.div
										className={clsx(styles.textContainer, 'position-fixed')}
										style={{top: '2%'}}
										key={page}
										custom={blurMax}
										variants={variantsText}
										initial="enter"
										animate="center"
										exit="exit"
										transition={{
											opacity: {duration: videoMode[videoModValue].textFade}
										}}>
										<h4>
											{imagesMetadata[imageIndex].part}
											{' | '}
											{imagesMetadata[imageIndex].group}
											{' | '}
											{imagesMetadata[imageIndex].number}
										</h4>
									</motion.div>
								</AnimatePresence>
							</div>
							<div
								className={clsx(styles.textContainer, 'col d-flex align-self-start justify-content-end')}>
								<h6>
									<AnimatePresence>
										<motion.div
											className={clsx('position-fixed')}
											style={{right: '1%'}}
											key={page}
											custom={blurMax}
											variants={variantsText}
											initial="enter"
											animate="center"
											exit="exit"
											transition={{
												opacity: {
													duration: videoMode[videoModValue].textFade
												}
											}}>
											{imageIndex + 1}/{imagesMetadata.length}
										</motion.div>
									</AnimatePresence>
								</h6>
							</div>
						</div>
					</div>

					<div className={clsx('mx-0 px-0 row g-0 justify-content-center flex-fill')}
						 style={{height: '80%'}}>
						<div
							className={clsx('col-1 d-flex flex-fill justify-content-center align-items-center')}>
							<h3>
								lechefer
							</h3>
						</div>
					</div>

					<div className={clsx(styles.remark, 'mx-0 px-0 row g-0 justify-content-end')}
						 style={{height: '10%'}}>
						<div
							className={clsx(styles.textContainer, 'col-1 d-flex flex-fill justify-content-start align-items-end')}>
							<div className={clsx('d-flex flex-column')}>
								<Toggle
									isOn={videoModValue}
									handleToggle={() => {
										setVideoModValue(!videoModValue)
									}}>
									Video mode
								</Toggle>
							</div>
						</div>
						<div
							className={clsx(styles.textContainer, 'col-1 d-flex flex-fill justify-content-end align-items-end')}>
							<h6>
								Наглейшим образом спизжено у <a className={clsx(styles.links)}
									href="https://es3n.in">es3n.in</a>
							</h6>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	)
}


export const getServerSideProps = () => {
	return props()
}

export default Landing