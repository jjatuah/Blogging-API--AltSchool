# Blog API

This is an api for a Blog

---

## Requirements

1. Users should have a first_name, last_name, email, password, (you can add other attributes you want to store about the user)
2. A user should be able to sign up and sign in into the blog app
3. Use JWT as authentication strategy and expire the token after 1 hour
4. A blog can be in two states; draft and published
5. Logged in and not logged in users should be able to get a list of published blogs created
6. Logged in and not logged in users should be able to to get a published blog
7. Logged in users should be able to create a blog.
8. When a blog is created, it is in draft state
9. The owner of the blog should be able to update the state of the blog to published
10. The owner of a blog should be able to edit the blog in draft or published state
11. The owner of the blog should be able to delete the blog in draft or published state
12. The owner of the blog should be able to get a list of their blogs.
    a. The endpoint should be paginated
    b. It should be filterable by state
13. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
14. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated,
    a. default it to 20 blogs per page.
    b. It should also be searchable by author, title and tags.
    c. It should also be orderable by read_count, reading_time and timestamp
15. When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1
16. Come up with any algorithm for calculating the reading_time of the blog.

---

## Setup

- Install NodeJS, mongodb
- pull this repo
- update .env
- run `npm install`
- run `node app.js`

---

## Base URL

- https://blogging-api-altschool.onrender.com/

## Models

---

### User

| field     | data_type | constraints      |
| --------- | --------- | ---------------- |
| username  | string    | required, unique |
| firstname | string    | required         |
| lastname  | string    | required         |
| email     | string    | required, unique |
| password  | string    | required         |

### Blog

| field        | data_type | constraints      |
| ------------ | --------- | ---------------- |
| title        | string    | required, unique |
| description  | string    | required         |
| tags         | array     | required         |
| author       | string    | required         |
| read_count   | number    | default: 0       |
| reading_time | number    |                  |
| body         | string    | required, unique |

| state | string | required, enum: ['draft', 'published'], default: "draft" |

## APIs

---

### Routes For Non-Logged in Users

### Get all published Blogs

- Route: /blog
- Method: GET
- Responses

Success

{
"total_blogs": 2,
"blogs": [
{
"\_id": "6369006fafed4b7c8b529d04",
"title": "Janet's Blog Post",
"description": "A blog post by Janet Jonah Tukura",
"tags": [
"Tukura",
"Blog",
"Janet"
],
"author": "janet jonah",
"state": "published",
"read_count": 0,
"reading_time": 1,
"body": "Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.",
"createdAt": "2022-11-07T12:56:15.157Z",
"updatedAt": "2022-11-07T13:13:20.316Z",
"**v": 0
},
{
"\_id": "636907ceafed4b7c8b529d0c",
"title": "Janet's second Blog Post",
"description": "A second blog post by Janet Jonah Tukura",
"tags": [
"Tukura",
"Blog",
"Janet"
],
"author": "janet jonah",
"state": "published",
"read_count": 0,
"reading_time": 2,
"body": "Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria. Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.",
"createdAt": "2022-11-07T13:27:42.072Z",
"updatedAt": "2022-11-07T13:29:51.190Z",
"**v": 0
}
]
}

### Get a specific published Blog by id for non-logged in users

- Route: /blog/:id
- Method: GET
- Responses

Success

{
"status": true,
"witten_by": "janet jonah",
"blogResult": {
"\_id": "636907ceafed4b7c8b529d0c",
"title": "Janet's second Blog Post",
"description": "A second blog post by Janet Jonah Tukura",
"tags": [
"Tukura",
"Blog",
"Janet"
],
"author": "janet jonah",
"state": "published",
"read_count": 1,
"reading_time": 2,
"body": "Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria. Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.",
"createdAt": "2022-11-07T13:27:42.072Z",
"updatedAt": "2022-11-07T13:29:51.190Z",
"\_\_v": 0
}
}

### Signup User

- Route: /signup
- Method: POST
  -- use form-encode format for the body signup
- Body:

```
|      field        |    data_type   |
|     username      |    janejon     |
|      firstname    |    janet       |
|      lastname     |    jonah       |
|      email        | jane@mail.com  |
|      password     |       12345    |


```

- Responses

Success

````
{
  "message": "Signup successful",
  "user": {
    "firstname": "janet",
    "lastname": "jonah",
    "username": "janejon",
    "email": "jane@mail.com",
    "password": "$2b$10$bCv1XyAFeX2k38hZ4uTlvuv6hZi8MHyFKN4OHSXXOTs5EfKqWQipu",
    "_id": "6368f9baafed4b7c8b529cfe",
    "createdAt": "2022-11-07T12:27:38.038Z",
    "updatedAt": "2022-11-07T12:27:38.038Z",
    "fullname": "janet jonah",
    "__v": 0
  }
}```

---

### Login User

- Route: /login
- Method: POST
-- use form-encode format for the body signup
- Body:

````

| field | data_type |
| username | janejon |
| password | 12345 |

```

- Responses

Success

```

{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNjhmOWJhYWZlZDRiN2M4YjUyOWNmZSIsInVzZXJuYW1lIjoiamFuZWpvbiIsImZ1bGxuYW1lIjoiamFuZXQgam9uYWgifSwiaWF0IjoxNjY3ODI0ODE0LCJleHAiOjE2Njc4Mjg0MTR9.w_kuz9gCsUlvKHaSAio4u0JJv9vt_aFakAP61kkCBY4"
}

```

---

### Create blog

- Route: /authorblog
- Method: POST
- Header
  - Authorization (Query Parameters): secret_token = {token}
- Body:

```

{
"title": "Janet's Blog Post",
"description": "A blog post by Janet Jonah Tukura",
"tags": ["Tukura", "Blog", "Janet"],
"body": "Jukun people are very proud people and their tribe is a minor tribe in Nigeria.
Jukun people are very proud people and their tribe is a minor tribe in Nigeria.
Jukun people are very proud people and their tribe is a minor tribe in Nigeria.
Jukun people are very proud people and their tribe is a minor tribe in Nigeria.
Jukun people are very proud people and their tribe is a minor tribe in Nigeria."
}

```

- Responses

Success

```

{
"status": true,
"blog": {
"title": "Janet's Blog Post",
"description": "A blog post by Janet Jonah Tukura",
"tags": [
"Tukura",
"Blog",
"Janet"
],
"author": "janet jonah",
"state": "draft",
"read_count": 0,
"reading_time": 1,
"body": "Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.",
"\_id": "6369006fafed4b7c8b529d04",
"createdAt": "2022-11-07T12:56:15.157Z",
"updatedAt": "2022-11-07T12:56:15.157Z",
"\_\_v": 0
}
}

```

---

### Get all author Blog

- Route: /authorblog
- Method: GET
- Header
  - Authorization (Query Parameters): secret_token = {token}
- Responses

Success

```

{
"total_blogs": 1,
"blogs": [
{
"\_id": "6369006fafed4b7c8b529d04",
"title": "Janet's Blog Post",
"description": "A blog post by Janet Jonah Tukura",
"tags": [
"Tukura",
"Blog",
"Janet"
],
"author": "janet jonah",
"state": "draft",
"read_count": 0,
"reading_time": 1,
"body": "Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.",
"createdAt": "2022-11-07T12:56:15.157Z",
"updatedAt": "2022-11-07T12:56:15.157Z",
"\_\_v": 0
}
]
}

```

---

### Get specific blog by the author

- Route: /authorblog/ :id
- Method: GET
- Header:
  - Authorization (Query Parameters): secret_token = {token}
- Responses

Success

```

{
"status": true,
"witten_by": "janet jonah",
"blogResult": {
"\_id": "6369006fafed4b7c8b529d04",
"title": "Janet's Blog Post",
"description": "A blog post by Janet Jonah Tukura",
"tags": [
"Tukura",
"Blog",
"Janet"
],
"author": "janet jonah",
"state": "draft",
"read_count": 0,
"reading_time": 1,
"body": "Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.",
"createdAt": "2022-11-07T12:56:15.157Z",
"updatedAt": "2022-11-07T12:56:15.157Z",
"\_\_v": 0
}
}

```

---

...

### update specific blog by the author

- Route: /authorblog/ :id
- Method: PATCH
- Header:
  - Authorization (Query Parameters): secret_token = {token}
- Body:
  {
    "state":"published"
  }


- Responses

Success

```

{
"\_id": "6369006fafed4b7c8b529d04",
"title": "Janet's Blog Post",
"description": "A blog post by Janet Jonah Tukura",
"tags": [
"Tukura",
"Blog",
"Janet"
],
"author": "janet jonah",
"state": "published",
"read_count": 0,
"reading_time": 1,
"body": "Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.Jukun people are very proud people and their tribe is a minor tribe in Nigeria.",
"createdAt": "2022-11-07T12:56:15.157Z",
"updatedAt": "2022-11-07T13:13:20.316Z",
"\_\_v": 0
}

```

---

...



## Contributor

- Joseph Jatuah
```
