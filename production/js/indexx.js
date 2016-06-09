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

    $.ajax({
        type : "POST",
        url  : "php/table.php",
        data :{
            method : "queryusernameNloc"
        },
        success: function(response,status,hrx){
            if(response){
                var resJson = eval("([" + response + "])");
                $(".right_col .row .profile_left h3").text(resJson[0].nick);
                $(".right_col .row .list-unstyled i").text(resJson[0].address);
            }
        }
    });
    $(".right_col .row h3").text();
});