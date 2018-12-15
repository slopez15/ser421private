module.exports = function makestoryPage(res) {
  res.end(
    `
    <!--
      Name: Saul Lopez
      asurite: slopez15
      class: 421
      date: 9/25/2018
    -->
    <!-- username, pass, radio role -->
    <!-- auth by matching username & pass; runtime info (user Info Not Stored);  -->
    <!DOCTYPE html>

    <html>
    <body>

    MakeStory Html <br/>
    <p>Welcome${res.userInfo.role ? " " + res.userInfo.role + ": " : ""}${res.userInfo.username ? res.userInfo.username : ""}!</p>
    <a href="#">save</a>
    <a href="#">cancel</a>



    </body>
    </html>
    `
  );
}
