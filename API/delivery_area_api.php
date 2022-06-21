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
    $city_id =  $_POST['city_id'];
    $area_id =  $_POST['area_id'];
    $darea_name = $_POST['darea_name'];
    $remark =  $_POST['remark'];
    $city_idd = mysqli_real_escape_string($con, $city_id);
    $area_idd = mysqli_real_escape_string($con, $area_id);
    $darea_namee = mysqli_real_escape_string($con, $darea_name);
    $remarkk = mysqli_real_escape_string($con, $remark);
    $query = "INSERT INTO delivery_area (city_id, area_id, darea_name, remark, status) VALUES ( '$city_idd', '$area_idd', '$darea_namee', '$remarkk', '1')";
    if (mysqli_query($con, $query)) {
        $data["message"] = "Data Inserted";
    }

    echo json_encode($data);
}

if ($_REQUEST['action'] == 'select') {
    $query = "SELECT * from delivery_area as d_area left join tbl_city as city on city.city_id = d_area.city_id left join tbl_area as area on area.area_id = d_area.area_id ORDER BY d_id";
    $res = mysqli_query($con, $query);
    while ($row = mysqli_fetch_assoc($res)) {
        $data[] = $row;
      
      
    }
    echo json_encode($data);
}



if ($_REQUEST['action'] == 'select_id') {
    $query = "SELECT * from delivery_area as d_area left join tbl_city as city on city.city_id = d_area.city_id left join tbl_area as area on area.area_id = d_area.area_id  WHERE d_id='" . $_POST['d_id'] . "'";
   
    $res = mysqli_query($con, $query);
    $row = mysqli_fetch_assoc($res);
    $data[] = $row;


    echo json_encode($data);
}


if($_REQUEST['action']=='edit')
{
    $city_id = $_POST['city_id'];
    $area_id = $_POST['area_id'];
        $darea_name = $_POST['darea_name'];
        $remark = $_POST['remark'];

    $query = "UPDATE delivery_area SET city_id = '$city_id', area_id = '$area_id', darea_name= '$darea_name', remark= '$remark' WHERE d_id='".$_POST['d_id']."'";

    if(mysqli_query($con, $query))
    {
        $data["message"] = "Data Updated";         
    }
echo json_encode($data);
}


if ($_REQUEST['action'] == 'delete') {
    $d_id = (isset($_POST['d_id']) ? $_POST['d_id'] : '');

    $query = "DELETE from delivery_area WHERE d_id='" . $d_id . "'";
    // echo $query;
    // exit();
    if (mysqli_query($con, $query)) {
        $data["message"] = "Deleted Successfully";
    }
    echo json_encode($data);
}