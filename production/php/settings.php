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

    $row = mysqli_fetch_assoc($result);
    if($gender == "male"){
        $gender = "1";
    }
    else {
        $gender = "0";
    }

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

    if($row["gender"] == 1){
        $row["gender"] = "male";
    }
    else {
        $row["gender"] = "female";
    }

    echo "{
                        result : 'true',
                        nick : '" . $row["nick"] . "',
                        address : '" . $row["address"] . "', 
                        weight : '" . $row["weight"] . "',
                        height : '" . $row["height"] . "',
                        birthday : '" . $row["birthday"] . "',
                        gender : '" . $row["gender"] . "'
           }";
}
else if($method == "updatepw"){
    $newpw = $_POST["newpw"];
    $oldpw = $_POST["oldpw"];

    $result = MySqlQuery::select_user_pw($email);
    $row = mysqli_fetch_assoc($result);

    if($row["pw"] == $oldpw){
        $result = MySqlQuery::update_user_pw($email,$newpw);

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
    else {
        echo "{
                    result : 'false'     
              }";
    }

}

?>