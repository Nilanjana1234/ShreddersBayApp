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



if ($_REQUEST['action'] == 'insert') {
    $country_id =  $_POST['country_id'];
    $state_id =  $_POST['state_id'];
    $city_name =  $_POST['city_name'];
    $query = "INSERT INTO tbl_city(country_id, state_id, city_name, status) VALUES ('$country_id', '$state_id', '$city_name', '1')";
    if (mysqli_query($con, $query)) {
        $data["message"] = "Data Inserted";
    }

    echo json_encode($data);
}


if ($_REQUEST['action'] == 'select') {
    $query = "SELECT * FROM tbl_city as city left join tbl_country as country on country.country_id=city.country_id left join tbl_state as state on state.state_id=city.state_id ";
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


if ($_REQUEST['action'] == 'select_id') {
    $query = "SELECT * FROM tbl_city as city left join tbl_country as country on country.country_id=city.country_id left join tbl_state as state on state.state_id=city.state_id  WHERE city_id='" . $_POST['city_id'] . "'";
   
    $res = mysqli_query($con, $query);
    $row = mysqli_fetch_assoc($res);
    $data[] = $row;


    echo json_encode($data);
}



if($_REQUEST['action']=='edit')
{
    $country_id = $_POST['country_id'];
    $state_id = $_POST['state_id'];
        $city_name = $_POST['city_name'];

    $query = "UPDATE tbl_city SET country_id = '$country_id', state_id = '$state_id', city_name= '$city_name' WHERE city_id='".$_POST['city_id']."'";

    if(mysqli_query($con, $query))
    {
        $data["message"] = "Data Updated";         
    }
echo json_encode($data);
}


if ($_REQUEST['action'] == 'delete') {
    $city_id = (isset($_POST['city_id']) ? $_POST['city_id'] : '');
    $query = "DELETE from tbl_city  WHERE city_id='" . $city_id . "'";
    // echo $query;
    // exit();
    if (mysqli_query($con, $query)) {
        $data["message"] = "Deleted Successfully";
    }
    echo json_encode($data);
}