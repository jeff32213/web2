<?php
	header('Access-Control-Allow-Origin: *');
    
	$conn=mysqli_connect("localhost","root","","web_hw");
	mysqli_query($conn,"set names utf8");

    $sql = "SELECT * FROM `board`";
    $send = mysqli_query($conn, $sql);
        
    $rs = mysqli_fetch_row($send);
    $num = mysqli_num_rows($send);
    $json_arr = array();

    session_start();
    $json_arr[0] = $_SESSION["username"];

    for($i = 1;$i<$num+1;$i++){
        $json_arr[$i] = $rs;
        $rs = mysqli_fetch_row($send);
    }

    echo json_encode($json_arr);

?>