import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    YoutubeIcon,
} from '~/components/Icons'
import SelectLanguage from '~/components/SelectLanguage'

import styles from './Footer.module.scss'

const cx = classNames.bind(styles)

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('social-links')}>
                <a
                    className={cx('social-link')}
                    href="https://www.facebook.com/NetflixAsia"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FacebookIcon />
                </a>
                <a
                    className={cx('social-link')}
                    href="https://www.instagram.com/netflixasia/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <InstagramIcon />
                </a>
                <a
                    className={cx('social-link')}
                    href="https://twitter.com/NetflixAsia"
                    target="_blank"
                    rel="noreferrer"
                >
                    <TwitterIcon />
                </a>
                <a
                    className={cx('social-link')}
                    href="https://www.youtube.com/channel/UCZoC-XeDO7HxbAdeCaRPPCw/videos"
                    target="_blank"
                    rel="noreferrer"
                >
                    <YoutubeIcon />
                </a>
            </div>
            <ul className={cx('footer-links')}>
                <li className={cx('footer-link-wrapper')}>
                    <Link className={cx('footer-link')} to={''}>
                        <span className={cx('footer-link-content')}>
                            Audio Description
                        </span>
                    </Link>
                </li>
                <li className={cx('footer-link-wrapper')}>
                    <Link className={cx('footer-link')} to={''}>
                        <span className={cx('footer-link-content')}>
                            Help Center
                        </span>
                    </Link>
                </li>
                <li className={cx('footer-link-wrapper')}>
                    <Link className={cx('footer-link')} to={''}>
                        <span className={cx('footer-link-content')}>
                            Gift Cards
                        </span>
                    </Link>
                </li>
                <li className={cx('footer-link-wrapper')}>
                    <Link className={cx('footer-link')} to={''}>
                        <span className={cx('footer-link-content')}>
                            Media Center
                        </span>
                    </Link>
                </li>
                <li className={cx('footer-link-wrapper')}>
                    <Link className={cx('footer-link')} to={''}>
                        <span className={cx('footer-link-content')}>
                            Investor Relations
                        </span>
                    </Link>
                </li>
                <li className={cx('footer-link-wrapper')}>
                    <Link className={cx('footer-link')} to={''}>
                        <span className={cx('footer-link-content')}>Jobs</span>
                    </Link>
                </li>
                <li className={cx('footer-link-wrapper')}>
                    <Link className={cx('footer-link')} to={''}>
                        <span className={cx('footer-link-content')}>
                            Terms of Use
                        </span>
                    </Link>
                </li>
                <li className={cx('footer-link-wrapper')}>
                    <Link className={cx('footer-link')} to={''}>
                        <span className={cx('footer-link-content')}>
                            Privacy
                        </span>
                    </Link>
                </li>
                <li className={cx('footer-link-wrapper')}>
                    <Link className={cx('footer-link')} to={''}>
                        <span className={cx('footer-link-content')}>
                            Notices
                        </span>
                    </Link>
                </li>
                <li className={cx('footer-link-wrapper')}>
                    <Link className={cx('footer-link')} to={''}>
                        <span className={cx('footer-link-content')}>
                            Cookie Preferences
                        </span>
                    </Link>
                </li>
                <li className={cx('footer-link-wrapper')}>
                    <Link className={cx('footer-link')} to={''}>
                        <span className={cx('footer-link-content')}>
                            Corporate Information
                        </span>
                    </Link>
                </li>
                <li className={cx('footer-link-wrapper')}>
                    <Link className={cx('footer-link')} to={''}>
                        <span className={cx('footer-link-content')}>
                            Contact Us
                        </span>
                    </Link>
                </li>
            </ul>
            <SelectLanguage large className={cx('select')} />
            <p className={cx('footer-country')}>Design by Trang Nguyen</p>
        </div>
    )
}

export default Footer
