function onload() {
  const loadItems = getItemsFromLocalStorage(); //mantém a lista to do mesmo se atualizar a página
  setItemsFromLocalStorage(loadItems);
}

function addtodo(event) {
  if (event.key == "Enter") {
    const todovalue = document.getElementById("newtodo").value; //pega oq o usuario digita e guarda em "todovalue"
    const localItems = getItemsFromLocalStorage(); //cria "localitems" e pega o obj q está em local storage
    localItems.push(todovalue); //diz pro "localitems" colocar o "todovalue" no final
    localStorage.setItem("items", JSON.stringify(localItems)); //cria "items" dentro do "localitems" e transforma em string
    setItemsFromLocalStorage(localItems); //diz pra função setItems usar "localitems"
  }
}

function getItemsFromLocalStorage() {
  let localItems = JSON.parse(localStorage.getItem("items"));
  if (!localItems) {
    localItems = [];
  }
  return localItems; // se localitems estiver em branco, ele n retorna nada, evita de adicionar "space" como to do
}

function setItemsFromLocalStorage(localItems) {
  document.getElementById("list").innerHTML = localItems
    .map((mapobj, index) => {
      return `<div class="item">
        <input type="checkbox" id=${index} name=${index} onclick="validate(${index})" />
        <label for=${index}>${mapobj}</label>
        </div>`;
    })
    .join("");
}

function validate(id) {
  const chkbox = document.getElementById(id);
  const localItems = getItemsFromLocalStorage();
  if (chkbox.checked) {
    chkbox.parentElement.remove();
    localItems.splice(id, 1);
    localStorage.setItem("items", JSON.stringify(localItems));
  }
}
