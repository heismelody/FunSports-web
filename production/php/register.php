<?php
include "db.php";

$sql = ' SELECT pw 
         FROM   test.user
         WHERE  email='.'"'.$_POST["name"].'";';

$dbConn = MySqlConn::GetInstance();
$result=$dbConn->query($sql);

if (mysqli_num_rows($result) > 0) {
    echo "error";
}
else {
    echo "1";
}
?>