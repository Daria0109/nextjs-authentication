import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import connectToDataBase from '../../../lib/database';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
	session: {
		jwt: true
	},
	providers: [
		Providers.Credentials({
			async authorize(credentials) {
				const client = await connectToDataBase();
				const usersCollection = client.db().collection('users');
				const user = await usersCollection.findOne({ email: credentials.email });
				if (!user) {
					client.close();
					throw new Error('User is not found!');
				}

				const isValid = await verifyPassword(credentials.password, user.password);
				if (!isValid) {
					client.close();
					throw new Error('Couldn\'t log you in!');
				}
				client.close();

				return { email: user.email };
			}
		})
	]
});