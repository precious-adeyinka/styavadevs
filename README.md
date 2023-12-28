# NAME
Styava Dev CRUD API server

## AUTHOR
[Precious Adeyinka](https://officialpreciousadeyinka.vercel.app/)

## DESCRIPTION
Minimalist API Server for Styava Dev Community Talk Session

## API
- Users Api - `/api/users`

## CONFIGURATION
- Requires `nodejs v16.13.0`
- Requires a `package.json` file (should be bundled with the repo source code)
- Environment variables (optional)

### BUILD
- Install dependencies, by running this command on your terminal `npm install`

### RUN
Start the server `npm start`

## DEPLOYMENT
- `docker build -t styavadevs Dockerfile .`
- `docker run -p 5000:5000 styavadevs`

## TESTING
N/A

## ENVIRONMENT VARIABLES
- Port
- NODE_ENV

## DATABASE
In-memory storage (array data structure)

## PROGRAMMING LANGUAGE
- Javascript (NodeJs)

