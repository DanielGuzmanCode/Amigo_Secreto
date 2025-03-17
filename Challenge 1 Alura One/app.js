
class AmigoSecreto {
    constructor() {
        // Referencias a los elementos del DOM
        this.inputAmigo = document.getElementById("amigo");
        this.listaAmigos = [];
        this.ulListaAmigos = document.getElementById("listaAmigos");
        this.ulResultado = document.getElementById("resultado");
        this.btnAgregar = document.getElementById("agregarButton");
        this.btnSortear = document.getElementById("sortearButton");
        this.btnReiniciar = document.getElementById("reiniciarButton");

        // Expresión regular para validar solo letras y espacios
        this.regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/;

        // Inicializa los eventos de los botones
        this.init();
    }

    init() {
        // Asigna eventos a los botones
        this.btnAgregar.addEventListener("click", this.agregarAmigo.bind(this));
        this.btnSortear.addEventListener("click", this.sortearAmigo.bind(this));
        this.btnReiniciar.addEventListener("click", this.reiniciarAmigo.bind(this));
    }

    agregarAmigo() {
        // Obtiene y limpia el valor del input
        const amigo = this.inputAmigo.value.trim();

        // Valida que el nombre solo contenga letras y espacios
        if (!this.regex.test(amigo)) {
            alert('Debes ingresar un nombre válido (solo letras y espacios).');
            this.inputAmigo.value = "";
            return;
        }

        // Evita nombres duplicados en la lista
        if (this.listaAmigos.includes(amigo)) {
            alert("Este nombre ya está en la lista.");
            return;
        }

        // Limita la cantidad de amigos a 4
        if (this.listaAmigos.length >= 4) {
            alert("Solo puedes agregar hasta 4 amigos.");
            return;
        }

        // Agrega el amigo a la lista y lo muestra en la interfaz
        this.listaAmigos.push(amigo);
        const li = document.createElement("li");
        li.textContent = amigo;
        this.ulListaAmigos.appendChild(li);
        this.inputAmigo.value = "";
        this.inputAmigo.focus();
    }

    sortearAmigo() {
        // Verifica si hay amigos en la lista antes de sortear
        if (this.listaAmigos.length === 0) {
            alert("No hay amigos en la lista para sortear.");
            return;
        }

        // Selecciona un amigo al azar
        const randomIndex = Math.floor(Math.random() * this.listaAmigos.length);
        const amigoSecreto = this.listaAmigos[randomIndex];

        // Muestra el resultado y deshabilita botones para evitar cambios
        this.ulResultado.innerHTML = `<li>El amigo secreto es: ${amigoSecreto}</li>`;
        this.btnSortear.disabled = true;
        this.btnAgregar.disabled = true;
    }

    reiniciarAmigo() {
        // Reinicia la lista de amigos y limpia la interfaz
        this.listaAmigos = [];
        this.ulListaAmigos.innerHTML = "";
        this.ulResultado.innerHTML = "";

        // Habilita los botones nuevamente
        this.btnSortear.disabled = false;
        this.btnAgregar.disabled = false;
    }
}

// Espera a que el DOM esté completamente cargado antes de inicializar la clase
document.addEventListener("DOMContentLoaded", () => {
    new AmigoSecreto();
});
