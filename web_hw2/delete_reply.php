<?php
	header('Access-Control-Allow-Origin: *');
	$conn=mysqli_connect("localhost","root","","web_hw");
	mysqli_query($conn,"set names utf8");

    $id = (int)$_POST['id'];

    $sql = "DELETE FROM `board` WHERE `ID` = '$id' ";

    mysqli_query($conn, $sql);


    
?>