# Todo Backend MongoDB

Node.js backend scaffold for a todo application that uses Express and MongoDB. The project ships with a basic REST API and MongoDB connection helper so you can plug in your database and start iterating on features quickly.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment template and provide your credentials:
   ```bash
   cp .env.example .env
   ```
3. Update `MONGODB_URI` in `.env` with your connection string.
4. Start the development server:
   ```bash
   npm run dev
   ```

The server listens on `http://localhost:4000` by default and exposes the following endpoints:

- `GET /health` – basic readiness probe.
- `GET /api/todos` – list todos.
- `POST /api/todos` – create a todo (`{ "title": "string" }`).
- `PATCH /api/todos/:id/toggle` – flip the completion state of a todo.
- `DELETE /api/todos/:id` – remove a todo.

## Project Structure

```
src/
  app.js            Express application setup
  server.js         Entry point and database bootstrap
  config/db.js      MongoDB connection helper
  controllers/      Route handlers for todos
  models/           Mongoose models
  routes/           Express routers
```

Feel free to extend the controllers and models as you wire the API to a frontend client.
