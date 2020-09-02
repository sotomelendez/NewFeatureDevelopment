# NewFeatureDevelopment

1. Run the project

The project is divided in 2 parts, frontend (in Angular) and backend (in Node.js).

To run the frontend use the commands:
npm install
ng serve

To run the backend use the commands:
npm install
npm start

Then you can access through http://localhost:4200/

2. Unit tests

The backend has some unit tests associated to the querying of files. 
However, there are missing tests for querying by file type, for example.
But Cucumber and Gherkin syntax provide great tools to test this.

3. Demo

In the video, we can see how each load show 20 files, as if it was paged, but with infinite scroll. 
Also we can see that the filter by image type works properly, and the message shown when no there are no files to show that match the criteria.