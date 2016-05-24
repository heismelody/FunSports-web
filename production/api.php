<?php

$servername = "localhost";
$username = "root";
$password = "826556077";
$dbname = "test";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = ' SELECT pw 
         FROM   test.user
         WHERE  email='.'"'.$_POST["name"].'";';

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        if($_POST["password"] == $row["pw"]) {
            echo 1;
        }
    }
}
else {
    echo "error";
}

mysqli_close($conn);
?>

