
isOnScreen()

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
window.addEventListener('scroll', function () {
    const contatoSection = document.querySelector('.contato-section');
    const sectionPosition = contatoSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition) {
        contatoSection.classList.add('aparecer');
        
        const elementosAnimados = document.querySelectorAll('.animado');
        elementosAnimados.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('aparecer');
            }, index * 300);  
        });
    }
});

const form = document.getElementById('form-contato');
const telefoneInput = document.getElementById('telefone');
const mensagemSucesso = document.getElementById('mensagem-sucesso');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (validarFormulario()) {
        mensagemSucesso.classList.remove('oculto');
        setTimeout(() => {
            mensagemSucesso.classList.add('oculto');
        }, 3000);
        form.reset();
    }
});

function validarFormulario() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = telefoneInput.value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (nome === '' || email === '' || telefone === '' || mensagem === '') {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    if (!validarEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return false;
    }

    return true;
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

telefoneInput.addEventListener('input', function (e) {
    let telefone = e.target.value.replace(/\D/g, ''); 
    telefone = telefone.replace(/(\d{2})(\d)/, '($1) $2'); 
    telefone = telefone.replace(/(\d{5})(\d{4})$/, '$1-$2'); 
    e.target.value = telefone;
});


function isOnScreen(){
    const observer = new IntersectionObserver (entries => {
        Array.from(entries).forEach(entry => {
            if (entry.intersectionRatio >= 1) { 
                entry.target.classList.add('animacaoSkillBar')
            

            }else if(entry.intersectionRatio <= 0){
                entry.target.classList.remove('animacaoSkillBar')
            }
        })

        }, {
        threshold: [0, .5, 1]
        })
    
        Array.from(document.querySelectorAll('.progress')).forEach(element => {
        observer.observe(element)
        })
}

function loadpage(){
    textAnimation() 
    isOnScreen()
}


let i = 0
let wordInScreen = 0
let write = true
let TextoFinal = [
    "Welcome...",        // English
    "Bienvenido...",     // Spanish
    "Bienvenue...",      // French
    "欢迎...",           // Chinese
    "ようこそ...",      // Japanese
    "환영합니다...",    // Korean
    "Bem-vindo...",      // Portuguese
    "أهلاً وسهلاً",   // Arabic (Ahlan wa sahlan)
    "Willkomme...n",     // German (alternative)
    "Tervetuloa...",     // Finnish
    "Vítejte...",        // Czech
    "Dobrodošli...",     // Croatian
    "Benvingut...",      // Catalan
    "Karibu...",         // Swahili
    "Chào mừng...",      // Vietnamese
    "Kalimera...",       // Greek
    "Saluton...",        // Esperanto
    "Svaagatam..."       // Hindi
];
let Hello = true
let textoCortado = ''
let lightmode = false

function textAnimation(){
    if(wordInScreen >= TextoFinal.length){
        wordInScreen = 0
    }

    if(write){
        TextWrite()
        
    }
    else{
        TextErase()
    }


}

function TextWrite(){
    let texto = document.getElementById("TextAnimation")
    if(i < TextoFinal[wordInScreen].length && write){
        texto.textContent += TextoFinal[wordInScreen][i]
        i++
        setTimeout(textAnimation, 200)
    }else{
        write = false
        setTimeout(textAnimation, 3000)
    }
    
}

function TextErase(){
    let texto = document.getElementById("TextAnimation")
    if(i == 0){
        texto.textContent = texto.textContent.slice(0,i)
        write = true
        wordInScreen++
        
        // if(wordInScreen <= TextoFinal.length){
        // }else{
        //     wordInScreen = 0
        // }
        setTimeout(textAnimation, 1000)
    }else{
        texto.textContent = texto.textContent.slice(0,i)
        i--

        setTimeout(textAnimation, 100)
    }
    

}