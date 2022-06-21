<?php
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

if($_REQUEST['action']=='is_admin')
{
	 $email = $_POST['email']; 
	 $pas = $_POST['password'];
	$query = "SELECT * FROM tbl_users WHERE email='".$email."' and user_role='2'";
	 $res = mysqli_query($con, $query);
	 $row = mysqli_fetch_assoc($res);
	 if($res){
		$db_pass=$row['password'];
			$pass_decode = password_verify($pas, $db_pass);
			
			if($pass_decode){
                    //   $data[] = $row;
                     $data['username'] = $row['name'];
                      $_SESSION['data']=$row;
                      $_SESSION['user_id']=$row['id'];
                       $_SESSION['username']=$row['name'];
				  $data["message"] = "Login Successfully";
		} 
			else{
								$data["message"] = "Incorrect Password";         
			}
	}
 echo json_encode($data);
}


if($_REQUEST['action']=='loginByOtp') {	
				// $hidden_id = $_POST['id'];	
			 	$mobile = $_POST['mobile']; 
				if(!isset($_POST['mobile'])){ 
                	$user_role = $_POST['role'];
                	$mobilequery = "select * from tbl_users where mobile='$mobile' and user_role='$user_role'";
                	$query = mysqli_query($con, $mobilequery);
                	 $rowres=mysqli_fetch_assoc($query);
                      $data[] = $rowres;
                	if (mysqli_num_rows($query) > 0) {
                	         $rand_no = rand(10000, 99999);
                	         $message = "Welcome ton ShreddersBay this your verification OTP '$rand_no' click on http://shreddersbay.com/otp_verification.php?role=0";
                	         $update_query = "UPDATE tbl_users set mob_otp='".$rand_no."' WHERE mobile='$mobile' and user_role=''";
		                     $res = mysqli_query($con,$update_query);
		                     $send = sendSMS('CODEXW', $mobile, $message);
                 			$url = "http://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=7266833037&msg=Welcome%20to%20SMS%20GupShup%20API%20Goto%20http://shreddersbay.com/otp_verification.php?role=0&msg_type=TEXT&userid=39&auth_scheme=plain&password=Kamana@123&v=1.1&format=text";
                          if(header("location:http://shreddersbay.com/otp_verification.php?role=0")){
                             $data['message'] = "check your mobile ";
                           }
                	} else {
                	                		$data['message'] = "Mobile Number Does Not Exist, Please Register Yourself";
                	}
                } 
                            				echo json_encode($data);

}



// if($_REQUEST['action']=='send_otp'){		
			 
// 			 	$mobile = $_POST['mobile'];
				 
				
// 				    $query = "INSERT INTO tbl_otp( mobile, otp, status) VALUES ('".$mobile."','".$otp."','".$weight."','1')";
				
// 				if(mysqli_query($con, $query))
// 				{
// 				  $data["message"] = "Data Inserted";         
// 				}

// 				echo json_encode($data);
// }

if($_REQUEST['action']=='send_otp'){		
			 
			 	$mobile = $_POST['mobile'];
				 $check=$_POST['check'];
If($check){
				
				    $query = "INSERT INTO tbl_otp( mobile, otp, status) VALUES ('".$mobile."','".$otp."','1')";
				
				if(mysqli_query($con, $query))
				{
				  $data["message"] = "Data Inserted";         
				}
			}

				echo json_encode($data);
}


if($_REQUEST['action']=='insert') {	
				// $hidden_id = $_POST['id'];	
			 	$name = $_POST['name']; 
				$email = $_POST['email'];  
				$token = bin2hex(random_bytes(15));
				if(!isset($_POST['id'])){ 
                	if(!isset($_POST['google_id'])){
                	$user_role = $_POST['role'];
				    $mobile = $_POST['mobile'];
                	$password = $_POST['password']; 
                	$repassword = $_POST['repassword'];
                	$emailquery = "select * from tbl_users where email='$email'";
                	$query = mysqli_query($con, $emailquery);
                	if (mysqli_num_rows($query) > 0) {
                		$data['message'] = "Email Already Exist";
                	} else {
                		$pass = password_hash($password, PASSWORD_BCRYPT);
                		$query = "INSERT INTO tbl_users(name, email, password, mobile, token, user_role, status) VALUES ('$name', '$email', '$pass', '$mobile', '$token', '$user_role', '1')";
                		if(mysqli_query($con, $query)){
                			 // $data["message"] = "Data Inserted";  
                			$subject = "Email Verification";
                            $body = "Hi, $name Click here too activate your account http://www.shreddersbay.com/API/user_api.php?action=varify_email&role=$user_role&token=$token";
                            $headers = "From: admin@shreddersbay.com";
                            if (mail($email, $subject, $body, $headers)) {
                                $data["message"] = "Email Successfully Sent To $email Please Verify Your Email";
                            } else {
                                $data["message"] = "Email sending failed...";
                            }       
                		}
                				
                	}
                } else{
                    $google_id=$_POST['google_id'];
                    $google_token = $_POST['token'];
                    $user_role = $_POST['role'];
                    $profile_pic = $_POST['profile_pic']; 
                    $email = $_POST['email'];
                    $query3 = "select * from tbl_users where email='".$email."' and user_role='".$user_role."'";
                   
                    
                     $result = mysqli_query($con, $query3);
                     $row3=mysqli_fetch_assoc($result);
                    if (isset($row3['email'])){
                        $select="select * from tbl_users where token='".$google_token."'";
                        $queryres=mysqli_query($con,$select);
                        $rowres=mysqli_fetch_assoc($queryres);
                      $data[] = $rowres;
                      $_SESSION['data']=$rowres;
                      $_SESSION['user_id']=$rowres['id'];
                    } 
                    else {
                        $querys = "INSERT INTO tbl_users(name, email, google_id, token, profile, user_role, varify_email, status) VALUES('$name', '$email', '$google_id', '$google_token', '$profile_pic', '$user_role', '1', '1')";
                         if(mysqli_query($con, $querys)){
                          $select="select * from tbl_users where token='".$google_token."'";
                        $queryres=mysqli_query($con,$select);
                        $rowres=mysqli_fetch_assoc($queryres);
                      $data[] = $rowres;
                      $_SESSION['data']=$rowres;
                      $_SESSION['user_id']=$rowres['id'];
                         }
                    }
                }
                				echo json_encode($data);
            } else{
                	 $hidden_id = $_POST['id'];	
                	 $mobile = $_POST['mobile'];
                	 $query = "UPDATE tbl_users SET name = '$name', email = '$email', mobile = '$mobile', updated_at = now() WHERE id='".$hidden_id."'";
                	if(mysqli_query($con, $query)){
                		$data["message"] = "Data Updated";         
                	}
                echo json_encode($data);
                }
}




if($_REQUEST['action']== 'google_login'){
                    $google_id=$_POST['google_id'];
                    $google_token = $_POST['token'];
                    $name = $_POST['name'];
                    $user_role = $_POST['role'];
                    $profile_pic = $_POST['profile_pic']; 
                    $email = $_POST['email'];
                    $query3 = "select * from tbl_users where email='".$email."' and user_role='".$user_role."'";
                 
                     $result = mysqli_query($con, $query3);
                     $row3=mysqli_fetch_assoc($result);
                     //echo($row3['email']);
                     if (isset($row3['email'])){
                      $data[]=$row3;
                       //echo $row3['id'];
                      $_SESSION['data']=$row3;
                      $_SESSION['user_id']=$row3['id'];
                      $data["message"] = "Email Already Exist";
                    } 
                    else {
                        $querys = "INSERT INTO tbl_users(name, email, google_id, token, profile, user_role, varify_email, status) VALUES('$name', '$email', '$google_id', '$google_token', '$profile_pic', '$user_role', '1', '1')";
                         if(mysqli_query($con, $querys)){
                          $select="select * from tbl_users where email='".$email."' and user_role='".$user_role."'";
                        $queryres=mysqli_query($con,$select);
                        $rowres=mysqli_fetch_assoc($queryres);
                        echo $rowres['id'];
                      $data[] = $rowres;
                      $_SESSION['data']=$rowres;
                      $_SESSION['user_id']=$rowres['id'];
                      $dta["message"] = "Login Successfully";
                         }
                    }
                
                				echo json_encode($data);
}
if($_REQUEST['action']=='select')
{
	 $query = "SELECT * FROM tbl_users";
	 $res = mysqli_query($con, $query);
	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
 	}
	
		   echo json_encode($data);
}


if($_REQUEST['action']=='admin_logout')
{
	unset($_SESSION["id"]);
	unset($_SESSION["name"]);
	unset($_SESSION["username"]);
unset($_SESSION["password"]);
$data['message']="User Logout Success";
	
		   echo json_encode($data);
}



if($_REQUEST['action']=='adminChangePassword')
{
    $npassword = $_POST['npassword'];
    // $id = $_POST['id'];
    $pass = password_hash($npassword, PASSWORD_BCRYPT);
        $update_query = "UPDATE tbl_users set password='".$pass."' WHERE  user_role='2'";
		
		$res = mysqli_query($con,$update_query);
		$data[] = $res;
    
		   echo json_encode($data);
}



if($_REQUEST['action']=='forgot_Password')
{
       $email= $_POST['email'];
       $role=$_POST['role'];
      $query = "SELECT * FROM tbl_users WHERE email = '".$email."' && user_role = '".$role."'";
      $res = mysqli_query($con, $query);
     while($row = mysqli_fetch_assoc($res)){
                  $data[] = $row;

      $token = $row['token'];
      $role = $row['user_role'];
      $name = $row['name'];
      $email = $email;
      $subject = "password reset";
      $body = "Hi, $name Click here too Reset your Password http://www.shreddersbay.com/reset_password.php?email=$email&role=$role&token=$token";
     $headers = "From: admin@shreddersbay.com";
       if (mail($email, $subject, $body, $headers)) {
     $data["message"] = "Email Successfully Sent To $email Please Reset Your Password";
     } else {
             $data["message"] = "Email sending failed...";
    }       
     } 
  
		   echo json_encode($data);
}



if($_REQUEST['action']=='reset_pass')
{
    	if(isset($_POST['token'])){
		$token= $_POST['token'];
		$role=$_POST['role'];
		$password = $_POST['password'];
        $pass = password_hash($password, PASSWORD_BCRYPT);
        $update_query = "UPDATE tbl_users set password='".$pass."' WHERE token='".$token."' and user_role='".$role."'";
      
		$res = mysqli_query($con,$update_query);
		$data[] = $res;
		$data['message'] = "Your Password is changed '".$password."'";
    	}
		   echo json_encode($data);
}

if($_REQUEST['action']=='adminForgetPass')
{
	if(isset($_POST['email'])){

		$email= $_POST['email'];
		// $role=$_POST['role'];
	    $query = "SELECT * FROM tbl_users WHERE email = '".$email."' && user_role = '2'";
	    $res = mysqli_query($con, $query);
	    while($row = mysqli_fetch_assoc($res)){
	        	    	$data[] = $row;

	    $token = $row['token'];
	    $role = $row['user_role'];
	    $name = $row['name'];
		$email = $email;
		$subject = "Email Verification";
		$message = "Reset Pass";
		$from = 'From:parigupta26699@gmail.com '; 
		$to = 'nilanjana3798@gmail.com'; 
		$subject = $subject;
		$body = "From: $name\n Email: $email\n Message:\n $message";     
if (mail ($to, $subject, $body, $from)) { 
    echo '<p>Your message has been sent!</p>';
} else { 
    echo '<p>Something went wrong. Please manually <a href="mailto:email@example.com">email me</a> and include a screenshot/copy of the log above.</p>'; 
}


}
		   echo json_encode($data);
		}

}


if($_REQUEST['action']=='reset_form')
{
	if(isset($_GET['token'])){
		$token= $_GET['token'];
		$role=$_GET['role'];
		// $update_query = "UPDATE tbl_users set varify_email='1' WHERE token='".$token."' and user_role='".$role."'";
		// $res = mysqli_query($con,$update_query);
			$data['div'] = "<div style='margin: 0px auto; margin-top:15%; width:35%; height:30%; text-align: center; border: 1px solid green;'><h2 style='color:green; font-family: FontAwesome;''>Email Varified Successfully</h2>
			<a href='http://shreddersbay.com/login.php?role=".$role."'>Go Back To Login</a></div>";
		
	
	}	
		   echo json_encode($data);
		
}

if($_REQUEST['action']=='varify_email')
{
	if(isset($_GET['token'])){
		$token= $_GET['token'];
		$role=$_GET['role'];
		$update_query = "UPDATE tbl_users set varify_email='1' WHERE token='".$token."' and user_role='".$role."'";
		$res = mysqli_query($con,$update_query);
		if($res){
			echo "<div style='margin: 0px auto; margin-top:15%; width:35%; height:30%; text-align: center; border: 1px solid green;'><h2 style='color:green; font-family: FontAwesome;''>Email Varified Successfully</h2>
			<a href='http://shreddersbay.com/login.php?role=".$role."'>Go Back To Login </a></div>";
		}
		else{
		echo "<div style='margin: 0px auto; margin-top:15%; width:35%; height:30%; text-align: center; border: 1px solid red;'><h2 style='color:red; font-family: FontAwesome;'>Something Went Wrong! Please Try Again Later...</h2></div>";			
		}
	
	}	
		   // echo json_encode($data);
		
}

if($_REQUEST['action']=='dealr_select')
{
	 $query = "SELECT * FROM tbl_users where user_role='1' ORDER BY `id` DESC";
	
	 $res = mysqli_query($con, $query);
	 if($res){

	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
	 $data['status'] = 'ok';
 	}
	 }else{
	      $data['status'] = 'err';
	 }
	echo json_encode($data);
}
if($_REQUEST['action']=='dealr_select_id')
{
    $id= $_POST['id'];
	 $query = "SELECT * FROM tbl_users where user_role='1' and id='$id'";
	 
//	echo $query;
	 $res = mysqli_query($con, $query);
	 $res = mysqli_query($con, $query);
             $row = mysqli_fetch_assoc($res);
              $data[] = $row;


              echo json_encode($data);
          }



    //     if($_REQUEST['action']=='dealr_selectAdmin')
    //         {
	   //  $query = "SELECT * FROM tbl_users where user_role='1'";
	
   
    //          $res = mysqli_query($con, $query);
    //          $row = mysqli_fetch_array($res);
    //          $data[] = $row;


    //          echo json_encode($data);
    //      }


if($_REQUEST['action']=='cust_select')
{
	 $query = "SELECT * FROM tbl_users WHERE user_role='0' ORDER BY `id` DESC";
	 $res = mysqli_query($con, $query);
    if($res){

	 while($row = mysqli_fetch_assoc($res)){
	 	$data[] = $row;
	 $data['status'] = 'ok';
 	}
	 }else{
	      $data['status'] = 'err';
	 }
	echo json_encode($data);
}

if($_REQUEST['action']=='cust_select_id')
{
    $id= $_POST['id'];
	 $query = "SELECT * FROM tbl_users WHERE user_role='0' and id='$id'";
	 $res = mysqli_query($con, $query);
   $res = mysqli_query($con, $query);
             $row = mysqli_fetch_array($res);
              $data[] = $row;


              echo json_encode($data);
          }




if($_REQUEST['action']=='select_id')
{
	 $query = "SELECT user.*, country.country_name, state.state_name, city.city_name, area.area_name, addr.pin_code, addr.address, addr.landmark FROM tbl_users as user left join tbl_address as addr on addr.user_id=user.id left join tbl_area as area on area.area_id=addr.addr_id left join tbl_city as city on city.city_id=area.city_id left join tbl_state as state on state.state_id=city.state_id left join tbl_country as country on country.country_id=state.country_id  WHERE id='".$_GET['user_id']."'";
	 // echo "$query";
	 $res = mysqli_query($con, $query);
    $row = mysqli_fetch_assoc($res);
	 	$data[] = $row;

 
 echo json_encode($data);
}



if($_REQUEST['action']=='user_info')
{  
   
	$role = $_POST['role'];
	$email = $_POST['email'];

	$password = $_POST['password']; 
	 $query = "SELECT * FROM tbl_users WHERE email = '".$email."' && user_role = '".$role."' && varify_email = '1'";
	 $res = mysqli_query($con, $query);
	 $row = mysqli_fetch_assoc($res);
	 if($row['email']){
	 $db_pass=$row['password'];
	 	$pass_decode = password_verify($password, $db_pass);
	 	if($pass_decode){
	 	        $data[] = $row;
                     $data['username'] = $row['name'];
                      $_SESSION['data']=$row;
                      $_SESSION['user_id']=$row['id'];
                       $_SESSION['username']=$row['name'];
		
			 	 				$data["message"] = "Login Successfully";         
	 } 
	 	else{
	 				$data["message"] = "Incorrect Password";         
	 	}
	 }
	 else{
	 			$data["message"] = "User Not Exist";         
	 }

	 
 echo json_encode($data);
}

if($_REQUEST['action']=='edit')
{

	$name = $_POST['name']; 
	$email = $_POST['email'];
	$mobile = $_POST['mobile']; 
	$query = "UPDATE tbl_users SET name = '$name', email = '$email', mobile = '$mobile', updated_at = now() WHERE id='".$_POST['user_id']."'";

	if(mysqli_query($con, $query)){
		$data["message"] = "Data Updated";         
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





if($_REQUEST['action']== 'facebook_login'){
                    $google_id=$_POST['facebook_id'];
                    $google_token = $_POST['token'];
                    $name = $_POST['name'];
                    $user_role = $_POST['role'];
                    $profile_pic = $_POST['profile_pic']; 
                    $email = $_POST['email'];
                    $query3 = "select * from tbl_users where email='".$email."' and user_role='".$user_role."'";
                 
                     $result = mysqli_query($con, $query3);
                     $row3=mysqli_fetch_assoc($result);
                     //echo($row3['email']);
                     if (isset($row3['email'])){
                      $data[]=$row3;
                       //echo $row3['id'];
                      $_SESSION['data']=$row3;
                      $_SESSION['user_id']=$row3['id'];
                      $data["message"] = "Email Already Exist";
                    } 
                    else {
                        $querys = "INSERT INTO tbl_users(name, email, facebook_id, token, profile, user_role, varify_email, status) VALUES('$name', '$email', '$google_id', '$facebook_token', '$profile_pic', '$user_role', '1', '1')";
                         if(mysqli_query($con, $querys)){
                          $select="select * from tbl_users where email='".$email."' and user_role='".$user_role."'";
                        $queryres=mysqli_query($con,$select);
                        $rowres=mysqli_fetch_assoc($queryres);
                        echo $rowres['id'];
                      $data[] = $rowres;
                      $_SESSION['data']=$rowres;
                      $_SESSION['user_id']=$rowres['id'];
                      $dta["message"] = "Login Successfully";
                         }
                    }
                
                				echo json_encode($data);
}