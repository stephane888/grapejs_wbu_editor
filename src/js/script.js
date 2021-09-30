import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import "../scss/style.scss";
console.log("run excecution");
document.body.innerHTML += '<div id="gjs"></div>';

(function () {
  var editor = grapesjs.init({
    container: "#gjs",
    fromElement: true,
  });
})();
