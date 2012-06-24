<?php


    if ($_POST['type'] == 'range') {
        $newdata = $_POST['data']; 

        $contents = file_get_contents('range_annotations.json');
        //var_dump($contents);
        echo "<br />";
        $json = json_decode($contents);
        //$json1 = var_dump(json_decode($json));
        //var_dump($json); 

        //$json1 = json_encode(array()); 
        //file_put_contents('range_annotations.json',json_encode($json1)); 

        //echo json_encode($json);
        $json[] = $newdata;
        var_dump($json);
        //var_dump($json1);
        file_put_contents('range_annotations.json',json_encode($json)); 
    } elseif ($_POST['type'] == 'datapoint') {
        $newdata = $_POST['data']; 
        echo json_encode($newdata);
        file_put_contents('datapoints_with_annotations.json',json_encode($newdata));
    }


?>
