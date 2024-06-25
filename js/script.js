window.addEventListener("load", function () {
    var loader = document.querySelector(".loader");
    loader.style.width = "100%";

    // Opcional: ocultar a barra após ela atingir 100%
    loader.addEventListener("transitionend", function () {
        setTimeout(function () {
            loader.style.opacity = "0";
            loader.style.transition = "opacity 0.5s ease-out";
        }, 500); // Atraso de 500ms (0.5 segundo) antes de ocultar a barra
    });
});