# Backend - InsureConnect Client Servicing Portal

## Setup & Run

1. Install dependencies
```
cd backend
npm install
```

2. Create a `.env` from `.env.example` and set your Oracle details. For your provided details:
```
DB_HOST=localhost
DB_PORT=1521
DB_USERNAME=system
DB_PASSWORD=Vaishu@0410
DB_SERVICE_NAME=XEPDB1
JWT_SECRET=MyJwtSecret
JWT_EXPIRES_IN=3600s
PORT=3000
```

3. Install Oracle Instant Client (Windows) and set environment variables:
	- Download and install the Oracle Instant Client (Basic) for your platform from https://www.oracle.com/database/technologies/instant-client.html
	- Extract or install the package and add the installation folder to your PATH
	- On Windows, set the environment variable ORACLE_HOME to the Instant Client folder if necessary
	- Restart your terminal after changing environment variables

4. Start the server
```
npm run start:dev
```

## Run tests
```
npm test
```

## Notes
- The app uses TypeORM `synchronize: true` to auto-create tables for demo. For production, use migrations.
- If you cannot install Oracle locally, change `ormconfig.ts` to use sqlite or postgres for local dev.
