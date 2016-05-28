/**
 * Created by root on 16-5-24.
 */
var alert_box=''
    + '<div class="alert alert-warning alert-dismissible" role="alert">'
    + '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">'
    + '    <span aria-hidden="true">&times;</span>'
    + '   </button>'
    + '  <strong>Please enter name!</strong>'
    + '</div>';


$(document).one('ready', function () {
    window.sessionStorage.removeItem("sessionid");
});

//signin page custom js
$(document).ready(function () {


    //username input tooltip
    $("#log-usr-ip").tooltip();
    $("#log-usr-ip").bind('input propertychange mouseover click mousedown focus', function() {
        var user = $("#log-usr-ip").val();

        if(user != ''){
            $("#log-usr-ip").tooltip('hide');
        }
    });

    //signin button validation check
    $("#signbtn").click(function () {
        if($('#log-usr-ip').val() == '') {
            $('#log-usr-ip').focus();
            if ($('#log-alert div').get(0) == undefined) {
                $('#log-alert').append(alert_box);
            }
            else {
                $('#log-alert div strong').text("Please enter name!");
            }
        }
        else if($('#log-usr-ip').val() != ''){
            if($('#log-pw-ip').val() == ''){
                $('#log-pw-ip').focus();
                if ($('#log-alert div').get(0) == undefined) {
                    $('#log-alert').append(alert_box);
                }
                else {
                    $('#log-alert div strong').text("Please enter pw!");}
            }
            else if($('#log-pw-ip').val() != ''){
                //Core process code:
                //This code submit the user name and the password to the server
                $.ajax({
                    type : "POST",
                    url: "php/login.php",
                    data :{
                        name : $("#log-usr-ip").val(),
                        password : $.md5($("#log-pw-ip").val())
                    },
                    //The response include two parts:
                    //{result,sessionid}
                    //result:check if the user and pw match
                    //sessionid:record this talk
                    success: function(response,status,hrx){
                        var resJson = eval("(" + response + ")");
                        if(resJson.result == "true"){
                            window.sessionStorage.setItem("sessionid",resJson.sessionid);
                            location.href="index.html";
                        }


                        else {
                            if ($('#log-alert div').get(0) == undefined) {
                                $('#log-alert').append(alert_box);
                                $('#log-alert div strong').text("Error name or password!");
                            }
                            else {
                                $('#log-alert div strong').text("Error name or password!");
                            }
                            $('#log-pw-ip').focus();
                        }
                    }
                });
            }
            else if ($('#log-alert div').get(0) != undefined){
                $('#log-alert div').remove('div');
            }
        }
    });
});
