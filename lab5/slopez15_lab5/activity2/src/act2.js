/*
Activity 2: Use AJAX to access a real Web API
www.apixu.com provides a Web API that returns JSON weather data. You can sign up for free access for 5K API calls per month.
Once you do you will get example URLs to the current weather and forecast endpoints with your own API key. You will want to save
the endpoints and the API key. They also have a nice "Interactive" tab for experimenting with your own API calls.
Write a complete web application that does the following:
R1. (10) Displays 2 cities and their associated data. The data should be retrieved and parsed out of the JSON at URLs like the
above via an AJAX call. The data you should display in a table (2 rows):
a. The first city should be "Phoenix"
b. A second city name custom to your application. (Paris, London, you pick)
c. For each row, have a column for the city name followed by:
i. A local (to the city in question) timestamp when the data was last updated.
ii. Temperature in Fahrenheit, plus "feels like" temperature.
iii. Humidity – a percentage. Example: 70 means “70% humidity”
iv. Barometric pressure in inches
v. Conditions - text
R2. (10) Populate a 3
rd city row by selecting from a set of 5 cities in a dropdown. You may populate the dropdown with any 5
cities you like. The website has a list of cities supported. When a new city is selected, you should automatically populate its
data in a 3
rd row.
R3. (10) At the top of the page, display the following line: “The average temperature is AAA and the hottest city is HHH”
R4. (10) Next to each city name put a "forecast" button that, when clicked, puts text below the table describing the weather
forecast for tomorrow for that city. The display should include all the values under the “day” and the “astro” (see the JSON),
but you can decide the output format (as long as it is clearly readable).
R5. (10) Provide a "Refresh" button at the bottom of the table that causes the data values for the entire table to be updated as well
as recompute requirement #3 based on the new values. It should also clear the forecast area if there is any text in it.
Hints/Constraints:
• Activity 2 may appear somewhat daunting at first, but spend 15 minutes on the API website with their tools and by inspecting
JSON in the browser and you will see it is not that difficult.
• You must use AJAX for this activity, not Fetch!
• Be sure to check for non-200 responses and have basic error-checking – your app should not crash or ruin the rendering of
the display table if an API AJAX call is not successful; instead it should show an appropriate error message!
• As before, no CSS!
*/


































/**/
