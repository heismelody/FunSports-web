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

    public static function select_user($email){
        $sql = ' SELECT *
                 FROM   test.user
                 WHERE  email='.'"'.$email.'";';

        $dbConn = MySqlConn::GetInstance();
        $result=$dbConn->query($sql);

        return $result;
    }

    public static function create_user($email,$password){
        $sql = ' INSERT INTO test.user (email,pw)
                 VALUES ("'.$email.'",md5("'.$password.'"));';
        
        $dbConn = MySqlConn::GetInstance();
        $result = $dbConn->query($sql);

        return $result;
    }

    public static function update_user_pw($email,$password){
        $sql = 'UPDATE test.user SET pw = '.'"'.$password.'"                                
                WHERE email = '.'"'.$email.'";';

        $dbConn = MySqlConn::GetInstance();
        $result = $dbConn->query($sql);

        return $result;
    }

    public static function update_user($email,$nick,$address,$weight,$height,$birthday,$gender){

        $sql = 'UPDATE test.user SET nick = '.'"'.$nick.'",
                                     address = '.'"'.$address.'",
                                     weight = '.'"'.$weight.'",
                                     height = '.'"'.$height.'",
                                     birthday = '.'"'.$birthday.'",
                                     gender = '.'"'.$gender.'"
                WHERE email = '.'"'.$email.'";';

        $dbConn = MySqlConn::GetInstance();
        $result = $dbConn->query($sql);

        return $result;
    }

    public static function query_all_user(){
        $sql = ' SELECT email,nick,address,weight,height,birthday,gender
                 FROM   test.user';

        $dbConn = MySqlConn::GetInstance();
        $result=$dbConn->query($sql);

        return $result;
    }
}
?>