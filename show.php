<?php

$file_content = json_decode(file_get_contents("php://input"));

include "./db.php";

if($_GET['n']=="view"){

$sql = "select * from users order by id desc";
$res = $dblink->query($sql);
$data = array();
while($row = $res->fetch_assoc()){
    $data[] = $row;
  }
print json_encode($data);
    
}


if($_GET['n']=="add"){

//$id = $data->id;
$name = $file_content->name;
$phone = $file_content->phone;
$city = $file_content->city;
    
$sql = "insert into users values(NULL,'$name',$phone,'$city')";
$res = $dblink->query($sql);
    
echo "Record Added!";
    
}

if($_GET['n']=="rem"){

//$id = $data->id;
$id = $file_content->id;
    
$sql = "delete from users where id=$id";
$res = $dblink->query($sql);
    
echo "Record Deleted";
    
}

 
if($_GET['n']=="edit"){


$id = $file_content->id;
    
$sql = "select * from users where id=$id";
$res = $dblink->query($sql);
    
$data = array();
while($row = $res->fetch_assoc()){
    $data[] = $row;
  }
print json_encode($data);
    
}


if($_GET['n']=="update"){

$id = $file_content->uid;
$name = $file_content->name;
$phone = $file_content->phone;
$city = $file_content->city;
    
$sql = "update users set name='$name',phone= $phone,city ='$city' where id = ".$id;
$res = $dblink->query($sql);

    echo $sql;
//echo "Record Updated!";
    
}

    

?>