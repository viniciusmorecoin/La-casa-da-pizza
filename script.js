const produtos=[

{nome:"Pizza Calabresa",preco:49.90,img:"calabresa.jpg",desc:"Calabresa e cebola"},
{nome:"Pizza Frango Catupiry",preco:49.90,img:"frango.jpg",desc:"Frango e catupiry"},
{nome:"Pizza Marguerita",preco:49.90,img:"marguerita.jpg",desc:"Tomate e manjericão"},
{nome:"Pizza Banana Nevada",preco:39.90,img:"banana.jpg",desc:"Chocolate branco e leite em pó"},
{nome:"Coca-Cola 2L",preco:15,img:"coca.jpg",desc:"Refrigerante"}

]


let carrinho=[]
let desconto=0
let entrega=5


const cupons={

PIZZA10:{tipo:"porcentagem",valor:10},

CASADAPIZZA:{tipo:"fixo",valor:8},

INSTAGRAM:{tipo:"porcentagem",valor:5}

}


function render(){

const lista=document.getElementById("lista")

lista.innerHTML=produtos.map(p=>`

<div class="card" onclick="add('${p.nome}')">

<img src="${p.img}" class="pizza-img">

<div class="card-info">

<h3>${p.nome}</h3>

<p class="desc">${p.desc}</p>

<span class="price">R$ ${p.preco}</span>

</div>

</div>

`).join("")

}


function add(nome){

let p=produtos.find(x=>x.nome==nome)

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

${i.nome} x${i.qtd}

<button onclick="menos(${index})">-</button>

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

let c=document.getElementById("cupom").value.toUpperCase()

let subtotal=carrinho.reduce((a,b)=>a+b.preco*b.qtd,0)

if(cupons[c]){

if(cupons[c].tipo=="porcentagem"){

desconto=subtotal*(cupons[c].valor/100)

}

if(cupons[c].tipo=="fixo"){

desconto=cupons[c].valor

}

alert("Cupom aplicado")

}else{

alert("Cupom inválido")

}

atualizarTotal()

}


function calcularEntrega(){

entrega=parseFloat(document.getElementById("bairro").value)

atualizarTotal()

}


function verificarPix(){

let p=document.getElementById("pagamento").value

if(p=="Pix"){

document.getElementById("pix-box").style.display="block"

}else{

document.getElementById("pix-box").style.display="none"

}

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