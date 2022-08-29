$(document).ready(function(e) {

    current = $(location).attr('href');

    if(current=='http://localhost/web_hw1/Member_list.html'){
        refresh();
    }

    if(current=='http://localhost/web_hw1/File_manager.html'){
        refresh_file();
    }

    if(current=='http://localhost/web_hw1/Message_board.html'){
        refresh_msg();
    }

    
    $("#btn_sign_in").click(function() {
        
        $.ajax({
            type: "POST",
            url: "signin.php",
            data: {
                username: $("#Input_username").val(),
                password: $("#Input_password").val(),
                email: $("#Input_email").val(),
                gender: $("input[type=radio][name=gender]:checked").val(),
                color: $("#colorpicker").val()
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);

            },
            success: function(output) {

                
                //console.log(output);
                if(output=="1"){
                    alert("sign-up success! redirect to login page");
                    window.location.href='http://localhost/web_hw1/Login.html';
                }
                else{
                    alert("sign-up failed!");
                }
            }
        });
        
    });  

    $("#btn_login").click(function() {
        
        $.ajax({
            type: "POST",
            url: "login.php",
            data: {
                username: $("#Input_username").val(),
                password: $("#Input_password").val()
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);

            },
            success: function(output) {
                //console.log(output);
                if (output=="1"){
                    alert("Welcome!!");
                    window.location.href='http://localhost/web_hw1/Member_list.html';
                }
                else{
                    alert("Login failed!");
                }
                
            }
        });
        
    });

    $("#btn_mod").click(function() {
        
        $.ajax({
            type: "POST",
            url: "mod.php",
            data: {
                username: $("#mod_name").val(),
                password: $("#mod_password").val(),
                email: $("#mod_email").val(),
                gender: $("input[type=radio][name=mod_gender]:checked").val(),
                color: $("#mod_color").val()
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);

            },
            success: function(output) {
                //console.log(output);
                if(output=="1"){
                    alert("Modified!");
                }
                else{
                    alert("user existed, cannot modify2");
                }

            }
        });
        
    });

    $("#btn_logout").click(function() {
        
        $.ajax({
            url: "logout.php",
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);

            },
            success: function(output) {
                //console.log(output);
                
                alert("logout success!!");
                window.location.href='http://localhost/web_hw1/Login.html';
                
                
            }
        });
        
    });

    $("#btn_upload").click(function() {

       

        var file_data = $('#file').prop('files')[0];   //取得上傳檔案屬性
        var form_data = new FormData();  //建構new FormData()
        form_data.append('file', file_data);  //吧物件加到file後面


        $.ajax({
            cache: false, 
            contentType: false, 
            processData: false,
            type: "POST",
            url: "upload.php",
            data:form_data,
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);

            },
            success: function(output) {
                //console.log(output);
                
                alert(output);
                refresh_file();
                
                
            }
        });
        
    });

    var $tmp;


    $('table tbody').on('click', '#btn_edit', function() {

        $tmp = $(this).closest('tr').find('#fname').text()
        //alert($tmp)

    });

    $("#btn_rename").click(function() {
        
        var $a =$(this).closest('tr').find('#fname').text() ;

        $.ajax({
            type: "POST",
            url: "rename_file.php",
            data: {
                old_fname: $tmp,
                new_fname: $("#new_fname").val()
                
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);

            },
            success: function(output) {
            

            }
        })
    });


    $('table tbody').on('click', '#delete', function() {

        var $fname = $(this).closest('tr').find('#fname').text()

        
        $.ajax({
            type: "POST",
            url: "delete.php",
            data: {
                fname: $fname
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);

            },
            success: function(output) {
                //console.log(output);
                alert("Deleted!");
                refresh_file();

            }
        });

    });



    $("#msg_send").click(function() {
        $.ajax({
            type: "POST",
            url: "msg.php",
            data: {
                title: $("#msg_title").val(),
                content: $("#msg_content").val()
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);

            },
            success: function(output) {
                //console.log(output);
                window.location.href='http://localhost/web_hw1/Message_board.html';
                
               
            }
        });

        
    
    }); 

    $(".mp4").hide();

    $(".sub").click(function(){
        

        $.ajax({
            type: "POST",
            url: "sub.php",
            data: {

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);

            },
            success: function(output) {
                //console.log(output);
                //window.location.href='http://localhost/web_hw1/Message_board.html';
                
                if(output == 1){
                    $(".mp4").show();
                    $(".sub").text("Unsubscribe");
                }
                else{
                    $(".mp4").hide();
                    $(".sub").text("Subscribe");
                }
            }
        });
    });





});


function refresh_msg() {
    $.ajax({
        type: "POST",
        url: "showMsg.php",
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        },
        success: function(output) {
            output = $.parseJSON(output);
            console.log(output);
            var content = "";


            //var sess='$_SESSION["username"]';
            var sess = output[0];

            for (var num = 1; num < output.length; num++) {

                if(output[num][1]<50){
                    //content += "<ul class='list-group list-group-flush'>";
                    //content += "<div class='card mt-3' style='width:1000px'>";
                    content += "<div class='card-header'>" + output[num][3] + "</div>";
                    
                    content += "<li class='list-group-item'>";
                    content += "<div class='row' style='height:60px'><div>" + output[num][4] + "</div></div>";
                    if(output[num][2] == sess){
                        content += "<div class='row'> <div class='col-6'> <a style='color:darkgrey' type='button' data-bs-toggle='collapse' id='f" + output[num][0] + "' data-bs-target='.reply" + output[num][0] + "' aria-expanded='false'><u>see more reply</u></a></div> <div class='col-1'><b>" + output[num][2] + "</b></div> <div class='col-2'>" + output[num][5] + "</div> <button class='col-1 btn btn-outline-success' type='button' data-bs-toggle='collapse' data-bs-target='.reply" + output[num][0] + "' aria-expanded='false'>reply</button> <button class='col-1 btn btn-outline-success  delete'  type='button' id=' " + output[num][0] + " '>delete</button> <button class='col-1 btn btn-outline-success  edit' data-bs-toggle='modal'  data-bs-target='.edit" + output[num][0] + "' type='button' id=' " + output[num][0] + " '>edit</button> ";
                        content += "<div class='modal fade edit" + output[num][0] + "' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>";
                        content += "<div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h5 class='modal-title' id='exampleModalLabel'>Edit Comment</h5>";
                        content += "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button></div>";
                        content += "<div class='modal-body'><form><div class='mb-3'><label for='edit_box' class='col-form-label'>New comment:</label><input type='text' class='form-control edit_box'></div> </form></div>";
                        content += "<div class='modal-footer'><button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancel</button><button type='button' class='btn btn-primary edit_comment ' value='" + output[num][0] + "' data-bs-dismiss='modal'>Sumbit</button></div></div></div></div>  </div></li>";

                    }
                    else{
                        content += "<div class='row'> <div class='col-6'> <a style='color:darkgrey' type='button' data-bs-toggle='collapse' id='f" + output[num][0] + "' data-bs-target='.reply" + output[num][0] + "' aria-expanded='false'><u>see more reply</u></a></div> <div class='col-1'><b>" + output[num][2] + "</b></div> <div class='col-2'>" + output[num][5] + "</div> <button class='col-1 btn btn-outline-success' type='button' data-bs-toggle='collapse' data-bs-target='.reply" + output[num][0] + "' aria-expanded='false'>reply</button> </div></li>";
                    }
                    
                    content += "<li class='list-group-item collapse reply" + output[num][0] + "'><div class='row'><b><label for='reply_box'>Reply</label></b><textarea class='form-control textarea mt-2 reply_box'></textarea></div><div class='mt-2 text-end'><button class='btn btn-primary send_reply' type='button' value='" + output[num][0] + "'>send</button></div></li>";

                }

                if(output[num][1]>=100){
                    
                    content += "<li class='list-group-item collapse reply" + output[num][1] + "'>";
                    content += "<div class='row' style='height:70px'><div>" + output[num][4] + "</div>";
                    if(output[num][2] == sess){
                        content += "<div class='row'> <div class='col-6'></div> <div class='col-1'><b>" + output[num][2] + "</b></div> <div class='col-2'>" + output[num][5] + "</div> "+ "<button class='col-1 btn btn-outline-success  delete' type='button' id=' " + output[num][0] + " '>delete</button> <button class='col-1 btn btn-outline-success  edit' data-bs-toggle='modal'  data-bs-target='.edit" + output[num][0] + "' type='button' id=' " + output[num][0] + " '>edit</button> ";
                        content += "<div class='modal fade edit" + output[num][0] + "' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>";
                        content += "<div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h5 class='modal-title' id='exampleModalLabel'>Edit Comment</h5>";
                        content += "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button></div>";
                        content += "<div class='modal-body'><form><div class='mb-3'><label for='edit_box' class='col-form-label'>New comment:</label><input type='text' class='form-control edit_box'></div> </form></div>";
                        content += "<div class='modal-footer'><button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancel</button><button type='button' class='btn btn-primary edit_comment ' value='" + output[num][0] + "' data-bs-dismiss='modal'>Sumbit</button></div></div></div></div>  </div></li>";
                    }
                    else{
                        content += "<div class='row'> <div class='col-6'></div> <div class='col-1'><b>" + output[num][2] + "</b></div> <div class='col-2'>" + output[num][5] + "</div></li> ";
                    }
                        
                }

            }

            $("#board").html(content);

            $(".send_reply").click(function() {

                alert("123");
                $.ajax({
                    type: "POST",
                    url: "reply.php",
                    data: {
                        parent: $(this).attr("value"),
                        content: $(this).closest('li').find('.reply_box').val()
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(thrownError);
        
                    },
                    success: function(output) {
                        //console.log(output);
                        window.location.href='http://localhost/web_hw1/Message_board.html';
                    }
                });
        
                
            }); 

            $(".delete").click(function() {

                alert("del");
                $.ajax({
                    type: "POST",
                    url: "delete_reply.php",
                    data: {
                        id: $(this).attr("id")
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(thrownError);
        
                    },
                    success: function(output) {
                        //console.log(output);
                        window.location.href='http://localhost/web_hw1/Message_board.html';
                       
                    }
                });
        
                
            }); 

            $(".edit_comment").click(function() {

                //alert("del");
                $.ajax({
                    type: "POST",
                    url: "edit_comment.php",
                    data: {
                        id: $(this).val(),
                        content: $(this).closest('li').find('.edit_box').val()
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(thrownError);
        
                    },
                    success: function(output) {
                        //console.log(output);
                        window.location.href='http://localhost/web_hw1/Message_board.html';
                       
                    }
                });
        
                
            }); 

        }
    });
}    



function refresh() {
    $.ajax({
        type: "POST",
        url: "showList.php",
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        },
        success: function(output) {
            output = $.parseJSON(output);
            console.log(output);
            var table = "";
            for (var num = 0; num < output.length; num++) {
                table += "<tr><td>" + output[num][1] + "</td>";
                table += "<td>" + output[num][3] + "</td>";
                table += "<td>" + output[num][4] + "</td>";
                table += "<td>" + output[num][5] + "</td></tr>";
            }

            $("#message_table").html(table);
        }
    });
}

function refresh_file() {
    $.ajax({
        type: "POST",
        url: "showFile.php",
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        },
        success: function(output) {
            output = $.parseJSON(output);
            console.log(output);
            var table = "";
            for (var num = 0; num < output.length; num++) {
                //var tmp = output[num][2];
                table += "<tr><td id='fname'>" + output[num][2] + "</td>";
                table += "<td>" + output[num][3] + "</td>";
                table += "<td>" + output[num][4] + "</td>";
                //table += "<td>" + "<input type='text'  id='mod_passwvdord'>" + "</td>" + "</tr>";
                table += "<td>" + "<button type = 'button' id='btn_edit' value='" + output[num][2] + "' class = 'btn btn-outline-primary' data-bs-toggle='modal' data-bs-target='#exampleModal'>edit</button> " +
                         "<a href='download2.php?file=" + output[num][2] + "' type = button id='download2' class = 'btn btn-outline-primary'> download</a>" +
                         "<button type = 'button' id='delete' class = 'btn btn-outline-primary' >delete</button> " + "<td>" + "</tr>";

            }

            $("#message_table").html(table);
        }
    });
}

