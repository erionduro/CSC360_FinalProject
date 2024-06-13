# CSC360_FinalProject
Final project for CSC360, Professor O'Donnell

## Setup Instructions

### Frontend

1. Open a terminal and navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```

2. Install the necessary dependencies:
    ```sh
    npm install --force
    ```

3. Start the frontend development server:
    ```sh
    npm start
    ```

### Backend

1. Open a second terminal and navigate to the `backend` directory:
    ```sh
    cd backend
    ```

2. Run the backend server:
    ```sh
    dotnet run
    ```
## Video Presentation
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/g7atMxjxeNk/0.jpg)](https://www.youtube.com/watch?v=g7atMxjxeNk)

## Reflection
Building a full-stack application of my own design from start to (almost) finish was a huge stepping stone for me. This project helped me combine a wealth of knowledge into a single artifact, allowing me to brush up on my coding skills and exercise my creativity. I had previously been somewhat intimidated of committing to a project like this, but after getting my first one out of the way, I'm excited to chase my curiosity and build more impressive applications in the future. I think my favorite part of this project was working on the backend, especially integrating a backend API with Swagger and experimenting with my first NoSQL Database.

While I didn't hit all of the project requirements, I'm proud of myself for the progress I've made this semester, and I'm looking forward to learning more about web-apps and different ways of building them. My project meets the basic requirements such as being composed of a react frontend and dotnet backend, includes GETs, POSTs, and PUTs, and stores data persistently in a database. I think I did alright with adhering to the Entity Framework, although there are areas in my code I think could improved a lot in this regard - I don't think I made the best choices in designing my DB Contexts and models, which led to some pretty hacky code later on, where I did rely on additional API calls over manipulating my DBcontext. Authentication and Authorization came as a pretty big challenge to me. I was unable to complete most of the requirements for this section, without (reliably functional) basic authentication and unfinished workflows for logging in/Registering users - I think the more I worked at this part, the more I broke the rest of my project. As a Cybersecurity student, I'm definitely interested in IAM, and I'm determined to learn more about how to put it into practice.

Unfortunately, I was pretty strapped for time this semester, as my senior capstone project ate the majority of my bandwidth. If I could have dedicated more time, I would have liked to (properly) implement a form of strong authentication, and define roles and permissions for different groups of users. I would have also liked to iron out some of the persistent bugs I ran into early on, and refactor my code to be a bit cleaner and more efficient. I chose this as a way to dip my toes into web-application development while focusing on my interests in Cybersecurity. Overall, I'm glad I finally got started with my first web app - I'm sure the rest to come will only become easier!
