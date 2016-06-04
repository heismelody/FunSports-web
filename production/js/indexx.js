/**
 * Created by root on 16-5-25.
 */
$(document).ready(function(){

    $.ajax({
        type : "POST",
        url  : "php/custom.php",
        data :{
            sessionid : window.sessionStorage.getItem("sessionid"),
            email : window.sessionStorage.getItem("email")
        },
        success: function(response,status,hrx){
            if(response){
                $("#crop-avatar .avatar-view")[0].src=response;
            }
        }
    });
});