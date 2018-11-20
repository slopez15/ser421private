function getRequestObject() {
  if (window.XMLHttpRequest) {
    return(new XMLHttpRequest());
    console.log("XMLHttpRequest made.");
  } else {
    return(null);
  }
}

function sendRequest() {
  var request = getRequestObject();
  request.onreadystatechange =
    function() { handleResponse(request); };
  request.open("GET", "http://localhost:8000/message-data.html", true); //static file example. hbout js files, exec files? think of server returns...
  //headers/payload placed in between.
  request.send(null);
}

function handleResponse(request) {
  switch (request.readyState) {
  case 0:
      console.log("UNSENT"); //never entered until manually unset?--not sure...but this method runs whenever there is a change to readyState via open/send, upon recieving, loading, and completeing.
      break;
  case 1:
      console.log("OPENED");
      break;
  case 2:
      console.log("HEADERS RECEIVED");
      break;
  case 3:
      console.log("LOADING");
      break;
  case 4:
      console.log("COMPLETE");
      alert(request.responseText);
      break;
  }
}
