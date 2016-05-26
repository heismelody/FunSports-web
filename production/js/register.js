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


//reigster page custom js
$(document).ready(function () {

    //register email tooltip
    $('#reg-em-ip').tooltip();
    var valemail = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
    $("#reg-em-ip").bind('input propertychange mouseover click mousedown focus', function() {
        var email = $("#reg-em-ip").val();

        if(valemail.test(email)){
            $("#reg-em-ip").tooltip('hide');
        }
    });

    //register button validation check
    $("#registerbtn").click(function () {
        if($('#reg-em-ip').val() == '') {
            $('#reg-em-ip').focus();
            if ($('#reg-alert div').get(0) == undefined) {
                $('#reg-alert').append(alert_box);
            }
            else {
                $('#reg-alert div strong').text("Please enter name!");
            }
        }
        else if($('#reg-em-ip').val() != ''){
            if($('#reg-pw-ip').val() == ''){
                $('#reg-pw-ip').focus();
                if ($('#reg-alert div').get(0) == undefined) {
                    $('#reg-alert').append(alert_box);
                }
                else {
                    $('#reg-alert div strong').text("Please enter pw!");}
            }
            else if($('#reg-pw-ip').val() != ''){
                if($('#reg-acc-ip').val() == ''){
                    $('#reg-acc-ip').focus();
                    if ($('#reg-alert div').get(0) == undefined) {
                        $('#reg-alert').append(alert_box);
                    }
                    else if ($('#reg-alert div').get(0) != undefined){
                        $('#reg-alert div strong').text("Please enter pw account!");
                    }
                }
                else if($('#reg-acc-ip').val() != ''){
                    if($('#reg-acc-ip').val() != $('#reg-pw-ip').val()){
                        $('#reg-acc-ip').focus();
                        if ($('#reg-alert div').get(0) == undefined) {
                            $('#reg-alert').append(alert_box);
                        }
                        else if ($('#reg-alert div').get(0) != undefined){
                            $('#reg-alert div strong').text("Please input same password!");
                        }
                    }
                    else if($('#reg-acc-ip').val() == $('#reg-pw-ip').val()){
                        //Core process code:
                        //This code submit the user name and the password to the server
                        $.ajax({
                            type : "POST",
                            url: "php/register.php",
                            data :{
                                name : $("#reg-em-ip").val(),
                                password : $.md5($("#reg-pw-ip").val())
                            },
                            success: function(response,status,hrx){
                                if(response == 1){
                                    alert("success");
                                    location.href="login.html";
                                }
                                else {
                                    if ($('#reg-alert div').get(0) == undefined) {
                                        $('#reg-alert').append(alert_box);
                                        $('#reg-alert div strong').text("Email had been used!");
                                    }
                                    else {
                                        $('#reg-alert div strong').text("Email had been used!");
                                    }
                                    $('#reg-pw-ip').focus();
                                }
                            }
                        });

                    }
                    else if ($('#reg-alert div').get(0) != undefined){
                        $('#reg-alert div').remove('div');
                    }
                }
                else {
                    $('#reg-alert div').remove('div');
                }
            }
            else if ($('#reg-alert div').get(0) != undefined){
                $('#reg-alert div').remove('div');
            }
        }
    })
});