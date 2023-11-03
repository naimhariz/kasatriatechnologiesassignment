<?php 
 
// Retrieve JSON from POST body 
$jsonStr = file_get_contents('php://input'); 
$jsonObj = json_decode($jsonStr); 

if(!empty($jsonObj->request_type) && $jsonObj->request_type == 'user_auth'){ 
    $credential = !empty($jsonObj->credential)?$jsonObj->credential:''; 
 
    // Decode response payload from JWT token 
    list($header, $payload, $signature) = explode (".", $credential); 
    $responsePayload = json_decode(base64_decode($payload)); 
 
    if(!empty($responsePayload)){ 
        // The user's profile info 
        $oauth_provider = 'google'; 
        $oauth_uid  = !empty($responsePayload->sub)?$responsePayload->sub:''; 
        $first_name = !empty($responsePayload->given_name)?$responsePayload->given_name:''; 
        $last_name  = !empty($responsePayload->family_name)?$responsePayload->family_name:''; 
        $email      = !empty($responsePayload->email)?$responsePayload->email:''; 
        $picture    = !empty($responsePayload->picture)?$responsePayload->picture:''; 
         
        $output = [ 
            'status' => 1, 
            'msg' => 'Account data inserted successfully!', 
            'pdata' => $responsePayload 
        ]; 
        echo json_encode($output); 
    }else{ 
        echo json_encode(['error' => 'Account data is not available!']); 
    } 
} 
?>