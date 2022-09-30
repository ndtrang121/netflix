import classNames from "classnames/bind";
import styles from './Start.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faXmark } from '@fortawesome/free-solid-svg-icons'

import { images, Logo, videos } from "../../assets/medias";
import Button from "../../components/Button";
import SelectLanguage from '../../components/SelectLanguage';
import FormStart from "../../layouts/components/FormStart";

const cx = classNames.bind(styles)

function Start() {

	const handleClickItem = (event) => {
		const classContent = event.target.nextElementSibling.classList
		const classIcon = event.target.children[0].classList

		if (classContent.contains(cx('open'))) {
			classContent.remove(cx('open'))
			classContent.add(cx('close'))
			classIcon.add(cx('rotate'))
		} else {
			classContent.remove(cx('close'))
			classContent.add(cx('open'))
			classIcon.remove(cx('rotate'))
		}
	}


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
					<FormStart id={'start'} />
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
						<div className={cx('download')}>
							<img className={cx('poster')} src={images.boxshot} alt='boxshot' />
							<div className={cx('text-img')}>
								<h3>Stranger Things</h3>
								<p>Downloading...</p>
							</div>
							<img className={cx('icon')} src={images.download} alt='download' />
						</div>
					</div>
				</div>
			</div>

			<div className={cx('story-card-wrapper')}>
				<div className={cx('animation-device', { 'story-card': true })}>
					<div className={cx('text')}>
						<h1>Watch everywhere.</h1>
						<h2>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</h2>
					</div>
					<div className={cx('')}>
					</div>
				</div>
			</div>

			<div className={cx('story-card-wrapper')}>
				<div className={cx('animation-kids', { 'story-card': true })}>
					<div className={cx('text')}>
						<h1>Create profiles for kids.</h1>
						<h2>Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</h2>
					</div>
					<div className={cx('img')}>
						<img className={cx('mobile')} src={images.kids} alt="kids" />
					</div>
				</div>
			</div>

			<div className={cx('story-card-wrapper')}>
				<div className={cx('animation-phone', { 'story-card': true })}>
					<div className={cx('text')}>
						<h1>Have an Android Phone? Get our new free plan!</h1>
						<h2>Watch a selection of new movies and TV shows without adding any payment details!</h2>
						<a
							className={cx('get-app')}
							href="https://play.google.com/store/apps/details?id=com.netflix.mediaclient">
							<span>Get the apps</span>
							<FontAwesomeIcon icon={faAngleRight} />
						</a>
					</div>
					<div className={cx('img')}>
						<img className={cx('mobile')} src={images.phone} alt="kids" />
					</div>
				</div>
			</div>

			<div className={cx('story-card-wrapper', { 'faq': true })}>
				<div className={cx('text')}>
					<h1>Frequently Asked Questions</h1>
				</div>
				<ul className={cx('faq-list')}>
					<li className={cx('faq-item')}>
						<Button
							onClick={handleClickItem}
							faq
							rotateIcon={cx('rotate')}
							rightIcon={<FontAwesomeIcon icon={faXmark} />} >
							What is Netflix?
						</Button>
						<div className={cx('faq-answer', { close: true })}>
							<p>
								Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.
								<br></br>
								<br></br>
								You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!
							</p>
						</div>
					</li>
					<li className={cx('faq-item')}>
						<Button
							onClick={handleClickItem}
							faq
							rotateIcon={cx('rotate')}
							rightIcon={<FontAwesomeIcon icon={faXmark} />} >
							How much does Netflix cost?
						</Button>
						<div className={cx('faq-answer', { close: true })}>
							<p>
								Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from 70,000 ₫ to 260,000 ₫ a month. No extra costs, no contracts.
							</p>
						</div>
					</li>
					<li className={cx('faq-item')}>
						<Button
							onClick={handleClickItem}
							faq
							rotateIcon={cx('rotate')}
							rightIcon={<FontAwesomeIcon icon={faXmark} />} >
							Where can I watch?
						</Button>
						<div className={cx('faq-answer', { close: true })}>
							<p>
								Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.
								<br></br>
								<br></br>
								You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.
							</p>
						</div>
					</li>
					<li className={cx('faq-item')}>
						<Button
							onClick={handleClickItem}
							faq
							rotateIcon={cx('rotate')}
							rightIcon={<FontAwesomeIcon icon={faXmark} />} >
							How do I cancel?
						</Button>
						<div className={cx('faq-answer', { close: true })}>
							<p>
								Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.
							</p>
						</div>
					</li>
					<li className={cx('faq-item')}>
						<Button
							onClick={handleClickItem}
							faq
							rotateIcon={cx('rotate')}
							rightIcon={<FontAwesomeIcon icon={faXmark} />} >
							What can I watch on Netflix?
						</Button>
						<div className={cx('faq-answer', { close: true })}>
							<p>
								Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.
							</p>
						</div>
					</li>
					<li className={cx('faq-item')}>
						<Button
							onClick={handleClickItem}
							faq
							rotateIcon={cx('rotate')}
							rightIcon={<FontAwesomeIcon icon={faXmark} />}
						>
							Is Netflix good for kids?
						</Button>
						<div className={cx('faq-answer', { close: true })}>
							<p>
								The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.
								<br></br>
								<br></br>
								Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.
							</p>
						</div>
					</li>
				</ul>
				<FormStart id={'end'} />
			</div>

			<div className={cx('story-card-wrapper')}>

			</div>

		</div>
	)
}

export default Start;