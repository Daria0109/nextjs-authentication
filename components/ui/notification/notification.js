import { useContext } from 'react';
import * as ReactDOM from 'react-dom';
import classes from './notification.module.css';
import {
	NotificationContext,
	Status
} from '../../../providers/notification-provider/notification-provider';

function Notification() {
	const { notification } = useContext(NotificationContext);

	let statusClasses = '';

	if (notification.status === Status.SUCCESS) {
		statusClasses = classes.success;
	}

	if (notification.status === Status.ERROR) {
		statusClasses = classes.error;
	}

	const cssClasses = `${classes.notification} ${statusClasses}`;

	return ReactDOM.createPortal(
		(
			<div className={cssClasses}>
				<h2>{notification.title}</h2>
				<p>{notification.message}</p>
			</div>
		), document.getElementById('notification')
	);
}

export default Notification;
