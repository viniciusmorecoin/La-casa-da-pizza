const produtos=[

{nome:"O Professor",preco:49.90,categoria:"salgada",desc:"Carne moída, bacon e barbecue"},
{nome:"Lisboa",preco:49.90,categoria:"salgada",desc:"Bacon e abacaxi"},
{nome:"Berlim",preco:49.90,categoria:"salgada",desc:"Pepperoni"},
{nome:"Tóquio",preco:49.90,categoria:"salgada",desc:"Atum e cebola"},
{nome:"Rio",preco:49.90,categoria:"salgada",desc:"Calabresa e cebola"},
{nome:"Nairóbi",preco:49.90,categoria:"salgada",desc:"Frango e catupiry"},
{nome:"Palermo",preco:49.90,categoria:"salgada",desc:"Tomate e manjericão"},
{nome:"Marselha",preco:49.90,categoria:"salgada",desc:"Cogumelo e presunto"},
{nome:"Denver",preco:49.90,categoria:"salgada",desc:"Calabresa e pimenta"},
{nome:"Oslo",preco:49.90,categoria:"salgada",desc:"Carne seca e catupiry"},
{nome:"Estocolmo",preco:49.90,categoria:"salgada",desc:"Presunto e azeitona"},
{nome:"Moscou",preco:49.90,categoria:"salgada",desc:"Cheddar e catupiry"},
{nome:"Bogotá",preco:49.90,categoria:"salgada",desc:"Carne moída e milho"},

{nome:"Confete",preco:39.90,categoria:"doce"},
{nome:"Banana Nevada",preco:39.90,categoria:"doce"},
{nome:"Romeu e Julieta",preco:39.90,categoria:"doce"},
{nome:"Chocolate",preco:39.90,categoria:"doce"},
{nome:"Prestígio",preco:39.90,categoria:"doce"},

{nome:"Combo Casal",preco:85,categoria:"combo",desc:"2 pizzas + refri"},
{nome:"Combo Família",preco:120,categoria:"combo",desc:"3 pizzas"},
{nome:"Combo Festa",preco:180,categoria:"combo",desc:"5 pizzas"},

{nome:"Coca-Cola 2L",preco:15,categoria:"bebida"}

]


let carrinho=[]
let desconto=0
let entrega=5


function render(listaProdutos=produtos){

const lista=document.getElementById("lista")

lista.innerHTML=listaProdutos.map(p=>`

<div class="card" onclick="add('${p.nome}')">

<div>

<h3>${p.nome}</h3>

<p>${p.desc||""}</p>

<span class="price">R$ ${p.preco}</span>

</div>

</div>

`).join("")

}


function filtrar(cat){

let filtro=produtos.filter(p=>p.categoria==cat)

render(filtro)

}