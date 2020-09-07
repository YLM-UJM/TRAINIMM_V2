<?php


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');



include "db.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';



$postjson = json_decode(file_get_contents('php://input'), true);
$today = date('Y-m-d');


if($postjson['aksi'] == "add_register") {
    $iterations = 1000;
    $password = hash_pbkdf2("sha256", $postjson['password'], $salt, $iterations, 20);
    $email = strval($postjson['email']);
    $prenom = strval($postjson['prenom']);
    $hash = md5(rand(0,1000));
    $query = mysqli_query($mysqli, "INSERT INTO USER SET 
    nom       = '$postjson[nom]',
    prenom        = '$postjson[prenom]',
    sexe       = '$postjson[sexe]',
    email        = '$postjson[email]',
    hash         =  '$hash',  
    password        = '$password'
  ");

$mail = new PHPmailer();
$mail->SMTPDebug = 0;
$mail->isSMTP(); // Paramétrer le Mailer pour utiliser SMTP
$mail->Host = 'smtp.univ-st-etienne.fr'; // Spécifier le serveur SMTP
$mail->SMTPAuth = false; // Activer authentication SMTP
$mail->setFrom('yann.lemat@univ-st-etienne.fr', 'TRAINIMM'); // Personnaliser l'envoyeur
$mail->addAddress(strval($postjson[email]),''); // Ajouter le destinataire
$mail->isHTML(true); // Define as HTML


// $mail = new PHPmailer();
// $mail->SMTPDebug = 0;
// $mail->isSMTP(); // Paramétrer le Mailer pour utiliser SMTP 
// $mail->Host = 'smtp.ionos.fr'; // Spécifier le serveur SMTP
// $mail->Port = 587;
// $mail->SMTPSecure = 'tls'; // Accepter SSLP
// $mail->SMTPAuth = true; // Activer authentication SMTP
// $mail->Username = 'no_reply@trainimm.fr';
// $mail->Password = 'no_reply_trainimm_V1,'; // Le mot de passe de cette adresse email
// #$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
// $mail->isHTML(true); // Define as HTML


// $mail->setFrom('no_reply@trainimm.fr', 'TRAINIMM'); // Personnaliser l'envoyeur
// $mail->addAddress(strval($postjson[email]),''); // Ajouter le destinataire
// $mail->addCCi('yannlemat.perso@gmail.com','Beyond the court');
#$mail->addCC('yann.lemat@univ-st-etienne.fr','Yann Le Mat');
//$mail->addReplyTo('djahid.kennouche@univ-st-etienne.fr', 'Djahid Kennouche'); // L'adresse de réponse

#$mail->addAttachment('/var/tmp/file.tar.gz'); // Ajouter un attachement
#$mail->addAttachment('/tmp/image.jpg', 'new.jpg');
#$mail->isHTML(true); // Paramétrer le format des emails en HTML ou non

$mail->CharSet = 'UTF-8';
$mail->Subject = 'TRAINIMM - Validation de votre email';
//$mail->Body = 'Je pense que ça fonctionne <strong>enfin</strong>.';
$mail->Body = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
   <style>

   .button {
      background-color: #ff8138; /* Green */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      border-radius: 10px;
      width:50%;
      margin-left:25%;
    }

    h3{
       text-align:center;
       display: block;
    }

    input{
      background-color:#ff8138;
      border:0px;
      border-radius:10px;
      height:35px;
      color: white;
    }


   </style>
</head>
<body>


Cliquer sur le lien ci-dessous pour valider votre compte : 

https://selfit.univ-st-etienne.fr/trainimm/server_api/verify.php?email='.$email.'&hash='.$hash.'


    


</body>
</html>';
// $mail->Body = '

// Pour vérifier votre email cliquer sur le lien ci-dessous, vous pourrez ensuite vous connecter sur le site:
// http://localhost/BTC/server_api/verify.php?email='.$email.'&hash='.$hash.'


// Si vous ne vous êtes pas inscrits sur le site fatigue-covid, vous pouvez supprimer cet email.

// ';
//$mail->AltBody = 'Je pense que ça fonctionne *enfin*.';
$mail->send();




if($query) $result = json_encode(array('success' =>true));
else $result = json_encode(array('success' => false, 'msg'=>'error , please try again', 'error'=>$mysqli->error));

 echo $result;

}

?>