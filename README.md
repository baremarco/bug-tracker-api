# Bug tracker api

### Running the project
1. create at the project root (/BUG-TRACKER-API/.env) a `.env` file with content:
```sh
PORT=3000
DB_PORT=5433
DB_PASSWORD=password
DB_USER=postgres
```
2. start the db
```bash
docker compose up -d
```
3. run the api
```bash
npm run dev
```
### DB connection info
Script to pupulate user and project tables
```sql
INSERT INTO "user"
("name", surname)
VALUES
 ('Linus', 'Torvalds'),
('Dennis', 'Ritchie'),
('Steve', 'Wozniak'),
('Jack', 'Dorsey'),
('Bill', 'Gates');

INSERT INTO project 
("name", description)
VALUES ('Linux Foundation', 'The Linux Foundation is a non-profit organization established in 2000 to support Linux development'),
('Unix','UNIX is an operating system which was first developed in the 1960s'),
('Apple','Apple Inc. is an American multinational technology company headquartered in Cupertino, California.'),
('Twitter','Twitter, Inc. was an American social media company based in San Francisco, California.'),
('Microsoft','Microsoft Corporation is an American multinational technology corporation headquartered in Redmond');

```