<?php
	header('Access-Control-Allow-Origin: *');
	$conn=mysqli_connect("localhost","root","","web_hw");
	mysqli_query($conn,"set names utf8");


    $old_fname = $_POST['old_fname'];
    $new_fname = $_POST['new_fname'];


    $sql1 = "UPDATE `save_file` SET `file_name`='$new_fname'  WHERE `file_name`= '$old_fname' ";
    
    $sql2="SELECT * FROM `save_file` WHERE `file_name`='$new_fname' ";
  

    $rsult=mysqli_query($conn, $sql2);      
    $count=mysqli_num_rows($rsult); 
    if($count==0){
        mysqli_query($conn, $sql1);
        //rename
        rename("upload/{$old_fname}", "upload/{$new_fname}");
       
    }
    
     
    
?>