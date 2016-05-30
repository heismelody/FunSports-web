<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 16-5-25
 * Time: 下午6:09
 */

include_once "mysqlquery.php";

session_start();


if($_POST["sessionid"] == session_id()){
    function get_user_icon(){

        $email = $_SESSION["email"];
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
}



?>