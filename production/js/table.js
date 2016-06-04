/**
 * Created by root on 16-6-1.
 */
$(document).ready(function () {

    if($("#table-all-profile")){
        $.ajax({
            type : "POST",
            url: "php/table.php",
            data : {
                'method' : 'queryallprofile'
            },
            success: function(response,status,hrx){
                var resJson = eval("([" + response + "])");

                var i = 0;
                while(resJson[i]){
                    if(resJson[i].gender == 1){
                        resJson[i].gender = "male";
                    }
                    else {
                        resJson[i].gender = "female";
                    }
                    resJson[i].checkbox = "";
                    resJson[i].operation = "";
                    i++;
                }

                $("#table-all-profile").dataTable({
                    'data' : resJson,
                    "columns": [
                        { "title": "<input type=\"checkbox\" class=\"flat\">",data: 'checkbox'},
                        { "title": "Email",data: 'email'},
                        { "title": "Name" ,data: 'nick' },
                        { "title": "Address", data: 'address'},
                        { "title": "Weight", data: 'weight' },
                        { "title": "Height" ,data: 'height'},
                        { "title": "Birthday",data: 'birthday'},
                        { "title": "Gender", data: 'gender'},
                        { "title": "Operation",data: 'operation'}
                    ],
                    "createdRow": function ( row, data, index ) {
                        //行渲染回调,在这里可以对该行dom元素进行任何操作
                        //给当前行加样式
                        if (data.role) {
                            // $(row).addClass("active");
                        }
                        //给当列加样式
                        var table_checkbox = $('<input type="checkbox" class="flat">');
                        var table_oper = $('<a href="#" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> View </a>'+
                            '<a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>'+
                            '<a href="#" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a>');

                        $('td', row).eq(0).append(table_checkbox);
                        $('td', row).eq(8).append(table_oper);

                    }
                })
            }
        });
    }


});

$(document).ready(function () {

    if($("#table-all-record")){
        $.ajax({
            type : "POST",
            url: "php/table.php",
            data : {
                'method' : 'queryallrecord'
            },
            success: function(response,status,hrx){
                var resJson = eval("([" + response + "])");

                var i = 0;
                while(resJson[i]){
                    resJson[i].checkbox = "";
                    i++;
                }

                $("#table-all-record").dataTable({
                    'data' : resJson,
                    "columns": [
                        { "title": "<input type=\"checkbox\" class=\"flat\">",data: 'checkbox'},
                        { "title": "Email",data: 'email'},
                        { "title": "total time" ,data: 'total_time' },
                        { "title": "start time", data: 'start_time'},
                        { "title": "end time", data: 'end_time' },
                        { "title": "activity type" ,data: 'activity_type'},
                        { "title": "total length",data: 'total_length'},
                    ],
                    "createdRow": function ( row, data, index ) {
                        //行渲染回调,在这里可以对该行dom元素进行任何操作
                        //给当前行加样式
                        if (data.role) {
                            // $(row).addClass("active");
                        }
                        //给当列加样式
                        var table_checkbox = $('<input type="checkbox" class="flat">');

                        $('td', row).eq(0).append(table_checkbox);
                    }
                })
            }
        });
    }


});