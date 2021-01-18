const productInfo = {
  attributes: {
    key1: "Size",
    value1: ["S", "M", "L"],
    key2: "Color",
    value2: ["Black", "White", "Blue"],
    key3: "Gender",
    value3: ["Male", "Female", "Unisex"],
    length: 3,
  },
};

const productOption = [
  //Ao Trang
  {
    _id: 1232465,
    name: ["S", "White", "Female"],
    stock: 5,
  },
  {
    _id: 1232465,
    name: ["M", "White", "Female"],
    stock: 5,
  },
  {
    _id: 1232465,
    name: ["L", "White", "Female"],
    stock: 0,
  },
  {
    _id: 1232465,
    name: ["S", "White", "Male"],
    stock: 0,
  },
  {
    _id: 1232465,
    name: ["M", "White", "Male"],
    stock: 0,
  },
  {
    _id: 1232465,
    name: ["L", "White", "Male"],
    stock: 0,
  },
  //Ao Den
  {
    _id: 1232465,
    name: ["S", "Black", "Female"],
    stock: 0,
  },
  {
    _id: 1232465,
    name: ["M", "Black", "Female"],
    stock: 0,
  },
  {
    _id: 1232465,
    name: ["L", "Black", "Female"],
    stock: 0,
  },
  {
    _id: 1232465,
    name: ["S", "Black", "Male"],
    stock: 0,
  },
  {
    _id: 1232465,
    name: ["M", "Black", "Male"],
    stock: 5,
  },
  {
    _id: 1232465,
    name: ["L", "Black", "Male"],
    stock: 5,
  },
  //Ao Xanh
  {
    _id: 1232465,
    name: ["S", "Blue", "Female"],
    stock: 5,
  },
  {
    _id: 1232465,
    name: ["M", "Blue", "Female"],
    stock: 5,
  },
  {
    _id: 1232465,
    name: ["L", "Blue", "Female"],
    stock: 5,
  },
  {
    _id: 1232465,
    name: ["S", "Blue", "Male"],
    stock: 5,
  },
  {
    _id: 1232465,
    name: ["M", "Blue", "Male"],
    stock: 5,
  },
  {
    _id: 1232465,
    name: ["L", "Blue", "Male"],
    stock: 5,
  },
];

const orangeCode = "#e47911";

const whiteCode = "#EFEFEF";

const attributes = productInfo.attributes;

const optionDiv = document.getElementById("option");

let optionStatus = {};

let currentChoice = {};

const findAllActiveValue = (productInfo, productOption) => {
  for (let i = 1; i <= productInfo.length; i++) {
    optionStatus[`key${i}`] = {};
    for (let j = 0; j < productInfo[`value${i}`].length; j++) {
      let atLeastOneOptionExist = false;
      for (let n = 0; n < productOption.length; n++) {
        if (productOption[n].name[i - 1] == productInfo[`value${i}`][j] && productOption[n].stock > 0) {
          atLeastOneOptionExist = true;
          break;
        }
      }
      if (!atLeastOneOptionExist) {
        document.getElementById(`key${i}`).getElementsByClassName(`${productInfo[`value${i}`][j]}`)[0].disabled = true;
      }
      optionStatus[`key${i}`][`${productInfo[`value${i}`][j]}`] = atLeastOneOptionExist;
    }
  }
};

const addEventListenerFunction = (productInfo) => {
  function findAllOptionAvailable(key, value) {
    return function () {
      //change currenChoice status
      currentChoice[`${key}`] = value;
      //end of change currentChoice status

      //reset current key here

      for (const prop in optionStatus) {
        if (key != prop) continue;
        for (let i = 0; i < productInfo[`value${key[3]}`].length; i++) {
          document.getElementById(`${key}`).getElementsByClassName(`${productInfo[`value${key[3]}`][i]}`)[0].disabled = !optionStatus[`${key}`][
            `${productInfo[`value${key[3]}`][i]}`
          ];
          optionStatus[`${key}`][`${productInfo[`value${key[3]}`][i]}`];
        }
      }

      //end of reset current key

      if (key == "key1" && value == "L") debug = true;
      let index = key[3] - 1;
      for (let i = 1; i <= productInfo.length; i++) {
        if (key[3] == i) continue;
        for (let j = 0; j < productInfo[`value${i}`].length; j++) {
          // Matrix start here
          let atLeastOneOptionExist = false;
          for (let n = 0; n < productOption.length; n++) {
            if (productOption[n].name[i - 1] == productInfo[`value${i}`][j] && productOption[n].name[index] == value && productOption[n].stock > 0) {
              atLeastOneOptionExist = true;
              break;
            }
          }

          if (!atLeastOneOptionExist) {
            document.getElementById(`key${i}`).getElementsByClassName(`${productInfo[`value${i}`][j]}`)[0].disabled = true;
            if (
              currentChoice[`key${i}`] == document.getElementById(`key${i}`).getElementsByClassName(`${productInfo[`value${i}`][j]}`)[0].className
            ) {
              document.getElementById(`key${i}`).getElementsByClassName(`${productInfo[`value${i}`][j]}`)[0].style.backgroundColor = "#000000";
              currentChoice[`key${i}`] = null;
            }
          } else {
            document.getElementById(`key${i}`).getElementsByClassName(`${productInfo[`value${i}`][j]}`)[0].disabled = false;
          }
          // Matrix end here
        }
      }

      //update current choice view
      updateCurrentChoice(productInfo);
      //end of update current choice view
    };
  }
  for (let i = 1; i <= productInfo.length; i++) {
    for (let j = 0; j < productInfo[`value${i}`].length; j++) {
      document
        .getElementById(`key${i}`)
        .getElementsByClassName(`${productInfo[`value${i}`][j]}`)[0]
        .addEventListener("click", findAllOptionAvailable(`key${i}`, productInfo[`value${i}`][j]));
    }
  }
};

for (let i = 1; i <= attributes.length; i++) {
  const option = document.createElement("DIV");
  option.id = `key${i}`;
  const key = document.createElement("SPAN");
  key.innerText = `${attributes[`key${i}`]}: `;
  option.appendChild(key);
  for (let j = 0; j < attributes[`value${i}`].length; j++) {
    const value = document.createElement("BUTTON");
    value.innerText = attributes[`value${i}`][j];
    value.className = attributes[`value${i}`][j];
    option.appendChild(value);
  }
  optionDiv.appendChild(option);
}

findAllActiveValue(attributes, productOption);
addEventListenerFunction(attributes);

currentChoice = { ...optionStatus };
console.log(currentChoice);

for (const key in currentChoice) {
  currentChoice[key] = null;
}

const updateCurrentChoice = (productInfo) => {
  console.log(currentChoice);
  for (let i = 1; i <= productInfo.length; i++) {
    for (let j = 0; j < productInfo[`value${i}`].length; j++) {
      if (currentChoice[`key${i}`] == productInfo[`value${i}`][j]) {
        document.getElementById(`key${i}`).getElementsByClassName(`${productInfo[`value${i}`][j]}`)[0].style.backgroundColor = orangeCode;
      } else {
        document.getElementById(`key${i}`).getElementsByClassName(`${productInfo[`value${i}`][j]}`)[0].style.backgroundColor = whiteCode;
      }
    }
  }
};

// document.getElementById("key1").getElementsByClassName("S")[0].style.backgroundColor = "#e47911";
