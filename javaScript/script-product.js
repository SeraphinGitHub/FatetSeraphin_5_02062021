
"use strict"

// ======================================================================
// Control "Personaliser" button (Product Page)
// ======================================================================
const customBtn = document.querySelector(".custom-btn");
const dropCont = document.querySelector(".dropdown-content");
const dropFlow = document.querySelector(".dropdown-flow");

// Mouse OnClick
customBtn.addEventListener("click", () => {
        this.style = "border-radius: 20px 20px 0 0";
        dropCont.style = "transform: translateY(0%)";
        dropFlow.style = "height: 260px;";
    }
);

// Mouse out of container
dropCont.addEventListener("mouseleave", () => {
        repackDropdown();
    }
);

const repackDropdown = () => {
    dropCont.style = "transform: translateY(-100%)";
    setTimeout(hideDropdownBack, 300);
}

const hideDropdownBack = () => {
    customBtn.style = "border-radius: 20px; transition-duration: 0.2s";
    dropFlow.style = "height: 0px";
}
