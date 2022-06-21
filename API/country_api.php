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



// if ($_REQUEST['action'] == 'insert') {
//     $country_name = mysqli_real_escape_string($con, $form_data->country_name);
//     $country_code = mysqli_real_escape_string($con, $form_data->country_code);
//     $query = "INSERT INTO tbl_country(country_name, country_code, status) VALUES ('$country_name', '$country_code', '1')";
//     if (mysqli_query($con, $query)) {
//         $data["message"] = "Data Inserted";
//     }

//     echo json_encode($data);
// }



if ($_REQUEST['action'] == 'insert') {
    $country_name = $_POST['country_name']; 
	$country_code = $_POST['country_code']; 
    $country_namee = mysqli_real_escape_string($con,$country_name);
    $country_codee = mysqli_real_escape_string($con, $country_code);
    $query = "INSERT INTO tbl_country(country_name, country_code, status) VALUES ('$country_namee', '$country_codee', '1')";
    if (mysqli_query($con, $query)) {
        $data["message"] = "Data Inserted";
    }

    echo json_encode($data);
}

if ($_REQUEST['action'] == 'select') {
    $query = "SELECT * FROM tbl_country";
    $res = mysqli_query($con, $query);
    while ($row = mysqli_fetch_assoc($res)) {
        $data[] = $row;
        // $data['name'] = $row['name'];
        // $data['email'] = $row['email'];
        // $data['mobile'] = $row['mobile'];
        // $data['date'] = $row['date'];
    }
            echo json_encode($data);

}




// if ($_REQUEST['action'] == 'select_id') {
//     $query = "SELECT * FROM tbl_country WHERE id='" . $form_data->id . "'";
//     echo "$query";
//     $res = mysqli_query($con, $query);
//     $row = mysqli_fetch_array($res);
//     $data['country_name'] = $row['country_name'];
//     $data['country_code'] = $row['country_code'];

//     echo json_encode($data);
// }


if ($_REQUEST['action'] == 'select_id') {
    $query = "SELECT * FROM tbl_country WHERE country_id='" . $_POST['country_id'] . "'";
   
    $res = mysqli_query($con, $query);
    $row = mysqli_fetch_array($res);
    $data[] = $row;


    echo json_encode($data);
}
if($_REQUEST['action']=='edit')
{
    $country_code = $_POST['country_code'];
    $country_name = $_POST['country_name'];
    $query = "UPDATE tbl_country SET country_code = '$country_code', country_name = '$country_name' WHERE country_id='".$_POST['country_id']."'";

    if(mysqli_query($con, $query))
    {
        $data["message"] = "Data Updated";         
    }
echo json_encode($data);
}


if ($_REQUEST['action'] == 'delete')
 {
    $country_id = (isset($_POST['country_id']) ? $_POST['country_id'] : '');
   
    $query = "DELETE from tbl_country  WHERE country_id='".$country_id."'";
  
    if (mysqli_query($con, $query)) {
        $data["message"] = "Deleted Successfully";
    }
    echo json_encode($data);
}
