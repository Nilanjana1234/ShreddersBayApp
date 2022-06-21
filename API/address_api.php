<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
//http://localhost:8000/SHREDDERSBAY_API/API/user_api.php?action=select
include("../DB.php");
$form_data = json_decode(file_get_contents("php://input"));
$data = array();
$error = array();



if($_REQUEST['action']=='insert'){	
$hidden_id =$_POST['addr_id'];
$user_id = $_POST['user_id'];
			 	$country_id = $_POST['country_id'];
			 	$state_id = $_POST['state_id'];
			    $city_id = $_POST['city_id'];
			 	$area_id = $_POST['area_id'];
			 	$address = $_POST['address'];
			 	$pin_code = $_POST['pincode'];
			 	// $add_type = $_POST['add_type'];
			    $landmark = $_POST['landmark'];
if($hidden_id==''){
			 	
				$query = "INSERT INTO tbl_address(user_id, country_id, state_id, city_id, area_id, address, pin_code, landmark, status) VALUES ('$user_id', '$country_id', '$state_id', '$city_id', $area_id, '$address', '$pin_code', '$landmark', '1')";
				// echo $query;
			
				if(mysqli_query($con, $query))
				{
				  $data["message"] = "Data Inserted";         
				}

				echo json_encode($data);
}

else
{
$query1 = "UPDATE tbl_address SET  user_id = '$user_id', country_id = '$country_id', state_id = '$state_id', city_id = '$city_id', address = '$address', pin_code = '$pin_code', landmark = '$landmark' WHERE addr_id='".$hidden_id."'";

	if(mysqli_query($con, $query1))
	{
		$data["message"] = "Data Updated";         
	}
echo json_encode($data);
}
}


if($_REQUEST['action']=='select')
{
	 $query = "SELECT * FROM tbl_address as addr left join tbl_city as city on city.city_id=addr.city_id left join tbl_state as state on state.state_id=city.state_id left join tbl_country as country on country.country_id=state.country_id WHERE addr.user_id='".$_GET['user_id']."'";

	 $res = mysqli_query($con, $query);
	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
 	}
 		   echo json_encode($data);
}

if($_REQUEST['action']=='AddrByUserId')
{
	 $query = "SELECT * FROM tbl_address as addr left join tbl_city as city on city.city_id=addr.city_id left join tbl_state as state on state.state_id=city.state_id left join tbl_country as country on country.country_id=state.country_id WHERE addr.user_id='".$_GET['user_id']."'";
	 $res = mysqli_query($con, $query);
	 while($row = mysqli_fetch_assoc($res))
	 {
	  $data[] = $row;
	}
	
     echo json_encode($data);
}

if($_REQUEST['action']=='select_id')
{
	 $query = "SELECT * FROM tbl_address as addr left join tbl_city as city on city.city_id=addr.city_id left join tbl_state as state on state.state_id=city.state_id left join tbl_country as country on country.country_id=state.country_id WHERE addr.addr_id='".$_GET['addr_id']."'";
	 $res = mysqli_query($con, $query);
	 while($row = mysqli_fetch_assoc($res))
	 {
	  $data = $row;
	}
	
     echo json_encode($data);
}


if($_REQUEST['action']=='edit')
{

	$user_id = mysqli_real_escape_string($con, $form_data->user_id);
	$country_id = mysqli_real_escape_string($con, $form_data->country_id);
	$state_id = mysqli_real_escape_string($con, $form_data->state_id);
	$city_id = mysqli_real_escape_string($con, $form_data->city_id);
	$area_id = mysqli_real_escape_string($con, $form_data->area_id);
	$address = mysqli_real_escape_string($con, $form_data->address);
	$pin_code = mysqli_real_escape_string($con, $form_data->pin_code);
	$add_type = mysqli_real_escape_string($con, $form_data->add_type);
	$landmark = mysqli_real_escape_string($con, $form_data->landmark);
	$query = "UPDATE tbl_address SET  user_id = '$user_id', country_id = '$country_id', state_id = '$state_id', city_id = '$city_id',area_id = '$area_id', address = '$address', pin_code = '$pin_code', add_type = '$add_type', landmark = '$landmark' WHERE addr_id='".$form_data->id."'";
	echo $query;
	if(mysqli_query($con, $query))
	{
		$data["message"] = "Data Updated";         
	}
echo json_encode($data);
}		


if($_REQUEST['action']=='delete')
{
	$query = "DELETE FROM tbl_address  WHERE addr_id='".$_POST['id']."'";

	if(mysqli_query($con, $query))
	{
		$data["message"] = "Deleted Successfully";         
	}
	echo json_encode($data);
}				
?>
