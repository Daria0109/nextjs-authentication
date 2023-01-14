import { MongoClient } from 'mongodb';

async function connectToDataBase() {
	return await MongoClient.connect('mongodb+srv://DaryaShnipava:41CXIDronxeVtQgQ@cluster0.end0xte.mongodb.net/user-auth-db?retryWrites=true&w=majority', {
		useUnifiedTopology: true
	});
}

export default connectToDataBase;
