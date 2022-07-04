import clsx from 'clsx';

import styles from './styles.module.scss'


const Toggle = ({ isOn, onChange, children }) => {
	return (
		<>
			<div className={clsx('form-check form-switch')}>
				<input
					className={clsx(styles.toggle, 'form-check-input')}
					type="checkbox"
					id="flexSwitchCheckDefault"
					checked={isOn}
					onChange={onChange}/>
				<label className={clsx('form-check-label')} htmlFor="flexSwitchCheckDefault">
					{children}
				</label>
			</div>
		</>
	)
}

export default Toggle