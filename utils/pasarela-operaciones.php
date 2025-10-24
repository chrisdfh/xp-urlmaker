<?php
    $persona_en_cuenta = isset($_GET['pid'])?$_GET['pid']:null;
    $xpcta_hash=isset($_GET['h'])?$_GET['h']:null;

    if ($persona_en_cuenta==null || $xpcta_hash==null){
        $error = true;
        header("Location: /");
    } else {
        $timestamp = time()+(15*60);
        if (strlen($xpcta_hash)!=32){
            header("Location: /");
        } else {
            $xpayctahash_1st = substr($xpcta_hash, 0, 15);
            $xpayctahash_2nd = substr($xpcta_hash, 15);

            $xpcta_hash_timestamp = $xpayctahash_1st.'Z'.$timestamp.'Z'.$xpayctahash_2nd;
            header("Location: /transacciones/$xpcta_hash_timestamp/$persona_en_cuenta");
        }
    }
?>