<?php
	header('Access-Control-Allow-Origin: *');
	$conn=mysqli_connect("localhost","root","","web_hw");
	mysqli_query($conn,"set names utf8");


    $username = $_POST['username'];
    $password = $_POST['password'];
    
    $sql="SELECT * FROM `web_data` WHERE `Name`='$username'";
    
    $rsult=mysqli_query($conn, $sql);      
    
    $row = mysqli_fetch_row($rsult);

    if($row[2] == $password){
        session_start();
        $_SESSION["username"] = $username;
        $_SESSION["sub"] = 0;
        echo "1";

        
    }
    else{
        echo "0";
    }

    
?>