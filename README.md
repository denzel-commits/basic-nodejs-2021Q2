# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
Add in hosts:
127.0.0.1 postgres

docker-compose up dev

```

After docker containers start app starts on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Stopping application

```
docker-compose down
```

## Creating JSDOC documentation

```
npm run doc
```

Documentation will be created in './out' directory

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Performance comparison

### Express

- Scenarios Created: 887
- Scenarios Completed: 887
- Requests Completed: 4435

| Title             | Description                  | Values                             |
| ----------------- | ---------------------------- | ---------------------------------- |
| Scenario Counts   | [count]                      | 887                                |
| Scenario Duration | [min, max, median, p95, p99] | 224, 12576.5, 279.6, 5576, 10940.5 |
| Latencies         | [min, max, median, p95, p99] | 5, 6962, 53, 763.8, 2810.5         |
| Success           | [ratio]                      | 100.00%                            |
| Status Codes      | [code:count]                 | 200:3548, 201:887                  |

For more information, visit: [Express performance HTML report](https://github.com/denzel-commits/basic-nodejs-2021Q2/blob/task9/express-nest-migration/load-testing/reports/html-reports/express-report.html)

### Fastify

- Scenarios Created: 900
- Scenarios Completed: 900
- Requests Completed: 4500

| Title             | Description                  | Values                               |
| ----------------- | ---------------------------- | ------------------------------------ |
| Scenario Counts   | [count]                      | 900                                  |
| Scenario Duration | [min, max, median, p95, p99] | 216.3, 3037.2, 265.6, 1068.7, 2525.2 |
| Latencies         | [min, max, median, p95, p99] | 5, 1656, 22, 240, 570                |
| Success           | [ratio]                      | 100.00%                              |
| Status Codes      | [code:count]                 | 200:3600, 201:900                    |

For more information, visit: [Fastify performance HTML report](https://github.com/denzel-commits/basic-nodejs-2021Q2/blob/task9/express-nest-migration/load-testing/reports/html-reports/fastify-report.html)
