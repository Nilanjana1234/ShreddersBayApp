<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
 //http://localhost:8000/SHREDDERSBAY_API/API/user_api.php?action=select
//https://infodeltasys.com/shreddersbayapi/API/

session_start();
include("../DB.php");
$form_data = json_decode(file_get_contents("php://input"));
$data = array();
$error = array();


if($_REQUEST['action']=='select')
{
	 $query = "SELECT * FROM tbl_users WHERE id != '".$_POST['user_id']."' order by name ";
	
	 $res = mysqli_query($con, $query);
	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
 	}
	
		   echo json_encode($data);
}


if($_REQUEST['action']=='message')
{
	 $query = "SELECT * FROM tbl_users WHERE id = '".$_POST['user_id']."'";

	 $res = mysqli_query($con, $query);
	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
 	}
	
		   echo json_encode($data);
}

if($_REQUEST['action']=='insert')
{
	 $query = "INSERT INTO `tbl_chat`(`send_from`, `rec_by`, `chat`, `status`) VALUES ('".$_POST['from_user_id']."','".$_POST['to_user_id']."','".$_POST['chatbox']."','1')";

	 $res = mysqli_query($con, $query);
	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
 	}
	$data['message'] = "Chat Inserted";
		   echo json_encode($data);
}
if($_REQUEST['action']=='select_chat')
{
    $from_user_id = $_POST['from_user_id'];
    $to_user_id = $_POST['to_user_id'];
	 $query = "SELECT * FROM tbl_chat WHERE (send_from = '".$from_user_id."' AND rec_by = '".$to_user_id."') OR (send_from = '".$to_user_id."' AND rec_by = '".$from_user_id."') ORDER BY date ";
// 	echo $query;
	 $res = mysqli_query($con, $query);
	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
	 	
	 	
 	}

		   echo json_encode($data);
}



if($_REQUEST['action']=='delete'){
	$query = "DELETE from tbl_users  WHERE id='".$_POST['id']."'";
	if(mysqli_query($con, $query))
	{
		$data["message"] = "Deleted Successfully";         
	}
	echo json_encode($data);
}