module.exports = function homePage(res) {
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

    <form action="/ViewNews" method="post">
      <p>Welcome${res.userInfo.username ? res.userInfo.username + " " : ""}!</p>
      <b>Username</b>
      <input type="text" placeholder="Enter Username" name="username" required><br>

      <b>Password:</b>
      <input type="password" placeholder="Enter Password" name="password" required><br>

      <input type="radio" name="role" value="Author" required>Author<br>
      <input type="radio" name="role" value="Guest" required>Guest<br>
      <input type="radio" name="role" value="Subscriber" required>Subscriber<br>
      <input type="submit" value="Submit">
    </form>

    `
  );
}
