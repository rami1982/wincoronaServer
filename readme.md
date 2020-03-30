# WinCoronaServer
install dependencies: `yarn`
run: `yarn dev`
runs on http://localhost:3001

## Auth
headears: Content-Type: application/json
axios need options: withCredentials: true
* ### post /auth/signup 
    body: {email:email, password:password}
* ### post /auth/signin
    body: {email:email, password:password}
* ### post /auth/signout
## Forms
* ### post /forms/one_time_questionnaire
    saves request body to user.one_time_questionnaire
* ### get /forms/one_time_questionnaire
    returns user.one_time_questionnaire
* ### post /forms/daily_questionnaire
    adds request body to user.daily_questionnaire array
* ### get /forms/daily_questionnaire
    returns user.daily_questionnaire array
