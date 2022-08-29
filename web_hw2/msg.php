<?php
	header('Access-Control-Allow-Origin: *');
	$conn=mysqli_connect("localhost","root","","web_hw");
	mysqli_query($conn,"set names utf8");

    session_start();
    date_default_timezone_set("Asia/Taipei");
    //$floor = $_POST['floor'];
    $username = $_SESSION["username"];
    $title = $_POST['title'];
    $content = $_POST['content'];
    $timestamp = date('Y-m-d H:i:s');

    $sql = " SELECT `ID` FROM `board` WHERE `Main`=1 ORDER BY id DESC LIMIT 1";

    $send = mysqli_query($conn, $sql);
    $rs = mysqli_fetch_array($send);
    $num = mysqli_num_rows($send);

    $tmp = $rs["ID"];
    $tmp = $tmp + 100;

    $sql = " INSERT INTO `board`(`ID`, `Num`, `Name`, `Title`, `Content`, `Time`, `Main`) VALUES ('$tmp', 1,'$username', '$title', '$content', '$timestamp', 1) ";


    mysqli_query($conn, $sql);

    
?>