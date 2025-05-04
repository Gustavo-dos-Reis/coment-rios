document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.comentario-form');
    const listaComentarios = document.getElementById('lista-comentarios');
    const nomeInput = document.getElementById('nome-usuario');
    const emailInput = document.getElementById('email-usuario');
    const textoInput = document.getElementById('texto-comentario');

    
    carregarComentarios();

    // Adiciona evento ao formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        adicionarComentario();
    });

    function adicionarComentario() {
        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const texto = textoInput.value.trim();
        const data = new Date();

        if (!nome || !texto) {
            alert('Por favor, preencha pelo menos seu nome e o comentário!');
            return;
        }

        const comentario = {
            id: Date.now(),
            nome,
            email,
            texto,
            data: data.toLocaleString('pt-BR'),
            atual: true
        };
       
        criarElementoComentario(comentario);

        salvarComentario(comentario);
        
        nomeInput.value = '';
        emailInput.value = '';
        textoInput.value = '';
        textoInput.focus();
    }

    function criarElementoComentario(comentario) {
        const comentarioDiv = document.createElement('div');
        comentarioDiv.className = `comentario ${comentario.atual ? 'atual' : ''}`;
        comentarioDiv.dataset.id = comentario.id;

        comentarioDiv.innerHTML = `
            <div class="comentario-cabecalho">
                <span class="comentario-autor">${comentario.nome}</span>
                <span class="comentario-data">${comentario.data}</span>
            </div>
            <div class="comentario-texto">${comentario.texto}</div>
            <div class="comentario-acoes">
                <button class="btn-responder">Responder</button>
            </div>
        `;

        listaComentarios.prepend(comentarioDiv);

        comentarioDiv.querySelector('.btn-responder').addEventListener('click', function() {
            responderComentario(comentario.nome);
        });
    }

    function responderComentario(nome) {
        textoInput.value = `@${nome} `;
        textoInput.focus();
    }

    function salvarComentario(comentario) {
        let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        
        const comentarioParaSalvar = {...comentario, atual: false};
        
        comentarios.unshift(comentarioParaSalvar);
        localStorage.setItem('comentarios', JSON.stringify(comentarios));
    }

    function carregarComentarios() {
        const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        
        comentarios.forEach(comentario => {
            criarElementoComentario(comentario);
        });
    }
});