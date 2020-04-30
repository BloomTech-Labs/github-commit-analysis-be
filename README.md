# GitStats

You can find the deployed project [HERE](https://commit-analysis.herokuapp.com/).

# API Documentation

#### Backend deployed through [Heroku](https://commit-analysis-be.herokuapp.com/) <br>

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![Deploy Vendor](https://img.shields.io/badge/deployed_through-Heroku-7056bf.svg)
![CI](https://github.com/Lambda-School-Labs/github-commit-analysis-be/workflows/CI/badge.svg)
<br />
[![Maintainability](https://api.codeclimate.com/v1/badges/77446110b9b61fd36d08/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/github-commit-analysis-be/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/77446110b9b61fd36d08/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/github-commit-analysis-be/test_coverage)

## Getting started

To get the server running locally:

- Clone this repo
- **npm i** to install all required dependencies
- **npm run dev** to start the local development server
- **npm run test** to start server using testing environment

### Backend framework goes here

- _Database:_ [PostgreSQL](https://www.postgresql.org/)
  > The standard to follow per the Labs Engineering Standards.
- _API Framework:_ REST
  > Although we are retrieving information from GitHub's v4 GraphQL API, internal endpoints were built as a RESTful API to keep within scope.
- _RunTime:_ [NodeJS](https://nodejs.org/)
  > We feel that product quality will be improved through the sharing of common knowledge and reusable components.
- _Web Application Framework:_ [Express](https://expressjs.com/)
  > Minimal and Flexible. We feel that it provides a robust set of features that will support our development process.

#### Auth Routes

| Method | Endpoint                | Access Control | Description                                                            |
| ------ | ----------------------- | -------------- | ---------------------------------------------------------------------- |
| GET    | `/auth/github`          | all users      | Initiates authentication with GitHub                                   |
| GET    | `/auth/github/callback` | internal only  | Receive code from initial auth to retrieve token and send to Front-End |
| GET    | `/auth/verify`          | all users      | Receive token and, if valid, returns user information                  |
| GET    | `/auth/logout`          | all users      | Delete an organization                                                 |

#### User Routes

| Method | Endpoint          | Access Control | Description                                |
| ------ | ----------------- | -------------- | ------------------------------------------ |
| GET    | `/repo`           | all users      | Returns list of repositories for the user  |
| GET    | `/repo/:repoName` | all users      | Requests repo summary from the DS endpoint |

# Data Model

#### USER

---

```
{
  avatarUrl STRING
  bio TEXT
  githubUrl STRING
  id INTEGER [PRIMARY KEY]
  isHireable BOOLEAN
  location STRING
  login STRING
  name STRING
  websiteUrl STRING
}
```

#### REPOSITORY

---

```
{
  description TEXT
  homepageUrl STRING
  id INTEGER [PRIMARY KEY]
  name STRING
  nameWithOwner STRING
  forkCount INTEGER
  watchCount INTEGER
  starCount INTEGER
  userId INTEGER [repository.userId * => 1 user.id]
}
```

#### SESSIONS

---

```
{
  sid INTEGER [PRIMARY KEY]
  accessToken STRING
  jwt STRING
}
```

## Actions

`findOrCreateUser(rawProfileData, store)` -> Return user object

`updateOrCreateRepositories(userId, rawRepositories, store)` -> Return array of repos belonging to given user

`fetchRepository(repositoryId, store)` -> Return a single repository from the database

`fetchRepositories(userId, store)` -> Return array of user's repositories from the database

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

- PORT - used to specify the port to deploy to during development
- AUTH_SECRET - passphrase
- SESSION_SECRET - passphrase

- GITSTATS_URL - used to set front-end url

- GITHUB_CLIENT_ID - used to set oauth access for user authentication
- GITHUB_CLIENT_SECRET - used to set oauth access for user authentication
- GITHUB_CALLBACK_URL - used to set callback url for passport handshake during user authentication

- DATABASE_URL - used to set the database url for development. when deploying through Heroku this is set automatically once you add a Heroku PostgresQL database.

- DS_BASE_URL - used to set the URL to pull statistics from. normally doesn't change but can be tweaked as needed rather than providing a hard-coded value.

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/github-commit-analysis-fe) for details on the frontend of our project.

see [Database Documentation](https://github.com/Lambda-School-Labs/github-commit-analysis-ds) for details on the Data Science backend of our project.
