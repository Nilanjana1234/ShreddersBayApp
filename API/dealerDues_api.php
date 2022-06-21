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
				$user_id = $_POST['user_id']; 
				$prod_id = $_POST['prod_id'];
								$addr_id = $_POST['addr_id'];
				$total_weight = $_POST['approx_weight'];
				$total_price = $_POST['approx_price']; 
				$file_name = $_POST['filename'];
                $schedule_date = $_POST['schedule_date'];
				$query = "INSERT INTO tbl_orders(user_id, prod_id, addr_id, total_weight, approx_price, filename,  booking_date, schedule_date) VALUES ('$user_id', '$prod_id', '$addr_id', '$total_weight', '$total_price', '$file_name', now(), '$schedule_date')";
				if(mysqli_query($con, $query))
				{
				  $data["message"] = "Order Placed";         
				}
				$query1 = "DELETE from tbl_cart where prod_id=$prod_id";
				mysqli_query($con, $query1);
				
				echo json_encode($data);
}

// if($_REQUEST['action']=='select')
// {
// 	 $query = "SELECT * FROM tbl_orders as o left join tbl_users as user on user.id=o.user_id left join tbl_address as addr on addr.addr_id=o.addr_id left join tbl_products as p on p.p_id=o.prod_id WHERE o.status = 1 order by o.booking_id  DESC";
// 	 $res = mysqli_query($con, $query);
// 	 while($row = mysqli_fetch_assoc($res)){
// 	 	$data[] = $row;
//  	}
// 	echo json_encode($data);


// }


// if($_REQUEST['action']=='select_id')
// {
// 	 $query = "SELECT * FROM tbl_orders as o left join tbl_products as p on p.p_id=o.prod_id left join tbl_users as users on o.user_id=users.id where o.booking_id='".$_GET['book_id']."'";
// 	 $res = mysqli_query($con, $query);
// 	  while($row = mysqli_fetch_assoc($res)){
// 	 	$data[] = $row;
//  	}
	
// 		   echo json_encode($data);


// }


if($_REQUEST['action']=='select_id')
{
// 	 $query = "SELECT * FROM tbl_orders as o left join tbl_products as p on p.p_id=o.prod_id left join tbl_users as users on o.user_id=users.id left join tbl_address as a on o.addr_id = a.addr_id where o.booking_id='".$_POST['booking_id']."'";
 $dealer_id = $_POST['dealer_id'];
    $query = "SELECT * FROM tbl_orders as o left join tbl_users as user on user.id=o.user_id  WHERE o.status = 2 and user.user_role=1 and o.user_id='".$dealer_id."' order by o.booking_id  DESC";
    
	 $res = mysqli_query($con, $query);
	  $rowcount=mysqli_num_rows($res);
	   echo $rowcount;
	   exit();
	  while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
 	}
	
		   echo json_encode($data);
}
if($_REQUEST['action']=='select')
{
   
    $query = "SELECT * FROM tbl_orders as o left join tbl_users as user on user.id=o.user_id  WHERE o.status = 4 and user.user_role=1 order by o.booking_id  DESC";
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

if($_REQUEST['action']=='selectCompleteAdmin')
{
	 $query = "SELECT * FROM tbl_orders as o left join tbl_users as user on user.id=o.user_id left join tbl_address as addr on addr.addr_id=o.addr_id left join tbl_products as p on p.p_id=o.prod_id WHERE o.status = 4 order by o.booking_id  DESC";
	 $res = mysqli_query($con, $query);
	 if($res){

	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
 	}
	 }
	 else{
	      $data['status'] = 'err';
	 }
	echo json_encode($data);
}
if($_REQUEST['action']=='selectCancelAdmin')
{
	 $query = "SELECT * FROM tbl_orders as o left join tbl_users as user on user.id=o.user_id left join tbl_address as addr on addr.addr_id=o.addr_id left join tbl_products as p on p.p_id=o.prod_id WHERE o.status = 0 order by o.booking_id  DESC";
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

if($_REQUEST['action']=='selectCancelById')
{
	 $query = "SELECT * FROM tbl_orders as o left join tbl_products as p on p.p_id=o.prod_id left join tbl_users as users on o.user_id=users.id left join tbl_address as addr on addr.addr_id=o.addr_id  where o.booking_id='".$_POST['booking_id']."' and o.status=0";
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
if($_REQUEST['action']=='selectAdminCompleteById')
{
	 $query = "SELECT * FROM tbl_orders as o left join tbl_products as p on p.p_id=o.prod_id left join tbl_users as users on o.user_id=users.id left join tbl_address as addr on addr.addr_id=o.addr_id  where o.booking_id='".$_POST['booking_id']."' and o.status=4";
	 //echo $query;
	 $res = mysqli_query($con, $query);
	  $row = mysqli_fetch_assoc($res);
	 	$data[] = $row;

	
		   echo json_encode($data);


}
if($_REQUEST['action']=='selectCompleteById')
{
	 $query = "SELECT * FROM tbl_orders as o left join tbl_products as p on p.p_id=o.prod_id left join tbl_users as users on o.user_id=users.id left join tbl_address as addr on addr.addr_id=o.addr_id  where o.booking_id='".$_POST['booking_id']."' and o.status=4";
	 //echo $query;
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
/*

if($_REQUEST['action']=='selectCustomerCurrent')
{
	 $query = "SELECT o.*, user.id, user.user_role, user.name, user.email, user.mobile, user.profile, p.p_name, country.country_name, state.state_name, city.city_name, area.area_name, addr.pin_code, addr.address, addr.landmark FROM tbl_orders as o left join tbl_users as user on user.id=o.user_id left join tbl_address as addr on addr.addr_id=o.addr_id left join tbl_country as country on country.country_id=addr.country_id left join tbl_state as state on state.country_id=country.country_id left join tbl_city as city on city.state_id=state.state_id left join tbl_area as area on area.city_id=city.city_id left join tbl_products as p on p.p_id=o.prod_id WHERE o.user_id ='".$_GET['user_id']."' and o.status = 1 || o.status = 2 order by o.booking_id  DESC";
	 $res = mysqli_query($con, $query);
	  if($res){

	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
 	}
	 }
	 else{
	      $data['status'] = 'err';
	 }
	
		   echo json_encode($data);


}
*/
if($_REQUEST['action']=='selectCustomerCurrent')
{
    
	 $query = "SELECT o.*, user.id, user.user_role, user.name, user.email, user.mobile, user.profile, p.p_name, country.country_name, state.state_name, city.city_name, area.area_name, addr.pin_code, addr.address, addr.landmark FROM tbl_orders as o left join tbl_users as user on user.id=o.user_id left join tbl_address as addr on addr.addr_id=o.addr_id left join tbl_area as area on area.area_id=addr.addr_id left join tbl_city as city on city.city_id=area.city_id left join tbl_state as state on state.state_id=city.state_id left join tbl_country as country on country.country_id=state.country_id left join tbl_products as p on p.p_id=o.prod_id WHERE o.user_id ='".$_GET['user_id']."' and (o.status = 1 || o.status = 2) order by o.booking_id DESC";

$res = mysqli_query($con, $query);
	  if($res){

	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
 	}
	 }
	 else{
	      $data['status'] = 'err';
	 }
	
		   echo json_encode($data);


}

if($_REQUEST['action']=='selectCustomerCancel')
{
	 $query = "SELECT * FROM tbl_orders as o left join tbl_users as user on user.id=o.user_id left join tbl_address as addr on addr.addr_id=o.addr_id left join tbl_products as p on p.p_id=o.prod_id WHERE o.user_id ='".$_GET['user_id']."' and o.status = 0 order by o.booking_id  DESC";
	
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

if($_REQUEST['action']=='selectCustomerComplete')
{
	 $query = "SELECT * FROM tbl_orders as o left join tbl_users as user on user.id=o.user_id left join tbl_address as addr on addr.addr_id=o.addr_id left join tbl_products as p on p.p_id=o.prod_id WHERE o.user_id ='".$_GET['user_id']."' and o.status = 4 order by o.booking_id  DESC";
	 //echo $query;
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

if($_REQUEST['action']=='customer_cancel')
{
 	            $booking_id=$_POST['booking_id'];
			
	$query = "UPDATE tbl_orders SET status = '0', canceled_date = now() WHERE booking_id='".$booking_id."'";
	if(mysqli_query($con, $query))
	{
		$data["message"] = "Data Updated";         
	}
echo json_encode($data);
}


if($_REQUEST['action']=='select_current')
{
	 $query = "SELECT * FROM tbl_orders as o left join tbl_users as user on user.id=o.user_id left join tbl_address as addr on addr.addr_id=o.addr_id left join tbl_products as p on p.p_id=o.prod_id WHERE o.dealer_id ='".$_POST['user_id']."' and o.status = 2 order by o.booking_id  DESC";
	 
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


if($_REQUEST['action']=='select_cancel')
{
	 $query = "SELECT * FROM tbl_orders as o left join tbl_users as user on user.id=o.user_id left join tbl_address as addr on addr.addr_id=o.addr_id left join tbl_products as p on p.p_id=o.prod_id WHERE o.status = 1 && o.dealer_id ='".$_POST['user_id']."' order by o.booking_id  DESC";
	 $res = mysqli_query($con, $query);
	 if($res){
	    
	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
 	}
	 }else{
	      $data['status'] = 'error';
	 }
		   echo json_encode($data);


}

if($_REQUEST['action']=='select_complete')
{
	 $query = "SELECT * FROM tbl_orders as o left join tbl_users as user on user.id=o.user_id left join tbl_address as addr on addr.addr_id=o.addr_id left join tbl_products as p on p.p_id=o.prod_id WHERE o.status = 4 && o.dealer_id ='".$_POST['user_id']."' order by o.booking_id  DESC";
	 $res = mysqli_query($con, $query);
	if($res){
	    
	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
 	}
	 }else{
	      $data['status'] = 'error';
	 }
	
		   echo json_encode($data);


}




if($_REQUEST['action']=='filter_by_address')
{
 $pin_code = $_POST['pin_code'];
 if($pin_code){
  $query2= "SELECT * FROM `tbl_users` as u left JOIN `tbl_address` as a on u.id = a.user_id LEFT JOIN `tbl_orders` as o on a.addr_id = o.addr_id WHERE a.pin_code=$pin_code";

 $res = mysqli_query($con, $query2);

	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
 	}   
 }else{
      $query1= "SELECT * FROM `tbl_users` as u left JOIN `tbl_address` as a on u.id = a.user_id LEFT JOIN `tbl_orders` as o on a.addr_id = o.addr_id";

 $res2 = mysqli_query($con, $query1);

	 while($row = mysqli_fetch_assoc($res2)){
	 	$data[] = $row;
 	}  
 }
	
echo json_encode($data);
}




if($_REQUEST['action']=='edit')
{
 	            $user_id = $_GET['user_id']; 
				$prod_id = $_POST['prod_id'];
				$total_weight = $_POST['approx_weight'];
				$total_price = $_POST['approx_price']; 
				$file_name = $_POST['filename'];
                $schedule_date = $_POST['schedule_date'];
				
	$query = "UPDATE tbl_cart SET user_id = '$user_id', prod_id = '$prod_id', total_price = '$total_price', total_weight = '$total_weight', filename = '$file_name', updated_at = now() WHERE id='".$form_data->id."'";
	// echo $query;
	if(mysqli_query($con, $query))
	{
		$data["message"] = "Data Updated";         
	}
echo json_encode($data);
}	


if($_REQUEST['action']=='accept')
{
 	            $dealer_id = $_POST['user_id']; 
 	            $booking_id = $_POST['booking_id'];
			
	$query = "UPDATE tbl_orders SET dealer_id = '$dealer_id', status = '2', updated_at = now() WHERE booking_id='".$booking_id."'";
	// echo $query;
	if(mysqli_query($con, $query))
	{
		$data["message"] = "Data Updated";         
	}
echo json_encode($data);
}	


if($_REQUEST['action']=='cancel')
{
 	            $booking_id=$_POST['booking_id'];
			
	$query = "UPDATE tbl_orders SET status = '1', canceled_date = now() WHERE booking_id='".$booking_id."'";
	if(mysqli_query($con, $query))
	{
		$data["message"] = "Data Updated";         
	}
echo json_encode($data);
}


if($_REQUEST['action']=='complete')
{
 	            $booking_id=$_POST['booking_id'];
			
	$query = "UPDATE tbl_orders SET status = '4', completed_date = now() WHERE booking_id='".$booking_id."'";
	if(mysqli_query($con, $query))
	{
		$data["message"] = "Data Updated";         
	}
echo json_encode($data);
}


// if ($_REQUEST['action'] == 'delete')
//  {
//     $id = $_POST['id'];
   
//     $query = "DELETE from tbl_orders  WHERE booking_id='".$id."'";
  
//     if (mysqli_query($con, $query)) {
//         $data["message"] = "Deleted Successfully";
//     }
//     echo json_encode($data);
// }



if($_REQUEST['action']=='delete')
{
	$query = "DELETE from tbl_orders  WHERE booking_id='".$_POST['id']."'";
	if(mysqli_query($con, $query))
	{
		$data["message"] = "Deleted Successfully";         
	}
	echo json_encode($data);
}	
