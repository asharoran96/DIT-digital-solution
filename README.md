# Digital Identity Backend
basic Digital Identity solution, the backend will expose 2 communication channels/transports and will mix them together, the first is REST API, the second utilizes WebSockets ultimately is an API/event based system, you have 3 actors in the system
Issuers, issuers can issue credentials

## DIT digital solution highlevel workflow
![DIT workflow](./assets/digital-workflow-highlevel.png)

## tree file 
```
├── README.md
├── assets
│   └── digital-workflow-highlevel.png
├── data
│   ├── credential.data.json
│   ├── holder.data.json
│   ├── issuer.data.json
│   └── verifier.data.json
├── digital-solution
│   ├── Dockerfile
│   ├── dist
│   ├── nest-cli.json
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── src
    |––––modules
        ├── credential
        │   ├── controller
        │   ├── credential.module.ts
        │   ├── dto
        │   ├── enum
        │   ├── interface
        │   ├── repository
        │   └── service
        ├── holder
        │   ├── controller
        │   ├── dto
        │   ├── holder.module.ts
        │   ├── interface
        │   ├── repository
        │   └── service
        ├── issuer
        │   ├── controller
        │   ├── dto
        │   ├── interface
        │   ├── issuer.module.ts
        │   ├── repository
        │   └── service
        ├── notification
        │   ├── notification.gateway.ts
        │   └── notification.module.ts
        └── verifier
            ├── controller
            ├── dto
            ├── enum
            ├── interface
            ├── repository
            ├── service
            └── verifier.module.ts
            ├── test
            ├── tsconfig.build.json
            └── tsconfig.json
├── docker-compose.yml
├── env
│   └── docker.env
├── file_tree.txt
└── package.json
```

## Run the Application using terminal
1. Clone the repository.
2. go to `cd digital-solution`
2. Install dependencies: `npm install`
3. Start the application: `npm run start`

## Test
Run `npm test` to execute unit tests.

## Run using Docker
1. Clone the repository.
2. go to the root for this repo where the docker compose file is
3. Build the Docker compose file by write this on the terminal: `docker compose up --build -d`

## Swagger Documentation
Visit `http://localhost:8082/doc` for Swagger documentation.
