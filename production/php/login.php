<?php
include_once "mysqlconn.php";
include_once "mysqlquery.php";

$name = $_POST["name"];
$pw = $_POST["password"];

session_start();
session_regenerate_id();
$sessionid=session_id();

$result=MySqlQuery::select_user_pw($name);

if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_assoc($result);
    $_SESSION["email"] = $name;
    if ($pw == $row["pw"]) {
        echo "{
                        result : 'true',
                        sessionid : '" . $sessionid . "'
               }";
    }
    else {
        echo "{
               result : 'false'
          }";
    }
}
else {
    echo "{
               result : 'false'
          }";
}

?>

