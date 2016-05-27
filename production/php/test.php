<?php
include_once "mysqlquery.php";

$result = MySqlQuery::create_user('82655077@qq.com','110');
echo $result;
echo $row = mysqli_fetch_assoc($result);
echo mysqli_num_rows($result);
?>