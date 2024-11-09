# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/ru-ab/nodejs2024Q3-service.git
```

## Installing NPM modules

```
npm install
```

## Environment variables

You can change the default port on which the app runs in the .env file located at the root of the project. For example:

```bash
PORT=4000
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

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

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Application usage

The app supports follow REST API endpoints without any authentication:

- `Users` (`/user` route)

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

- `Tracks` (`/track` route)

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

- `Artists` (`/artist` route)

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
  - `DELETE /artist/:id` - delete album
    - Server returns `status code` **204** if the record is found and deleted
    - Server returns `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server returns `status code` **404** and corresponding message if record with `id === artistId` doesn't exist

- `Albums` (`/album` route)

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

- `Favorites`
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
