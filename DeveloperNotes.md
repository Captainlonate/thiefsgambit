# How to develop locally

## Install

- Docker
- Go
  - https://go.dev/doc/install
  - Currently go1.17.7 darwin/amd64
- NodeJS
  - Currently v16.13.1

## Database

- The locally running servers don't depend on a locally running database, instead they connect directly to the one running up on AWS, configured with some .env files.

## Run It

__API__

```bash
// API comes up on http://127.0.0.1:3001
go run main.go
```

__CHAT__

```bash
npm install
// API comes up on http://localhost:3002
npm start
```

__FRONTEND__

```bash
npm install
// Launches http://localhost:3000/login
npm start
```