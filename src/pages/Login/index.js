import classNames from 'classnames/bind'
import styles from './Login.module.scss'
import { images, Logo } from '~/assets/media'
import Footer from '~/layouts/components/Footer'

import { Link } from 'react-router-dom'
import FormLogin from '~/layouts/components/FormLogin'
import { useState } from 'react'

const cx = classNames.bind(styles)

function Login({ setAuth }) {
    const [visible, setVisible] = useState(true)

    const handleLearnMore = () => {
        visible ? setVisible(false) : setVisible(true)
    }

    return (
        <div className={cx('root')}>
            <div className={cx('wrapper')}>
                <div className={cx('background')}>
                    <img className={cx('background-img')} src={images.backgroudLogin} alt="" />
                </div>
                <div className={cx('header')}>
                    <Link to={'/'}>
                        <Logo className={cx('logo')} />
                    </Link>
                </div>
                <div className={cx('body')}>
                    <FormLogin setAuth={setAuth} />
                    <div className={cx('other')}>
                        <div className={cx('signup-now')}>
                            New to Netflix?{' '}
                            <Link className={cx('signup-link')} target="_self" to="/">
                                Sign up now
                            </Link>
                            .
                        </div>

                        <div className={cx('recaptcha')}>
                            <p>
                                <span>This page is protected by Google reCAPTCHA to ensure you're not a bot. </span>
                                <button className={cx('recaptcha-link-button')} onClick={handleLearnMore}>
                                    Learn more.
                                </button>
                            </p>
                        </div>

                        <div className={cx('recaptcha-more', { visible })}>
                            <span>
                                The information collected by Google reCAPTCHA is subject to the Google{' '}
                                <a
                                    className={cx('more-link')}
                                    href="https://policies.google.com/privacy"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Privacy Policy
                                </a>{' '}
                                and{' '}
                                <a
                                    className={cx('more-link')}
                                    href="https://policies.google.com/terms"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Terms of Service
                                </a>
                                , and is used for providing, maintaining, and improving the reCAPTCHA service and for
                                general security purposes (it is not used for personalized advertising by Google).
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <Footer></Footer>
                </div>
            </div>
        </div>
    )
}

export default Login
