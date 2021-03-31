# Codingly.io: Base Serverless Framework Template

https://codingly.io

## What's included

- Folder structure used consistently across our projects.
- [serverless-pseudo-parameters plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Allows you to take advantage of CloudFormation Pseudo Parameters.
- [serverless-bundle plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Bundler based on the serverless-webpack plugin - requires zero configuration and fully compatible with ES6/ES7 features.

## Getting started

```
sls create --name YOUR_PROJECT_NAME --template-url https://github.com/codingly-io/sls-base
cd YOUR_PROJECT_NAME
npm install
```

You are ready to go!

# auction-service

curl --location --request POST 'https://dev-rib0wbub.eu.auth0.com/oauth/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=cvFvvM6PcBLiZ76ju8VNm3M6TJtMKHQG' \
--data-urlencode 'username=mauro@gmail.com' \
--data-urlencode 'password=C0l1n4s.d3l,' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'scope=openid'
