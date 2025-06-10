# Mern V Blog - Readme

## 1. Local Development Guideline

### Prerequisites
- Docker & Docker Compose
- Node.js (v16 or older), npm and yarn

### Setup Local Development Environment
1. Clone the project to local machine and go to the folder:
```bash
    git clone https://github.com/vinhngo1907/mern-v-blog.git
    cd mern-v-blog
```
2. Run make setup to install dependencies and setup the local DB (Run migration and seeding).

3. Run yarn dev to run the client and back-end in development mode (live-reload support).

4. The app should be accessible at `http://localhost:5001`. The API can be accessed at `http://localhost:5000`.

**Notes**: The local DB will use port 25432. If the port is being used, please change it to a different port in docker-compose.yml and server/.env.

### Useful Commands
1. If you want to reset or server separately, go to `server` folders and run `yarn dev`.
2. Go to `client` folders and run `yarn start` 
3. Run `yarn lint` to find and fix issues.

## 2. Deployment Guideline

### Prerequisites
- Google Cloud SDK
- Permission to access resources in henry-technical-2 project
- Credentials of __*****__ Statging DB

### Deployment Steps

Front-end: Run ```yarn deploy``` to deploy to GCP. If we migrate to Google Storage, then use deploy.sh instead.
Back-end: 
1. Update the values in server/.env.production. If you don't have it, consider following the template in server/.env.
2. Update the value in that file
```bash
PORT={PRODUCTION_PORT}
BASE_URL={PRODUCTION_BASE_URL}

DB_HOST={PRODUCTION_DB_HOST}
DB_PORT={PRODUCTION_DB_PORT}
DB_USER={PRODUCTION_DB_USER}
DB_PASS={PRODUCTION_DB_PASS}
DB_NAME={PRODUCTION_DB_NAME}
DB_URL={PRODUCTION_DB_URL}

REFRESH_TOKEN_SECRET={PRODUCTION_REFRESH_TOKEN_SECRET}
ACCESS_TOKEN_SECRET={PRODUCTION_ACCESS_TOKEN_SECRET}
ACTIVE_TOKEN_SECRET={PRODUCTION_ACTIVE_TOKEN_SECRET}

MAIL_CLIENT_ID={PRODUCTION_MAIL_CLIENT_ID}
MAIL_CLIENT_SECRET={PRODUCTION_MAIL_CLIENT_SECRET}
MAIL_REFRESH_TOKEN={PRODUCTION_MAIL_REFRESH_TOKEN}
SENDER_EMAIL_ADDRESS={PRODUCTION_SENDER_EMAIL_ADDRESS}

TWILIO_ACCOUNT_SID={PRODUCTION_TWILIO_ACCOUNT_SID} 
TWILIO_AUTH_TOKEN={PRODUCTION_TWILIO_AUTH_TOKEN} 
TWILIO_PHONE_NUMBER={PRODUCTION_TWILIO_PHONE_NUMBER} 
TWILIO_SERVICE_ID={PRODUCTION_TWILIO_SERVICE_ID}

```
3. The file should NEVER been committed to source control, because it contains sensitive information.
4. Run yarn deploy to deploy to Google App Engine.

### CI/CD Setup
The project use TravisCI for CI/CD. The project can be accessed at Henry Technical Test. Please modify /server/.travis.yml. If you want to update the build and CI process.

## 3. Other Notes
### What I have completed

**1. Functionalities**
1. Showing menu: Categories and Blogs. Show Blog Detail when clicked.
2. Login/logout/Register, using JWT for authentication.
3. Individual blog: Add/Edit/Delete.
4. Group Chat: Join Group as Temporary User, Leave Chat, Delete the whole chat.
5. For simplicity, the cart will be synced every 10 seconds of using real-time technology.

**2. Deployment Process**
1. Front-end: https://app.netlify.com/sites/mern-v-blog/overview
2. Back-end: https://dashboard.render.com/web/mern-v-blog
3. Database: https://cloud.mongodb.com/v2#/clusters
4. CI server:https://github.com/vinhngo001/mern-v-blog/actions

**Others**
1. Local Deploment Setup script (1 line setup with Docker)
2. Some Unit Tets for front-end components.

# What can be improved
1. More unit tests for back-end.
2. Write some end-to-end tests.
3. Real-time sync for Group Chat using socket.io.
4. The front-end can be built & deployed to Google Storage for faster performance.
5. We can create 1 more branch called releases. The CI should support deploying the app when code is merged to this branch.