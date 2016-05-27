<?php
include_once "mysqlconn.php";
include_once "mysqlquery.php";

$email = $_POST["name"];
$pw = $_POST["pw"];

$result = MySqlQuery::create_user($email,$pw);

if ($result) {
    echo "{
            result : 'true'     
          }";
}
else {
    echo "{
            result : 'false'     
          }";
}
?>