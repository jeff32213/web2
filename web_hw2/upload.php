
<?php
    session_start();
	header('Access-Control-Allow-Origin: *');
	$conn=mysqli_connect("localhost","root","","web_hw");
	mysqli_query($conn,"set names utf8");

    date_default_timezone_set("Asia/Taipei"); 
    $timestamp = date('Y-m-d H:i:s');

    $filename = $_FILES['file']['name'];
    $filesize = $_FILES['file']['size'];


    $sql = " INSERT INTO `save_file`(`ID`, `Name`, `file_name`, `file_size`, `timestamp`) 
            VALUES (0, '" .$_SESSION["username"]. "', '$filename', '$filesize', '$timestamp') ";
    
    $sql2="SELECT * FROM `save_file` WHERE `file_name`='$filename'";
  

    $rsult=mysqli_query($conn, $sql2);      
    $count=mysqli_num_rows($rsult); 
    if($count==0){
        mysqli_query($conn, $sql);
        move_uploaded_file($_FILES['file']['tmp_name'], 'upload/' . $_FILES['file']['name']);
        echo "upload success!";
    }
    else{
        echo "data exist, sorry";
    }
    
?>