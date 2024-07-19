# Thryft Ship Project

Works in Mobile and Desktop and in Device based dark or light mode

[Deployed Website](https://thryft-ship.vercel.app/)


This project aims at recreating a figma model of the Thryft Ship ordering page. Creating an ordering page that takes in the username, products intended to purchase, its quantity, and shipping style, and the address/email of the user. There is also a modal which confirms your order with an images of the products intended to order with the total cost of the products. It then takes you a order sumbitted page that provides a reciept which displays which products arrive at which time. Finally after it takes you to a final page to thank you for purchasing through this app.

## Table of Contents
- [Introductions](#introduction)
- [Installation](#installation)
- [Setup](#setup)
- [Running the Project](#running-the-project)
- [Technologies Used](#technologies-used)
- [Design Choice](#design-choices)
- [Limitations](#limitations)

## Introduction

Who I Am:
My name is Sriram Sendhil, I am a rising senior at UTD studying Computer Science. Since my transition from a pre-medicine neuroscience to Comp Sci I've worked hard on expanding my knowledge in all fields of CS. I worked as a research participant on a Computer Vision based research project and as a site developer for the San Antonio Hackathon. Since then I've bloomed to become a research lead (creating my own research project for students to work on) and as a project lead for a local non-profit regarding full stack web development. 


Reach me at:
[LinkedIn](https://www.linkedin.com/in/sriramsendhil/)
[Email](sriramsendhil@gmail.com)
[Instagram](https://www.instagram.com/slapsfirst/?hl=en)
## Installation

1. **Clone the repository:**
    ```bash
    git clone [https://github.com/scs03/ThryftShip.git]
    cd ThryftShip
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

## Running the Project

1. **Start the development server:**
    ```bash
    npm run dev
    ```

2. **Open your browser and navigate to:**
    ```
    http://localhost:3000
    ```

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

**Why DaisyUI?**
- enhances Tailwind CSS
- strong collection of pre-styled, customizable components
- speeds up development process
- allows for design consistency
- screen size responsive
- allows easy theme customization allowing for easy transitions to updated color themes


## Design Choices

General:
- work with both mobile and desktop views
- reduced images in mobile to declutter screen and focus on important information
- compatible with dark mode

Ordering Page:
- Followed the Figma to perfectly recreate the page along with the Thryft Ship logo as an SVG
- Prvided plenty of white space in order to draw focus towards the center of the page
- deviated from Figma to fit in product based requirements
    - Moved products to its own line in order to focus on it
    - Made it a drop down to list viable products to ensure ease of acess
    - Provided individual quantity control choice with a pre-set default quantity of 1
    - Created the same for the shipment style with a default set as "Next day"

Modal:
- Followed the Figma to perfectly recreate the page along with the background covering to focus on to the modal
- Created two buttons with the "Cancel & Edit" hollow to drive forward the idea of the user continuing on with the order
- Deviated from Figma to improve user experience:
    - included images of the products with their name and quantity mentioned --> In order to recieve user confirmation easily
    - includes the total cost

Order Placed Page:
- Completely unique design made
- Primarily filled with white space to focus attention on the information
- displays information in easy way, splitting the products purchased by expected delivery dates
- Includes images with the name and quantity listed along with the purchase cost of each individual product
- Displays the total cost at the bottom
- Reconfirms the shipping address and email

Thank You For Purchasing Page:
- Follows the Figma disgn completely along with SVG files to follow

## Limitations
- Component Logic error with:
    - multiple products selected but all the same product
    - unable to limit quantity added at cap of total product quantity

**With more time/resources:**
- include MagicUIDesign, FramerMotion, and GSAP to provide animations to help get the attention of users
- create a database to hold user information
- have more components to split up existing components further more and increase readability
- provide more accesibility to mobile devices with unique additions
