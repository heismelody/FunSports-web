<?php
include_once "mysqlquery.php";

function get_user_icon(){

    $email = "826556077@qq.com";
    $result=MySqlQuery::select_user_icon($email);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        echo $row["icon"];
    }
    else {
        echo "images/default-user.png";
    }
}

get_user_icon();


?>