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
                $("#set-address input").val(resJson.address);
                $("#set-birthday input").val(resJson.birthday);
                $("#set-weight input").val(resJson.weight);
                $("#set-height input").val(resJson.height);
                if(resJson.gender == 'male'){
                    $('#gender-male').addClass("active");
                }
                else {
                    $('#gender-female').addClass("active");
                }

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

    $('#btn-update-pw').click(function () {
        if($('#set-newpw').val() == $('#set-newpwac').val()){
            $.ajax({
                type : "POST",
                url  : "php/settings.php",
                data :{
                    method : "updatepw",
                    newpw : $.md5($('#set-newpw input').val()),
                    oldpw : $.md5($('#set-pw input').val())
                },
                success: function(response,status,hrx){
                    var resJson = eval("(" + response + ")");
                    if(resJson.result == "true"){
                    }
                }
            });
        }
    })

});