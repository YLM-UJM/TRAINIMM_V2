<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-type, Authorization, Accept, X-Requested-With, x-xsrf-token');
header('Content-type: application/json; charset=utf-8');

include "db.php"; 
$input = file_get_contents('php://input'); 
$data_receive = json_decode($input, true);
$queryid = isset($_GET['id']) ? $_GET['id'] : '';
$table = isset($_GET['table']) ? $_GET['table'] : '';
$champ = isset($_GET['champ']) ? $_GET['champ'] : '';
$data=array(); 
$q=mysqli_query($mysqli, "SELECT $champ FROM $table WHERE user_id=$queryid "); 

while ($row=mysqli_fetch_object($q)){
    $data[]=$row; 
    //$data['id'] = $queryid;

}
echo json_encode($data); 
echo mysqli_error($mysqli); 
?>