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
			 	$title = $_POST['title'];
			 	$message = $_POST['message'];
			 	$mobile = $_POST['mobile'];
				$query = "INSERT INTO tbl_sms(title, message, mobile, status) VALUES ('".$title."', '".$message."','".$mobile."', '1')";
				if(mysqli_query($con, $query))
				{
				  $data["message"] = "Data Inserted";         
				}

				echo json_encode($data);
}

if($_REQUEST['action']=='select')
{
	 $query = "SELECT * FROM tbl_sms";
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




if($_REQUEST['action']=='select_id')
{
	 $query = "SELECT * FROM tbl_faqs WHERE faq_id='".$form_data->id."'";
	 echo "$query";
	 $res = mysqli_query($con, $query);
	 $row = mysqli_fetch_array($res);
	$question = $row['question'];
	$answer = $row['answer'];
 	$data['status'] = $row['status'];
 	$data['created_at'] = $row['created_at'];
     echo json_encode($data);
}


if($_REQUEST['action']=='edit')
{

            	$question = $_POST['question'];
			 	$answer = $_POST['answer'];
	$query = "UPDATE tbl_faqs SET question = '$question', answer = '$answer' WHERE faq_id='".$form_data->id."'";
	echo $query;
	if(mysqli_query($con, $query))
	{
		$data["message"] = "Data Updated";         
	}
echo json_encode($data);
}		


if($_REQUEST['action']=='delete')
{
	$query = "DELETE from tbl_sms  WHERE sms_id='".$_POST['sms_id']."'";
	if(mysqli_query($con, $query))
	{
		$data["message"] = "Deleted Successfully";         
	}
	echo json_encode($data);
}				
?>