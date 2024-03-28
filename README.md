# Ticket System API

It was created for educational purpose only.

This is a basic API for a ticket system.

## Quick Links

- [Discord](https://discord.gg/GsNMF5x3YV)
- [GitHub](https://github.com/higordiasz)

## Routers

### Index

| Router   | Status | Type | Description            |
| -------- | ------ | ---- | ---------------------- |
| /version | ✔      | GET  | Get the version of API |

### User

| Router            | Status | Type | Description                |
| ----------------- | ------ | ---- | -------------------------- |
| /get/:userID      | ✖      | GET  | Get information of user    |
| /update/:userID   | ✖      | POST | Update information of user |
| /delete/:userID   | ✖      | POST | Delete one user account    |
| /disable/:userID  | ✖      | POST | Disable user account       |
| /enable/:userID   | ✖      | POST | Enable user account        |
| /password/:userID | ✖      | POST | Change password            |
| /create           | ✖      | POST | Create one user            |

### Ticket

| Router            | Status | Type | Description                  |
| ----------------- | ------ | ---- | ---------------------------- |
| /get/:ticketID    | ✖      | GET  | Get information of ticket    |
| /update/:ticketID | ✖      | POST | Update information of ticket |
| /close/:ticketID  | ✖      | POST | Close one ticket             |
| /create           | ✖      | POST | Create Ticket                |

### Login

| Router | Status | Type | Description             |
| ------ | ------ | ---- | ----------------------- |
| /      | ✖      | POST | Login                   |
| /check | ✖      | POST | Check if token is valid |

## Contributing

Pull requests are welcome! If you see something you'd like to add, please do. For drastic changes, please open an issue first.

## Supporting the project

You can support the maintainer of this project through the links below

- [Support via GitHub Sponsors](https://github.com/sponsors/higordiasz)

## .env

To use this API create a .env file.

`DBCONNECTION= String connection of MongoDB
URLSYSTEM= Webhook discord`

## License

Copyright 2024 Higor D Zuqueto

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this project except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
