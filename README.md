# WD Web admin

frontend repository of WD integration management system

### Installation

- run `npm i` to install all the dependencies
- copy `.env.example` to `.env.development` for development environment variables. Update the variable accordingly.
- run `npm start` to start local server

### Deployment

- copy `.env.example` or your local `.env.development` to `.env.production` and update all the configurateion.
- build production ready: `REACT_APP_STAGE=prod npm run build`
- run deployment script `./deploy-dev.sh`, you'll be prompted to fill in server password
