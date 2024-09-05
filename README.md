# Chat Application

## Project Description

This Chat Application is a highly interactive, scalable, and low-latency messaging platform designed to facilitate real-time communication. It features robust message storage, group chat capabilities, multimedia support, intuitive search, and allows users to send messages simultaneously to multiple users or groups. The system is built for efficiency, ensuring a seamless user experience, even during heavy usage.

## Features

1. Real-time Messaging: Low-latency messaging with immediate delivery and receipt confirmation.
2. Efficient Message Storage: Secure and fast retrieval of chat history for both individual and group chats.
3. Group Chat Support: Users can create and participate in multiple group chats for collaborative discussions.
4. Multimedia Support: Send and receive images, videos, and other files.
5. Search Functionality: Quickly search for specific messages or conversations across chats.
6. Simultaneous Messaging: Send messages to multiple users or groups at once for faster communication.


## Tech Stacks:

-   Tech stack: MERN + Socket.io + TailwindCSS + Daisy UI
-   Authentication && Authorization with JWT
-   Real-time messaging with Socket.io
-   Online user status (Socket.io and React Context)
-   Global state management with Zustand
-   Error handling both on the server and on the client

### Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/siddharthgupta5/Chat-Application.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file(optional)
  ```js
  PORT=...
  MONGO_DB_URI=...
  JWT_SECRET=...
  NODE_ENV=...
  ```
4. Start the development server:
   ```bash
   npm run server
   ```
5. Open another terminal.Navigate into the project directory:
   ```bash
   cd frontend
   ```

6. Start the frontend server:
   ```bash
   npm run dev
   ```
   
   



### Start the app

```shell
npm start
```
