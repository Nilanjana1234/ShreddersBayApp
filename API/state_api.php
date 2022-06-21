<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
 //http://localhost:8000/SHREDDERSBAY_API/API/user_api.php?action=select
  session_start();
include("../DB.php");
$form_data = json_decode(file_get_contents("php://input"));
$data = array();
$error = array();




// if ($_REQUEST['action'] == 'select') {
//     $query = "SELECT * FROM tbl_state where country_id='".$_GET['country_id']."'";
//   $res = mysqli_query($con, $query);
//     while ($row = mysqli_fetch_assoc($res)) {
//         $data[] = $row;
        
//     }
//     echo json_encode($data);
// }

if ($_REQUEST['action'] == 'insert') {
    $country_id = $_POST['country_id']; 
	$state_name = $_POST['state_name']; 
    $country_idd= mysqli_real_escape_string($con, $country_id);
    $state_namee = mysqli_real_escape_string($con, $state_name);
    $query = "INSERT INTO tbl_state(country_id, state_name, status) VALUES ('$country_idd', '$state_namee', '1')";
    if (mysqli_query($con, $query)) {
        $data["message"] = "Data Inserted";
    }

    echo json_encode($data);
}

if ($_REQUEST['action'] == 'select') {
    $query = "SELECT * FROM tbl_state as state left join tbl_country as country on state.country_id = country.country_id where state.country_id='".$_GET['country_id']."'";
   $res = mysqli_query($con, $query);
    while ($row = mysqli_fetch_assoc($res)) {
        $data[] = $row;
        
    }
    echo json_encode($data);
}


if ($_REQUEST['action'] == 'select_id') {
    $query = "SELECT * FROM tbl_state as state left join tbl_country as country on state.country_id = country.country_id WHERE state_id='" . $_POST['state_id'] . "'";
   
    $res = mysqli_query($con, $query);
    $row = mysqli_fetch_array($res);
    $data[] = $row;


    echo json_encode($data);
}




if($_REQUEST['action']=='edit')
{
    $country_id = $_POST['country_id'];
    $state_name = $_POST['state_name'];
    $query = "UPDATE tbl_state SET country_id = '$country_id', state_name = '$state_name' WHERE state_id='".$_POST['state_id']."'";

    if(mysqli_query($con, $query))
    {
        $data["message"] = "Data Updated";         
    }
echo json_encode($data);
}



if ($_REQUEST['action'] == 'delete') {
    $state_id = (isset($_POST['state_id']) ? $_POST['state_id'] : '');

    $query = "DELETE from tbl_state  WHERE state_id='" . $state_id . "'";
    if (mysqli_query($con, $query)) {
        $data["message"] = "Deleted Successfully";
    }
    echo json_encode($data);
}
