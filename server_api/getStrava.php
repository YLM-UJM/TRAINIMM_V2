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

$data=array(); 
$q=mysqli_query($mysqli, "SELECT * FROM STRAVA WHERE user_id=$queryid"); 

while ($row=mysqli_fetch_object($q)){
    $data[]=$row; 
    //$data['id'] = $queryid;

}
// echo json_encode($data); 
// echo mysqli_error($mysqli); 
if($q) $result = json_encode(array('success' => 'ok'));
else $result = json_encode(array('success' => false, 'msg'=>'error , please try again', 'error'=>$mysqli->error));
echo json_encode($data);
?>