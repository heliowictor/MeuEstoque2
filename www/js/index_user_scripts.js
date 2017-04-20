var db=null;
/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  #txtSalvar */
    $(document).on("click", "#txtSalvar", function(evt)
    {
         obterValoresForm();
         return false;
    });
    
        /* button  #btnLimpar */
    $(document).on("click", "#btnLimpar", function(evt)
    {
         limparValoresForm();
         return false;
    });
     
    adicionarLista();
     connectDB();
        /* button  #btnLista */
    $(document).on("click", "#btnLista", function(evt)
    {
        activate_page("#mainpage");
         return false;
    });
    
        /* button  #btnCad */
    $(document).on("click", "#btnCad", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage"); 
         return false;
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();



function obterValoresForm(){
    var produto=$("#txtProduto").val();
    var codigo=$("#txtCod").val(); 
    var dataVencimento=$("#txtDataVenc").val();
    var preco=$("#txtPreco").val();
    var quantidade=$("#txtQuant").val();    
    var categoria=$("#selectCat").val();
    
    console.log(produto);
    console.log(codigo);
    console.log(dataVencimento);
    console.log(preco);
    console.log(quantidade);
    console.log(categoria);

    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO Produto (codigo, produto,data_vencimento,quantidade,preco,categoria) VALUES (? , ? , ? , ? , ? , ? )', 
        [codigo, produto,data_vencimento,quantidade,preco,categoria],
        function (){
            $("#alertSuc").show();
            $("#alertErr").hide();
            limparValoresForm();
        },function (){
            $("#alertErr").show();
            $("#alertSuc").hide();
        });
    });
}


function limparValoresForm(){
    $("#txtProduto").val("");
    $("#txtCod").val("");
    $("#txtDataVenc").val("");
    $("#txtPreco").val("");
    $("#txtQuant").val("");
    $("#selectCat").val("Mas");
    
}

function connectDB(){
     db = openDatabase('produtos', '1.0', 'Gerenciamento de Produtos', 2 * 1024 * 1024);
    
    if(!db){

        console.log("Erro ao conectar no BD");
    }else{
        console.log("Conectado ao banco de dados!!!");
    }
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Produto (codigo unique, produto,data_vencimento,quantidade,preco,categoria)',[[]], function (){
        console.log("tabela criada")
        },function (){
            console.log("nao foi possivel criar tabela");
        }
        );
        
    });
    
}


