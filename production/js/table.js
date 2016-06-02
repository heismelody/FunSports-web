/**
 * Created by root on 16-6-1.
 */
$(document).ready(function () {
    var dataSet = [
        ['','','','','','','','','']
    ];

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
                i++;
            }
            
            $("#table-all-profile").dataTable({
                'data' : resJson,
                "columns": [
                    { "title": "<input type=\"checkbox\" class=\"flat\">"},
                    { "title": "Email",data: 'email'},
                    { "title": "Name" ,data: 'nick' },
                    { "title": "Address", data: 'address'},
                    { "title": "Weight", data: 'weight' },
                    { "title": "Height" ,data: 'height'},
                    { "title": "Birthday",data: 'birthday'},
                    { "title": "Gender", data: 'gender'},
                    { "title": "Operation"}
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




});