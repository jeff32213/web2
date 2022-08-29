<?php
	header('Access-Control-Allow-Origin: *');
	$conn=mysqli_connect("localhost","root","","web_hw");
	mysqli_query($conn,"set names utf8");

    
    $fname = $_POST['fname'];
    $path = "upload/{$fname}";


    $sql = "DELETE FROM `save_file` WHERE `file_name` = '$fname' ";

    unlink($path);
    mysqli_query($conn, $sql);

?>