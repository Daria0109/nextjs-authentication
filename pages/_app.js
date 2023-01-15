import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { NotificationProvider } from '../providers/notification-provider/notification-provider';

function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider session={pageProps.session}>
			<NotificationProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</NotificationProvider>
		</SessionProvider>
	);
}

export default MyApp;
