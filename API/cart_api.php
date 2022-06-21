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
				$price = $_POST['price'];
				$prod_id = $_POST['prod_id'];
				$total_weight = $_POST['weight'];
				$total_price = $total_weight*$price; 
				$location = "uploads/";
                $file_name = $_FILES['file']['name'];
                $tmp_name = $_FILES['file']['tmp_name'];
				move_uploaded_file($tmp_name, $location . $file_name);	
			if (isset($_POST['user_id'])) {
	 	// code...
				$user_id = $_POST['user_id'];
				$query = "INSERT INTO tbl_cart(user_id, prod_id, total_weight, total_price , filename) VALUES ('$user_id', '$prod_id', '$total_weight', '$total_price', '$file_name')";
				if(mysqli_query($con, $query))
				{
				  $data["message"] = "Data Inserted";         
				}

				echo json_encode($data);
			}

			if (isset($_SESSION['user_id'])) {
				// code...
				$user_id = $_SESSION['user_id'];
				$query = "INSERT INTO tbl_cart(user_id, prod_id, total_weight, total_price , filename) VALUES ('$user_id', '$prod_id', '$total_weight', '$total_price', '$file_name')";
				if(mysqli_query($con, $query))
				{
				  $data["message"] = "Data Inserted";         
				}

				echo json_encode($data);
			}
			
}

if($_REQUEST['action']=='select')
{
	 $query = "SELECT * FROM tbl_cart as c left join tbl_products as p on p.p_id=c.prod_id";
	 $res = mysqli_query($con, $query);
		 if($res){

	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
 	}
	 }else{
	      $data['status'] = 'err';
	 }
	echo json_encode($data);
}



if($_REQUEST['action']=='select_id')
{
	 $query = "SELECT * FROM tbl_cart as c left join tbl_products as p on p.p_id=c.prod_id WHERE c.user_id='".$_GET['user_id']."'";

	 $res = mysqli_query($con, $query);
		 if($res){

	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
 	}
	 }else{
	      $data['status'] = 'err';
	 }
	echo json_encode($data);
}



if($_REQUEST['action']=='edit')
{
                $price = $_POST['price'];
				$user_id = $_SESSION['user_id']; 
				$prod_id = $_POST['prod_id'];
				$total_weight = $_POST['weight'];
				$total_price = $total_weight*$price; 
				$location = "../upload/";
                $file_name = $_FILES['file']['name'];
                $tmp_name = $_FILES['file']['tmp_name'];
				move_uploaded_file($tmp_name, $location . $file_name);
				
	$query = "UPDATE tbl_cart SET user_id = '$user_id', prod_id = '$prod_id', total_price = '$total_price', total_weight = '$total_weight', filename = '$file_name', updated_at = now() WHERE id='".$form_data->id."'";
	if(mysqli_query($con, $query))
	{
		$data["message"] = "Data Updated";         
	}
echo json_encode($data);
}		


if($_REQUEST['action']=='delete')
{
	$query = "DELETE from tbl_cart  WHERE cart_id='".$_GET['cart_id']."'";
	if(mysqli_query($con, $query))
	{
		$data["message"] = "Deleted Successfully";         
	}
	echo json_encode($data);
}

if($_REQUEST['action']=='clear_cart')
{
	$query = "DELETE FROM `tbl_cart` WHERE user_id='".$_GET['user_id']."'";
	 $res = mysqli_query($con, $query);
		 if($res){
		     $data['status'] = 'Deleted Successfully';
	 }else{
	      $data['status'] = 'err';
	 }
	echo json_encode($data);
}
