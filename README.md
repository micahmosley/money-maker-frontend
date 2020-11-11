# MoneyMaker
> A full-stack online sportsbook where users can place bets on their favorite sporting events.

## Table of contents
* [Project Video](#project-video)
* [Inspiration](#inspiration)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Contact](#contact)

## Project Video
[View demo of MoneyMaker](https://www.youtube.com/watch?v=5-1OlIyXph4)

## Inspiration
Since the Supreme Court lifted the ban on sports betting in the United States in May of 2018, 19 states have legalized sports gambling either in person or online. Many more states will soon follow as America is seeing a sports betting “boom.” It’s no surprise to see the popularity of sports gambling when you consider how popular sports are in America with the fact that many people find gambling to be a thrill. With this in mind I decided to try my hand at building a fully functioning online sportsbook using React on the frontend and Ruby on Rails on the backend.

## Technologies
### Backend Development 
* Ruby - version 2.6.1 
* Rails - version 6.0.3
* Bcrypt - version 3.1.7
* JWT 

### Frontend Development 
* JavaScript (ES6)
* HTML5
* CSS3
* React.js - version 16.13.1
* React-DOM - version 16.13.1
* React-Router-DOM - version 5.2.0
* React-Bootstrap - version 1.3.0


## Setup 
For the Backend: 
1. Clone the [GitHub Repository](https://github.com/micahmosley/money-maker-backend) locally to your computer 
2. In the command line, navigate to the root directory of the repository, and enter the following: 
  $ bundle install 
3. Next, enter the following: 
  $ rake db:create 
4. Next, enter the following: 
  $ rails db:migrate
5. Finally, start the server on port 3001 by entering: 
  $ rails s -p 3001

For the Frontend: 
1. Clone the [GitHub repository](https://github.com/micahmosley/money-maker-frontend) locally to your computer 
2. In the command line, navigate to the root directory of the repository, and enter the following: 
  $ npm install 
3. Then, enter the following: 
  $ npm start


## Features
* Full stack web application utilizing React on the frontend and Rails on the backend
* Users can create an account through the application
* Users can deposit funds or withdraw funds from their account
* Users can select which sport/league they would like to view betting lines for 
* Users can select 1 or more betting lines to place bets on 
* Users can view their pending bets 
* Users can view their past bets that have been graded 
* Administrator can grade matchups

## Status
Project is completed with the option to expand functionality and DRY out code.


## Contact
Created by [Micah Mosley](https://www.linkedin.com/in/micah-mosley-512203128/).
Please contact me if you have any questions. 
