module.exports = {
	env: 'development',
	db: 'mongodb://localhost/development',
	mongos: false,
	port: 3000,
	secret: 'SoTiMe=-=-=-=DeLeVoPmEnT',
	emailFrom: '"Negawatt Utility" <noreply@negawatt.co>', // sender address like ABC <abc@example.com>
	mailer: {
		host: 'smtp.negawatt.co',
		port: 1025,
		auth: {
			user: 'noreply@negawatt.co',
			pass: 'PC@2017'
		},
		tls: {
				rejectUnauthorized: false
		},
		pool: true,
		debug: true
	},
	forge: {
		clientId: 'pTpyM93ZshzJsy3oDiz5VLB48U5JTIqC',
		secret: 'uAWTnCZdlASrkxjS',
		autoRefresh: true,
		bucket: 'a97001development'
	}
};
