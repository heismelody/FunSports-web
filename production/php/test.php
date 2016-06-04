<?php
include_once "mysqlquery.php";

$result = MySqlQuery::query_all_record();



while($row = mysqli_fetch_assoc($result)) {
    echo json_encode($row);
}
echo mysqli_num_rows($result);

?>