<?php
	header('Access-Control-Allow-Origin: *');
	$conn=mysqli_connect("localhost","root","","web_hw");
	mysqli_query($conn,"set names utf8");


    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $gender = $_POST['gender'];
    $color = $_POST['color'];

    $sql = " INSERT INTO `web_data`(`ID`, `Name`, `Password`, `Gender`, `Color`, `Email`) 
            VALUES (0, '$username', '$password', '$gender', '$color', '$email') ";
    
    $sql2="SELECT * FROM `web_data` WHERE `Name`='$username'";
  

    $rsult=mysqli_query($conn, $sql2);      
    $count=mysqli_num_rows($rsult); 
    if($count==0){
        mysqli_query($conn, $sql);
        echo "1";
    }
    else{
        echo "0";
    }
    
?>