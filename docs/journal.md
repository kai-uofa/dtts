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
        * Incorrect values will be ignored.
        * When specified, API will return an additional value which is the conversion of the response into specified unit.
    * Additional requirements:
        * `startDate` and `endDate` allows the specification of timezone.
        * `startDate` and `endDate` will be converted to UTC before any calculation.
 
 Remaining questions:
 * Response for edge cases (missing params, startDate bigger than endDate, etc.)?
 * Response for conversion format (eg: 0 year and 3 seconds; 1 years and 5 days)?

### Almost finish the test cases for `days` endpoint
I was very busy in the last 5 days due to moving house and didn't have time to continue on this until now. The progress is a bit slower than expected but it help me to come back with a refreshed mind to look at my code in a different way.
* I removed all the `json` based test cases and hard coded them as an object inside my script. Looking back, it was quite stupid trying to use json for this.
* As the based for both testing & development of this API, I decided to tackle on the `days` endpoint first and try to organise it in a way that it can be easily expand to support `wdays` and `weeks` endpoints.
* I think JavaScript Date object already enough to solve most of the cases for this `days` endpoint. The only remaining problem for me is converting `days` to years.
* I have decided to response just a `bad request` error for missing params or `startDate` bigger than `endDate`.
* If a correct `convertUnit` is passed in, the API will response with an addition object that convert main response to the specified unit.

### Having an extra response object based on `convertUnit` is a good thing
At the beginning, I only think that it's better for testing to always response number of days and if `convertUnit` is passed in as a parameter, the converted number will be response too. This way, I can always inspect and discover potential bugs when I look at the response. Now, it turn out having this response structure is also help to expand the API in case we have more requirements or need to handle more complicated edge cases like `startDate` and `endDate` are the same day.

### Rounding up when converting from Linux time when converting to days
While calculating the number of days between two date time input, I decided to round to 1 day as it will make sense in real world than an exact value like 1.3 days. I have also thought about converting the remainder to a smaller unit but it will complicated the problem and small benefits. For example, if this API is used to calculate the time of a delivery package, telling the customer that it takes 5 days may even better than 4 days and 15 hours.