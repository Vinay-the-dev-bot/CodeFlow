# CodeFlow

## Introduction
CodeFlow is an advanced collaborative code editor designed to support real-time code writing, sharing, and previewing among users. 
It serves as a platform for users to collaboratively work on coding projects, share their work with a community, and engage in real-time debugging and optimization challenges. 
With features tailored to skilled coders, CodeFlow aims to foster creativity, facilitate peer learning, and enhance coding skills.

## Project Type
 Fullstack

## Deployed App
Frontend: https://deployed-site.whatever
Backend: https://deployed-site.whatever
Database: https://deployed-site.whatever

## Directory Structure
CodeFlow/
<br>
├─ Server/
<br>
├─ CodeFlow/
<br>
│  ├─ ...


## Features
List out the key features of your application.

- Real-time code collaboration
- Live preview of code changes
- Version control integration
- Commenting and code review
- Code challenges and competitions
- Gamification with badges, points


## design decisions or assumptions
List your design desissions & assumptions

## Installation & Getting started
Detailed instructions on how to install, configure, and get the project running. For BE/FS projects, guide the reviewer how to check mongodb schema etc.

```bash
cd CodeFlow
npm i
npm run dev
```

## Usage
Provide instructions and examples on how to use your project.

```bash
# Example
```

Include screenshots as necessary.

## Credentials
Provide user credentials for autheticated pages

## APIs Used
If your application relies on external APIs, document them and include any necessary links or references.

## API Endpoints
In case of Backend Applications provide a list of your API endpoints, methods, brief descriptions, and examples of request/response.
<br/>
post /users/register - register User
<br/>
post /users/login - login user
<br/>
get /users - retrive all users
<br/>
post /questions/add - add new question
<br/>
get/questions/:questionId - retrive perticular question using id
<br/>
patch/questions/:questionId - update question
<br/>
delete/questions/:questionId - delete question
<br/>



## Technology Stack
- Frontend: React, Chakra UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Deployment: render and vercel for frontend and backend
