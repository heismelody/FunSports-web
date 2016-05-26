<?php
session_start();
$sessionid=session_id();
echo "{
                    {
                        result : 'ture',
                        sessionid : '".$sessionid."'
                    }
                  }";
?>