const button = document.getElementById('fel');
const music = document.querySelector('.form-check-input');
const statusMusic = document.querySelector('.music');
const musicPlay = new Audio('/img/play.mp3');
musicPlay.loop = true;

const musicOn = () => {
    statusMusic.innerHTML = `<img src="./img/music.png">`;
    musicPlay.play();
}

const musicOff = () => {
    statusMusic.innerHTML = `<img src="./img/music-off.png">`;
    musicPlay.pause();
}

music.addEventListener('click', () => {
    if (music.checked){
        musicOn();
        return
    }
    if (!music.checked){
        musicOff();
        return  
    }
})

const addLoading = () => {
    button.innerHTML = '<div class="progress"><div class="progress-bar"></div></div>';
}

const removeLoading = () => {
    button.innerHTML = 'Enviar';
}

function focar(campo){
    document.getElementById(campo).focus();
}

function errorMsg(bnt, evt, msg) {
    let message = document.getElementById('send-msg');
    let botao = document.getElementById('button-error');
    botao.innerHTML = `<button type="button" onclick="${evt}" class="btn btn-secondary botao-padrao border-0" data-bs-dismiss="modal">${bnt}</button>`;
    message.innerHTML = `${msg}`;
}

function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function mtel(v){
    v=v.replace(/\D/g,"");
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2");
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");
    return v;
}
function id( el ){
	return document.getElementById( el );
}
window.onload = function(){
	id('telefone').onkeyup = function(){
		mascara( this, mtel );
	}
}

const handleSubmit = async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const sentimento = document.getElementById('sentimento').value;
    const visita = document.getElementById('visita').checked ? 'Sim' : 'Não';

    if (nome===""){
        errorMsg('Nome','' , 'Precisamos saber seu nome!');
        focar('nome')
    }else if (endereco===""){
        errorMsg('Endereço','' , 'Digite seu endereço completo por favor!');
        focar('endereco')
    }else if(telefone===""){
        errorMsg('Telefone','' , 'Digite seu telefone por favor!');
        focar('telefone')
    }else if(telefone.length != 15){
        errorMsg('Telefone','' , 'Digite seu telefone no formato DD + Nº por favor!');
        focar('telefone')
    }else{

        addLoading();

		try {

			const response = await fetch('https://script.google.com/macros/s/AKfycbympoM1MlTXORMgpKDK4Ltjf9eoGVpMg4Rx7uaUK-z-_tOQfqMG6kO3F1i5vbsDmRQIOg/exec', {
			    method: 'POST',
			    headers: {
			        'Content-Type': 'application/json',
			    },
			    body: JSON.stringify({
			        nome,
			        endereco,
			        telefone,
			        sentimento,
			        visita
			    }),
			});

	        if (!response.ok) {
	            throw new Error(`Erro HTTP: ${response.status}`);
	        }

	        const data = await response.json();
	
	        errorMsg('Obrigado!','sendClick()' , 'Dados enviados com sucesso!');

	    } catch (error) {
	        errorMsg('Erro!','sendClick()' , 'Falha no servidor, por favor tente novamente em alguns minutos');
	        console.error("Erro:", error);
	    }

        removeLoading();

    }
}

document.querySelector('form').addEventListener('submit', handleSubmit);

function sendClick(){
   
    document.querySelector('form').reset();


}


