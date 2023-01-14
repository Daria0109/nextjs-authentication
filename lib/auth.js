const bcrypt = require('bcryptjs');

export async function hashPassword(password) {
	return await bcrypt.hash(password, 12);
 }

 export async function verifyPassword(password, hashedPassword) {
	return await bcrypt.compare(password, hashedPassword);
 }
