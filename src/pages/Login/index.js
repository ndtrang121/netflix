import classNames from 'classnames/bind'
import { useState, useLayoutEffect } from 'react'
import validator from 'validator'

import styles from './Login.module.scss'
import { images, Logo } from '~/assets/medias'
import Footer from '~/layouts/components/Footer'
import Button from '~/components/Button'
import { Navigate } from 'react-router-dom'

const cx = classNames.bind(styles)

function Login({ setAuth, isAuthenticated }) {
    const [mail, setMail] = useState('')
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState('Email is required!')
    const [valid, setValid] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validator.isEmail(mail)) {
            e.preventDefault()
            setError(true)
        } else {
            setAuth(true)
            window.localStorage.setItem('MY_APP_STATE', true)
        }
    }

    useLayoutEffect(() => {
        if (validator.isEmail(mail)) {
            setError(false)
            setValid(true)
        } else if (!validator.isEmail(mail)) {
            setValid(false)
        }

        if (!mail) {
            setMsg('Email is required!')
        } else {
            setMsg('Please enter a valid email address')
        }
    }, [mail])

    return (
        <div className={cx('root')}>
            {isAuthenticated && <Navigate to={'/browse'} />}
            <div className={cx('wrapper')}>
                <div className={cx('background')}>
                    <img className={cx('background-img')} src={images.bg_login} alt="" />
                </div>
                <div className={cx('header')}>
                    <Logo className={cx('logo')} />
                </div>
                <div className={cx('body')}>
                    <p className={cx('title')}>Sign In</p>
                    <form method="post" className={cx('login-form')} action="" onSubmit={handleSubmit}>
                        <div className={cx('mail-placeholder')}>
                            <input
                                className={cx('mail', { error, valid })}
                                type={'email'}
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                            />
                            <label htmlFor={'a'} className={cx('mail-label')}>
                                Email address
                            </label>
                        </div>
                        {error && <div className={cx('inputError')}>{msg}</div>}
                        <Button className={cx('submit')}>Sign In</Button>
                    </form>
                </div>
                <div className={cx('footer')}>
                    <Footer></Footer>
                </div>
            </div>
        </div>
    )
}

export default Login
