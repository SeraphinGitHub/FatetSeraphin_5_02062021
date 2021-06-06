
"use strict"

//  =====  Control "Personaliser" button (Product Page) =====

// Mouse OnClick
const customBtn = document.querySelector(".custom-btn");

customBtn.addEventListener("click", function() {
        customBtn.style = "border-radius: 20px 20px 0 0";
        document.querySelector(".dropdown-content").style = "transform: translateY(0%)";
        document.querySelector(".dropdown-flow").style = "height: 260px;";
    }
);


// Mouse out of container
const dropCont = document.querySelector(".dropdown-content");

dropCont.addEventListener("mouseleave", function() {
        document.querySelector(".dropdown-content").style = "transform: translateY(-100%)";
        setTimeout(hideDropdownBack, 300);
    }
);

function hideDropdownBack() {
    customBtn.style = "border-radius: 20px; transition-duration: 0.2s";
    document.querySelector(".dropdown-flow").style = "height: 0px";
}

    