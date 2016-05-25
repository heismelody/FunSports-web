<?php
include_once "mysqlconn.php";
include_once "mysqlquery.php";

$name = $_POST["name"];
$pw = $_POST["password"];

$result=MySqlQuery::select_user_pw($name);

if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_assoc($result);
    if($pw == $row["pw"]) {
            echo 1;
        }
    }
    else {
        echo "error";
    }

?>

