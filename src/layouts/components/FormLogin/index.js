import styles from './FormLogin.module.scss'
import Button from '~/components/Button'
import classNames from 'classnames/bind'
import GoogleButton from 'react-google-button'

import { useState, useLayoutEffect } from 'react'
import validator from 'validator'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth'
import { auth, provider } from '~/components/Auth/firebase'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function FormLogin({ register }) {
    const [mail, setMail] = useState(register || '')
    const [error, setError] = useState(false)
    const [errorRe, setErrorRe] = useState(false)
    const [msg, setMsg] = useState('Email is required!')
    const [msgRe, setMsgRe] = useState('')
    const [valid, setValid] = useState(false)

    const [password, setPass] = useState('')
    const [passwordRe, setPassRe] = useState('')
    const [passType, setPassType] = useState('password')
    const [show, setShow] = useState('SHOW')
    const [passTypeRe, setPassTypeRe] = useState('password')
    const [showRe, setShowRe] = useState('SHOW')

    const [checked, setChecked] = useState(false)

    const handleSignInWithGoogle = async () => {
        await signInWithPopup(auth, provider)
            .then((userCredential) => {
                // Signed in with google
            })
            .catch(alert)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validator.isEmail(mail)) {
            e.preventDefault()
            setValid(true)
            setError(true)
        } else if (!password) {
            setErrorRe(true)
            setMsgRe('Password is required!')
        } else {
            await signInWithEmailAndPassword(auth, mail, password)
                .then((userCredential) => {
                    // Signed in
                })
                .catch((error) => {
                    setErrorRe(true)
                    setMsgRe(error.message)
                })
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setErrorRe(false)
        if (!validator.isEmail(mail)) {
            e.preventDefault()
            setValid(true)
            setError(true)
        } else if (password !== passwordRe) {
            setErrorRe(true)
            setMsgRe('The password confirmation does not match.')
        } else if (!password || !passwordRe) {
            setErrorRe(true)
            setMsgRe('Password is required!')
        } else {
            await createUserWithEmailAndPassword(auth, mail, passwordRe)
                .then((userCredential) => {
                    console.log('register')
                    // Signed up
                    const user = userCredential.user
                    user.sendEmailVerification()
                })
                .catch((error) => {
                    setErrorRe(true)
                    setMsgRe(error.message)
                })
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

    const handleShowRegister = () => {
        if (showRe === 'SHOW') {
            setPassTypeRe('text')
            setShowRe('HIDE')
        } else {
            setShowRe('SHOW')
            setPassTypeRe('password')
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
            <p className={cx('title')}>{register ? 'Sign Up' : 'Sign In'}</p>

            <form
                method="post"
                className={cx('login-form')}
                action=""
                onSubmit={register ? handleRegister : handleSubmit}
            >
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
                            onChange={(e) => {
                                setErrorRe(false)
                                setPass(e.target.value)
                            }}
                        />
                        <label htmlFor={'password'} className={cx('label')}>
                            Password
                        </label>
                        <div className={cx('set-type')} onClick={handleShow}>
                            {show}
                        </div>
                    </div>
                    {!register && errorRe && (
                        <div className={cx('inputError')}>{msgRe}</div>
                    )}
                </div>

                {register && (
                    <div className={cx('password-wrapper')}>
                        <div className={cx('password')}>
                            <input
                                id="repeat-password"
                                className={cx('input', {
                                    'input-pass': true,
                                })}
                                type={passTypeRe}
                                value={passwordRe}
                                onChange={(e) => setPassRe(e.target.value)}
                            />
                            <label
                                htmlFor={'repeat-password'}
                                className={cx('label')}
                            >
                                Confirm password
                            </label>
                            <div
                                className={cx('set-type')}
                                onClick={handleShowRegister}
                            >
                                {showRe}
                            </div>
                        </div>
                        {errorRe && (
                            <div className={cx('inputError')}>{msgRe}</div>
                        )}
                    </div>
                )}
                <div className={cx('login-form-help')}>
                    {!register && (
                        <div className={cx('login-remember-me')}>
                            <input
                                type="checkbox"
                                className={cx('checkbox')}
                                id="rememberMe_true"
                                data-uia="rememberMe"
                                defaultChecked={checked}
                                onClick={handleCheckRemember}
                            />
                            <label htmlFor="rememberMe_true">
                                <span className={cx('label-text')}>
                                    Remember me
                                </span>
                            </label>
                        </div>
                    )}
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className={cx('login-help-link')} href="#">
                        Need help?
                    </a>
                </div>
                <Button className={cx('submit')}>
                    {register ? 'Sign Up' : 'Sign In'}
                </Button>
            </form>

            <GoogleButton
                onClick={handleSignInWithGoogle}
                className={cx('login-google')}
            />

            {/* <div className={cx('success')}>
                    <div className={cx('success-title')}>
                        <FontAwesomeIcon
                            className={cx('success-icon')}
                            icon={faCircleCheck}
                        />
                        <h4>SUCCESS</h4>
                    </div>
                    <p className={cx('success-message')}>
                        Congratulations, your account has been successfully
                        created.
                    </p>
                    <Button to={'/login'} className={cx('continue-login')}>
                        Continue
                    </Button>
                </div> */}

            <div className={cx('signup-now')}>
                {register ? 'Have an account?' : 'New to Netflix?'}{' '}
                <Link
                    className={cx('signup-link')}
                    target="_self"
                    to={register ? '/login' : '/'}
                >
                    {register ? 'Sign in now' : 'Sign up now'}
                </Link>
                .
            </div>
        </div>
    )
}

export default FormLogin
