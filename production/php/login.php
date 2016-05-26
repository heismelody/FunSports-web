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
    if($pw == $row["pw"]) {
            $_SESSION['name']=$_POST["name"];
            echo "{
                        result : 'true',
                        sessionid : '".$sessionid."'
                  }";
        }
    }
    else {
        echo "{
                        result : 'false'     
              }";
    }

?>

