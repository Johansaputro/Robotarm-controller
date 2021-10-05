var numofarrow = document.querySelectorAll(".arrow").length;

for (i=0; i<numofarrow; i++) {
  document.querySelectorAll(".arrow")[i].addEventListener("click", function() {
    var innerele = this.innerText;
    // console.log(innerele)
    buttonAnimation(innerele);
  });
};


// document.addEventListener("keydown", function(event) {
//   buttonAnimation(event.key);
// });


function buttonAnimation(key) {
  var activeButton = document.querySelector("." + key);


  activeButton.classList.add("pressed");


  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);
}

function updateId() {
  var input = document.getElementById('hiddenInput');
  var selectedValue = mySelect.value;
  var element = document.getElementById("buttons");
  element.classList.remove("dissappear")
  input.value = selectedValue;
}

function moveUp() {
  var input = document.getElementById('hiddenInput2');
  input.value = "Up";
};

function moveDown() {
  var input = document.getElementById('hiddenInput2');
  input.value = "Down";
};

function moveLeft() {
  var input = document.getElementById('hiddenInput2');
  input.value = "Left";
};

function moveRight() {
  var input = document.getElementById('hiddenInput2');
  input.value = "Right";
};

function moveClaw() {
  var input = document.getElementById('hiddenInput2');
  input.value = "Claw";
}

$(document).on("keypress", 'form', function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        e.preventDefault();
        return false;
    }
});

document.getElementById("getback").onclick = function() {
  location.href = "/";
}
