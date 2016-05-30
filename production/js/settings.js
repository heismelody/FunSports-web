/**
 * Created by root on 16-5-30.
 */

$(document).ready(function () {
    $.ajax({
        type : "POST",
        url  : "php/settings.php",
        data :{
            method : "queryprofile",
            sessionid : window.sessionStorage.getItem("sessionid")
        },
        success: function(response,status,hrx){
            var resJson = eval("(" + response + ")");
            if(resJson.result == "true"){
                $("#set-nick input").val(resJson.nick);
                $("#set-nick input").val(resJson.nick);
                $("#set-nick input").val(resJson.nick);
            }
        }
    });

    $('#btn-update-profile').click(function () {
        $.ajax({
            type : "POST",
            url  : "php/settings.php",
            data :{
                method : "updateprofile",
                nick : $("#set-nick input").val(),
                address : $('#set-address input').val(),
                weight : $('#set-weight input').val(),
                height : $('#set-height input').val(),
                birthday : $("#set-birthday input").val(),
                gender : $('#gender .active input').val()
            },
            success: function(response,status,hrx){
                var resJson = eval("(" + response + ")");
                if(resJson.result == "true"){

                }

            }

        });
    })
    


});