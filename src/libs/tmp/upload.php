<?php
/*
UploadiFive
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
*/

// Set the uplaod directory
$uploadDir = '/uploads/';

// Set the allowed file extensions
$fileTypes = array('jpg', 'jpeg', 'gif', 'png'); // Allowed file extensions

// $verifyToken = md5('unique_salt' . $_POST['timestamp']);

if (!empty($_FILES)) {
	$tempFile   = $_FILES['Filedata']['tmp_name'];
    $targetUrl  = $uploadDir . $_FILES['Filedata']['name'];
	$uploadDir  = $_SERVER['DOCUMENT_ROOT'] . $uploadDir;
	$targetFile = $uploadDir . $_FILES['Filedata']['name'];

	// Validate the filetype
	$fileParts = pathinfo($_FILES['Filedata']['name']);
	if (in_array(strtolower($fileParts['extension']), $fileTypes)) {

		// Save the file
		move_uploaded_file($tempFile, $targetFile);
		echo '{
            "status" : 1,
            "fileUrl" : "' . $targetUrl . '",
            "fileUri" : "' . $uploadDir . '"
        }';

	} else {

		// The file type wasn't allowed
		echo 'Invalid file type.';

	}
}
?>
