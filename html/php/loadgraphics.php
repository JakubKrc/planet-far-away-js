<?php

$filelist = glob("graphics/*");
$fileListToJava = array();

foreach ($filelist as $file) {

    echo $file . "<br><br>";

    if(is_dir($file)){

        echo "DIR<br>";

        $filelist2 = glob($file . "/*");


            foreach ($filelist2 as $file2) {
                echo $file2 . "<br>";
                
            }

            $fileListToJava = array_merge($fileListToJava, $filelist2);

            echo "<br><br>";
        
    }

    foreach ($fileListToJava as $file2) {
      echo $file2 . "<br>";            
    }
    
}

?>
