# Project Name: Online Code Compiler

## Introduction

This project is an Online Code Compiler that allows users to write and execute code in multiple programming languages, including JavaScript, Python, and C. The frontend is built with React, using Material-UI for styling, and is located within the server directory. The backend is built with Express.js, which executes the code in isolated Docker containers for security. This setup ensures a safe, scalable, and user-friendly environment for code compilation and execution.

## Getting Started

These instructions will guide you through the process of setting up and running the Online Code Compiler on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (which comes with npm)
- [Docker](https://www.docker.com/get-started)
- Git (optional, for cloning the repository)

### Installation

1. **Clone the Repository** (if using Git):

   ```bash
   git clone [URL to the repository]
   cd [repository name]
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

### Building the Client Project

```bash
npm run build:client
```

### Running the Application

- To run the server, which also serves the built client application:

  ```bash
  npm start
  ```

- For development, you can run the server with live reloading using Nodemon:

  ```bash
  npm run start:dev
  ```

- The client application will be served by the server at [http://localhost:3000](http://localhost:3000) by default.

## Usage

After starting the server, navigate to [http://localhost:3000](http://localhost:3000) in your web browser to use the Online Code Compiler. Select the programming language, write your code in the editor, and click the "Compile" button to execute the code. The output or any compilation errors will be displayed in the output section.
