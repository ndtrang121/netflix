import classNames from "classnames/bind";
import styles from './SelectLanguage.module.scss'

const cx = classNames.bind(styles)

function SelectLanguage({ medium = false, large = false }) {
	return (
		<div className={cx('wrapper')}>
			<select defaultValue='Default' className={cx('select', { medium, large })}>
				<option value='DEFAULT'>English</option>
				<option >Tiếng Việt</option>
			</select>
		</div>
	);
}

export default SelectLanguage;