const produtos=[
{nome:"Pizza Calabresa",preco:49.90},
{nome:"Pizza Frango Catupiry",preco:49.90},
{nome:"Pizza Marguerita",preco:49.90},
{nome:"Pizza Banana Nevada",preco:39.90},
{nome:"Coca-Cola 2L",preco:15}
]

let carrinho=[]
let desconto=0
let entrega=5

function render(){

const lista=document.getElementById("lista")

lista.innerHTML=produtos.map(p=>`

<div class="card" onclick="add('${p.nome}')">

<h3>${p.nome}</h3>

<span class="price">R$ ${p.preco}</span>

</div>

`).join("")

}

function add(nome){

const p=produtos.find(x=>x.nome==nome)

let item=carrinho.find(x=>x.nome==nome)

if(item){

item.qtd++

}else{

carrinho.push({...p,qtd:1})

}

atualizar()

}

function atualizar(){

let total=0
let itens=0

carrinho.forEach(i=>{
total+=i.preco*i.qtd
itens+=i.qtd
})

document.getElementById("contador").innerText=`${itens} itens`

document.getElementById("total-btn").innerText=`R$ ${total.toFixed(2)}`

document.getElementById("cart-bar").style.display="block"

}

function abrirCarrinho(){

let html=""

carrinho.forEach((i,index)=>{

html+=`

<div>

${i.nome}

<button onclick="menos(${index})">-</button>

${i.qtd}

<button onclick="mais(${index})">+</button>

</div>

`

})

document.getElementById("itens").innerHTML=html

atualizarTotal()

document.getElementById("modal-carrinho").style.display="flex"

}

function mais(i){

carrinho[i].qtd++

abrirCarrinho()

}

function menos(i){

if(carrinho[i].qtd>1){

carrinho[i].qtd--

}else{

carrinho.splice(i,1)

}

abrirCarrinho()

}

function aplicarCupom(){

let c=document.getElementById("cupom").value

let subtotal=carrinho.reduce((a,b)=>a+b.preco*b.qtd,0)

if(c=="PIZZA10"){

desconto=subtotal*0.1

}else if(c=="PROMO5"){

desconto=5

}else{

desconto=0

alert("Cupom inválido")

}

atualizarTotal()

}

function atualizarTotal(){

let subtotal=carrinho.reduce((a,b)=>a+b.preco*b.qtd,0)

let total=subtotal+entrega-desconto

document.getElementById("subtotal").innerText=`R$ ${subtotal.toFixed(2)}`

document.getElementById("desconto").innerText=`R$ ${desconto.toFixed(2)}`

document.getElementById("total").innerText=`R$ ${total.toFixed(2)}`

}

function finalizarPedido(){

let nome=document.getElementById("nome").value
let end=document.getElementById("endereco").value
let pag=document.getElementById("pagamento").value

let msg=`🍕 Pedido - La Casa da Pizza\n\nCliente: ${nome}\nEndereço: ${end}\nPagamento: ${pag}\n\n`

carrinho.forEach(i=>{

msg+=`${i.nome} x${i.qtd}\n`

})

let total=document.getElementById("total").innerText

msg+=`\nTotal: ${total}`

window.open(`https://wa.me/5561998791411?text=${encodeURIComponent(msg)}`)

}

render()