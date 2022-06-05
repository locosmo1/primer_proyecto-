//nombre de la base de datos mercado libre

//genera una consulta sql para devolver los datos de los usuarios registrados de nuestra base de datos
function consulta_usuarios(){
    $sql = "SELECT * FROM usuarios";
    return $sql;
}

//obtener todos los datos de los usuarios cuyo nombre contenga la letra "A"
function consulta_usuarios_A(){
    $sql = "SELECT * FROM usuarios WHERE nombre LIKE '%A%'";
    return $sql;
}

//Hacer el login de la base de datos
function consulta_login($usuario, $password){
    $sql = "SELECT * FROM usuarios WHERE usuario = '$usuario' AND password = '$password'";
    return $sql;
}

//Consultar Listas con con el micro ORM "dapper" de c#
function consulta_listas(){
    $sql = "SELECT * FROM listas";
    return $sql;
}