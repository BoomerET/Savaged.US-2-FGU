<?php
    $userAPI = $_GET['apikey'];
    $saveData = `curl -s -X POST -k 'https://savaged.us/_api/auth/get-saves' --data apikey=$userAPI `;
    print $saveData;
?>

