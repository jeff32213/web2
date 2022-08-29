<?php
	header('Access-Control-Allow-Origin: *');

    session_start();
    
    if($_SESSION["sub"]==0){
        $_SESSION["sub"]=1;
    }
    else{
        $_SESSION["sub"]=0;
    }

    echo $_SESSION['sub'];

?>