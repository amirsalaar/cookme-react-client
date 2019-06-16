# CookMe
CookMe is a platform enabling private home cooks sell their home-cooked meals. CookMe has been built using Ruby on Rails to create the backednd API which interacts with a React.js client and React-Native client for mobile platforms. It is using PostgreSQL for the database. 

Customers can look for closest kitchens, see their rates, place orders, and see kitchens working hours. They can alos rate foods and see cooks' average ratings.

In order for cooks to be able to post foods, they need to provide the required certifications and detail information about their experience and licenses. After cooks are verified and their membership was validated as a cook, they will be able to start selling their meals. Cooks can have weekly schedule for their foods and set quantity of orders per day for each day of the week. They can manage their earnings, see placed orders, cancellations, most favourite foods.

To build CookMe the following APIs were also used to bring extra features to the app:

### 1.  Google Maps API: 
  CookMe is using Google Maps/Places API to show kitchens location, and their working hours and information on the map. ALso, Google Geocoding API was used to geocode the address of kitchens when Cooks register.

### 2. Stripe API
  To process payments, CookMe is employing Stripe API to provide a more secure payment gate to customers.

### 3. Twilio API
  CookMe is using Twilio API to send order confirmation message, and a brief receipt to customers for successful payments.
