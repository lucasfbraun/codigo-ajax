var dataUrl = "dados/menu.json",
    itensHtml = "item-snippet.html",
	itensConteudo = "item-conteudo.html";
    
// função facilitadora para inserir HTML em um elemento
function insereHtml(seletor, html) {
  var elemento = document.querySelector(seletor);
  console.log(html);
  elemento.innerHTML = html;
}

// substitui propriedade {{propName}} dentro de um 
// 'template', e substitui por seu propValue
function inserePropriedade(template, propName, propValue) {
  // criar {{propName}}
  // trocar (replace), dentro de template, {{propName}} por propValue
  // retornar o template alterado
  var propriedade = "{{" + propName + "}}";
  // substitui todas as ocorrências de propriedade por propValue
  // em template
  template = template.replace(new RegExp(propriedade, "g"),
              propValue);
  return template;
}

// constroi a pagina, com os dados recebidos por parametro
function constroiPagina(dados) {
  var htmlFinal = "";// string que vai conter todo o HTML
  // construimos os itens agora
  $ajaxUtils.sendGetRequest(itensHtml, function(itensHtml) {
    for (var i = 0, max = dados.length; i < max; i++) {
      var html = itensHtml,
          nome = dados[i].titulo;
          
      html = inserePropriedade(html, "titulo", nome);
	  
      htmlFinal += html;
    }
    insereHtml("#bs-example-navbar-collapse-1", htmlFinal);
  }, false);
}
$ajaxUtils.sendGetRequest(dataUrl, constroiPagina);

function constroiPagina2(dados) {
  var htmlFinal = "";
  $ajaxUtils.sendGetRequest(itensConteudo, function(itensConteudo) {
    for (var i = 0, max = dados.length; i < max; i++) {
      var html = itensConteudo,
          titulo = dados[i].titulo,
		  conteudo = dados[i].Conteudo;

      html = inserePropriedade(html, "titulo", titulo);
      html = inserePropriedade(html, "Conteudo", conteudo);
	  
      htmlFinal+= html;
    }
    insereHtml("#nadinha", htmlFinal);
  }, false);
}

$ajaxUtils.sendGetRequest(dataUrl, constroiPagina2);
