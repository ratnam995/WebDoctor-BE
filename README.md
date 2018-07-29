# WebDoctor-BE
An Node JS application, which serves as Backend to WebDoctor web app.


Steps in solving the problem-:

1) Created Git Repository for BackEnd.
2) Understood the project requirements and details. 
3) Created DB schemas.
4) Decided tags for various user types- Admin (webDoc.admin), Doctor (webDoc.doctor) and Patient (webDoc.patient).
5) Started with intial BackEnd Setup. Added needful packages.
6) Added DB connection.
7) Created users/ endpoint to add and fetch users.
8) Created roles/ endpoint to fetch and add roles.
9) Created session-store, with 2 functions-> createSession and fetchSession.
10) Created login/ route.
11) Created session/ endpoint to check, set and delete sessions.
12) Added middleware, auth-middleware.js to check authorization of requests.
13) Implemented basic error handling and added the middleware function to various requests.


Further steps that I would have followed, if there was more time-:
1) Code optimization.
2) Reducing code redundancy.
3) Implementing chat feature.
4) Improvising session-store.
