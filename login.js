// ==========================================
// CRIAR USUÁRIO DE TESTE AUTOMATICAMENTE
// ==========================================
(function criarUsuarioTeste() {
    var usuariosStr = localStorage.getItem('nexus_usuarios');
    var usuarios = usuariosStr ? JSON.parse(usuariosStr) : [];
    var jaTem = usuarios.find(function (u) { return u.email === 'teste@teste.com'; });
    if (!jaTem) {
        usuarios.push({
            nome: 'Usuário Teste',
            email: 'teste@teste.com',
            senha: '1234',
            status: 'confirmed'
        });
        localStorage.setItem('nexus_usuarios', JSON.stringify(usuarios));
    }
})();

// ==========================================
// ALTERNAR VISIBILIDADE DA SENHA
// ==========================================
function togglePwd(inputId, icon) {
    var pwdInput = document.getElementById(inputId);
    var type = pwdInput.getAttribute('type') === 'password' ? 'text' : 'password';
    pwdInput.setAttribute('type', type);
    icon.classList.toggle('bx-show');
    icon.classList.toggle('bx-low-vision');
}

// ==========================================
// ALTERNAR ENTRE FORMULÁRIOS
// ==========================================
function switchForm(formName) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'none';

    var title = document.getElementById('formTitle');
    var subtitle = document.getElementById('formSubtitle');

    if (formName === 'login') {
        document.getElementById('loginForm').style.display = 'block';
        title.innerText = 'Bem-vindo de volta!';
        subtitle.innerText = 'Acesse sua plataforma de soluções em vendas e gerencie tudo em um só lugar.';
    } else if (formName === 'signup') {
        document.getElementById('signupForm').style.display = 'block';
        title.innerText = 'Crie sua conta';
        subtitle.innerText = 'Preencha os dados abaixo para começar a usar o sistema.';
    }
}

// ==========================================
// CADASTRO (SIGN UP)
// ==========================================
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('regName').value.trim();
    var email = document.getElementById('regEmail').value.trim();
    var pwd = document.getElementById('regPassword').value;
    var pwdConfirm = document.getElementById('regPasswordConfirm').value;

    if (!name || !email || !pwd) return;

    if (pwd !== pwdConfirm) {
        mostrarToast('As senhas não coincidem. Verifique e tente novamente.', 'error');
        return;
    }

    if (pwd.length < 4) {
        mostrarToast('A senha precisa ter pelo menos 4 caracteres.', 'error');
        return;
    }

    var usuariosStr = localStorage.getItem('nexus_usuarios');
    var usuarios = usuariosStr ? JSON.parse(usuariosStr) : [];

    var jaExiste = usuarios.find(function (u) { return u.email === email && u.status === 'confirmed'; });
    if (jaExiste) {
        mostrarToast('Este e-mail já possui um cadastro ativo. Faça login.', 'error');
        return;
    }

    var btnText = document.getElementById('btnSignupText');
    btnText.innerText = 'Processando...';

    setTimeout(function () {
        var novoUsuario = {
            nome: name,
            email: email,
            senha: pwd,
            status: 'confirmed'
        };

        usuarios = usuarios.filter(function (u) { return u.email !== email; });
        usuarios.push(novoUsuario);
        localStorage.setItem('nexus_usuarios', JSON.stringify(usuarios));

        btnText.innerText = 'Criar Minha Conta';
        mostrarToast('Cadastro realizado com sucesso! Faça seu login.', 'success');
        switchForm('login');
        document.getElementById('loginEmail').value = email;
    }, 1200);
});

// ==========================================
// LOGIN
// ==========================================
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var email = document.getElementById('loginEmail').value.trim();
    var pwd = document.getElementById('loginPassword').value;
    var btnText = document.getElementById('btnLoginText');

    if (!email || !pwd) return;

    var usuariosStr = localStorage.getItem('nexus_usuarios');
    var usuarios = usuariosStr ? JSON.parse(usuariosStr) : [];

    var user = null;
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email) { user = usuarios[i]; break; }
    }

    if (!user) {
        mostrarToast('Usuário não encontrado. Crie uma conta primeiro.', 'error');
        return;
    }

    if (user.senha !== pwd) {
        mostrarToast('Senha incorreta. Tente novamente.', 'error');
        return;
    }

    // Sucesso
    btnText.innerText = 'Autenticando...';

    setTimeout(function () {
        localStorage.setItem('nexus_auth', 'true');
        localStorage.setItem('nexus_user', user.email);
        localStorage.setItem('nexus_name', user.nome);

        mostrarToast('Acesso autorizado! Redirecionando...', 'success');

        setTimeout(function () {
            window.location.href = 'index.html';
        }, 800);
    }, 1200);
});

// ==========================================
// OAUTH SIMULADO
// ==========================================
function simularOAuth(provedor) {
    mostrarToast('Login via ' + provedor + ' em desenvolvimento.', 'info');
}
