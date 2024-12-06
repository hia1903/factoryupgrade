let detailedTitle;
let statTypes; 
let upgradeTable; 
let equipmentTable; 

let maxElementCount = 0;
let totalXalium = 0;

let upgradeRowhCount;
let upgradeColumnCount;
let equipmentRowhCount;
let equipmentColumnCount;

var selectedColor = "#DA0037";
var defaultColor = "#444444";
var disabledColor = "#171717";

var defaultBackgroundColor = "#171717";

var defaultEquipmentBackgroundColor = "#222222";



Promise.all([
    fetch('statTypes.json').then(response => response.json()),
    fetch('upgradeTable.json').then(response => response.json()),
    fetch('equipmentTable.json').then(response => response.json())
])
    .then(([statTypespData, upgradeTableData, equipmentTableData]) => {
    statTypes = statTypespData.statTypes; 
    upgradeTable = upgradeTableData.upgradeTable; 
    equipmentTable = equipmentTableData.equipmentTable;
    
    upgradeRowhCount = upgradeTable.branches.length;
    upgradeColumnCount = upgradeTable.branches[0].branch.length;
    
    upgradeTable.branches.forEach(branchObj => {
        branchObj.branch.forEach(upgrade => {
            let elementCount = upgrade.elements.length;
            if (maxElementCount <= elementCount) {
                maxElementCount = elementCount + 1;
            }
        });
    });


    equipmentRowhCount = equipmentTable.branches.length;
    equipmentColumnCount = equipmentTable.branches[0].branch.length;


    InitButtonsText();
    UpdateStats();
    InitEquipmentButtonText(); 
    
    })
    .catch(error => console.error('Error loading JSON files:', error));


function onPageLoad()
{
    UpdateStats();
}

function InitButtonsText()
{
    detailedTitle = false;

    for (var j = 0; j < upgradeRowhCount; j++) {

        var branchLabelhId =  "LabelBranch" + (j + 1);
        var branchLabel = document.getElementById(branchLabelhId);

        var currentBranch =  upgradeTable.branches[j];
        branchLabel.innerHTML = currentBranch.name;
        

        var availableTextColor =  currentBranch.availableTextColor;
        var disableTextColor =  currentBranch.disableTextColor;
        var selectedBackgroundColor =  currentBranch.selectedBackgroundColor;
        
        branchLabel.style.borderColor = availableTextColor;
        branchLabel.style.color = availableTextColor;

        for (var k = 0; k < upgradeColumnCount; k++) {
            var btnId = ("button" + (j+1)) + (k+1);
            var mbutton = document.getElementById(btnId);

            mbutton.style.borderColor = availableTextColor;
            mbutton.style.color = availableTextColor;

            var currentUpgrade = upgradeTable.branches[j].branch[k];

            var elementCount = maxElementCount;
            var buttonText = "<b><ins>" + currentUpgrade.name + "</b></ins>";       
            var tittleText = "";

            currentUpgrade.elements.forEach(element => {
                buttonText += "<br>•" + statTypes[element.stat].display + " %" + element.val;
                tittleText += "•" + statTypes[element.stat].display + ": " + statTypes[element.stat].description +"\n";
                elementCount--;
            });

            while(elementCount-- > 0) {
                buttonText +="<br>";
            }
            
            buttonText += "<hr><b>" + currentUpgrade.price + " Xa</b>"

            mbutton.innerHTML = buttonText;
            mbutton.title = tittleText;

            if (mbutton.disabled)
            {
                mbutton.style.borderColor = disableTextColor;
                mbutton.style.color = disableTextColor;
                mbutton.style.cursor = "default";
            }
        }
    }
}

function InitEquipmentButtonText()
{
    for (var j = 0; j < equipmentRowhCount; j++) {


        var currentBranch =  equipmentTable.branches[j];
    
        var availableTextColor =  currentBranch.availableTextColor;
        var selectedBackgroundColor =  currentBranch.selectedBackgroundColor;
        
        var idLetter;
        if (j == 0){
            idLetter = "Z";
        }       
        else if (j == 1){
            idLetter = "X";
        }        
        else if (j == 2){
            idLetter = "C";
        }

        for (var k = 0; k < equipmentColumnCount; k++) {
            var btnId = idLetter  + (k + 1);
            var mbutton = document.getElementById(btnId);

            mbutton.style.borderColor = availableTextColor;

            var currentEquipment = currentBranch.branch[k];

            var buttonText = "<b><ins>" + currentEquipment.name + "</b></ins><br>";   
             
            buttonText += "<hr><b>" + currentEquipment.price + " Xa</b>"
            mbutton.innerHTML = buttonText;

            var buttonTitleText = currentEquipment.description;
            mbutton.title = buttonTitleText;

            if (currentEquipment.price == "NaN")
            {
                mbutton.disabled = true;
                mbutton.style.cursor = "default";

                mbutton.style.color = "#444444";
            }
        }
    }
}

function UpdateTitle()
{
    for (var j = 0; j < upgradeRowhCount; j++) {
        for (var k = 0; k < upgradeColumnCount; k++) {
            var btnId = ("button" + (j+1)) + (k+1);
            var mbutton = document.getElementById(btnId);

            var currentUpgrade = upgradeTable.branches[j].branch[k];

            var tittleText = "";

            currentUpgrade.elements.forEach(element => {
                if (detailedTitle) {
                    tittleText += "•" + statTypes[element.stat].display + ": " + statTypes[element.stat].detailedDescription +"\n";
                }
                else {
                    tittleText += "•" + statTypes[element.stat].display + ": " + statTypes[element.stat].description +"\n";
                }
            });

            mbutton.title = tittleText;
        }
    }
}

function UpdateStats()
{
    const statsData = Object.keys(statTypes);

    var statText = "";
    statsData.forEach(stat => {
        var tdId = document.getElementById(stat);
        statText = "<b><ins>" + statTypes[stat].display + "</b></ins>"  + statTypes[stat].value + "%";
        tdId.innerHTML = statText;
    });

    var tdId = document.getElementById("Xal");
    tdId.innerHTML = "<b><ins>Total Xalium</b></ins>" + totalXalium;
}

var buttonStats = {
    "11": false, "12": false, "13": false, "14": false,
    "21": false, "22": false, "23": false, "24": false,
    "31": false, "32": false, "33": false, "34": false,
    "41": false, "42": false, "43": false, "44": false,
    "51": false, "52": false, "53": false, "54": false,
    "61": false, "62": false, "63": false, "64": false,
    "71": false, "72": false, "73": false, "74": false
};
var equipmentButtonStats = {
    "Z1": false, "Z2": false, "Z3": false, "Z4": false, "Z5": false,
    "X1": false, "X2": false, "X3": false, "X4": false, "X5": false,
    "C1": false, "C2": false, "C3": false, "C4": false, "C5": false,
};


function SetActiveButton(btnNo)
{   
    var buttonId = "button" + btnNo;
    var mbutton = document.getElementById(buttonId);

    var branchNo = btnNo.toString()[0] - 1;
    var currentBranch =  upgradeTable.branches[branchNo];
    var availableTextColor =  currentBranch.availableTextColor;
    var disableTextColor =  currentBranch.disableTextColor;
    var selectedBackgroundColor =  currentBranch.selectedBackgroundColor;


    mbutton.style.backgroundColor = selectedBackgroundColor;
    buttonStats[btnNo] = true;

    if (parseInt(btnNo[1]) < upgradeColumnCount) {
        var btnNo2 = parseInt(btnNo) + 1;
        var buttonId2 = "button" + btnNo2;
        var mbutton2 = document.getElementById(buttonId2);
        mbutton2.disabled = false;

        mbutton2.style.borderColor = availableTextColor;
        mbutton2.style.color = availableTextColor;

        mbutton2.style.cursor = "pointer";
    }

    let rowIdx = parseInt(btnNo[0]) - 1;
    let columnIdx = parseInt(btnNo[1]) - 1;

    AddStats(rowIdx, columnIdx, +1)

    UpdateStats();
}

function SetDeactiveButton(btnNo)
{
    var buttonId = "button" + btnNo;
    var mbutton = document.getElementById(buttonId);

    var branchNo = btnNo.toString()[0] - 1;
    var currentBranch =  upgradeTable.branches[branchNo];
    var availableTextColor =  currentBranch.availableTextColor;
    var disableTextColor =  currentBranch.disableTextColor;
    var selectedBackgroundColor =  currentBranch.selectedBackgroundColor;

    mbutton.style.backgroundColor = defaultBackgroundColor;
    buttonStats[btnNo] = false;

    
    let rowIdx = parseInt(btnNo[0]) - 1;
    let columnIdx = parseInt(btnNo[1]) - 1;
    AddStats(rowIdx, columnIdx, -1)



    var btnNo2 = parseInt(btnNo[0]) * 10 + upgradeColumnCount;
    for (var i = upgradeColumnCount; i > parseInt(btnNo[1]); i--) {      
        var buttonId2 = "button" + btnNo2;
        var mbutton2 = document.getElementById(buttonId2);

        if (buttonStats[btnNo2.toString()] == true) {
            mbutton2.style.backgroundColor = defaultBackgroundColor;

            let rowIdx = parseInt(btnNo2 / 10) - 1;
            let columnIdx = parseInt(btnNo2 % 10) - 1;
            AddStats(rowIdx, columnIdx, -1)

            buttonStats[btnNo2.toString()] = false;
        }
        mbutton2.disabled = true;

        mbutton2.style.borderColor = disableTextColor;
        mbutton2.style.color = disableTextColor;

        mbutton2.style.cursor = "default"
        
        btnNo2--;
    }

    UpdateStats();
}

function AddStats(rowIdx,columnIdx, addValue)
{

    let selectedUpgradeElements = upgradeTable.branches[rowIdx].branch[columnIdx].elements;
    selectedUpgradeElements.forEach(element => {
        statTypes[element.stat].value += addValue * element.val;
    });
    totalXalium += addValue * upgradeTable.branches[rowIdx].branch[columnIdx].price;
}

function OnClickButton(btn_ID)
{
    var buttonNo = btn_ID.toString()[6] + btn_ID.toString()[7];

    if (buttonStats[buttonNo] === false) { 
        SetActiveButton(buttonNo); 
    }
    else { 
        SetDeactiveButton(buttonNo); 
    }
}


function ToggleDescription(button)
{
  console.log("selam");
  var toggleButton = document.getElementById("toggleDescription");

  button.classList.toggle('active');

  detailedTitle = !detailedTitle;

  if(detailedTitle) {
    //   toggleButton.style.backgroundColor = selectedColor;
      toggleButton.title = "Disable Detailed Upgrade Descriptions";
    }
    else {
      toggleButton.title = "Enable Detailed Upgrade Descriptions";
    //   toggleButton.style.backgroundColor = defaultColor;
  }

  UpdateTitle();
}

function OnClickEquipmentButton(id)
{
    var branchNo;
    if (id.toString()[0] == "Z") {
        branchNo = 0;
    } 
    else if (id.toString()[0] == "X") {
        branchNo = 1;
    } 
    else if (id.toString()[0] == "C") {
        branchNo = 2;
    } 

    if (equipmentButtonStats[id] === false) { 
        SetActiveEquipmentButton(id, branchNo); 
    }
    else { 
        SetDeactiveEquipmentButton(id, branchNo); 
    }

    UpdateStats();
}

function SetActiveEquipmentButton(id, branchNo)
{
    equipmentButtonStats[id] = true;

    var currentBranch =  equipmentTable.branches[branchNo];
    var selectedBackgroundColor =  currentBranch.selectedBackgroundColor;

    var mbutton = document.getElementById(id);
    mbutton.style.backgroundColor = selectedBackgroundColor;

    var gearNo = id.toString()[1];
    totalXalium += currentBranch.branch[gearNo - 1].price;

    for (var j = 0; j < equipmentColumnCount; j++)
    {
        if (j == gearNo - 1)
        {
            continue;
        }

        var idLetter =  id.toString()[0];
        var id2 = idLetter + (j + 1);
        if (equipmentButtonStats[id2] === false)
        {
            continue;
        }

        SetDeactiveEquipmentButton(id2, branchNo);
    }

}
function SetDeactiveEquipmentButton(id, branchNo)
{
    equipmentButtonStats[id] = false;

    var currentBranch =  equipmentTable.branches[branchNo];

    var mbutton = document.getElementById(id);
    mbutton.style.backgroundColor = defaultEquipmentBackgroundColor;

    console.log("dal: " +id.toString()[1]);
    totalXalium -= currentBranch.branch[id.toString()[1] - 1].price;
}