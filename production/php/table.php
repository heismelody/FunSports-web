<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 16-6-1
 * Time: 下午7:15
 */
include_once "mysqlquery.php";

session_start();

$method = $_POST["method"];

if($method == "queryallprofile"){
    $result = MySqlQuery::query_all_user();

    $i = 0;
    while($row = mysqli_fetch_assoc($result)){
        $i++;
        if($i == mysqli_num_rows($result)){
            echo json_encode($row);
        }
        else {
            echo json_encode($row).",";
        }
    }
}
else if($method == "queryallrecord") {
    $result = MySqlQuery::query_all_record();

    $i = 0;
    while($row = mysqli_fetch_assoc($result)){
        $i++;
        if($i == mysqli_num_rows($result)){
            echo json_encode($row);
        }
        else {
            echo json_encode($row).",";
        }
    }
}
else if($method == "queryuserroute")
{
    $email = $_SESSION["email"];
    $result = MySqlQuery::select_user_route_point($email);

    $i = 0;
    echo "{pointnum:".mysqli_num_rows($result)."},";
    while($row = mysqli_fetch_assoc($result)){
        $i++;
        if($i == mysqli_num_rows($result)){
            echo json_encode($row);
        }
        else {
            echo json_encode($row).",";
        }
    }
}
else if($method == "queryusertaskforcalendar")
{
    $email = $_SESSION["email"];
    $result = MySqlQuery::select_user_task_forcalendar($email);

    $i = 0;
    echo "{tasknum:".mysqli_num_rows($result)."},";
    while($row = mysqli_fetch_assoc($result)){
        $i++;
        if($i == mysqli_num_rows($result)){
            echo json_encode($row);
        }
        else {
            echo json_encode($row).",";
        }
    }
}
else if($method == "queryusertaskcomplforcal")
{
    $email = $_SESSION["email"];
    $result = MySqlQuery::select_user_taskcomple_forcal($email);

    $i = 0;
    echo "{taskcomplenum:".mysqli_num_rows($result)."},";
    while($row = mysqli_fetch_assoc($result)){
        $i++;
        if($i == mysqli_num_rows($result)){
            echo json_encode($row);
        }
        else {
            echo json_encode($row).",";
        }
    }
}
else if($method == "queryusernameNloc")
{
    $email = $_SESSION["email"];
    $result = MySqlQuery::select_user_name_loc($email);

    $i = 0;
    while($row = mysqli_fetch_assoc($result)){
        $i++;
        if($i == mysqli_num_rows($result)){
            echo json_encode($row);
        }
        else {
            echo json_encode($row).",";
        }
    }
}
?>