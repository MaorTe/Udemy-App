# Udemy-App

### MERN stack

**MongoDB, Express.js, React, Node.js**

<p>This is a project that simulates Udemy.
Course website where you can add a course, and for each course you can add videos, each video has the option to post comments as well.
In the project I have registration, login and Authentication, in addition there is a check if the user is an admin user or a regular user.
The difference between them is that an admin user can add new videos on the site while a regular user can only watch the videos.</p>

<p>For **admin permissions** login with</p>
<p>**Email:** admin@gmail.com
**Password:** 1234567</p>

### Authentication
When a user signs up **BcryptJs** hashes the password and **JsonWebToken** provides a token that can be exchanged for authenticated calls between the client and server-side.
Created an Authorization middleware using **JWT** that checks the header in each call for a valid token before executing any request and sending a status back.

### Avatar
Used **Multer** as part of a server-side middleware that uploads images and uses them as an avatar picture on a user's profile.
Also **Sharp** which is converting large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images.
