## Car Rental App (Front end)

This repository provides a frontend solution for the Car Rental App Challenge. It includes a user interface for checking car availability, managing rentals, viewing reports, and basic service maintenance.

## Solution Architecture

The app is built with **Angular 19**, using **NgRx** for state management, and styled with **Bootstrap** and **FontAwesome**. It follows a **feature-oriented architecture**, where each domain (or feature) encapsulates its own components, state management, services, and models.

- `shared`: Shared module and services used across the app (e.g., error messages, car types/models).
- `car-services`: Manages service scheduling and dashboard features.
- `home`: Displays car availability.
- `rentals`: Handles creating, editing, canceling, and listing car rentals.
- `reporting`: Displays analytics and reporting, including the most-used car type.

## How to Run Locally

   Using yarn, run yarn install and yarn start. It should open the app in http://localhost:9292
        
    
## Routing

   All main routes are lazy loading the respective feature modules. Check src/app/app.routing.module.ts file for the complete list of routes

## State Management

   I have used NgRx for state management. Each feature module has their own piece of state, modeled by feature reducers. 


## Authentication


    No authentication or authorization is implemented, as it was not required for this challenge.

    For a future iteration, the following features are recommended:
    - User login with role-based access
    - Auth guards to protect management and reporting routes
    - OAuth2 integration with an Identity Provider
    - Role-based UI rendering (e.g., management-only views for services and reporting)