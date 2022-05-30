# dtts development journal

### Tech-stack and project setup

I decided to use Node.js, Express and TypeScript to build this api. The main reasons for this decision are:
1. Node.js as it's free, open-sourced and cross-platform JavaScript run-time environment which makes it easy for running this project on any operating systems.
2. Express is a "Fast, unopinionated, minimalist web framework for [Node.js](https://nodejs.org/en/)" which will help me to create a robust API quickly.
3. I had worked with Express before and quite comfortable with the structure of an Express project.
4. I have not had exprience with TypeScript before. However, I have head so many good thing about TypeScript so I decided to give it a try. It may take a bit of time to setup and get familiar with the syntax but I believe everything will be paid off later.

Today's goals are:
* Setup the project boilerplate using `express-generator`
* Setup TypeScript correctly.
* Have everything ready for development.

### Adding Jest for unit testing
Converting Express boilerplate to TypeScript took longer than I expected but It's all done now. I think it's good to getting into a habit of test driven development (TDD). Therefore, I need to setup and write test cases first. Upon my research, `Jest` sounds like a good choice as it has minimum preconfiguration and focuses in simplicity. So, let's set the goal for today:
* Setup `Jest` and `supertest` for TypeScript API unit testing.
* Write some test cases.