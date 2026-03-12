# Site Analysis

This is the api for a web app that allows users to analyze their plot of land to ensure that they do not trespass into government land. It uses user input land coordinates to know land loction and compare with special government land from google map to carry out this task.

## Tech Stack

- **Framework**: Nestjs
- **Authentication**: JWT
- **Database**: Mongodb/SQLlite
- **ORM**: Prisma

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Mikkybeardless/site-analysis.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environmental variables

creat a `.env` file or `.env.example` file in the project root directory

```plaintext
PORT = 8000
CORS_ORIGINS=http://localhost:3000,http://localhost:8000
APP_PREFIX=/api/v1
```

### 4. Start the Developmet Server

```bash
npm run start:dev
```

## Development Focus

- **Auth Service**: Implement token base authentication with nextauth having multiple signin options

```

```
