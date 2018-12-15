module.exports = function failPage(res) {
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

    Failure! username & password do not match!
    <a href="/home">Home</a>
    <!-- I did some syntatic sugar to make the above work and route to /home. -->

    </body>
    </html>
    `
  );
}
