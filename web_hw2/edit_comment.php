<?php
	header('Access-Control-Allow-Origin: *');
	$conn=mysqli_connect("localhost","root","","web_hw");
	mysqli_query($conn,"set names utf8");

    session_start();
    date_default_timezone_set("Asia/Taipei");

    $id = $_POST['id'];
    $content = $_POST['content'];
    $timestamp = date('Y-m-d H:i:s');

    $sql = "UPDATE `board` SET `Content`='$content' WHERE `ID`= '$id' ";

    mysqli_query($conn, $sql);

?>