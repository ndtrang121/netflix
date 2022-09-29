import classNames from "classnames/bind";
import styles from './Start.module.scss'
import { images, Logo, videos } from "../../assets/medias";
import Button from "../../components/Button";
import SelectLanguage from '../../components/SelectLanguage';
import FormStart from "../../layouts/components/FormStart";

const cx = classNames.bind(styles)

function Start() {

	return (
		<div className={cx('wrapper')}>
			<div className={cx('background')} >
				<div className={cx('gradient')} ></div>
				<div className={cx('header')}>
					<Logo className={cx('logo')} />
					<SelectLanguage medium />
					<Button to='/login'>Sign In</Button>
				</div>
				<div className={cx('content')}>
					<h1 className={cx('title')} >Unlimited movies, TV shows, and more.</h1>
					<h3 className={cx('sub-title')} >Watch anywhere. Cancel anytime.</h3>
					<FormStart />
				</div>
			</div>

			<div className={cx('story-card-wrapper')}>
				<div className={cx('animation-tv', { 'story-card': true })}>
					<div className={cx('text')}>
						<h1>Enjoy on your TV.</h1>
						<h2>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</h2>
					</div>
					<div className={cx('img')}>
						<img className={cx('tv')} src={images.tv} alt="tv" />
						<video className={cx('video')} autoPlay muted loop>
							<source src={videos.videoOnTV} type="video/mp4" />
						</video>
					</div>
				</div>
			</div>

			<div className={cx('story-card-wrapper')}>
				<div className={cx('animation-mobile', { 'story-card': true })}>
					<div className={cx('text')}>
						<h1>Download your shows to watch offline.</h1>
						<h2>Save your favorites easily and always have something to watch.</h2>
					</div>
					<div className={cx('img')}>
						<img className={cx('mobile')} src={images.mobile} alt="tv" />

					</div>
				</div>
			</div>


		</div>
	)
}

export default Start;