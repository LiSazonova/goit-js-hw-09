const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let r=null;function d(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}t.addEventListener("click",(function(){t.setAttribute("disabled",!0),r=setInterval(d,1e3),e.removeAttribute("disabled")})),e.addEventListener("click",(function(){t.removeAttribute("disabled"),e.setAttribute("disabled",!0),clearInterval(r)}));
//# sourceMappingURL=01-color-switcher.1dc372d7.js.map
