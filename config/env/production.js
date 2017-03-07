module.exports = {
	env: 'production',
	db: 'mongodb://localhost/production',
	mongos: true,
	port: 3000,
	secret: 'SoTiMe=-=-=-=PrOdUcTiOn',
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
	}
};
