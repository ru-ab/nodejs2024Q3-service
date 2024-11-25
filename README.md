# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js, v22.9.0 - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/ru-ab/nodejs2024Q3-service.git
```

## Installing NPM modules

```
npm install --legacy-peer-deps
```

## Environment Variables

### Application Port

You can change the default port on which the app runs in the `.env` file located at the root of the project. For example:

```ini
PORT=4000
```

### Database Connection

You can specify the PostgreSQL database connection parameters int the `.env` file:

```ini
POSTGRES_HOST=localhost # if you run the app using docker-compose.yml file this value will be ignored
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=mydb
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"
```

### Logging

You can specify logging level (a level with higher number will log also the levels with a lower number) and max file size (in kilobytes).

```ini
# Log levels
# ===========
# error   = 0
# warn    = 1
# log     = 2
# verbose = 3
# debug   = 4
LOG_LEVEL=debug
LOG_MAX_FILE_SIZE=4
```

### Password encryption

Define hash salt rounds:

```ini
CRYPT_SALT=10
```

### Authentication

Application uses JWT token for authentication purposes.

```ini
JWT_SECRET_KEY=secret123123
JWT_SECRET_REFRESH_KEY=secret123123
TOKEN_EXPIRE_TIME=1h
TOKEN_REFRESH_EXPIRE_TIME=24h
```

## Running Application

### Running Using Docker Containers

To run the application in Docker containers you first need to install `docker` on your device. [How to install Docker](https://docs.docker.com/engine/install/).

The application consist of two containers:

- `app` - NestJS application with all necessary dependencies. Built from `./docker/app.Dockerfile`.
  - The `app` container mounts `./logs` folder for logs writing;
- `db` - PostgreSQL server for the application. Built from `./docker/db.Dockerfile`.
  - The `db` container uses two volumes:
    - `nodejs2024q3-service_db_data` - stores all the database data;
    - `nodejs2024q3-service_db_logs` - stores all the database logs.

Modify the database connection values to specify the database port, database name, and user:

```ini
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=mydb
```

Specify the logging level, JWT secrets and parameters:

```ini
LOG_LEVEL=debug
LOG_MAX_FILE_SIZE=4

CRYPT_SALT=10
JWT_SECRET_KEY=secret123123
JWT_SECRET_REFRESH_KEY=secret123123
TOKEN_EXPIRE_TIME=1h
TOKEN_REFRESH_EXPIRE_TIME=24h
```

The application uses the `docker-compose.yml` file for building and running the application. To start the app run one of these commands:

```bash
# Run the containers and see all the logs in the console
docker compose up

# Run the containers in the "detached" mode
docker compose up -d

# Run the containers in the "watch" mode (the application in the container restarts if changes made in the src folder)
docker compose up --watch
```

To stop the containers run the following command:

```bash
docker compose down
```

### Running Using Local Node Installation

To run the application locally you need to specify your PostgreSQL connection parameters in the `.env` file, for example:

```ini
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=mydb
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"
```

Specify the logging level, JWT secrets and parameters:

```ini
LOG_LEVEL=debug
LOG_MAX_FILE_SIZE=4

CRYPT_SALT=10
JWT_SECRET_KEY=secret123123
JWT_SECRET_REFRESH_KEY=secret123123
TOKEN_EXPIRE_TIME=1h
TOKEN_REFRESH_EXPIRE_TIME=24h
```

To start the application run the following command:

```bash
npm run start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Scan Docker Images For Vulnerabilities

For scanning purposes [Trivy](https://trivy.dev/) is used, running in a Docker container.

To scan images run one of the following commands:

```bash
# Scan the app container
npm run scan:app

# Scan the db container
npm run scan:db
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and Format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Application Usage

The app supports follow REST API endpoints:

- `Signup` (`auth/signup` route)
  - `POST auth/signup` - send `login` and `password` to create a new `user`
    - Server returns `status code` **201** and corresponding message if dto is valid
    - Server returns `status code` **400** and corresponding message if dto is invalid (no `login` or `password`, or they are not a `strings`)
- `Login` (`auth/login` route)
  - `POST auth/login` - send `login` and `password` to get Access token and Refresh token
    - Server returns `status code` **200** and tokens if dto is valid
    - Server returns `status code` **400** and corresponding message if dto is invalid (no `login` or `password`, or they are not a `strings`)
    - Server returns `status code` **403** and corresponding message if authentication failed (no user with such `login`, `password` doesn't match actual one, etc.)
- `Refresh` (`auth/refresh` route)
  - `POST auth/refresh` - send refresh token in body as `{ refreshToken }` to get new pair of Access token and Refresh token
    - Server returns `status code` **200** and tokens in body if dto is valid
    - Server returns `status code` **401** and corresponding message if dto is invalid (no `refreshToken` in body)
    - Server returns `status code` **403** and corresponding message if authentication failed (Refresh token is invalid or expired)

* `Users` (`/user` route)

  - `GET /user` - get all users
    - Server returns `status code` **200** and array of users records:
    ```typescript
    interface User {
      id: string;
      login: string;
      version: number;
      createdAt: number;
      updatedAt: number;
    }
    ```
  - `GET /user/:id` - get single user by id

    - Server returns `status code` **200** and record with `id === userId` if it exists:

    ```typescript
    interface User {
      id: string;
      login: string;
      version: number;
      createdAt: number;
      updatedAt: number;
    }
    ```

    - Server returns `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server returns `status code` **404** and corresponding message if record with `id === userId` doesn't exist

  - `POST /user` - create user (following DTO should be used)
    `CreateUserDto`
    ```typescript
    interface CreateUserDto {
      login: string;
      password: string;
    }
    ```
    - Server returns `status code` **201** and newly created record if request is valid:
    ```typescript
    interface User {
      id: string;
      login: string;
      version: number;
      createdAt: number;
      updatedAt: number;
    }
    ```
    - Server returns `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - `PUT /user/:id` - update user's password
    `UpdatePasswordDto` (with attributes):
    ```typescript
    interface UpdatePasswordDto {
      oldPassword: string;
      newPassword: string;
    }
    ```
    - Server returns` status code` **200** and updated record if request is valid:
    ```typescript
    interface User {
      id: string;
      login: string;
      version: number;
      createdAt: number;
      updatedAt: number;
    }
    ```
    - Server returns` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server returns` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - Server returns` status code` **403** and corresponding message if `oldPassword` is wrong
  - `DELETE /user/:id` - delete user
    - Server returns `status code` **204** if the record is found and deleted
    - Server returns `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server returns `status code` **404** and corresponding message if record with `id === userId` doesn't exist

* `Tracks` (`/track` route)

  - `GET /track` - get all tracks
    - Server returns `status code` **200** and array of tracks records:
    ```typescript
    interface Track {
      id: string;
      name: string;
      artistId: string | null;
      albumId: string | null;
      duration: number;
    }
    ```
  - `GET /track/:id` - get single track by id
    - Server returns `status code` **200** and and record with `id === trackId` if it exists:
    ```typescript
    interface Track {
      id: string;
      name: string;
      artistId: string | null;
      albumId: string | null;
      duration: number;
    }
    ```
    - Server returns `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server returns `status code` **404** and corresponding message if record with `id === trackId` doesn't exist
  - `POST /track` - create new track
    - Server returns `status code` **201** and newly created record if request is valid:
    ```typescript
    interface Track {
      id: string;
      name: string;
      artistId: string | null;
      albumId: string | null;
      duration: number;
    }
    ```
    - Server returns `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - `PUT /track/:id` - update track info
    - Server returns` status code` **200** and updated record if request is valid:
    ```typescript
    interface Track {
      id: string;
      name: string;
      artistId: string | null;
      albumId: string | null;
      duration: number;
    }
    ```
    - Server returns` status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server returns` status code` **404** and corresponding message if record with `id === trackId` doesn't exist
  - `DELETE /track/:id` - delete track
    - Server returns `status code` **204** if the record is found and deleted
    - Server returns `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server returns `status code` **404** and corresponding message if record with `id === trackId` doesn't exist

* `Artists` (`/artist` route)

  - `GET /artist` - get all artists
    - Server returns `status code` **200** and array of artists records:
    ```typescript
    interface Artist {
      id: string;
      name: string;
      grammy: boolean;
    }
    ```
  - `GET /artist/:id` - get single artist by id
    - Server returns `status code` **200** and and record with `id === artistId` if it exists:
    ```typescript
    interface Artist {
      id: string;
      name: string;
      grammy: boolean;
    }
    ```
    - Server returns `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server returns `status code` **404** and corresponding message if record with `id === artistId` doesn't exist
  - `POST /artist` - create new artist
    - Server returns `status code` **201** and newly created record if request is valid:
    ```typescript
    interface Artist {
      id: string;
      name: string;
      grammy: boolean;
    }
    ```
    - Server returns `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - `PUT /artist/:id` - update artist info
    - Server returns` status code` **200** and updated record if request is valid:
    ```typescript
    interface Artist {
      id: string;
      name: string;
      grammy: boolean;
    }
    ```
    - Server returns` status code` **400** and corresponding message if `artist` is invalid (not `uuid`)
    - Server returns` status code` **404** and corresponding message if record with `id === artistId` doesn't exist
  - `DELETE /artist/:id` - delete artist
    - Server returns `status code` **204** if the record is found and deleted
    - Server returns `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server returns `status code` **404** and corresponding message if record with `id === artistId` doesn't exist

* `Albums` (`/album` route)

  - `GET /album` - get all albums
    - Server returns `status code` **200** and array of albums records:
    ```typescript
    interface Album {
      id: string;
      name: string;
      year: number;
      artistId: string | null;
    }
    ```
  - `GET /album/:id` - get single album by id
    - Server returns `status code` **200** and and record with `id === albumId` if it exists:
    ```typescript
    interface Album {
      id: string;
      name: string;
      year: number;
      artistId: string | null;
    }
    ```
    - Server returns `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server returns `status code` **404** and corresponding message if record with `id === albumId` doesn't exist
  - `POST /album` - create new album
    - Server returns `status code` **201** and newly created record if request is valid:
    ```typescript
    interface Album {
      id: string;
      name: string;
      year: number;
      artistId: string | null;
    }
    ```
    - Server returns `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - `PUT /album/:id` - update album info
    - Server returns` status code` **200** and updated record if request is valid:
    ```typescript
    interface Album {
      id: string;
      name: string;
      year: number;
      artistId: string | null;
    }
    ```
    - Server returns` status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server returns` status code` **404** and corresponding message if record with `id === albumId` doesn't exist
  - `DELETE /album/:id` - delete album
    - Server returns `status code` **204** if the record is found and deleted
    - Server returns `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server returns `status code` **404** and corresponding message if record with `id === albumId` doesn't exist

* `Favorites`
  - `GET /favs` - get all favorites
    - Server returns `status code` **200** and all favorite records (**not their ids**), split by entity type:
    ```typescript
    interface FavoritesResponse {
      artists: Artist[];
      albums: Album[];
      tracks: Track[];
    }
    ```
  - `POST /favs/track/:id` - add track to the favorites
    - Server returns `status code` **201** and corresponding message if track with `id === trackId` exists
    - Server returns `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server returns `status code` **422** and corresponding message if track with `id === trackId` doesn't exist
  - `DELETE /favs/track/:id` - delete track from favorites
    - Server returns `status code` **204** if the track was in favorites and now it's deleted id is found and deleted
    - Server returns `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server returns `status code` **404** and corresponding message if corresponding track is not favorite
  - `POST /favs/album/:id` - add album to the favorites
    - Server returns `status code` **201** and corresponding message if album with `id === albumId` exists
    - Server returns `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server returns `status code` **422** and corresponding message if album with `id === albumId` doesn't exist
  - `DELETE /favs/album/:id` - delete album from favorites
    - Server returns `status code` **204** if the album was in favorites and now it's deleted id is found and deleted
    - Server returns `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server returns `status code` **404** and corresponding message if corresponding album is not favorite
  - `POST /favs/artist/:id` - add artist to the favorites
    - Server returns `status code` **201** and corresponding message if artist with `id === artistId` exists
    - Server returns `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server returns `status code` **422** and corresponding message if artist with `id === artistId` doesn't exist
  - `DELETE /favs/artist/:id` - delete artist from favorites
    - Server returns `status code` **204** if the artist was in favorites and now it's deleted id is found and deleted
    - Server returns `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server returns `status code` **404** and corresponding message if corresponding artist is not favorite
