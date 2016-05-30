<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 16-5-30
 * Time: 下午5:28
 */
include_once "mysqlquery.php";
session_start();

$method = $_POST["method"];
$email = $_SESSION["email"];

if($method == "updateprofile"){
    $nick = $_POST["nick"];
    $address = $_POST["address"];
    $weight = $_POST["weight"];
    $height = $_POST["height"];
    $birthday = $_POST["birthday"];
    $gender = $_POST["gender"];

    $result = MySqlQuery::update_user($email,$nick,$address,$weight,$height,$birthday,$gender);

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
}
else if($method == "queryprofile"){
    $result = MySqlQuery::select_user($email);

    $row = mysqli_fetch_assoc($result);
    echo "{
                        result : 'true',
                        nick : '" . $row["nick"] . "',
                        address : '" . $row["address"] . "', 
                        weight : '" . $row["weight"] . "',
                        height : '" . $row["height"] . "',
                        birthdat : '" . $row["birthday"] . "',
                        gender : '" . $row["gender"] . "'
           }";
}

?>