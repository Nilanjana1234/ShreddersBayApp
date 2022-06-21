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
// 			 	$p_name = mysqli_real_escape_string($con, $form_data->p_name);
// 			 	$sub_name = mysqli_real_escape_string($con, $form_data->sub_name);
// 			 	$weight = mysqli_real_escape_string($con, $form_data->weight);
// 			    $price = mysqli_real_escape_string($con, $form_data->price);
// 			 	// $file = mysqli_real_escape_string($con, $form_data->file);

// 				$query = "INSERT INTO tbl_products(p_name, sub_name, weight, price, status) VALUES ('$p_name', '$sub_name', '$weight', '$price', '1')";
// 				if(mysqli_query($con, $query))
// 				{
// 				  $data["message"] = "Data Inserted";         
// 				}

// 				echo json_encode($data);
// }



if($_REQUEST['action']=='insert'){		
			 
			 	$p_name = $_POST['p_name'];
				 $price = $_POST['price'];
				 $weight = $_POST['weight'];
				 $sub_name = $_POST['sub_name'];
                $location = "uploads/";
                $file = $_FILES['file']['name'];
                $tmp_name = $_FILES['file']['tmp_name'];
				$fs = move_uploaded_file($tmp_name, $location.$file);
   
				if($fs){
				    $query = "INSERT INTO tbl_products( p_name, sub_name, weight, price, file, status) VALUES ('".$p_name."','".$sub_name."','".$weight."','".$price."','".$file."','1')";
				
				if(mysqli_query($con, $query))
				{
				  $data["message"] = "Data Inserted";         
				}}

				echo json_encode($data);
}

if($_REQUEST['action']=='select')
{
	 $query = "SELECT * FROM tbl_products";
	 $res = mysqli_query($con, $query);
	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
	
  	}
		   echo json_encode($data);


}



if($_REQUEST['action']=='select_id')
{
	$p_id=$_POST['p_id'];
	 $query = "SELECT * FROM tbl_products WHERE p_id='".$p_id."'";
	 $res = mysqli_query($con, $query);
	 $row = mysqli_fetch_assoc($res);
	 
	 $data[] = $row;
     echo json_encode($data);
}


if($_REQUEST['action']=='edit')
{
	$p_name = $_POST['p_name'];
				 $price = $_POST['price'];
				 $weight = $_POST['weight'];
				 $sub_name = $_POST['sub_name'];
         $location = "uploads/";
                $file = $_FILES['file']['name'];
                $tmp_name = $_FILES['file']['tmp_name'];
				$fs = move_uploaded_file($tmp_name, $location.$file);
   
				if($fs){
	$query = "UPDATE tbl_products SET  p_name = '$p_name', sub_name = '".$sub_name."', weight = '".$weight."', price = '".$price."', file = '".$file."' WHERE p_id='".$_POST['p_id']."'";
//	echo $query;

	if(mysqli_query($con, $query))
	{
		$data["message"] = "Data Updated";         
	}
				}
echo json_encode($data);
}		


if($_REQUEST['action']=='delete')
{
	$query = "DELETE from tbl_products  WHERE p_id='".$_POST['p_id']."'";
	if(mysqli_query($con, $query))
	{
		$data["message"] = "Deleted Successfully";         
	}
	echo json_encode($data);
}				
?>
