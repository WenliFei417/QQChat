# QQChat (Java Socket Chat Project)

This project is a simple instant messaging system built on **Java Socket**, imitating the basic functions of QQ. It consists of two parts: **Client (QQClient)** and **Server (QQServer)**.  
It uses multithreading and I/O streams to implement user login, private chat, group chat, message sending/receiving, and file transfer.

---

## 🚀 Features

- **User login / logout**
  - The client enters an account and password for server validation
  - The server verifies the credentials and allows the user to log in

- **Private chat**
  - One user can send messages to another user
  - Messages are forwarded by the server

- **Group chat**
  - Broadcast messages to all online users

- **View online users**
  - The client can request the current list of online users

- **File transfer**
  - Supports file transfer between clients via the server relay

---

## 📂 Project Structure

```
QQChat/
│── QQClient/                # Client module
│   ├── src/com/qqclient/
│   │   ├── service/         # Client business logic (connection, messaging, file transfer, etc.)
│   │   ├── utils/           # Utility classes
│   │   ├── view/            # Client UI interaction (command-line interface)
│   │   └── qqcommon/        # Shared classes (Message, User)
│
│── QQServer/                # Server module
│   ├── src/com/qqserver/
│   │   ├── service/         # Server business logic (thread management, message forwarding)
│   │   └── qqcommon/        # Shared classes (used by clients and server)
│
│── out/                     # Compiled class files (can be ignored)
│── .gitignore
│── README.md
```

---

## ⚙️ Tech Stack

- Java SE
- Socket / ServerSocket (network communication)
- Multithreading (supports concurrent users)
- Serialization (object transfer)

---

## 🖥️ How to Run

### 1. Start the server
Go to the `QQServer` module and run the main server class (e.g., `QQServerMain` or the class containing `main()`):

```bash
cd QQServer/src
javac com/qqserver/**/*.java
java com.qqserver.service.QQServer
```

The server will start, listen on the configured port, and wait for client connections.

### 2. Start the client
Go to the `QQClient` module and run the main client class (e.g., `QQView`):

```bash
cd QQClient/src
javac com/qqclient/**/*.java
java com.qqclient.view.QQView
```

Then enter your account and password in the command line to access the client UI.

### 3. Demo commands
- Enter `1` → Login and go to the secondary menu
- Enter `2` → Request the list of online users
- Enter `3` → Private chat (specify user ID)
- Enter `4` → Send group message
- Enter `5` → Send file
- Enter `9` → Logout

---

## 📌 Notes

- Start the **QQServer** before starting the **QQClient**.
- The `out/` folder contains IDE-generated compiled files and can be ignored.
- User accounts and passwords are defined on the server (e.g., hard-coded in a `HashMap`) and should be updated as needed.

---

## 🏗️ Future Improvements

- Use a database to store user information (instead of hard-coded credentials)
- Replace the command-line UI with a graphical interface
- Support more message types (images, voice, etc.)
- Enhance error handling and logging

---

## 📜 License

MIT License © 2025 Wenli
