<?php
	header('Access-Control-Allow-Origin: *');
	$conn=mysqli_connect("localhost","root","","web_hw");
	mysqli_query($conn,"set names utf8");

    session_start();
    date_default_timezone_set("Asia/Taipei");
    $parent = (int)$_POST['parent'];
    $username = $_SESSION["username"];
    $content = $_POST['content'];
    $timestamp = date('Y-m-d H:i:s');

    $sql = "SELECT `Num` FROM `board` WHERE `ID`='$parent'";
    $rsl = mysqli_query($conn, $sql);
    $tmp = mysqli_fetch_array($rsl);
    $tmp2 = $tmp["Num"] + $parent;

    $sql = " INSERT INTO `board`(`ID`, `Num`, `Name`, `Title`, `Content`, `Time`, `Main`) VALUES ('$tmp2', '$parent','$username', '123', '$content', '$timestamp', 0) ";

    mysqli_query($conn, $sql);

    $tmp["Num"] = $tmp["Num"] + 1;
    $tmp2 = $tmp["Num"];
    $sql = "UPDATE `board` SET `Num`='$tmp2', `Time`=`Time` WHERE `ID`= '$parent' ";

    mysqli_query($conn, $sql);

    
?>