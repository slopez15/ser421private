var fs = require('fs');
// var Question = require('./modelQuestion');

//export default func; //would be good to have it as a func that shows available functions as part of module.



//deserialize persistent store (the json file) to store questions at runtime for initiated survey.
exports.deserializeFile = function (file) {
  //For JSON file.
  var file_path = __dirname + "/../persistence" + file;
  var json = fs.readFileSync(file_path, 'utf8', function (err, data) {
    if (err) {throw err;}
    else { console.log("persistent store Loaded.");}
  });
  //asume json file contains same format as WorldModel.json
  json = JSON.parse(json);
  return json;
}

// qArr - Question [{question: ""}...]
exports.serializeToFile =  function (json, file) {
  //into JSON file.
  var file_path = __dirname + "\\..\\persistence" + file;

  //method 1 - I feel is safer and not having to keep calling write in loop.
  //check if file exists.
    //if does, truncate with new ready to write data.
    // else, write (if not exists creates new file)

  //method 2 - possibly dangerous while coding, might delete wrong file. // possible BUG: when serializing, will delete file; if something goes wrong in write, then there is no file. Means no saved persistent state. // SOLUTION: just used calledback after delete.
  try {
    //check if have permissions (also checks if file exists); if not, give message.
    fs.accessSync(file_path, fs.constants.W_OK); //?undefined:err
    if (fs.existsSync(file_path) ){ //fs.existsSync(file_path)
      //if does, delete file.
      fs.unlinkSync(file_path);
      //write. (if not exists, creates new file)
      fs.writeFileSync(file_path, JSON.stringify(json, null, 2), function (err, data) { //, {'flag': 'a'}
        if (err) {throw err;}
        else {console.log("persistent store written and saved.");}
      });
    }
  } catch (err) {
    console.log('possible no access! err: ' + err);
    // console.error('possible no access! err: ' + err);
  }
} //serializeToFile()

/*testing*/
// var d = {"data": [{"question": "Do you like SE1?"},{"question": "Do you like working alone2-?"}] };
// exports.serializeToFile( d, "/world3.json");
// console.log(
//   exports.deserializeFile('/WorldModel.json')
// );

// exports.update = function (file) {}



// module.exports = {deserializeFile: deserializeFile};
