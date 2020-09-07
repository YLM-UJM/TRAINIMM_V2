<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');

include "db.php";


//$mysqli = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die("could not connect DB"); 

         if(isset($_GET['email']) && !empty($_GET['email']) AND isset($_GET['hash']) && !empty($_GET['hash'])){
            // Verify data
            // echo 'verify data';
            $email = strval($_GET['email']); // Set email variable
            // echo $email;
            $hash = strval($_GET['hash']); // Set hash variable

            $search = mysqli_query($mysqli, "SELECT * FROM USER WHERE email='".$email."' AND hash='".$hash."' AND active='0'") or die(mysqli_error()); 
            $match  = mysqli_num_rows($search);


// echo $match; // Display how many matches have been found -> remove this when done with testing ;)

if($match > 0){
    // We have a match, activate the account
    mysqli_query($mysqli, "UPDATE USER SET active='1' WHERE email='".$email."' AND hash='".$hash."' AND active='0'") or die(mysqli_error());
//echo '<div class="statusmsg">Your account has been activated, you can now login</div>';
//setcookie("TestCookie", "test");
header("Location: https://selfit.univ-st-etienne.fr/trainimm/?email='valide'");

}else{
    $search2 = mysqli_query($mysqli, "SELECT * FROM USER WHERE email='".$email."' AND hash='".$hash."' AND active='1'") or die(mysqli_error()); 
    $match  = mysqli_num_rows($search2);

    if($match > 0){
        echo 'Votre compte est déjà activé.';
    } else {
        echo "Une erreur s'est produite, nous sommes désolées pour la gêne occassionée. Veuillez nous contacter, merci.";
    }

    


    // No match -> invalid url or account has already been activated.
    
}
        } else {
            
        }



          
             
        ?>
