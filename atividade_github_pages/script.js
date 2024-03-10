// Atvidade com o intuito de exercitar o uso de classes, herança e exceções

class Funcionario {
    constructor(nome, idade, cargo) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
    }

    seApresentar() {
        return `Ola, eu sou ${this.nome}, tenho ${this.idade} anos e sou ${this.cargo}`;
    }

    trabalhar() {
        return `Trabalhando como ${this.cargo}`;
    }
}

class Gerente extends Funcionario {
    constructor(nome, idade, cargo, departamento) {
        super(nome, idade, cargo);
        this.departamento = departamento;
    }

    gerenciar() {
        return `Gerenciando o departamento de ${this.departamento}`;
    }
}

class Desenvolvedor extends Funcionario {
    constructor(nome, idade, cargo, linguagem) {
        super(nome, idade, cargo);
        this.linguagem = linguagem;
    }

    programar() {
        return `Programando em ${this.linguagem}`;
    }
}

var gerente = new Gerente('Joaquim', 45, 'Gerente de TI', 'TI');

console.log(gerente.seApresentar());
console.log(gerente.gerenciar());

var desenvolvedor = new Desenvolvedor('Manoel', 27, 'Desenvolvedor Pleno', 'Python');

console.log(desenvolvedor.seApresentar());
console.log(desenvolvedor.programar());

// Lógica avançada

var funcionarios = [];

// inputs
var tipoFuncionario = document.getElementById('tipo');
var nome = document.getElementById('nome');
var idade = document.getElementById('idade');
var cargo = document.getElementById('cargo');
var linguagem = document.getElementById('linguagem');
var departamento = document.getElementById('departamento');

// wrappers
var departamentoWrapper = document.getElementById('departamentoWrapper')
var linguagemWrapper = document.getElementById('linguagemWrapper')

function verificaTipo() {
    if (tipoFuncionario.value == 'funcionario') {
        departamentoWrapper.style.display = 'none'
        linguagemWrapper.style.display = 'none'
    } else if (tipoFuncionario.value == 'gerente') {
        departamentoWrapper.style.display = 'flex'
        linguagemWrapper.style.display = 'none'
    } else if (tipoFuncionario.value == 'desenvolvedor') {
        linguagemWrapper.style.display = 'flex'
        departamentoWrapper.style.display = 'none'
    }
}

verificaTipo();

tipoFuncionario.addEventListener('change', () => {
    verificaTipo();
})

// tabelas

funcionariosTable = document.getElementById('funcionariosTable')
gerentesTable = document.getElementById('gerentesTable')
desenvolvedoresTable = document.getElementById('desenvolvedoresTable')

function atualizarTabelas() {
    var funcionariosContent = ''
    var gerentesContent = ''
    var desenvolvedoresContent = ''

    for (var i = 0; i < funcionarios.length; i++) {
        if (funcionarios[i] instanceof Gerente) {
            gerentesContent += `
                <tr>
                    <td>${funcionarios[i].nome}</td>
                    <td>${funcionarios[i].idade}</td>
                    <td>${funcionarios[i].cargo}</td>
                    <td>${funcionarios[i].departamento}</td>
                    <td>${funcionarios[i].seApresentar()}</td>
                    <td>${funcionarios[i].trabalhar()}</td>
                    <td>${funcionarios[i].gerenciar()}</td>
                </tr>
            `
        } else if (funcionarios[i] instanceof Desenvolvedor) {
            desenvolvedoresContent += `
                <tr>
                    <td>${funcionarios[i].nome}</td>
                    <td>${funcionarios[i].idade}</td>
                    <td>${funcionarios[i].cargo}</td>
                    <td>${funcionarios[i].linguagem}</td>
                    <td>${funcionarios[i].seApresentar()}</td>
                    <td>${funcionarios[i].trabalhar()}</td>
                    <td>${funcionarios[i].programar()}</td>
                </tr>
            `
        } else {
            funcionariosContent += `
                <tr>
                    <td>${funcionarios[i].nome}</td>
                    <td>${funcionarios[i].idade}</td>
                    <td>${funcionarios[i].cargo}</td>
                    <td>${funcionarios[i].seApresentar()}</td>
                    <td>${funcionarios[i].trabalhar()}</td>
                </tr>
            `
        }
    }

    funcionariosTable.innerHTML = (funcionariosContent || '<tr><td colspan="5">Não há funcionários</td></tr>')
    gerentesTable.innerHTML = (gerentesContent || '<tr><td colspan="7">Não há gerentes</td></tr>');
    desenvolvedoresTable.innerHTML = (desenvolvedoresContent || '<tr><td colspan="7">Não há desenvolvedores</td></tr>');
}

atualizarTabelas();

function showToast(message, color) {
    const toast = document.createElement('div');
    const wrapper = document.getElementById('toast-container')

    wrapper.appendChild(toast);
    toast.outerHTML = `
        <div class="toast align-items-center text-bg-${color} border-0 show position-relative bottom-0 end-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;

    const toastEl = new bootstrap.Toast(toast);

    toastEl.show();
}

function exibirErro(message) {
    showToast(message, 'danger');
}

function exibirSucesso(message) {
    showToast(message, 'success');
}

function checkInputs() {
    try {
        console.log(typeof Number(idade.value), Number(idade.value))
        if (nome.value == '' || idade.value == '' || cargo.value == '' || (tipo.value == 'gerente' && departamento.value == '') || (tipo.value == 'desenvolvedor' && linguagem.value == '')) {
            throw new Error('Preencha todos os campos');
        } else if (idade.value < 14) {
            throw new Error('Funcionários devem ter pelo menos 14 anos');
        } else if (idade.value > 100) {
            throw new Error('Funcionários devem ter menos de 100 anos');
        } else if (isNaN(idade.value)) {
            throw new Error('Idade deve ser um número');
        }

        return true;
    } catch (error) {
        exibirErro(error.message);
        return false;
    }
}

function cadastrarFuncionario(event) {
    event.preventDefault();

    if (checkInputs()) {
        var funcionario

        if (tipo.value == 'funcionario') {
            funcionario = new Funcionario(nome.value, idade.value, cargo.value)
        } else if (tipo.value == 'gerente') {
            funcionario = new Gerente(nome.value, idade.value, cargo.value, departamento.value)
        } else if (tipo.value == 'desenvolvedor') {
            funcionario = new Desenvolvedor(nome.value, idade.value, cargo.value, linguagem.value)
        }

        funcionarios.push(funcionario);
        atualizarTabelas();
        exibirSucesso(`Funcionario ${funcionario.nome} cadastrado com sucesso!`);
    }
}

