# Public Holiday Project

This is a frontend project using Vite, React, RxJS, and Tailwind CSS.

## Description

The Public Holiday project provides users with a convenient way to explore public holidays for a specific year. By leveraging the OpenHolidaysAPI, the project fetches holiday data and presents it in a user-friendly table format. Additionally, users have the ability to filter holidays based on their desired month, enabling them to easily narrow down the results to their preferences.

## Installation

Before running the project, make sure you have Node.js and npm (Node Package Manager) installed on your machine.

1. Clone this repository to your local machine:

```bash 
git clone https://github.com/ziejka/public-holidays.git
```


2. Navigate to the project directory:
```bash 
cd public-holiday-project
```


3. Install the project dependencies:
```bash 
npm install
```


## Available Scripts

In the project directory, you can run the following scripts:

- `npm run dev`: Runs the development server using Vite.
- `npm run build`: Builds the project for production.
- `npm run lint`: Runs ESLint to lint the source code files.
- `npm run preview`: Serves the production build of the project locally for previewing.
- `npm test`: Runs the tests using the `vitest` library.
- `npm run generate-api-service`: Generates the API service file using `swagger-typescript-api`.

## Usage

To run the project, follow these steps:

1. Start the development server:

```bash 
npm run dev
```


2. Open your web browser and visit `http://localhost:5173` to access the application.

3. Enter the desired year to view the public holidays in a table.

4. Use the month filter to filter the holidays by a specific month.

## API

The project fetches public holiday data from the [OpenHolidaysAPI](https://www.openholidaysapi.org/en/).
