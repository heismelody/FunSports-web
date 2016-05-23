<?php
header('Content-Type: text/html; charset=UTF-8');
if($_POST["password"] == "root"){
    echo md5(utf8_encode($_POST["password"]));
}else {
    echo "pw fail";
}

//$servername = "localhost";
//$username = "root";
//$password = "826556077";
//$dbname = "test";
//
//// Create connection
//$conn = mysqli_connect($servername, $username, $password, $dbname);
//// Check connection
//if (!$conn) {
//    die("Connection failed: " . mysqli_connect_error());
//}
//
//$sql = " SELECT email FROM test.user ";
//$result = mysqli_query($conn, $sql);
//
//if (mysqli_num_rows($result) > 0) {
//    // output data of each row
//    while($row = mysqli_fetch_assoc($result)) {
//        echo "id: " . $row["pw"];
//    }
//} else {
//    echo "0 results";
//}
//
//mysqli_close($conn);
?>

