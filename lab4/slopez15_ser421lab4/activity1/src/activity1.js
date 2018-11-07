/*
Activity 1: DOM expressions (20 points)
www.bing.com -- search using 3 distinct words

Save the resulting page (save the complete page, not just the "source"). Load the page you just saved locally (Open File…<file you just saved>).
Then save the source of your modified file (after running your activity1.js) as activity1.html (this is not the web page "complete", it is just what you get when you "view source". You can cut-and-paste into an editor and save).

Now, for this activity, write DOM expressions that do the following:
*/


//1. (3) Output to the console the <ol> element encompassing the results of the search
var one = document.getElementById("b_results");
console.log(one);

//2. (4) Output to the console the code for the "onload" event on the <body> element
var two;
var body = document.getElementsByTagName("body")[0];
two = body.onload;
console.log(two);


//3. (3) Output to the console the 2nd child node underneath the <body> element
var three;
three = body.childNodes[1];
console.log(three);


//4. (3) Output to the console the number of <h2> tags in the page
var four;
four = document.getElementsByTagName("h2").length;
console.log(four);


//5. (3) Output to the console the value in the search bar (you must get this from the search bar not anywhere else on the page)
var five;
five = document.getElementById("sb_form_q").value;
console.log(five);

//6. (4) Make the "Make Bing your seach engine" text in the upper right corner result go away
//NOTE: some browsers it will say, "Make Bing your seach engine" others will say, "Try Microsoft Edge"
var six;
six = document.getElementById("b_opalpers").childNodes[0].childNodes[1].textContent;
console.log("before making text in upper right corner go away.\n:" + six)
six = document.getElementById("b_opalpers").childNodes[0].childNodes[1].textContent = "";
console.log("after making text in upper right corner go away.\n:" + six)
