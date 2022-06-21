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
    $city_id = $_POST['city_id'];
    $area_name =  $_POST['area_name'];
    $query = "INSERT INTO tbl_area(country_id, state_id, city_id, area_name, status) VALUES ('$country_id', '$state_id', '$city_id', '$area_name', '1')";
    if (mysqli_query($con, $query)) {
        $data["message"] = "Data Inserted";
    }

    echo json_encode($data);
}


if ($_REQUEST['action'] == 'select') {
    $query = "SELECT * FROM tbl_area as area left join tbl_country as country on country.country_id=area.country_id left join tbl_state as state on state.state_id=area.state_id left join tbl_city as city on city.city_id=area.city_id";
    $res = mysqli_query($con, $query);
    while ($row = mysqli_fetch_assoc($res)) {
        $data[] = $row;
    }
            echo json_encode($data);

}




if ($_REQUEST['action'] == 'select_id') {
    $query = "SELECT * FROM tbl_area WHERE area_id='" . $_POST['area_id'] . "'";
   
    $res = mysqli_query($con, $query);
    $row = mysqli_fetch_assoc($res);
    $data[] = $row;


    echo json_encode($data);
}



// if ($_REQUEST['action'] == 'select_id') {
//     $query = "SELECT * FROM tbl_area WHERE id='" . $form_data->id . "'";
//     echo "$query";
//     $res = mysqli_query($con, $query);
//     $row = mysqli_fetch_array($res);
//     $data['country_id'] = $row['country_id'];
//     $data['state_id'] = $row['state_id'];
//     $data['city_id'] = $row['city_id'];
//     $data['area_name'] = $row['area_name'];

//     echo json_encode($data);
// }


if($_REQUEST['action']=='edit')
{
    $country_id = $_POST['country_id'];
    $state_id = $_POST['state_id'];
        $city_id = $_POST['city_id'];
        $area_name = $_POST['area_name'];

    $query = "UPDATE tbl_area SET country_id = '$country_id', state_id = '$state_id', city_id= '$city_id', area_name= '$area_name' WHERE area_id='".$_POST['area_id']."'";

    if(mysqli_query($con, $query))
    {
        $data["message"] = "Data Updated";         
    }
echo json_encode($data);
}


if ($_REQUEST['action'] == 'delete') {
    $area_id = (isset($_POST['area_id']) ? $_POST['area_id'] : '');

    $query = "DELETE from tbl_area WHERE area_id='" . $area_id . "'";
    if (mysqli_query($con, $query)) {
        $data["message"] = "Deleted Successfully";
    }
    echo json_encode($data);
}
