<?php
include_once "mysqlconn.php";
include_once "mysqlquery.php";

$email=$_POST["name"];

$result=MySqlQuery::select_user_pw($email);

if (mysqli_num_rows($result) == 1) {
    echo "error";
}
else {
    echo "1";
}
?>