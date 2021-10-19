# Structure

/api - API (NestJS+Mongo)

/admin - ReactJS

/client - NextJS

/uploads - list uploads

---

### DEV.LOCAL:
added to `/etc/hosts`:
* `127.0.0.1 arter.local` - client(next)
* `127.0.0.1 admin.arter.local` -  - admin(react)
* `127.0.0.1 image.arter.local` -  - images

First run or after update packages: `docker-compose -f docker-compose.yaml -f docker-compose.development.yaml up --build`

Then run: `docker-compose -f docker-compose.yaml -f docker-compose.development.yaml up`

---

### Console
docker exec -it arter-api sh
docker exec -it arter-admin sh
docker exec -it arter-client sh



docker rmi $(docker images --filter "dangling=true" -q --no-trunc)

