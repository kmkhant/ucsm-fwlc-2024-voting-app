## Fresher Welcome Voting App
Welcome to my codebase for the Fresher Welcome Voting App for UCSM Fresher Welcome 2024.
This project is created with $0 dollar budget although it can perform well in realtime.
I hosted both frontend and backend on vercel for free. Integrated with redis on vercel for free again. Then, connect with mongodb cloud atlas for free :P. Thanks you vercel <3

this app is hosted on vercel 
https://ucsm-fwlc-2024-voting-app.vercel.app/

![homepage](/images/home.png)

## How to use
It has currently a little steps for the admin to vote.

* send request to /api/generate with correct secret key to generate coupons
* open /generate on browser and enter the correct passcode then click on generate coupon
* client can use this coupon in the browser to vote for the performances they like

## Notes
* you won't be able to generate coupons from browser if all the newly added coupons are generated
* You can only vote once per role
* backend only need basic auth-key to access the api, make sure you reimplement it if you want to make more secure

### CHALLENGE
I was assigned to code for the voting app exactly 1 week before the event. It's quite challenging to finish in time but somehow I managed to finished it.

### How I Solved the Challenge - Backend
Normally, fresher welcome voting system is calculated with number of unique printed coupons that are given to each student. I decided to transform these physical coupons to digital with the help of the library called voucher_code_generator via NPM.

I created 2 tables for the things related to coupons. Coupons Table and Stats Table.

For Coupons table, I stored a few hundreds of unique coupons which are then linked with Stats Table.

Stats Table basically check the coupon's stats like is it already voted for the singer using this coupon ? If singer is already voted, you can't vote for singer with this coupon code anymore. The DB relation look like this.

![DB relation between Coupons and Stats Table](/images/image.png)

In short, It's like I just checked the the checkboxes on physical coupon token but digitally in this case.

Then, I modelled contestants as MongoDB models where I divide their roles and current voting counts got.

![Model](/images/model.png)

It would be better if I could do with relations but I modelled the total number of votes for assigned role in the model for the faster development purposes.

I also integrated with redis-store from vercel to reflect server status of the app whether to open voting or not.

I decided to do Create, Update, Read, Delete manually due to lower number of the contestests to vote.

You can read how I coded api routes in src/app/api

I didn't implemented a authenication system like JWT, so I prevented admin features like add coupons, delete coupons, delete user routes with the help of a middle where I test a secret token. I communicate with the admin apis from my postman desktop client.

### How I Solved the Challenge - Frontend
Frontend is pretty straight forward. I used NextJS and deployed on vercel for fast loading speed and efficiently monitor the traffic on vercel like how many people are currently using my app.

I was thinking is it worth to implement an admin dashboard ? But the time duration given to me is just 7 days. I can do but there would be bugs.

It does need to access admin panel like page to get the results from server. I don't want everyone to access to that page. So, I encrypted the api route and made an input box in generate page to enter the actual page if correct passcode is submitted. Then, fetch request from the api using the secret key.


