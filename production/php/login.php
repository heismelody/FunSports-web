<?php
include "db.php";

$sql = ' SELECT pw 
         FROM   test.user
         WHERE  email='.'"'.$_POST["name"].'";';

$dbConn = MySqlConn::GetInstance();
$result=$dbConn->query($sql);

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

?>

