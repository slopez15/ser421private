function getMessage() {
  //I am checking random frunction.
  //decimal value <1 * 100000 (5 places moved), rounded. (ex:0.321654)(ex:32165.4)(ex:32165)
  var amount = Math.round(Math.random() * 100000);
  var message =
    "You won $" + amount + "!\n" +
    "To collect your winnings, send your credit card\n" +
    "and bank details to oil-minister@phisher.com.";
  return(message);
}

/*both functions below exec getMessage, but are their own versions. #2 auto invoked(), #1 onclick*/
function showWinnings1() {
	var elem = document.getElementById('fish');
	elem.innerHTML=getMessage();
 // alert(getMessage());
}

function showWinnings2() {
  document.write("<h1><blink>" + getMessage() +
                 "</blink></h1>");
}
