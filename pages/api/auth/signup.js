import connectToDataBase from '../../../lib/database';
import { hashPassword } from '../../../lib/auth';

async function handler(req, res) {
	if (req.method !== 'POST') {
		return;
	}

	const { email, password } = req.body;
	const isInvalid = !email || !email.includes('@') || !password || password.trim() < 7;

	if (isInvalid) {
		res.status(422).json({ message: 'Invalid email or/and password' });
		return;
	}
	const client = await connectToDataBase();

	const db = client.db();

	const existedUser = await db.collection('users').findOne({ email });

	if (existedUser) {
		res.status(422).json({ message: 'User is already exist!' });
		client.close();
		return;
	}

	const result = await db.collection('users').insertOne({
		email,
		password: await hashPassword(password)
	});

	res.status(201).json({ message: 'User is created!' });
	client.close();
}

export default handler;
