### Details:
- Backend to https://github.com/pawarspeaks/TechNexus

### Prequisites: 
- nodejs
- docker

### Steps to run the project:
- npm install
- docker postgres docker image pull:```docker compose up```
- node index.js

### Schema: 

- database: events_db
- table: events

### API Endpoints:
- GET /events: Retrieve all events.
- GET '/events/online' 
- GET '/events/offline' 



** To play around with the database
```
docker exec -it <docker-postgres-container> bash
su - postgres
psql -d <db-name>
```