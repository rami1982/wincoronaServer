# WinCoronaServer
install dependencies: `yarn`

run: `yarn dev`

runs on http://localhost:3001

## Auth
Headears: Content-Type: application/json

Once token acquired set Authorization Bearer Token
* ### post /auth/signup 
    request body: {email:email, password:password}
    
    returns {token: token}
* ### post /auth/signin
    request body: {email:email, password:password}

    returns {token: token}
## Questionnaire

* ### get /questionnaire/one_time
    returns one time questionnaire

* ### get /questionnaire/daily
    returns daily questionnaire

## Answers
send questionnaire answers to:
* ### post /answers/one_time OR /answers/daily
    with body: 
    
    [{question1: question,

    answer1: answer},

    {question2: question,

    answer2: answer}...]

    
