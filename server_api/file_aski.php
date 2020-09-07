<?php


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');



include "db.php";



$postjson = json_decode(file_get_contents('php://input'), true);
$today = date('Y-m-d');


if($postjson['events']=="events"){
  $query = mysqli_query($mysqli, "INSERT INTO EVENTS SET
  user_id              = '$postjson[user_id]',
  eventType = '$postjson[eventType]',
  date = '$postjson[date]',
  startTime = '$postjson[startTime]',
  endTime = '$postjson[endTime]',
  allDay = '$postjson[allDay]'

");

$answer = mysqli_query($mysqli, "SELECT MAX(unique_id) FROM EVENTS");
$row = mysqli_fetch_assoc($answer);
$unique_id = $row['MAX(unique_id)'];

  if ($postjson['eventType']=="ENTRAINEMENT") {
    $query2 = mysqli_query($mysqli, "INSERT INTO ENTRAINEMENT SET
    unique_id              = $unique_id,
    user_id = '$postjson[user_id]',
    modalite = '$postjson[modalite]',
    autre = '$postjson[autre]',
    duree = '$postjson[duree]',
    rating = '$postjson[rating]',
    type = '$postjson[type]',
    denivele = '$postjson[denivele]',
    distance = '$postjson[distance]',
    autre_session = '$postjson[autre_session]'
    ");
  }

  if ($postjson['eventType']=="HEBDOMADAIRE") {
    $query2 = mysqli_query($mysqli, "INSERT INTO HEBDOMADAIRE SET
    unique_id              = $unique_id,
    user_id = '$postjson[user_id]',
    poids = '$postjson[poids]',
    niveau_forme = '$postjson[niveau_forme]',
    blesse = '$postjson[blesse]',
    fatigue_generale = '$postjson[fatigue_generale]',
    douleurs_jambes = '$postjson[douleurs_jambes]',
    stress = '$postjson[stress]',
    parcours_habituel = '$postjson[parcours_habituel]',
    temps = '$postjson[temps]',
    fc = '$postjson[fc]'
    ");
  }

  if ($postjson['eventType']=="TEMPS DE REACTION") {
    $query2 = mysqli_query($mysqli, "INSERT INTO TEMPS_REACTION SET
    unique_id              = $unique_id,
    user_id = '$postjson[user_id]',
    TR1 = '$postjson[TR1]',
    TR2 = '$postjson[TR2]',
    TR3 = '$postjson[TR3]',
    TR4 = '$postjson[TR4]',
    TR5 = '$postjson[TR5]',
    TR6 = '$postjson[TR6]',
    TR7 = '$postjson[TR7]',
    TR8 = '$postjson[TR8]',
    TR9 = '$postjson[TR9]',
    TR10 = '$postjson[TR10]',
    TR11 = '$postjson[TR11]',
    TR12 = '$postjson[TR2]'
    ");
  }

  if ($postjson['eventType']=="SOMMEIL") {
    $query2 = mysqli_query($mysqli, "INSERT INTO SOMMEIL SET
    unique_id              = $unique_id,
    user_id = '$postjson[user_id]',
    Q1       = '$postjson[Q1]', 
    Q2        = '$postjson[Q2]',
    Q3       = '$postjson[Q3]', 
    Q4        = '$postjson[Q4]',
    Q5       = '$postjson[Q5]', 
    Q6        = '$postjson[Q6]',
    Q7        = '$postjson[Q7]',
    Q8       = '$postjson[Q8]', 
    Q9        = '$postjson[Q9]'
    ");
  }

  if ($postjson['eventType']=="BLESSURE") {
    $query2 = mysqli_query($mysqli, "INSERT INTO BLESSURE SET
    unique_id              = $unique_id,
    user_id = '$postjson[user_id]',
    Q1       = '$postjson[Q1]', 
    Q2        = '$postjson[Q2]',
    Q3       = '$postjson[Q3]', 
    Q4        = '$postjson[Q4]',
    Q5       = '$postjson[Q5]', 
    Q6        = '$postjson[Q6]',
    Q7        = '$postjson[Q7]',
    Q8       = '$postjson[Q8]', 
    Q9        = '$postjson[Q9]',
    Q10       = '$postjson[Q10]',
    Q11        = '$postjson[Q11]',
    Q12       = '$postjson[Q12]' 
    ");
  }

  if ($postjson['eventType']=="SURENTRAINEMENT") {
    $query2 = mysqli_query($mysqli, "INSERT INTO SURENTRAINEMENT SET
    unique_id              = $unique_id,
    user_id = '$postjson[user_id]',
    Q1       = '$postjson[Q1]', 
    Q2        = '$postjson[Q2]',
    Q3       = '$postjson[Q3]', 
    Q4        = '$postjson[Q4]',
    Q5       = '$postjson[Q5]', 
    Q6        = '$postjson[Q6]',
    Q7        = '$postjson[Q7]',
    Q8       = '$postjson[Q8]', 
    Q9        = '$postjson[Q9]',
    Q10       = '$postjson[Q10]', 
    Q11        = '$postjson[Q11]',
    Q12       = '$postjson[Q12]', 
    Q13        = '$postjson[Q13]',
    Q14        = '$postjson[Q14]',
    Q15       = '$postjson[Q15]', 
    Q16        = '$postjson[Q16]',
    Q17       = '$postjson[Q17]', 
    Q18        = '$postjson[Q18]',
    Q19       = '$postjson[Q19]', 
    Q20        = '$postjson[Q20]',
    Q21       = '$postjson[Q21]', 
    Q22        = '$postjson[Q22]',
    Q23       = '$postjson[Q23]', 
    Q24        = '$postjson[Q24]',
    Q25       = '$postjson[Q25]', 
    Q26        = '$postjson[Q26]',
    Q27        = '$postjson[Q27]',
    Q28       = '$postjson[Q28]', 
    Q29        = '$postjson[Q29]',
    Q30       = '$postjson[Q30]', 
    Q31        = '$postjson[Q31]',
    Q32       = '$postjson[Q32]', 
    Q33        = '$postjson[Q33]',
    Q34        = '$postjson[Q34]',
    Q35       = '$postjson[Q35]', 
    Q36        = '$postjson[Q36]',
    Q37       = '$postjson[Q37]', 
    Q38        = '$postjson[Q38]',
    Q39       = '$postjson[Q39]', 
    Q40        = '$postjson[Q40]',
    Q41       = '$postjson[Q41]', 
    Q42        = '$postjson[Q42]',
    Q43       = '$postjson[Q43]', 
    Q44        = '$postjson[Q44]',
    Q45       = '$postjson[Q45]', 
    Q46        = '$postjson[Q46]',
    Q47        = '$postjson[Q47]',
    Q48       = '$postjson[Q48]', 
    Q49        = '$postjson[Q49]',
    Q50       = '$postjson[Q50]', 
    Q51        = '$postjson[Q51]',
    Q52       = '$postjson[Q52]', 
    Q53        = '$postjson[Q53]',
    Q54        = '$postjson[Q54]',
    Q55       = '$postjson[Q55]', 
    Q56        = '$postjson[Q56]',
    Q57       = '$postjson[Q57]', 
    Q58        = '$postjson[Q58]',
    Q59       = '$postjson[Q59]', 
    Q60        = '$postjson[Q60]'
    ");
    //for ($i = 1; $i < 2; $i++) {
    //   $attribute = 'Q1';
    //   $query3 = mysqli_query($mysqli, "INSERT INTO SURENTRAINEMENT SET
    //   Q1 = '$postjson[Q1]'
    // ");
    //}

  }

if($query2) $result = json_encode(array('unique_id' => intval($unique_id)));
else $result = json_encode(array('success' => false, 'msg'=>'error , please try again', 'error'=>$mysqli->error));
echo $result;
}

else if($postjson['type']=="CIRCUIT"){
  $query = mysqli_query($mysqli, "INSERT INTO SEANCES SET
  user_id              = '$postjson[user_id]',
  type = '$postjson[type]',
  titre = '$postjson[titre]',
  score_endurance = '$postjson[score_endurance]',
  score_force = '$postjson[score_force]',
  score_agilite = '$postjson[score_agilite]',
  niveau = '$postjson[niveau]',
  echauffement = '$postjson[echauffement]',
  modalite = '$postjson[modalite]',
  exo1_modalite = '$postjson[exo1_modalite]',
  exo1 = '$postjson[exo1]',
  exo1_perso = '$postjson[exo1_perso]',
  exo1_nb_rep = '$postjson[exo1_nb_rep]',
  exo1_tps_rep = '$postjson[exo1_tps_rep]',
  exo1_distance = '$postjson[exo1_distance]',
  exo1_commentaire = '$postjson[exo1_commentaire]',
  exo2_modalite = '$postjson[exo2_modalite]',
  exo2 = '$postjson[exo2]',
  exo2_perso = '$postjson[exo2_perso]',
  exo2_nb_rep = '$postjson[exo2_nb_rep]',
  exo2_tps_rep = '$postjson[exo2_tps_rep]',
  exo2_distance = '$postjson[exo2_distance]',
  exo2_commentaire = '$postjson[exo2_commentaire]',
  nb_bloc = '$postjson[nb_bloc]',
  recup_bloc = '$postjson[recup_bloc]',
  commentaire_ge = '$postjson[commentaire_ge]',
  recup_petite = '$postjson[recup_petite]',
  recup_type = '$postjson[recup_type]'
");

$answer = mysqli_query($mysqli, "SELECT MAX(unique_id) FROM SEANCES");
$row = mysqli_fetch_assoc($answer);
$unique_id = $row['MAX(unique_id)'];
if($query) $result = json_encode(array('unique_id' => intval($unique_id)));
else $result = json_encode(array('success' => false, 'msg'=>'error , please try again', 'error'=>$mysqli->error));
echo $result;
}


else if($postjson['type']=="SEANCE PERSONNALISE"){
  $query = mysqli_query($mysqli, "INSERT INTO SEANCES SET
  user_id              = '$postjson[user_id]',
  type = '$postjson[type]',
  score_endurance = '$postjson[score_endurance]',
  score_force = '$postjson[score_force]',
  score_agilite = '$postjson[score_agilite]',
  niveau = '$postjson[niveau]',
  echauffement = '$postjson[echauffement]',
  custom_seance = '$postjson[custom_seance]'

");

$answer = mysqli_query($mysqli, "SELECT MAX(unique_id) FROM SEANCES");
$row = mysqli_fetch_assoc($answer);
$unique_id = $row['MAX(unique_id)'];
if($query) $result = json_encode(array('unique_id' => intval($unique_id)));
else $result = json_encode(array('success' => false, 'msg'=>'error , please try again', 'error'=>$mysqli->error));
echo $result;
}


else if($postjson['type']=="COURSE"){
  $query = mysqli_query($mysqli, "INSERT INTO SEANCES SET
  user_id              = '$postjson[user_id]',
  type = '$postjson[type]',
  score_endurance = '$postjson[score_endurance]',
  score_force = '$postjson[score_force]',
  score_agilite = '$postjson[score_agilite]',
  niveau = '$postjson[niveau]',
  echauffement = '$postjson[echauffement]',
  commentaire_ge = '$postjson[commentaire_ge]',

  temps_course = '$postjson[temps_course]',
  course_intensite = '$postjson[intensite]',
  temps_course_custom = '$postjson[temps_effort_autre]',
  recup_petite = '$postjson[temps_recup]',
  type_recup = '$postjson[type_recup]',
  temps_recup_autre = '$postjson[temps_recup_autre]',
  nb_bloc = '$postjson[nb_bloc]',
  recup_bloc = '$postjson[recup_bloc]'

");

$answer = mysqli_query($mysqli, "SELECT MAX(unique_id) FROM SEANCES");
$row = mysqli_fetch_assoc($answer);
$unique_id = $row['MAX(unique_id)'];
if($query) $result = json_encode(array('unique_id' => intval($unique_id)));
else $result = json_encode(array('success' => false, 'msg'=>'error , please try again', 'error'=>$mysqli->error));
echo $result;
}




?>
    
    
    
    
    