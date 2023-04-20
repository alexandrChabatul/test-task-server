### Test task server.

Server for administrator. Authorization is required, the administrator can manage the user table (CRUD), as well as generate a PDF file for any of the users.

 ## Tech stack
 - NodeJS
 - Express
 - MySQL
 - Sequelize
 - Bcrypt
 - JWT
 - PDF-LIB
 - Firebase

##  Setup

- Clone this repo: `$ https://github.com/sashkill94/test-task-server.git`.

- Go to downloaded folder: `$ cd test-task-server`.

##  Running
- Run command: `$ docker-compose up`

 ### Or
- Install dependencies: `$ npm install`.
- Build server: `$ npm run build`
- Start server: `$ npm run start-server`.

###### Now you can send requests to the address (port can be set via environment variables): `http://127.0.0.1:8080`. To correct work you need to setting up your `.env` file in the root of the project. You need to configure next environment variables:
##

// Database</br>
DB_USER</br>
DB_PASSWORD</br>
DB_NAME</br>
DB_HOST</br>
DB_DRIVER</br>

// Server</br>
JWT_ACCESS_SECRET </br>
CLIENT </br>
NODE_DOCKER_POST=8080</br>

// Firebase (storage)</br>
API_KEY</br>
AUTH_DOMAIN</br>
DATABASE_URL</br>
PROJECT_ID</br>
STORAGE_BUCKET</br>
MESSAGING_SENDER_ID</br>
APP_ID</br>

// Docker</br>
MYSQLDB_USER</br>
MYSQLDB_ROOT_PASSWORD</br>
MYSQLDB_DATABASE</br>
MYSQLDB_LOCAL_PORT</br>
MYSQLDB_DOCKER_PORT</br>
NODE_LOCAL_PORT</br>

##  Usage

 **Auth**

- [Sign Up](#sign-up)

- [Sign In](#sign-in)

 **Users**

- [Get Users](#get-users)

- [Create User](#create-user)

- [Get User By id](#get-user-by-id)

- [Update user](#update-user)

- [Delete user](#delete-user)

- [Generate pdf](#user-pdf])

 **Images**

- [Upload image](#uplaod-image)

----


<a id="sign-up"></a>**Sign Up**


Returns json data with AdminDto instanse.

<details>

* **URL**

/api/auth/signup

* **Method:**

`POST`

* **Headers:**

`'Content-Type': 'application/json'`

* **URL Params**

None

* **Query Params**

None

* **Data Params**
```json
{

"email": "test@test.test",

"password": "password"

}
```


* **Success Response:**

* **Code:** 201 CREATED <br />

**Content:**

```json

{
    "id": 2,
    "email": "test@test.test"
}

```

* **Error Response:**

* **Code:** 400 BAD REQUEST <br />

**Content:**
``` json

{

"message": "User with this email already exists."

}

```
* **Code:** 400 BAD REQUEST <br />

**Content:**
``` json

{

"message": "Validation error",

"errors": [

  {

   "value": "te11st@test",

   "msg": "Email must match the pattern",

   "param": "email",

   "location": "body"

  },

  {

  "value": "",

   "msg": "Username should not be empty",

   "param": "username",

   "location": "body"

  },

  {

"value": "",

   "msg": "Password should not be empty",

   "param": "password",

   "location": "body"

  }

]

}

```

* **Notes:**

None

</details>

----

<a id="sign-in"></a>**Sign In**

Returns json data with tokenand AdminDto instance.

<details>

* **URL**

/api/auth/signin

* **Method:**

`POST`

* **Headers:**

`'Content-Type': 'application/json'`

* **URL Params**

None

* **Query Params**

None

* **Data Params**

```json

{

"email": "test@test.test",
"password": "password"
 
}


```

* **Success Response:**

* **Code:** 200 OK <br />

**Content:**

```json

{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYWQxMjNAc2FkLmFzZCIsImlhdCI6MTY4MjAxMjcxMiwiZXhwIjoxNjgyMDk5MTEyfQ.iyqbeZaG-ooP_oaG5b0a_42Sa5kuT9K3f_-turCokAI",
    "admin": {
        "id": 2,
        "email": "test@test.test"
    }
}

```


* **Error Response:**

*  **Code:** 400 BAD REQUEST <br />

**Content:**
``` json

{

"message": "Wrong password"

}

```
* **Code:** 400 BAD REQUEST <br />

**Content:**
``` json

{

"message": "Validation error",

"errors": [

  {

   "value": "te11st@test",

   "msg": "Email must match the pattern",

   "param": "email",

   "location": "body"

  },

  {

   "value": "",

   "msg": "Password should not be empty",

   "param": "password",

   "location": "body"

  }

]

}

```

* **Code:** 404 NOT FOUND <br />

**Content:**

```json

{

"message": "User test@test.test not found."

}

```

* **Notes:**

None

</details>

----



<a id="get-users"></a>**Get Users**

Returns json data with users from DB.

<details>

* **URL**

/api/users/

* **Method:**

`GET`

* **Headers:**

`'Authorization': 'Bearer ${accessToken}'`

* **URL Params**

None

* **Query Params**

None

* **Data Params**

None


* **Success Response:**

* **Code:** 200 OK <br />

**Content:**

```json

[
    {
        "id": 1,
        "email": "test@test.tq",
        "firstName": "tester",
        "lastName": "Tester",
        "image": "",
        "pdf": null,
        "createdAt": "2023-04-20T18:22:40.000Z",
        "updatedAt": "2023-04-20T18:22:40.000Z"
    }
]
```

* **Error Response:**

* **Code:** 401 # UNAUTHORIZED <br />

**Content:**

```json

{

"message": "Unauthorized"

}

```

* **Notes:**

None

</details>

----

<a id="create-user"></a>**Create User**

Create user in database. Return User instance.

<details>

* **URL**

/api/users/

* **Method:**

`POST`

* **Headers:**

`'Authorization': 'Bearer ${accessToken}'`

* **URL Params**

None

* **Query Params**

None

* **Data Params**
* 
```json

    {
        "email": "test@test.tq" (requared, isEmail),
        "firstName": "tester", (required)
        "lastName": "Tester", (required)
        "image": "", (optional, isUrl)
    }

```

None


* **Success Response:**

* **Code:** 201 CREATED <br />

**Content:**

```json

    {
        "id": 1,
        "email": "test@test.tq",
        "firstName": "tester",
        "lastName": "Tester",
        "image": "",
        "pdf": null,
        "createdAt": "2023-04-20T18:22:40.000Z",
        "updatedAt": "2023-04-20T18:22:40.000Z"
    }

```

* **Error Response:**

* **Code:** 401 # UNAUTHORIZED <br />

**Content:**

```json

{

"message": "Unauthorized"

}


```
* **Code:** 400 BAD REQUEST <br />

* **Notes:**

None

</details>

----

<a id="update-user"></a>**Update user**


Update user instance.

<details>

* **URL**

/api/users/:id

* **Method:**

`PUT`

* **Headers:**

`'Authorization': 'Bearer ${accessToken}'`

* **URL Params**

`id: user id`

None

* **Query Params**

None

* **Data Params**
* 
```json

    {
        "email": "test@test.tq" (requared, isEmail),
        "firstName": "tester", (required)
        "lastName": "Tester", (required)
        "image": "", (optional, isUrl)
    }

```

* **Success Response:**

* **Code:** 200 OK <br />

**Content:**

None

* **Error Response:**

* **Code:** 401 # UNAUTHORIZED <br />

**Content:**

```json

{

"message": "Unauthorized"

}

```

* **Notes:**

None

</details>

----

<a id="get-user-by-id"></a>**Get User By id**

Return user instanse by id.

<details>

* **URL**

/api/users/:id

* **Method:**

`GET`

* **Headers:**

`'Authorization': 'Bearer ${accessToken}'`

* **URL Params**

`id: user id`

* **Query Params**

None

* **Data Params**

None

* **Success Response:**

* **Code:** 200 OK <br />

**Content:**

```json

{
    "id": 1,
    "email": "test@test.tq",
    "firstName": "tester",
    "lastName": "Tester",
    "image": "",
    "pdf": null,
    "createdAt": "2023-04-20T18:22:40.000Z",
    "updatedAt": "2023-04-20T18:22:40.000Z"
}
```

* **Error Response:**

* **Code:** 401 # UNAUTHORIZED <br />

**Content:**

```json

{

"message": "Unauthorized"

}

```

* **Code:** 404 # NOT FOUND <br />

**Content:**

```json

{

"message": "Cannot find user with id - ${id}"

}

```

* **Notes:**

None

</details>

----

<a name="delete-user"></a>**Delete user**

Delete user from database.

<details>

* **URL**

/api/users/:id

* **Method:**

`DELETE`

* **Headers:**

None

* **URL Params**

`id : user id`

* **Query Params**

None

* **Data Params**

None

* **Success Response:**

* **Code:** 204 NO CONTENT <br />

**Content:**

None

* **Error Response:**

* **Code:** 404 # NOT FOUND <br />

**Content:**

```json

{
    "message": "Cannot find user with id - ${id}"
}

```

* **Notes:**

None

</details>

----

<a name="user-pdf"></a>**Generate PDF**

Generate PDF from user instanse and save it in database (BLOB).

<details>

* **URL**

/api/users/pdf

* **Method:**

`POST`

* **Headers:**

None

* **URL Params**

None

* **Query Params**

None

* **Data Params**
```json
{
    "email" : "tets@test.test"
}
```

* **Success Response:**

* **Code:** 200 OK <br />

**Content:**

```json

{
    "result": boolean
}

```

* **Error Response:**

* **Code:** 404 # NOT FOUND <br />

**Content:**

```json

{
    "message": "`Cannot find user with email - ${email}`"
}

```

* **Notes:**

None

</details>

----

<a id="uplaod-image"></a>**Upload image**


Upload image to firebase storage and return image url.

<details>

* **URL**

/api/images/

* **Method:**

`POST`

* **Headers:**

`'Content-Type': 'application/json'`

* **URL Params**

None

* **Query Params**

None

* **Data Params**
```
file: image file
```


* **Success Response:**

* **Code:** 200 OK <br />

**Content:**

```json

{
    "imageUrl": "imageUrl"
}

```

* **Error Response:**

* **Code:** 400 BAD REQUEST <br />

**Content:**
``` json

{

"message": "Image is required."

}

{

"message": "Data should be an image."

}

```

* **Notes:**

None

</details>

