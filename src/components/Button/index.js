import classNames from "classnames/bind";
import { Link } from 'react-router-dom'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({
	to,
	href,
	children,
	primary = false,
	disabled = false,
	leftIcon,
	rightIcon,
	onClick,
	className,
	...passProps
}) {


	let Comp = 'button'
	const props = {
		onClick,
		...passProps
	}


	if (to) {
		props.to = to
		Comp = Link
	} else if (href) {
		props.href = href
		Comp = 'a'
	}

	const classes = cx('wrapper', {
		primary,
		[className]: className
	})

	return (
		<Comp className={classes} {...props}>
			{leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
			{children}
			{rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
		</Comp>
	);
}

export default Button;