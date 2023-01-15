import { Fragment, useContext } from 'react';
import MainNavigation from './main-navigation';
import { NotificationContext } from '../../providers/notification-provider/notification-provider';
import Notification from '../ui/notification/notification';

function Layout(props) {
	const { notification } = useContext(NotificationContext);

	return (
		<Fragment>
			<MainNavigation/>
			<main>{props.children}</main>
			{notification && <Notification/>}
		</Fragment>
	);
}

export default Layout;
