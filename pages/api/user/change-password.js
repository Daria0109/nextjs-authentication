import { getSession } from 'next-auth/react';
import connectToDataBase from '../../../lib/database';
import { hashPassword, verifyPassword } from '../../../lib/auth';

async function handler(req, res ) {
	if (req.method !== 'PATCH') {
		return;
	}
	const { oldPassword, newPassword } = req.body;

	const session = await getSession({ req });
	if (!session) {
		res.status(401).json({ message: 'User is not authenticated!' });
		return;
	}
	const userEmail = session.user.email;

	const client = await connectToDataBase();
	const usersCollection = client.db().collection('users');
	const user = await usersCollection.findOne({ email: userEmail });
	if (!user) {
		res.status(422).json({ message: 'User is not found!' });
		client.close();
		return
	}

	const userPassword = user.password;
	const passwordsAreEqual = await verifyPassword(oldPassword, userPassword);
	if (!passwordsAreEqual) {
		res.status(403).json({ message: 'Invalid password!' });
		client.close();
		return;
	}

	await usersCollection.updateOne(
		{ email: userEmail },
		{ $set: { password: await hashPassword(newPassword)} }
	);

	res.status(200).json({ message: 'Password is updated!' });
	client.close();
}

export default handler;
