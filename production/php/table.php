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
?>