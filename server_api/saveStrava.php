<?php


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');



include "db.php";



$postjson = json_decode(file_get_contents('php://input'), true);
$today = date('Y-m-d');


if($postjson['aski']=="stravaData"){
  $query = mysqli_query($mysqli, "INSERT INTO STRAVA SET
  user_id = '$postjson[user_id]',
  access_token = '$postjson[access_token]',
  refresh_token = '$postjson[refresh_token]',
  expires_at = '$postjson[expires_at]',
  expires_in = '$postjson[expires_in]',
  code = '$postjson[code]'

");

if($query) $result = json_encode(array('success' => 'ok'));
else $result = json_encode(array('success' => false, 'msg'=>'error , please try again', 'error'=>$mysqli->error));
echo $result;

}

if($postjson['aski']=="saveStravaCode"){
    $query = mysqli_query($mysqli, "INSERT INTO STRAVA SET
    user_id              = '$postjson[user_id]',
    code = '$postjson[code]'
  
  ");
  
  if($query) $result = json_encode(array('success' => 'ok'));
  else $result = json_encode(array('success' => false, 'msg'=>'error , please try again', 'error'=>$mysqli->error));
  echo $result;
  
  }

  if($postjson['aski']=="updateToken"){
    $query = mysqli_query($mysqli, "UPDATE STRAVA SET
    refresh_token = '$postjson[refresh_token]',
    access_token = '$postjson[access_token]',
    expires_at = '$postjson[expires_at]',
    expires_in = '$postjson[expires_in]'
    WHERE user_id = '$postjson[user_id]'

  ");
  
  if($query) $result = json_encode(array('success' => 'ok'));
  else $result = json_encode(array('success' => false, 'msg'=>'error , please try again', 'error'=>$mysqli->error));
  echo $result;
  
  }

?>
    
    
    
    
    