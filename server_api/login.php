<?php


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');



include "db.php";



$postjson = json_decode(file_get_contents('php://input'), true);
$today = date('Y-m-d');


if($postjson['aksi'] == "login") {
  $iterations = 1000;
  $password = hash_pbkdf2("sha256", $postjson['password'], $salt, $iterations, 20);
  $query = mysqli_query($mysqli, "SELECT * FROM USER WHERE email='$postjson[email]' AND password='$password' AND active='1' 
");
$check = mysqli_num_rows($query);


if($check>0){
  $data = mysqli_fetch_array($query);
  $datauser = array(
    'user_id' => $data['user_id'],
    'nom' => $data['nom'],
    'prenom' => $data['prenom'],
    'expiration' => '172800',
    'token' => strval(rand())
  );

  // if($postjson['stravaCode']) {
  //   $queryStrava = mysqli_query($mysqli, "INSERT INTO STRAVA SET
  //   user_id = '$data[user_id]',
  //   code = '$postjson[stravaCode]'
  
  // ");
  // }

  if($query) $result = json_encode(array('success' =>true, 'result'=>$datauser));
  else $result = json_encode(array('success' => false, 'msg'=>'error, please try again'));
  
  }else{
    $result = json_encode(array('success' => false, 'msg'=>'unregister account'));
  }

echo $result;
}

?>