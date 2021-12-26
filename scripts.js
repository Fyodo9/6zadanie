var result = document.getElementById("resultat");
function BClicked() {
  var bool = 1;
  var price = document.getElementById("pricet").value;
  price = parseInt(price);
  if (fits(price)==0){
    bool=0;
    alert("ERROR");
  }

  var amount = document.getElementById("amountt").value;
  amount = parseInt(amount);
  if (fits(amount)==0){
    bool=0;
    alert("ERROR");
  }

  if(bool==1){
    resultat.innerHTML = "Cost: " + price*amount;
  }
}

window.addEventListener("DOMContentLoaded", function () {
  let ok = document.getElementById("on");
  ok.addEventListener("click", BClicked);
});

function fits(x) {
  if (!Number.isInteger(x)) {
    return 0;
  }
  return 1;
}

let data = {
    "prod1": {
        basePrice: 10
    },
    "prod2": {
        basePrice: 20,
        options: {
            "opt1": 4,
            "opt2": 0,
            "opt3": 17
        }
    },
    "prod3": {
        basePrice: 30,
        properties: {
            "prop1": 6,
            "prop2": 5
        }
    }
};

function updateCost() {
    let type = document.getElementById("type").value;

    document.getElementById("options").style.display = (
        type === "prod2"
        ? "block"
        : "none"
    );
    document.getElementById("checkboxes").style.display = (
        type === "prod3"
        ? "block"
        : "none"
    );

    let priceData = data[type];
    let price = priceData.basePrice;

    if (type === "prod2") {
        let options = document.querySelectorAll("#options input");
        options.forEach(function (option) {
            if (option.checked) {
                price += priceData.options[option.value];
            }
        });
    } else if (type === "prod3") {
        let properties = document.querySelectorAll("#checkboxes input");
        properties.forEach(function (property) {
            if (property.checked) {
                price += priceData.properties[property.name];
            }
        });
    }

    let r = document.getElementById("result");
    let amount = document.getElementById("amount").value;
    if (!(/^[1-9][0-9]*$/).test(amount)) {
        r.innerHTML = "error!";
        return;
    }
    amount = parseInt(amount);
    r.innerHTML = price * amount;
}

window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("options").style.display = "none";
    document.getElementById("checkboxes").style.display = "none";

    let select = document.getElementById("type");
    select.addEventListener("change", updateCost);

    let options = document.querySelectorAll("#options input");
    options.forEach(function (option) {
        option.addEventListener("change", updateCost);
    });

    let checkboxes = document.querySelectorAll("#checkboxes input");
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", updateCost);
    });

    let amount = document.getElementById("amount");
    amount.addEventListener("change", updateCost);

    updateCost();
});
