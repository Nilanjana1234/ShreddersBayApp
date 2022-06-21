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



// if($_REQUEST['action']=='insert'){		
// 			 	$user_id = mysqli_real_escape_string($con, $form_data->user_id);
// 			 	$description = mysqli_real_escape_string($con, $form_data->description);
// 				$query = "INSERT INTO tbl_notifications(user_id, description, status, date) VALUES ('$user_id', '$description', '1', now())";
// 				if(mysqli_query($con, $query))
// 				{
// 				  $data["message"] = "Data Inserted";         
// 				}

// 				echo json_encode($data);
// }

if($_REQUEST['action']=='insert'){		
			 //	 $user_id = $_POST['user_id'];
				 $title = $_POST['title'];
				 $description = $_POST['description'];
				$query = "INSERT INTO tbl_notifications(title, description) VALUES ('".$title."', '".$description."')";
				if(mysqli_query($con, $query))
				{
				  $data["message"] = "Data Inserted";         
				}

				echo json_encode($data);
}


if($_REQUEST['action']=='edit')
{
	$title = $_POST['title'];
	$description = $_POST['description'];
	$query = "UPDATE tbl_notifications SET title = '$title', description = '$description' WHERE notification_id='".$_POST['id']."'";

	if(mysqli_query($con, $query))
	{
		$data["message"] = "Data Updated";         
	}
echo json_encode($data);
}

if($_REQUEST['action']=='select')
{
	 $query = "SELECT * FROM tbl_notifications";
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



if ($_REQUEST['action'] == 'select_id') {
    $query = "SELECT * FROM tbl_notifications WHERE notification_id='" . $_POST['notification_id'] . "'";
    $res = mysqli_query($con, $query);
    $row = mysqli_fetch_array($res);
    $data[] = $row;


    echo json_encode($data);
}



if($_REQUEST['action']=='delete')
{
	$query = "DELETE from tbl_notifications  WHERE notification_id='".$_POST['notification_id']."'";
	echo $query;
	if(mysqli_query($con, $query))
	
	{
		$data["message"] = "Deleted Successfully";         
	}
	echo json_encode($data);
}				
?>
