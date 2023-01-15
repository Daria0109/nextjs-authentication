import { MongoClient } from 'mongodb';

async function connectToDataBase() {
	return await MongoClient.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.end0xte.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
		useUnifiedTopology: true
	});
}

export default connectToDataBase;
