const indexObj: object = {
    title: "Welcome to DTTS api",
    description: "A simple DateTime API using TypeScript",
    days_endpoint: "`.../days` returns the number of days between 2 given dates",
    weekdays_endpoint: "`.../weekdays` which returns the number of weekdays between 2 given dates",
    weeks_endpoint: "`.../weeks` which returns the number of complete weeks between 2 given dates",
    accepted_params: {
        startDate: "Madatory, in standard datetime format (ISO 8601)",
        endDate: "Optional, in standard datetime format (ISO 8601)",
        convertUnit: "Optional, accept only 'seconds', 'minutes', 'hours', or 'years'"
    }
}

export default { indexObj };