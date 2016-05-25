<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 16-5-25
 * Time: 下午8:04
 */
include_once "mysqlquery.php";

$name = "826556077@qq.com";

$result=MySqlQuery::select_user_icon($name);

if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_assoc($result);
    echo $row["icon"];
}
else {
    echo "images/default-user.png";
}
?>