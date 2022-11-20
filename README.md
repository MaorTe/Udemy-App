# Udemy-App

### MERN stack

**MongoDB, Express.js, React, Node.js**

<p>Backend is implemented using the MVC pattern.</p>

<p>This is a project that simulates Udemy.
Course website where you can add a course, and for each course you can add videos, each video has the option to post comments as well.
In the project I have registration, login and Authentication, in addition there is a check if the user is an admin user or a regular user.
The difference between them is that an admin user can add new videos on the site while a regular user can only watch the videos.</p>

For **admin permissions** login with

<p>Email: admin@gmail.com</p>
<p>Password: 1234567</p>

### Authentication

When a user signs up **BcryptJs** hashes the password and **JsonWebToken** provides a token that can
be exchanged for authenticated calls between the client and server-side. Created an Authorization
middleware using **JWT** that checks the header in each call for a valid token before executing any
request and sending a status back.

### Avatar

Used **Multer** as part of a server-side middleware that uploads images and uses them as an avatar
picture on a user's profile. Also **Sharp** which is converting large images in common formats to
smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images.

pc:

![home_page!](https://user-images.githubusercontent.com/60146116/202277002-874c87b5-914e-4958-a8ea-a5771a120210.PNG)
![video_page!](https://user-images.githubusercontent.com/60146116/202278060-c61bee87-ff00-4e6d-9be5-fb223a13b854.PNG)
![profile_page!](https://user-images.githubusercontent.com/60146116/202278050-be634383-3b25-427f-98e0-6adde00b4a8a.PNG)

mobile:

![udemy_mobile3](https://user-images.githubusercontent.com/60146116/202802816-7987c912-f09e-445f-93af-1f4ba13ed695.PNG)
![udemy_mobile2](https://user-images.githubusercontent.com/60146116/202802820-57e65b22-4cff-45bf-95be-fd6f8819b7c0.PNG)
![udemy_mobile1](https://user-images.githubusercontent.com/60146116/202802822-c831c6e8-7c83-4351-bfcc-4d3d48e8ea03.PNG)
