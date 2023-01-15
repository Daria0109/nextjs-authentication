import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { Provider } from 'next-auth/client';
import { NotificationProvider } from '../providers/notification-provider/notification-provider';

function MyApp({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<NotificationProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</NotificationProvider>
		</Provider>
	);
}

export default MyApp;
