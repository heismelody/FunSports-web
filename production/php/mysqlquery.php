<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 16-5-25
 * Time: 下午6:12
 */
include_once "mysqlconn.php";

class MySqlQuery{

    public static function select_user_pw($email){
        $sql = ' SELECT pw 
                 FROM   test.user
                 WHERE  email='.'"'.$email.'";';

        $dbConn = MySqlConn::GetInstance();
        $result=$dbConn->query($sql);

        return $result;
    }

    public static function select_user_icon($email){
        $sql = ' SELECT icon 
                 FROM   test.user
                 WHERE  email='.'"'.$email.'";';

        $dbConn = MySqlConn::GetInstance();
        $result=$dbConn->query($sql);

        return $result;
    }

}
?>