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

    public static function select_user_record($email){
        $sql = ' SELECT email,sports_record.total_time,
                              sports_record.start_time,
                              sports_record.end_time,
                              sports_record.activity_type,
                              sports_record.total_length
                 FROM   test.sports_record,test.user,test.user_record
                WHERE  email='.'"'.$email.'"
                    AND user.user_id = user_record.user_id
                    AND user_record.record_id = sports_record.record_id;';

        $dbConn = MySqlConn::GetInstance();
        $result=$dbConn->query($sql);

        return $result;
    }

    public static function select_user_route($email){
        $sql = ' SELECT route.*
                  FROM   test.sports_record,test.user,test.user_record,test.route
                  WHERE  email='.'"'.$email.'"
		             AND user.user_id = user_record.user_id
                     AND user_record.record_id = sports_record.record_id;';

        $dbConn = MySqlConn::GetInstance();
        $result=$dbConn->query($sql);

        return $result;
    }

    public static function select_user_route_point($email){
        $sql = 'SELECT route_point.*
                FROM   test.sports_record,test.user,test.user_record,test.route,test.route_point
                WHERE  email='.'"'.$email.'"
                   AND user.user_id = user_record.user_id
                   AND user_record.record_id = sports_record.record_id
                   AND route.route_id = sports_record.route_id;';

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

    public static function query_all_record(){
        $sql = ' SELECT email,sports_record.record_id,
                              sports_record.total_time,
                              sports_record.start_time,
                              sports_record.end_time,
                              sports_record.activity_type,
                              sports_record.total_length
                 FROM   test.sports_record,test.user,test.user_record
                WHERE  user.user_id = user_record.user_id
                   AND user_record.record_id = sports_record.record_id;';

        $dbConn = MySqlConn::GetInstance();
        $result=$dbConn->query($sql);

        return $result;
    }
}
?>