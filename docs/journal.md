# dtts development journal

### Tech-stack and project setup

I decided to use Node.js, Express and TypeScript to build this api. The main reasons for this decision are:
1. Node.js as it's free, open-sourced and cross-platform JavaScript run-time environment which makes it easy for running this project on any operating systems.
2. Express is a "Fast, unopinionated, minimalist web framework for [Node.js](https://nodejs.org/en/)" which will help me to create a robust API quickly.
3. I had worked with Express before and quite comfortable with the structure of an Express project.
4. I have not had experience with TypeScript before. However, I have head so many good thing about TypeScript so I decided to give it a try. It may take a bit of time to setup and get familiar with the syntax but I believe everything will be paid off later.

Today's goals are:
* Setup the project boilerplate using `express-generator`
* Setup TypeScript correctly.
* Have everything ready for development.

### Adding Jest for unit testing
Converting Express boilerplate to TypeScript took longer than I expected but It's all done now. I think it's good to getting into a habit of test driven development (TDD). Therefore, I need to setup and write test cases first. Upon my research, `Jest` sounds like a good choice as it has minimum pre-configuration and focuses in simplicity. So, let's set the goal for today:
* Setup `Jest` and `supertest` for TypeScript API unit testing.
* Write some test cases.

### Solution outline
While trying to write some test cases, I realise that I didn't have a clear view about how this API should look like. As a result, I spent roughly an hour yesterday to think about how the solution should be based on the requirements that I received. With a few assumptions, the API should consist of:
* Four GET routers (endpoints)
    * `.../` which is the 'index' endpoints that return a brief introduce how to use this API in JSON format.
    * `.../days` which returns the number of days between 2 given dates.
    * `.../wdays` which returns the number of weekdays between 2 given dates.
        * Weekdays are days from Monday to Friday.
        * This can be calculated by counting the complete week between 2 given dates then subtract weekends.
        * If any day are outside of these complete weeks, check if they are weekdays or weekends.
    * `.../weeks` which returns the number of complete weeks between 2 given dates.
        * Complete weeks only count for weeks that have all 7 days (Sunday to Saturday).
        * This can be calculated by counting the number of weeks between the first Sunday after the first given date and the last Saturday before the second given date.
* Each route accepts 3 parameters
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
        * Incorrect value will be ignored.
        * When specified, API will return an additional value which is the conversion of the response into specified unit.
    * Additional requirements:
        * `startDate` and `endDate` allows the specification of timezone.
        * `startDate` and `endDate` will be converted to UTC before any calculation.