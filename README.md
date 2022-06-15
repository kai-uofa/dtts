# dtts
A simple DateTime API using TypeScript

## About The Project

A simple date time API building with Node.js & Express. The API receives GET requests and response with the number of days/weekdays/complete weeks between two give date.

### Built With

* [Node.js](https://nodejs.dev/)
* [Express](https://expressjs.com/)
* [Jest](https://jestjs.io/)
* [TypeScript](https://typescriptlang.org/)

### Prerequisites

This project requires the `Node.js` v16.14.2 and `npm` v8.11.0 to be installed.
  ```sh
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
  nvm install 16.14.2
  nvm use 16.14.2
  ```
To check if the correct `Node.js` and `npm` versions are installed:
  ```sh
  node --version    # this should print v16.14.2 to the terminal console
  npm --version     # this should print 8.11.0 to the terminal console
  ```
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/kai-uofa/dtts.git
   ```
2. Go to `dtts` folder and install NPM packages
   ```sh
   cd dtts
   npm install
   ```
3. Create an environment file `dtts/.env`
   ```sh
   touch .env
   ```
4. Open the `.env` file and enter your port number
   ```sh
   PORT='ENTER YOUR PORT';  # replace `ENTER YOUR PORT` with your port number 
   ```
5. To start this API, run the following command:
   ```sh
   npm start
   ```
<!-- USAGE EXAMPLES -->
## Usage
This API provide its service through the following endpoints
* `.../` which is the 'index' endpoints that return a brief introduce how to use this API in JSON format.
* `.../days` which returns the number of days between 2 given dates.
* `.../wdays` which returns the number of weekdays between 2 given dates.
    * Weekdays are days from Monday to Friday.
    * This can be calculated by counting the complete week between 2 given dates then subtract weekends.
    * If any day are outside of these complete weeks, check if they are weekdays or weekends.
* `.../weeks` which returns the number of complete weeks between 2 given dates.
    * Complete weeks only count for weeks that have all 7 days (Sunday to Saturday).
    * This can be calculated by counting the number of weeks between the first Sunday after the first given date and the last Saturday before the second given date.

Each of the above endpoint accepts three parameters listed below. All others will be ignored.
* `startDate`:
    * Mandatory parameter
    * Complete date plus hours, minutes and seconds format: `YYYY-MM-DDThh:mm:ssTZD` (eg 1997-07-16T19:20:30+01:00)
* `endDate`: 
    * Optional parameter
    * Complete date plus hours, minutes and seconds format: `YYYY-MM-DDThh:mm:ssTZD` (eg 1997-07-16T19:20:30+01:00)
    * If it is missing, API will calculate between `startDate` and current time
* `convertUnit`: 
    * Optional parameter
    * String format and only accepts: `seconds` or `minutes` or `hours` or `years`
    * Incorrect values will be ignored.
    * When specified, API will return an additional value which is the conversion of the response into specified unit.
* Additional requirements:
    * `startDate` and `endDate` allows the specification of timezone.
    * `startDate` and `endDate` will be converted to UTC before any calculation.

Open a web browser and connect to `localhost:3000` (assuming the API is listening on port 3000) to see the introduction and brief usage.
   ```json
        title: "Welcome to DTTS api",
        description: "A simple DateTime API using TypeScript",
        days_endpoint: "`.../days` returns the number of days between 2 given dates",
        weekdays_endpoint: "`.../weekdays` which returns the number of weekdays between 2 given dates",
        weeks_endpoint: "`.../weeks` which returns the number of complete weeks between 2 given dates",
        accepted_params: {
            startDate: "Mandatory, in standard date-time format (ISO 8601)",
            endDate: "Optional, in standard date-time format (ISO 8601)",
            convertUnit: "Optional, accept only 'seconds', 'minutes', 'hours', or 'years'"
        }
   ```
Example Requests:
   ```sh
   http://localhost:3000/
   http://localhost:3000/days?startDate=2022-06-04T00:00:00%2B09:30&endDate=2022-06-05T10:00:00%2B09:30&convertUnit=years
   http://localhost:3000/weekdays?startDate=2022-06-04T00:00:00%2B09:30&endDate=2022-06-05T10:00:00%2B09:30&convertUnit=minutes
   http://localhost:3000/weeks?startDate=2022-06-04T00:00:00%2B09:30&endDate=2022-06-05T10:00:00%2B09:30&convertUnit=hours
   ```
<!-- USAGE EXAMPLES -->
## Project Structure

This project follow the standard structure of an Express project with some modifications. The whole structure can be visuallised in the folder tree below:
   ```sh
    ├── LICENSE
    ├── README.md
    ├── docs                                        # Contains documents except for this README
    │   └── journal.md
    ├── package-lock.json                           
    ├── package.json
    ├── src                                         # Contains the whole source code of the api
    │   ├── app.ts
    │   ├── bin
    │   │   └── www.ts
    │   ├── middleware                              # Contains all the middleware of the api
    │   │   └── errorhandler.ts
    │   ├── routes                                  # Contains all the routes of the api
    │   │   ├── days.ts
    │   │   ├── index.ts
    │   │   ├── weekdays.ts
    │   │   └── weeks.ts
    │   └── services                                # Contains all the business logic of the api
    │       ├── dateTimeCalculator.ts
    │       ├── days.ts
    │       ├── index.ts
    │       ├── inputParameterValidation.ts
    │       ├── weekdays.ts
    │       └── weeks.ts
    ├── tests                                       # Contains all the unit test for the api
    │   ├── days.specs.ts
    │   ├── errorhandler.specs.ts
    │   ├── index.specs.ts
    │   ├── weekdays.specs.ts
    │   └── weeks.specs.ts
    └── tsconfig.json
   ```
* Each file in `routes` folder represents an endpoint of this api.
* Each endpoint then have a file with the same name in `services` folder which control the logic for that endpoint
* Apart from the files that are mentioned above, there are another two files in `services` folder:
    * `dateTimeCalculator.ts` - handle all the date/time calculation of this api
    * `inputParameterValidation.ts` - handle all the parameter validation of this api
* `tests` folder contains all the test cases written for this api and will not be built when running `npm start` or `npm run build`. To perform testing using these test cases, run `npm run test`. 
<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact

Kien Nguyen - [Github](https://github.com/kai-uofa/dtts.git) | [LinkedIn](https://www.linkedin.com/in/kiennt2/)

Project Link: [https://github.com/kai-uofa/dtts.git](https://github.com/kai-uofa/dtts.git)
