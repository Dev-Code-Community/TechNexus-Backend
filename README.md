details:

database used: postgres (docker)

- postgres docker image pull:
    docker pull postgres

- postgres docker container run:
    sudo docker run --name postgres-nexus -e POSTGRES_USER=postgres -e \ POSTGRES_PASSWORD=nexus -e POSTGRES_DB=nexus_db -p 5432:5432 -d postgres


    container name: postgres-nexus
    database: nexus_db
    postgres user: postgres
    postgres password: nexus    

- manipulate database nexus_db:
    - docker exec -it postgres-container bash
    - su - postgres
    - psql -d nexus_db
    

For each event : 
  - CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    type VARCHAR(255) DEFAULT 'offline'
    description TEXT,
    image VARCHAR(255),
    link VARCHAR(255)    
    ); 