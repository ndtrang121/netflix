import styles from './FormLogin.module.scss'
import Button from '~/components/Button'
import classNames from 'classnames/bind'

import { useState, useLayoutEffect } from 'react'
import validator from 'validator'

const cx = classNames.bind(styles)

function FormLogin({ setAuth }) {
    const [mail, setMail] = useState('ndtrang129@gmail.com')
    const [password, setPass] = useState('123456')
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState('Email is required!')
    const [valid, setValid] = useState(false)

    const [passType, setPassType] = useState('password')
    const [show, setShow] = useState('SHOW')

    const [checked, setChecked] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validator.isEmail(mail)) {
            e.preventDefault()
            setValid(true)
            setError(true)
        } else {
            setAuth(true)
            window.localStorage.setItem('MY_APP_STATE', true)
        }
    }

    const handleShow = () => {
        if (show === 'SHOW') {
            setPassType('text')
            setShow('HIDE')
        } else {
            setShow('SHOW')
            setPassType('password')
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

    const handleCheckRemember = () => {
        checked ? setChecked(false) : setChecked(true)
    }

    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>Sign In</p>
            <form method="post" className={cx('login-form')} action="" onSubmit={handleSubmit}>
                <div className={cx('mail-wrapper')}>
                    <div className={cx('username')}>
                        <input
                            id="username"
                            className={cx('input', { error, valid })}
                            type={'email'}
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                        />
                        <label htmlFor={'username'} className={cx('label')}>
                            Email address
                        </label>
                    </div>
                    {error && <div className={cx('inputError')}>{msg}</div>}
                </div>
                <div className={cx('password-wrapper')}>
                    <div className={cx('password')}>
                        <input
                            id="password"
                            className={cx('input', { 'input-pass': true })}
                            type={passType}
                            value={password}
                            onChange={(e) => setPass(e.target.value)}
                        />
                        <label htmlFor={'password'} className={cx('label')}>
                            Password
                        </label>
                        <div className={cx('set-type')} onClick={handleShow}>
                            {show}
                        </div>
                    </div>
                </div>
                <Button className={cx('submit')}>Sign In</Button>
                <div className={cx('login-form-help')}>
                    <div className={cx('login-remember-me')}>
                        <input
                            type="checkbox"
                            className={cx('checkbox')}
                            id="rememberMe_true"
                            data-uia="rememberMe"
                            checked={checked}
                            onClick={handleCheckRemember}
                        />
                        <label for="rememberMe_true">
                            <span className={cx('label-text')}>Remember me</span>
                        </label>
                    </div>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className={cx('login-help-link')} href="#">
                        Need help?
                    </a>
                </div>
            </form>
        </div>
    )
}

export default FormLogin
