import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import connectToDataBase from '../../../lib/database';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
	session: 'jwt',
	providers: [
		CredentialsProvider({
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