import classNames from 'classnames/bind'
import { useLayoutEffect, useState } from 'react'
import validator from 'validator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import styles from './FormStart.module.scss'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

function FormStart({ id }) {
    const [input, setInput] = useState('')
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState('Email is required!')
    const [valid, setValid] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        if (!validator.isEmail(input)) {
            e.preventDefault()
            setError(true)
        } else navigate(`/login?r=${input}`)
    }

    useLayoutEffect(() => {
        if (validator.isEmail(input)) {
            setError(false)
            setValid(true)
        } else if (!validator.isEmail(input)) {
            setValid(false)
        }

        if (!input) {
            setMsg('Email is required!')
        } else {
            setMsg('Please enter a valid email address')
        }
    }, [input])

    return (
        <div className={cx('form-wrapper')}>
            <h3 className={cx('form-title')}>
                Ready to watch? Enter your email to create or restart your
                membership.
            </h3>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <div className={cx('input-wrapper')}>
                    <div className={cx('input-placeholder')}>
                        <input
                            id={id}
                            className={cx('input', { error, valid })}
                            type={'email'}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <label htmlFor={id} className={cx('input-label')}>
                            Email address
                        </label>
                    </div>
                    {error && <div className={cx('inputError')}>{msg}</div>}
                </div>
                <Button
                    className={cx('submit')}
                    rightIcon={<FontAwesomeIcon icon={faAngleRight} />}
                >
                    Get Started
                </Button>
            </form>
        </div>
    )
}

export default FormStart
