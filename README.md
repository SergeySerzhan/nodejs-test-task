## Description

This is simple CRUD API for managing users entities.

## Installation

You need to clone or fork this repository and run:

```bash
npm install
```

to install all dependencies.

Install DB [PostgreSQL](https://www.postgresql.org/) on your machine or use a free web hosting services for PostgreSQL (https://www.heroku.com/postgres or https://www.elephantsql.com/plans.html).

Rename .env.example file to .env. You need to change .env file and provide your PostgreSQL database credentials.

To create database you can run :

```bash
npm run db:create
```

## Running the app

```bash
# development
npm run start:dev

# production
npm run start:prod

# build
npm run build
```

Application starts on PORT 3000 (you can change this in .env file), default URL http://localhost:3000

## Usage

You can use [Postman](https://www.postman.com/) to send requests to server. All endpoints (except POST /v1/auth/login and POST /v1/users) are protected, that means you need authorize (login).

<details>
<summary>Auth endpoints</summary>

### POST /v1/auth/login

Login user. Request should contain body in JSON format. Request body example:

```json
{
  "email": "sergeyserzhan@mail.ru",
  "password": "12345678qwe"
}
```

Response example:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YjFkZWI0ZC0zYjdkLTRiYWQtOWJkZC0yYjBkN2IzZGNiNmQiLCJpYXQiOjE1MTYyMzkwMjJ9.A7RPWdhfOusPgTTbdZSskLRezAHR4yDzoa2Enyxhwlc"
}
```

</details>

<details>
<summary>Users endpoints</summary>

### POST /v1/users

Create user. Request should contain form-data with fields:

email: string
firstName: string
lastName: string
password: string
image: (mime-types for image is PNG, JPG)

Response example:

```json
{
  "email": "sergeyserzhan@gmail.com",
  "firstName": "Sergey",
  "lastName": "Serzhan",
  "image": "TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG...5vdCBvbm",
  "pdf": null || Buffer
}
```

### GET /v1/users/

Get all users. Response example:

```json
[
  {
  "email": "sergeyserzhan@gmail.com",
  "firstName": "Sergey",
  "lastName": "Serzhan",
  "image": "TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG...5vdCBvbm",
  "pdf": null || Buffer
  }
]
```

### GET /v1/users/email

Get user by email. Request should contain body in JSON format:

```json
{
  "email": "sergeyserzhan@gmail.com"
}
```

Response example:

```json
{
  "email": "sergeyserzhan@gmail.com",
  "firstName": "Sergey",
  "lastName": "Serzhan",
  "image": "TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG...5vdCBvbm",
  "pdf": null || Buffer
}
```

### PATCH /v1/users/

Update existing user by email. Request should contain form-data with fields:

updatedEmail: string

(Notice: all fields above not required)

email: string
firstName: string
lastName: string
password: string
image: (mime-types for image is PNG, JPG)

Response example:

```json
{
  "email": "sergeyserzhan@gmail.com",
  "firstName": "Sergey",
  "lastName": "Serzhan",
  "image": "TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG...5vdCBvbm",
  "pdf": null || Buffer
}
```

### DELETE /v1/users/

Delete user by email. Request should contain body in JSON format:

```json
{
  "email": "sergeyserzhan@gmail.com"
}
```

Response with 204 status code No-Content.

</details>
