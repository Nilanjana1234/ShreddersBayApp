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


if($_REQUEST['action']=='auction_signup'){

  // $sql1="
  // CREATE TABLE tbl_auctionusers (
  //   id int(11) NOT NULL,
  //   user_role int(11) NOT NULL,
  //   name varchar(255) NOT NULL,
  //   email varchar(255) NOT NULL,
  //   password varchar(255) NOT NULL,
  //   profile varchar(255) NOT NULL,
  //   mobile bigint(20) NOT NULL,
  //   google_id varchar(255) NOT NULL,
  //   facebook_id int(11) NOT NULL,
  //   token varchar(255) NOT NULL,
  //   varify_email int(11) NOT NULL,
  //   status int(11) NOT NULL,
  //   created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  //   updated_at datetime NOT NULL
  // );"
  // if ($result = $mysqli->query("SHOW TABLES LIKE 'tbl_auctionusers'")) {
  //   if($result->num_rows == 1) {
  //      // echo "Table exists";
  //   }
  //   else {
  //     //  Table does not exist it will create
  //     mysqli_query($con, $sql1) ;
       
  //     }
  // }
  

  $name = $_POST['name']; 
  $email = $_POST['email'];  
  $token = bin2hex(random_bytes(15));
  if(!isset($_POST['id'])){ 
      if(!isset($_POST['google_id'])){
      $user_role = $_POST['role'];
      $mobile = $_POST['mobile'];
      $password = $_POST['password']; 
    //  $repassword = $_POST['repassword'];
      $emailquery = "select * from tbl_auctionusers where email='$email'";
      $query = mysqli_query($con, $emailquery);
      if (mysqli_num_rows($query) > 0) {
          $data['message'] = "Email Already Exist";
      } else {
          $pass = password_hash($password, PASSWORD_BCRYPT);
          $query = "INSERT INTO tbl_auctionusers(name, email, password, mobile, token, user_role, status) VALUES ('$name', '$email', '$pass', '$mobile', '$token', '$user_role', '1')";
          if(mysqli_query($con, $query)){
               // $data["message"] = "Data Inserted";  
              $subject = "Email Verification";
              $body = "Hi, $name Click here to activate your Auction account http://www.shreddersbay.com/API/auctionUser_api.php?action=varify_email&role=$user_role&token=$token";
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
      $query3 = "select * from tbl_auctionusers where email='".$email."' and user_role='".$user_role."'";
     
      
       $result = mysqli_query($con, $query3);
       $row3=mysqli_fetch_assoc($result);
      if (isset($row3['email'])){
          $select="select * from tbl_auctionusers where token='".$google_token."'";
          $queryres=mysqli_query($con,$select);
          $rowres=mysqli_fetch_assoc($queryres);
        $data[] = $rowres;
        $_SESSION['data']=$rowres;
        $_SESSION['user_id']=$rowres['id'];
      } 
      else {
          $querys = "INSERT INTO tbl_auctionusers(name, email, google_id, token, profile, user_role, varify_email, status) VALUES('$name', '$email', '$google_id', '$google_token', '$profile_pic', '$user_role', '1', '1')";
           if(mysqli_query($con, $querys)){
            $select="select * from tbl_auctionusers where token='".$google_token."'";
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
       $query = "UPDATE tbl_auctionusers SET name = '$name', email = '$email', mobile = '$mobile', updated_at = now() WHERE id='".$hidden_id."'";
      if(mysqli_query($con, $query)){
          $data["message"] = "Data Updated";         
      }
  echo json_encode($data);
  }

 
}


if($_REQUEST['action']=='varify_email')
{
	if(isset($_GET['token'])){
		$token= $_GET['token'];
		$role=$_GET['role'];
		$update_query = "UPDATE tbl_auctionusers set varify_email='1' WHERE token='".$token."' and user_role='".$role."'";
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


if($_REQUEST['action']=='auction_login')
{  
   
	$role = $_POST['role'];
	$email = $_POST['email'];

	$password = $_POST['password']; 
	 $query = "SELECT * FROM tbl_auctionusers WHERE email = '".$email."' && user_role = '".$role."' && varify_email = '1'";
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
