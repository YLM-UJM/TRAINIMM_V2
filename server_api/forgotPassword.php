<?php

// define('DB_NAME', 'COVID-19');
// define('DB_USER', 'root');
// define('DB_PASSWORD', 'admin');
// define('DB_HOST', 'localhost');

// $mysqli = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die("could not connect DB"); 
include "db.php";
$email = strval($_GET['email']);
//echo $email;


if (isset($_POST['new_password'])) {

	$new_pass = mysqli_real_escape_string($mysqli, $_POST['new_pass']);
    // $new_pass_c = mysqli_real_escape_string($mysqli, $_POST['new_pass_c']);
	
	      if ($email) {
    $iterations = 1000;
    $password = hash_pbkdf2("sha256", $new_pass, $salt, $iterations, 20);
		$query = mysqli_query($mysqli, "UPDATE USER SET password='$new_pass' WHERE email='$email'");
		
		if($query) $result = json_encode(array('success' =>true));
		//header('location: confirmPasswordChange.php');
		header("Location: https://selfit.univ-st-etienne.fr/trainimm");
		
		
      }	

//     $new_pass = mysqli_real_escape_string($db, $_POST['new_pass']);
//     $new_pass_c = mysqli_real_escape_string($db, $_POST['new_pass_c']);
  
//     // Grab to token that came from the email link
//     $token = $_SESSION['token'];
//     if (empty($new_pass) || empty($new_pass_c)) array_push($errors, "Password is required");
//     if ($new_pass !== $new_pass_c) array_push($errors, "Password do not match");
//     if (count($errors) == 0) {
//       // select email address of user from the password_reset table 
//       $sql = "SELECT email FROM password_reset WHERE token='$token' LIMIT 1";
//       $results = mysqli_query($db, $sql);
//       $email = mysqli_fetch_assoc($results)['email'];
  
//       if ($email) {
//         $new_pass = md5($new_pass);
//         $sql = "UPDATE users SET password='$new_pass' WHERE email='$email'";
//         $results = mysqli_query($db, $sql);
//         header('location: index.php');
//       }
//     }
   }

?>

<!DOCTYPE html>
<html lang="en">
<head>

<style>

body {
	/* background: #3b5998; */
	background: white;
	font-size: 1.1em;
	font-family: sans-serif;
	background-repeat: no-repeat;
	background-size: cover;
	/* background-image: url('https://resize.prod.docfr.doc-media.fr/r/720,480,center-middle,ffffff,smartcrop/img/var/doctissimo/storage/images/fr/www/sante/fatigue/fatigue-chronique/fatigue-chronique2/236571-2-fre-FR/fatigue-chronique.jpg') */
}
a {
	text-decoration: none;
}
form {
	width: 25%;
	margin: 70px auto;
	background: white;
	padding: 10px;
	border-radius: 3px;
}
h2.form-title {
	text-align: center;
}
input {
	display: block;
	box-sizing: border-box;
	width: 100%;
	padding: 8px;
}
form .form-group {
	margin: 10px auto;
}
form button {
	width: 100%;
	border: none;
	color: white;
	background: #3b5998;
	padding: 15px;
	border-radius: 5px;
}
.msg {
	margin: 5px auto;
	border-radius: 5px;
	border: 1px solid red;
	background: pink;
	text-align: left;
	color: brown;
	padding: 10px;
}

</style>
	<meta charset="UTF-8">
	<title>Réinitialisation de mot de passe </title>
	<link rel="stylesheet" href="main.css">
</head>
<body>
	<form class="login-form" method="post">
		<h2 class="form-title">Nouveau mot de passe</h2>
		<!-- form validation messages -->
		<div class="form-group">
			<label>Nouveau mot de passe</label>
			<input type="password" name="new_pass" >
		</div>
		<!-- <div class="form-group">
			<label>Confirmer nouveau mot de passe</label>
			<input type="password" name="new_pass_c" >
		</div> -->
		<div class="form-group">
			<button   type="submit" name="new_password" class="login-btn">Envoyer</button>
		</div>
	</form>

	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
	<script>


	</script>
</body>
</html>