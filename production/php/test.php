<?php
include_once "mysqlquery.php";

$result = MySqlQuery::select_user_taskcomple_forcal("826556077@qq.com");



while($row = mysqli_fetch_assoc($result)) {
    echo json_encode($row);
}
echo mysqli_num_rows($result);

?>