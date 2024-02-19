_Disclamar: Project was abandoned rendering it possibly un-runnable_

## Introduction

This project is a Web API for the backend of Vidly, an imaginary movie rental service.<br>
Tech stack: TypeScript, NodeJs, ExpressJs, MongoDB, Zud<br>
Development duration: Jan 7 - Jan 24<br>

### Features

- CRUD operations
- Authentication (local strategy)
- Authorization (roles, claims)
- Refresh token rotation
- Sorting, Filtering and Pagination 

### Table of Contents

- [API Overview](#api)
- [Getting Started](#getting-started)
- [Running the API - Development](#running-in-development)
- [Running the API - Production](#running-in-production)


## Getting Started

### Prerequisities

To run this application, you need to have installed the listed softwares below.
- Node version 14+ @ https://nodejs.org/en/download/
- MongoDB version 6+ @ https://docs.mongodb.com/manual/installation/

### Installation

Step 1: Clone the repo:

```bash
git clone https://github.com/oghenetefa/vidly-movie-rentals-api-js
```

Step 2: Navigate into the cloned repo directory via a terminal and install dependencies:

```bash
npm install
```

Step 3: Duplicate the '_.env.example_' file and rename it to '_.env_'.

```diff
  project_folder/
    package.json
    .env.example
+   .env
```

## Run application

### __Running in development__

Step 1: In the config's index module, import the development module only.

```js
#file_location: project_folder/config/index.js
```

Step 2: In the config's development module, make required and necessary edits.

```js
#file_location: project_folder/config/development.js
```

Step 3: Startup a local mongodb connection via a GUI, Cloud or terminal then after, copy the connection string, it will be need in further steps.

Step 4: Update the project's config index module with the connection string and other relevant information gotten from the previous step.

```js
#file_location: project_folder/config/development.js
```

Step 4: (Optional) Populate the database via a terminal opened to the project directory:

```bash
npm run devSeedDb
```

Step 5: Start the application:

```bash
npm run devStart
```

### __Running in production__

Step 1: In the config's index module, import the production module only.

```js
#file_location: project_folder/config/index.js
```

Step 2: In the project's dotenv file, make configuration edits for the application.

```js
#file_location: project_folder/.env
```

Step 3: (Optional & Not-recommended) Populate the database, via a terminal opened to the project directory:

```bash
npm run seedDb
```

Step 4: Start the application:

```bash
npm start
```

```
vidly-rentals-api-nts
├─ .env
├─ .env.example
├─ .gitignore
├─ config
│  ├─ default.ts
│  ├─ development.ts
│  └─ production.ts
├─ doc
│  ├─ api-quick-guide.md
│  └─ api-thunder-collection.json
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ common
│  │  ├─ extensions
│  │  │  ├─ faker.ts
│  │  │  └─ irrelevant.txt
│  │  ├─ irrelevant.txt
│  │  ├─ modules
│  │  │  ├─ express-api-prototyping.ts
│  │  │  ├─ express-cookie.ts
│  │  │  └─ http-status-code.ts
│  │  ├─ plugins
│  │  │  └─ mongoose-lil-assistant.ts
│  │  └─ utils
│  │     ├─ config-util.ts
│  │     ├─ jwt-utils.ts
│  │     ├─ logging-utils.ts
│  │     └─ shared
│  │        ├─ arrays-util.ts
│  │        ├─ date-time-util.ts
│  │        ├─ dotenv-util.ts
│  │        ├─ numbers-util.ts
│  │        ├─ object-literal-util.ts
│  │        └─ strings-util.ts
│  ├─ core
│  │  ├─ controllers
│  │  │  ├─ customer-controller.ts
│  │  │  ├─ movie-controller.ts
│  │  │  ├─ rentals-controller.ts
│  │  │  ├─ role-controller.ts
│  │  │  ├─ server-health-check-controller.ts
│  │  │  ├─ user-controller.ts
│  │  │  └─ utils
│  │  │     └─ data-curation-util.ts
│  │  ├─ errors
│  │  │  ├─ common-errors.ts
│  │  │  ├─ http-errors.ts
│  │  │  ├─ security-errors.ts
│  │  │  └─ token-errors.ts
│  │  ├─ guards
│  │  │  ├─ base
│  │  │  │  └─ index.ts
│  │  │  ├─ cors-guard.ts
│  │  │  ├─ customer-guard.ts
│  │  │  ├─ user-guard.ts
│  │  │  └─ utils
│  │  │     └─ guard-utils.ts
│  │  ├─ middleware
│  │  │  ├─ authorization
│  │  │  │  ├─ admin-access-authorizer.ts
│  │  │  │  ├─ admin-modification-authorizer.ts
│  │  │  │  ├─ admin-roles-verifier.ts
│  │  │  │  ├─ mulit-access-authoirzer.ts
│  │  │  │  └─ user-access-authorizer.ts
│  │  │  ├─ common
│  │  │  │  ├─ express-async-middleware.ts
│  │  │  │  ├─ express-response-formatter
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  └─ types.ts
│  │  │  │  ├─ http-data-curation-query-parser
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  └─ types.ts
│  │  │  │  └─ request-jwt-verifier.ts
│  │  │  ├─ deserialization
│  │  │  │  └─ local-strategy-deserializer.ts
│  │  │  ├─ error-handling
│  │  │  │  ├─ general-errors-handler.ts
│  │  │  │  ├─ http-status-errors-handler.ts
│  │  │  │  ├─ mongoose-errors-handler.ts
│  │  │  │  ├─ request-errors-handler.ts
│  │  │  │  ├─ security-errors-handler.ts
│  │  │  │  └─ token-errors-hander.ts
│  │  │  ├─ logging
│  │  │  │  ├─ error-logger.ts
│  │  │  │  └─ request-logger.ts
│  │  │  ├─ security
│  │  │  │  ├─ cors.ts
│  │  │  │  └─ request-rate-limiter.ts
│  │  │  └─ validation
│  │  │     ├─ validate-data-curation-query.ts
│  │  │     ├─ validate-object-id-param.ts
│  │  │     ├─ validate-request-query.ts
│  │  │     └─ validate-request-schema.ts
│  │  ├─ models
│  │  │  ├─ content-rating-model.ts
│  │  │  ├─ customer-model.ts
│  │  │  ├─ movie-model.ts
│  │  │  ├─ rental-model.ts
│  │  │  ├─ role-model.ts
│  │  │  ├─ token-session-model.ts
│  │  │  └─ user-model.ts
│  │  ├─ routes
│  │  │  ├─ content-rating-routes.ts
│  │  │  ├─ customer-routes.ts
│  │  │  ├─ movie-routes.ts
│  │  │  ├─ rentals-routes.ts
│  │  │  ├─ role-routes.ts
│  │  │  ├─ server-routes
│  │  │  │  └─ health-check.ts
│  │  │  ├─ user-routes.ts
│  │  │  └─ utils
│  │  │     ├─ request-util.ts
│  │  │     └─ response-util.ts
│  │  ├─ schemas
│  │  │  ├─ content-rating-schema.ts
│  │  │  ├─ customer-schema.ts
│  │  │  ├─ movie-schema.ts
│  │  │  ├─ rental-schema.ts
│  │  │  ├─ role-schema.ts
│  │  │  ├─ shared-definitions.ts
│  │  │  ├─ shared-schema.ts
│  │  │  ├─ token-session-schema.ts
│  │  │  ├─ user-schema.ts
│  │  │  └─ validator
│  │  │     └─ index.ts
│  │  └─ services
│  │     ├─ base
│  │     │  └─ index.ts
│  │     ├─ content-rating-service.ts
│  │     ├─ customer-service.ts
│  │     ├─ database-adapters
│  │     │  └─ mongoose.ts
│  │     ├─ movie-service.ts
│  │     ├─ rental-service.ts
│  │     ├─ role-service.ts
│  │     ├─ token-session-service.ts
│  │     └─ user-service.ts
│  ├─ index.ts
│  ├─ seed
│  │  ├─ console
│  │  │  ├─ constants.ts
│  │  │  ├─ errors.ts
│  │  │  ├─ helpers.ts
│  │  │  ├─ index.ts
│  │  │  └─ utils.ts
│  │  ├─ factories
│  │  │  ├─ development
│  │  │  │  ├─ contentrating-factory.ts
│  │  │  │  ├─ customer-factory.ts
│  │  │  │  ├─ movie-factory.ts
│  │  │  │  ├─ rental-factory.ts
│  │  │  │  ├─ role-factory.ts
│  │  │  │  └─ user-factory.ts
│  │  │  └─ factory-util.ts
│  │  ├─ seeders
│  │  │  ├─ content-rating-seeder.ts
│  │  │  ├─ customer-seeder.ts
│  │  │  ├─ movie-seeder.ts
│  │  │  ├─ rental-seeder.ts
│  │  │  ├─ role-seeder.ts
│  │  │  ├─ shared
│  │  │  │  └─ types.ts
│  │  │  └─ user-seeder.ts
│  │  └─ seeds
│  │     ├─ contentrating-seeds.json
│  │     ├─ customer-seeds.json
│  │     ├─ movie-seeds.json
│  │     ├─ rental-seeds.json
│  │     ├─ role-seeds.json
│  │     └─ user-seeds.json
│  ├─ startup
│  │  ├─ database.ts
│  │  ├─ environment.ts
│  │  ├─ middleware.ts
│  │  ├─ routes.ts
│  │  └─ server.ts
│  └─ storage
│     ├─ irrelevant.txt
│     ├─ legacy-seed
│     │  ├─ development
│     │  │  ├─ backup
│     │  │  │  ├─ contentrating-factory.ts
│     │  │  │  ├─ customer-factory.ts
│     │  │  │  ├─ movie-factory.ts
│     │  │  │  ├─ rental-factory.ts
│     │  │  │  ├─ role-factory.ts
│     │  │  │  └─ user-factory.ts
│     │  │  ├─ data
│     │  │  │  ├─ contentrating-seeds.json
│     │  │  │  ├─ customer-seeds.json
│     │  │  │  ├─ movie-seeds.json
│     │  │  │  ├─ rental-seeds.json
│     │  │  │  ├─ role-seeds.json
│     │  │  │  └─ user-seeds.json
│     │  │  └─ factories
│     │  │     ├─ contentrating-factory.ts
│     │  │     ├─ customer-factory.ts
│     │  │     ├─ movie-factory.ts
│     │  │     ├─ rental-factory.ts
│     │  │     ├─ role-factory.ts
│     │  │     └─ user-factory.ts
│     │  ├─ errors.ts
│     │  ├─ factories
│     │  ├─ seeder-cli
│     │  │  ├─ constants.ts
│     │  │  ├─ helpers.ts
│     │  │  └─ index.ts
│     │  ├─ seeder.ts
│     │  ├─ seeders
│     │  │  ├─ content-rating-seeder.ts
│     │  │  ├─ customer-seeder.ts
│     │  │  ├─ movie-seeder.ts
│     │  │  ├─ rental-seeder.ts
│     │  │  ├─ role-seeder.ts
│     │  │  └─ user-seeder.ts
│     │  └─ utils.ts
│     └─ seed-factory-backup
│        ├─ contentrating-factory.ts
│        ├─ customer-factory.ts
│        ├─ movie-factory.ts
│        ├─ rental-factory.ts
│        ├─ role-factory.ts
│        └─ user-factory.ts
└─ tsconfig.json

```
```
vidly-rentals-api-nts
├─ .env
├─ .env.example
├─ .gitignore
├─ .prettierrc
├─ @types
│  └─ ts-missing-mild-sugar.d.ts
├─ config
│  ├─ default.ts
│  ├─ development.ts
│  ├─ production.ts
│  └─ utils.ts
├─ doc
│  ├─ api-quick-guide.md
│  ├─ api-thunder-collection.json
│  └─ note.txt
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ common
│  │  ├─ extensions
│  │  │  ├─ faker
│  │  │  │  └─ index.ts
│  │  │  └─ zod
│  │  │     └─ index.ts
│  │  ├─ plugins
│  │  │  ├─ express
│  │  │  │  ├─ auth-cookie.ts
│  │  │  │  └─ express-api-prototyping.ts
│  │  │  ├─ http-context
│  │  │  │  └─ http-status-code.ts
│  │  │  └─ mongoose
│  │  │     └─ mongoose-normalizer
│  │  │        ├─ index.ts
│  │  │        └─ README.md
│  │  └─ utils
│  │     ├─ datatype
│  │     │  ├─ array-utils.ts
│  │     │  ├─ datetime-utils.ts
│  │     │  ├─ env-values-utils.ts
│  │     │  ├─ number-utils.ts
│  │     │  ├─ object-literal-utils.ts
│  │     │  └─ string-utils.ts
│  │     └─ http-context
│  │        └─ headers.ts
│  ├─ core
│  │  ├─ controllers
│  │  │  ├─ customer-controller.ts
│  │  │  ├─ movie-controller.ts
│  │  │  ├─ rentals-controller.ts
│  │  │  ├─ role-controller.ts
│  │  │  ├─ server-health-controller
│  │  │  │  └─ index.ts
│  │  │  └─ user-controller
│  │  │     ├─ index.ts
│  │  │     └─ service-data-request-utils.ts
│  │  ├─ errors
│  │  │  └─ common-errors.ts
│  │  ├─ guards
│  │  │  ├─ base
│  │  │  │  └─ index.ts
│  │  │  ├─ cors-guard.ts
│  │  │  ├─ customer-guard.ts
│  │  │  ├─ user-guard.ts
│  │  │  └─ utils
│  │  │     └─ guard-utils.ts
│  │  ├─ middleware
│  │  │  ├─ authorization
│  │  │  │  ├─ admin-access-authorizer.ts
│  │  │  │  ├─ admin-modification-authorizer.ts
│  │  │  │  ├─ admin-roles-verifier.ts
│  │  │  │  ├─ mulit-access-authoirzer.ts
│  │  │  │  └─ user-access-authorizer.ts
│  │  │  ├─ common
│  │  │  │  ├─ async-middleware.ts
│  │  │  │  ├─ data-curation-query-parser
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  └─ types.ts
│  │  │  │  ├─ request-locals-init.ts
│  │  │  │  └─ response-formatter
│  │  │  │     ├─ index.ts
│  │  │  │     └─ types.ts
│  │  │  ├─ error-handling
│  │  │  │  ├─ express-errors-handler.ts
│  │  │  │  ├─ security-errors
│  │  │  │  │  ├─ cors-errors-handler.ts
│  │  │  │  │  └─ handler.ts
│  │  │  │  └─ token-errors
│  │  │  │     ├─ handler.ts
│  │  │  │     └─ jwt-errors-handler.ts
│  │  │  ├─ logging
│  │  │  │  ├─ error-logger.ts
│  │  │  │  └─ request-logger.ts
│  │  │  ├─ security
│  │  │  │  ├─ cors.ts
│  │  │  │  └─ request-rate-limiter.ts
│  │  │  └─ validation
│  │  │     ├─ objectid-param-validator.ts
│  │  │     ├─ request-schema-validator.ts
│  │  │     └─ request-token-verifier
│  │  │        ├─ helpers.ts
│  │  │        └─ index.ts
│  │  ├─ models
│  │  │  ├─ content-rating-model.ts
│  │  │  ├─ customer-model.ts
│  │  │  ├─ jwt-session-model.ts
│  │  │  ├─ movie-model.ts
│  │  │  ├─ rental-model.ts
│  │  │  ├─ role-model.ts
│  │  │  └─ user-model.ts
│  │  ├─ routes
│  │  │  ├─ content-rating-routes.ts
│  │  │  ├─ customer-routes.ts
│  │  │  ├─ movie-routes.ts
│  │  │  ├─ rentals-routes.ts
│  │  │  ├─ role-routes.ts
│  │  │  ├─ server-health-routes.ts
│  │  │  └─ user-routes.ts
│  │  ├─ schema
│  │  │  ├─ content-rating-schema.ts
│  │  │  ├─ customer-schema.ts
│  │  │  ├─ jwt-session-schema.ts
│  │  │  ├─ movie-schema.ts
│  │  │  ├─ rental-schema.ts
│  │  │  ├─ role-schema.ts
│  │  │  ├─ user-schema.ts
│  │  │  └─ validator.ts
│  │  └─ services
│  │     ├─ adapters
│  │     │  └─ mongoose-repository.ts
│  │     ├─ content-rating-service.ts
│  │     ├─ customer-service.ts
│  │     ├─ index.ts
│  │     ├─ movie-service.ts
│  │     ├─ rental-service.ts
│  │     ├─ role-service.ts
│  │     ├─ token-session-service
│  │     │  └─ index.ts
│  │     └─ user-service
│  │        ├─ helpers.ts
│  │        └─ index.ts
│  ├─ index.ts
│  ├─ seed
│  │  ├─ console
│  │  │  ├─ constants.ts
│  │  │  ├─ errors.ts
│  │  │  ├─ helpers.ts
│  │  │  ├─ index.ts
│  │  │  └─ utils.ts
│  │  ├─ factories
│  │  │  ├─ development
│  │  │  │  ├─ contentrating-factory.ts
│  │  │  │  ├─ customer-factory.ts
│  │  │  │  ├─ movie-factory.ts
│  │  │  │  ├─ rental-factory.ts
│  │  │  │  ├─ role-factory.ts
│  │  │  │  └─ user-factory.ts
│  │  │  └─ factory-util.ts
│  │  ├─ seeders
│  │  │  ├─ content-rating-seeder.ts
│  │  │  ├─ customer-seeder.ts
│  │  │  ├─ movie-seeder.ts
│  │  │  ├─ rental-seeder.ts
│  │  │  ├─ role-seeder.ts
│  │  │  ├─ shared
│  │  │  │  └─ types.ts
│  │  │  └─ user-seeder.ts
│  │  └─ seeds
│  │     ├─ contentrating-seeds.json
│  │     ├─ customer-seeds.json
│  │     ├─ movie-seeds.json
│  │     ├─ rental-seeds.json
│  │     ├─ role-seeds.json
│  │     └─ user-seeds.json
│  ├─ startup
│  │  ├─ database.ts
│  │  ├─ environment.ts
│  │  ├─ middleware.ts
│  │  ├─ routes.ts
│  │  └─ server.ts
│  └─ storage
│     ├─ errors
│     │  ├─ CHANGELOG.md
│     │  ├─ LICENSE
│     │  ├─ package.json
│     │  ├─ README.md
│     │  ├─ src
│     │  │  └─ index.ts
│     │  ├─ test
│     │  │  └─ index.test.ts
│     │  └─ tsconfig.json
│     ├─ legacy-seed
│     │  ├─ backup
│     │  │  ├─ contentrating-factory.ts
│     │  │  ├─ customer-factory.ts
│     │  │  ├─ movie-factory.ts
│     │  │  ├─ rental-factory.ts
│     │  │  ├─ role-factory.ts
│     │  │  └─ user-factory.ts
│     │  ├─ development
│     │  │  ├─ backup
│     │  │  │  ├─ contentrating-factory.ts
│     │  │  │  ├─ customer-factory.ts
│     │  │  │  ├─ movie-factory.ts
│     │  │  │  ├─ rental-factory.ts
│     │  │  │  ├─ role-factory.ts
│     │  │  │  └─ user-factory.ts
│     │  │  ├─ data
│     │  │  │  ├─ contentrating-seeds.json
│     │  │  │  ├─ customer-seeds.json
│     │  │  │  ├─ movie-seeds.json
│     │  │  │  ├─ rental-seeds.json
│     │  │  │  ├─ role-seeds.json
│     │  │  │  └─ user-seeds.json
│     │  │  └─ factories
│     │  │     ├─ contentrating-factory.ts
│     │  │     ├─ customer-factory.ts
│     │  │     ├─ movie-factory.ts
│     │  │     ├─ rental-factory.ts
│     │  │     ├─ role-factory.ts
│     │  │     └─ user-factory.ts
│     │  ├─ errors.ts
│     │  ├─ factories
│     │  ├─ seeder-cli
│     │  │  ├─ constants.ts
│     │  │  ├─ helpers.ts
│     │  │  └─ index.ts
│     │  ├─ seeder.ts
│     │  ├─ seeders
│     │  │  ├─ content-rating-seeder.ts
│     │  │  ├─ customer-seeder.ts
│     │  │  ├─ movie-seeder.ts
│     │  │  ├─ rental-seeder.ts
│     │  │  ├─ role-seeder.ts
│     │  │  └─ user-seeder.ts
│     │  └─ utils.ts
│     └─ mongoose-adapter.ts
└─ tsconfig.json

```
