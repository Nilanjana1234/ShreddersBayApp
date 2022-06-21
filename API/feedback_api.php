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



if($_REQUEST['action']=='insert'){		
			 	// $user_id = $_POST['user_id'];

				 $name = $_POST['name'];
				 $mobile = $_POST['mobile'];
				 $type = $_POST['type'];
				$query = "INSERT INTO tbl_feedback(name, mobile,tpye,status) VALUES ('".$name."', '".$mobile."','".$type."','1')";
				if(mysqli_query($con, $query))
				{
				  $data["message"] = "Data Inserted";         
				}

				echo json_encode($data);
}

if($_REQUEST['action']=='select')
{
	 $query = "SELECT * FROM tbl_feedback";
	 $res = mysqli_query($con, $query);
	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
	  // $data['name'] = $row['name'];
	  // $data['email'] = $row['email'];
	  // $data['mobile'] = $row['mobile'];
	  // $data['date'] = $row['date'];
 	}
 		   echo json_encode($data);

}



// if($_REQUEST['action']=='select_id')
// {
// 	 $query = "SELECT * FROM tbl_notifications WHERE notification_id='".$form_data->id."'";
// 	 echo "$query";
// 	 $res = mysqli_query($con, $query);
// 	 $row = mysqli_fetch_array($res);
// 	$user_id = $row['user_id'];
// 	$description = $row['description'];
//  	$data['status'] = $row['status'];
//  	$data['date'] = $row['date'];
//      echo json_encode($data);
// }

if ($_REQUEST['action'] == 'select_id') {
    $query = "SELECT * FROM tbl_feedback WHERE feedback_id='" . $_POST['feedback_id'] . "'";
   
    $res = mysqli_query($con, $query);
    $row = mysqli_fetch_array($res);
    $data[] = $row;


    echo json_encode($data);
}


if($_REQUEST['action']=='edit')
{

	$user_id = mysqli_real_escape_string($con, $form_data->user_id);
    $description = mysqli_real_escape_string($con, $form_data->description);
	$query = "UPDATE tbl_notifications SET user_id = '$user_id', description = '$description' WHERE notification_id='".$form_data->id."'";
	echo $query;
	if(mysqli_query($con, $query))
	{
		$data["message"] = "Data Updated";         
	}
echo json_encode($data);
}		


if($_REQUEST['action']=='delete')
{
	$query = "DELETE from tbl_feedback  WHERE feedback_id='".$_POST['feedback_id']."'";
	if(mysqli_query($con, $query))
	{
		$data["message"] = "Deleted Successfully";         
	}
	echo json_encode($data);
}					
?>