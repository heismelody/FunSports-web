<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 16-5-24
 * Time: 下午6:48
 */
class MySqlConn{
    //该静态变量用来维护唯一的该类实例
    private static $Singleton;
    public static function GetInstance(){
        //下面的判断和
        //if(!is_null(self::$singleton) 等价
        //都是判断静态变量是否被赋值过
        if(!(self::$Singleton instanceof self)){
            // self::$Singleton=new self();
            self::$Singleton=new MySqlConn();
        }

        return self::$Singleton;

    }
    //阻止外界使用者克隆
    private function __clone(){}
    //以上是实现一个单体模式所要进行的共有逻辑

    /*以下的设计同正常类设计，仅构造方法私有而已
      所以如果想把一个类改为单体类，那么加入以上
      逻辑并，私有所有构造方法，这里的构造方法没有
      参数，你可以考虑构造方法带参数的单体设计如何实现
    */
    private $db_conn;

    private function __construct(){
        //连接mysql数据库
        $this->db_conn=mysqli_connect("localhost",'root','826556077','test');
    }

    public function query($sqlStr){
        return mysqli_query($this->db_conn,$sqlStr);
    }

    public function close(){
        mysqli_close($this->db_conn);
    }
}
?>