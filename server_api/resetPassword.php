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



if($postjson['aksi']=='forgotPassword'){
    $email = strval($postjson['email']);
    $search = mysqli_query($mysqli, "SELECT * FROM USER WHERE email='".$email."'");
    $row = mysqli_fetch_assoc($search);
    $hash = $row['hash'];
  
    // if($search) {
        $mail = new PHPmailer();
        $mail->SMTPDebug = 0;
        $mail->isSMTP(); // Paramétrer le Mailer pour utiliser SMTP 
        $mail->Host = 'smtp.ionos.fr'; // Spécifier le serveur SMTP
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls'; // Accepter SSLP
        $mail->SMTPAuth = true; // Activer authentication SMTP
        $mail->Username = 'contact@beyondthecourt.fr';
        $mail->Password = 'aq6kfhdYlm,'; // Le mot de passe de cette adresse email
        #$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->isHTML(true); // Define as HTML
      
      
        $mail->setFrom('contact@beyondthecourt.fr', 'TRAINIMM'); // Personnaliser l'envoyeur
        $mail->addAddress(strval($postjson[email]),''); // Ajouter le destinataire
      
      $mail->CharSet = 'UTF-8';
      $mail->Subject = 'Oubli de mot de passe pour le site TrainImm';
      //$mail->Body = 'Je pense que ça fonctionne <strong>enfin</strong>.';
      $mail->Body = '
      
      Cliquer ici pour choisir un nouveau mot de passe:
      https://selfit.univ-st-etienne.fr/trainimm/server_api/forgotPassword.php?email='.$email.'&hash='.$hash.'
      
      Si vous n\'avez pas demandé de réinitiliser votre mot de passe, merci de supprimer cet email.
      
      ';
      //$mail->AltBody = 'Je pense que ça fonctionne *enfin*.';
      $mail->send();
      
      // $subject = 'Oublie de mot de passe';
      // $sender = 'covid-fatigue@univ-st-etienne.fr';
      // $headers = 'From:' . $sender;
      // $message = '
      
      // Cliquer ici pour choisir un nouveau mot de passe:
      // http://www.localhost/COVID-19/server_api/forgotPassword.php?email='.$email.'&hash='.$hash.'
      
      // Si vous n avez pas demandé de réinitiliser votre mot de passe, merci de supprimer cet email.
      
      // ';
      // mail($email,$subject,$message,$headers);
  //     $result = json_encode(array('success' =>true, 'result'=>$datauser));
      
  //   } else {
  //     $result = json_encode(array('success' => false, 'msg'=>'error, please try again'));
  //   }
  echo $search;
    
  }

?>