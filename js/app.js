/*jshint esversion: 6 */
/*jshint multistr: true */

//var charSource = [];
var characters;
var attributes = ["agility", "smarts", "spirit", "strength", "vigor"];
var attributesDie = [0, 0, 0, 0, 0];
var coreSkills = ["Athletics", "Common Knowledge", "Notice", "Persuasion", "Stealth"];
var coreSkillsDie = [0, 0, 0, 0, 0];
var diceNum = ["d4", "d6", "d8", "d10", "d12", "d20"];

var startXML = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
startXML += "<root version=\"4\" dataversion=\"20200203\" release=\"5.1|CoreRPG:4\">\n";
startXML += "\t<character>\n";
var endXML = "\t</character>\n";
endXML += "</root>\n";

var buildXML = "";
var finalXML = "";
var pcFilename = "";

var skillList = coreSkills;
var skillListDie = coreSkillsDie;

var ourCharData = "";

var fightDie = 4;

var savageData = [];
var hindranceArray = [];
var edgeArray01 = [];
var edgeArray02 = [];
var edgeArray03 = [];
var edgeArray04 = [];
var edgeArray05 = [];
var edgeArray06 = [];
var edgeArray07 = [];
var edgeArray08 = [];
var edgeArray09 = [];
var edgeArray10 = [];
var edgeArray11 = [];
var edgeArray12 = [];
var edgeArray13 = [];
var edgeArray14 = [];

var savageEdges = [];

for(var y = 0; y < 19; y++) {
    savageData[y] = "";
}

savageData[19] = "Human";

for (y = 20; y < 47; y++) {
    savageData[y] = "";
}

savageData[47] = "Android";
savageData[48] = "Aquarian";
savageData[49] = "Avion";
savageData[50] = "Elf";
savageData[51] = "Dwarf";
savageData[52] = "Half Elf";
savageData[53] = "Half Elf";
savageData[54] = "Half-Folk";
savageData[55] = "Rakashan";
savageData[56] = "Saurian";

for (z = 57; z < 102; z++) {
    savageData[z] = "";
}

hindranceArray = ["Bad Eyes","All Thumbs","Anemic","Arrogant","Bad Luck","Big Mouth","Blind","Bloodthirsty","Can't Swim","Cautious","Clueless","Clumsy","Code of Honor","Curious","Death Wish","Delusional","Doubting Thomas","Driven","Elderly","Enemy","Greedy","Habit","Hard of Hearing","Heroic","Hesitant","Illiterate","Impulsive","Jealous","Loyal","Mean","Mild Mannered","Mute","Obese","Obligation","One Arm","One Eye","Outsider","Overconfident","Pacifist","Phobia","Poverty","Quirk","Ruthless","Secret","Shamed","Slow","Small","Stubborn","Suspicious","UNKNOWN","Tongue-Tied","Ugly","Vengeful","Vow","Wanted","Yellow","Young","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","Thin Skinned"];
//hindranceArray.push("Thin Skinned");

savageData = savageData.concat(hindranceArray);

for (w = 0; w < 171; w++) {
    savageEdges[w] = "UNKNOWN";
}

edgeArray01 = ["Alertness","Ambidextrous","Arcane Background","Arcane Resistance","Improved Arcane Resistance","Aristocrat","Attractive"];
edgeArray02 = ["Very Attractive","Berserk","Brave","Brawny","Brute","Charismatic","Elan","Fame","Famous","Fleet-Footed","Linguist","Luck"];
edgeArray03 = ["Great Luck","Quick","Rich","Filthy Rich","Fast Healer","Block","Improved Block","Brawler","Bruiser","Calculating","Combat Reflexes"];
edgeArray04 = ["Counterattack","Improved Counterattack","Dead Shot","Dodge","Improved Dodge","Double Tap","Extraction","Improved Extraction","Feint"];
edgeArray05 = ["First Strike","Improved First Strike","Free Runner","Frenzy","Improved Frenzy","Giant Killer","Hard to Kill","Harder to Kill","Improvisational Fighter"];
edgeArray06 = ["Iron Jaw","Killer Instinct","Level Headed","Improved Elvel Headed","Marksman","Martial Artist","Martial Warrior","Mighty Blow","Nerves of Steel"];
edgeArray07 = ["Improved Nerves of Steel","No Mercy","UNKNOWN","UNKNOWN","Rapid Fire","Improved Rapid Fire","Rock and Roll!","Steady Hands","Sweep","Improved Sweep"];
edgeArray08 = ["Trademark Weapon","Improved Trademark Weapon","Two-Fisted","Two-Gun Kid","Command","Command Presence","Fervor","Hold the Line","Inspire"];
edgeArray09 = ["Natural Leader","Tactician","Master Tactician","Artificer","Channeling","Concentration","Extra Effort","Gadgeteer","Holy/Unholy Warrior","Mentalist"];
edgeArray10 = ["New Powers","Power Points","Rapid Recharge","Improved Rapid Recharge","Soul Drain","Power Surge","Wizard","Bolster","Common Bond","Connections"];
edgeArray11 = ["Humiliate","Menacing","Provoke","Retort","Streetwise","Strong Willed","Iron Will","Work the Room","Work the Crowd","Beast Bond","Beast Master"];
edgeArray12 = ["Champion","Chi","Danger Sense","Healer","Liquid Courage","Scavenger","Followers","Professional","Expert","Master","Sidekick","Tough as Nails"];
edgeArray13 = ["Tougher than Nails","Weapon Master","Master of Arms","Ace","Acrobat","Investigator","Assassin","Jack-of-all-Trades","McGyver","Mr. Fix It","Scholar"];
edgeArray14 = ["Thief","Woodsman","Soldier","UNKNOWN","Combat Acrobat"];

let savageEdgesFinal = [...savageEdges, ...edgeArray01, ...edgeArray02, ...edgeArray03, ...edgeArray04, ...edgeArray05, ...edgeArray06, ...edgeArray07, ...edgeArray08, ...edgeArray09, ...edgeArray10, ...edgeArray11, ...edgeArray12, ...edgeArray13, ...edgeArray14];
for (v = 306; v < 342; v++) {
    savageEdgesFinal[v] = "UNKNOWN";
}
savageEdgesFinal.push("Rabble-Rouse");
for(u = 343; u < 378; u++) {
    savageEdgesFinal[u] = "UNKNOWN";
}
savageEdgesFinal.push("Reliable");

$(function() {
    //console.log("Index of thin skinned: " +savageData.indexOf("Thin Skinned"));
    $("#getUserAPI").jqxInput({placeHolder: "Enter API key", height: 30, width: 500, minLength: 1, theme: 'darkblue' });
    $("#getCharacters").jqxButton({ width: 240, height: 20, theme: 'darkblue'});
    $("#popChars").jqxDropDownList({ placeHolder: "Select Character", width: 250, height: 30, theme: 'darkblue', disabled: true });
    $("#textHere").jqxTextArea({ theme: "darkblue", width: 750, height: 150, placeHolder: "XML will appear here.", disabled: true });
    $("#resetChar").jqxButton({ width: "120px", height: "35px", theme: "darkblue" });
    $("#dlChar").jqxButton({ width: "120px", height: "35px", theme: "darkblue", disabled: true });


    $("#getCharacters").on('click', function () {
        var apiKey = $('#getUserAPI').val().trim();
        if (apiKey == "" || apiKey.length < 50) {
            alert("Invalid API key");
        } else {
            var url = "https://savaged.us/_api/auth/get-saves";
            $.ajax({
                url:  "https://savaged.us/_api/auth/get-saves",
                method: "POST",
                data: { apikey:  apiKey },
                beforeSend: function( xhr ) {
                    xhr.overrideMimeType( "application/x-www-form-urlencoded" );
                  }
            })
            .done(function( data ) {
                if ( console && console.log) {
                    populateChars($.parseJSON(data));
                }
            });
        }
    });


    $('#popChars').on('change', function (event) {
        $('#textHere').val("");
        buildXML = "";
        finalXML = ""
        var args = event.args;
        if (args) {
            var item = args.item;
            var value = item.value;
            var charID = value.match(/\(([^)]+)\)/)[1];
            for (var key in characters) {
                if (characters[key].id == charID) {
                    //console.log("Parsing: " + characters[key].name);
                     ourCharData = $.parseJSON(characters[key].data);
                }
            }
            $.each(ourCharData.attribute_assignments, function( index, value) {
                var popValue = value;
                if ((ourCharData.race == 50 || ourCharData.race == 55) && index == "agility") {
                    popValue = value + 1;
                } else if (ourCharData.race == 51 && index == "vigor") {
                    popValue = value + 1;
                } else if (ourCharData.race == 54 && index == "spirit") {
                    popValue = value + 1;
                }
                buildXML += "\t\t<" + index + " type=\"dice\">" + diceNum[popValue] + "</" + index + ">\n";
            });
            buildXML += "\t\t<name type=\"string\">" + ourCharData.name + "</name>\n";
            
            
            //var skillValue = 0;
            $.each(ourCharData.skill_assignments, function(index, skill) {
                if (skillList.includes(skill.name)) {
                    var a = skillList.indexOf(skill.name);
                    skillListDie[a] = skill.value;
                } else if (skill.name == "Language" && skill.isNative == true) {
                    skillList.push(skill.name + " (" + skill.specify + ")");
                    skillListDie.push(skill.value + 2);
                } else {
                    skillList.push(skill.name);
                    skillListDie.push(skill.value - 1);
                }
            });

            var skillCount = 1;
            buildXML += "\t\t<skills>\n";
            for (var x = 0; x < skillList.length; x++) {
                thisIteration = pad(skillCount, 5);
                buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                buildXML += "\t\t\t\t<link type=\"windowreference\">\n";
                buildXML += "\t\t\t\t\t<class>sw_referenceskill</class>\n";
                if (skillList[x].match("Language")) {
                    buildXML += "\t\t\t\t\t<recordname>reference.skills.language@*</recordname>\n";
                } else {
                    buildXML += "\t\t\t\t\t<recordname>reference.skills." + fixSkillName(skillList[x].toLowerCase()) + "@*</recordname>\n";
                }
                buildXML += "\t\t\t\t</link>\n";
                buildXML += "\t\t\t\t<name type=\"string\">" + skillList[x] + "</name>\n";
                buildXML += "\t\t\t\t<skill type=\"dice\">" + diceNum[skillListDie[x]] + "</skill>\n";
                buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                skillCount += 1;
            }
            buildXML += "\t\t</skills>\n";

            buildXML += "\t\t<pace type=\"number\">6</pace>\n";
            buildXML += "\t\t<parry type=\"number\">" + (2 + Math.floor(fightDie / 2)) + "</parry>\n";
            buildXML += "\t\t<description type=\"string\">" + ourCharData.description + "</description>\n";

            switch(ourCharData.race) {
                case 56:
                    buildXML += "\t\t<race type=\"string\">Saurian</race>\n";
                    buildXML += "\t\t<racelink type=\"windowreference\">\n";
                    buildXML += "\t\t\t<class>sw_referencerace</class>\n";
                    buildXML += "\t\t\t<recordname>reference.races.saurian@*</recordname>\n";
                    buildXML += "\t\t</racelink>\n";
                    break;
                case 55:
                    buildXML += "\t\t<race type=\"string\">Rakashan</race>\n";
                    buildXML += "\t\t<racelink type=\"windowreference\">\n";
                    buildXML += "\t\t\t<class>sw_referencerace</class>\n";
                    buildXML += "\t\t\t<recordname>reference.races.rakashan@*</recordname>\n";
                    buildXML += "\t\t</racelink>\n";
                    break;
                case 54:
                    buildXML += "\t\t<race type=\"string\">Half-folk</race>\n";
                    buildXML += "\t\t<racelink type=\"windowreference\">\n";
                    buildXML += "\t\t\t<class>sw_referencerace</class>\n";
                    buildXML += "\t\t\t<recordname>reference.races.halffolk@*</recordname>\n";
                    buildXML += "\t\t</racelink>\n";
                    break;
                case 53:
                case 52:
                    buildXML += "\t\t<race type=\"string\">Half Elf</race>\n";
                    buildXML += "\t\t<racelink type=\"windowreference\">\n";
                    buildXML += "\t\t\t<class>sw_referencerace</class>\n";
                    buildXML += "\t\t\t<recordname>reference.races.halfelven@*</recordname>\n";
                    buildXML += "\t\t</racelink>\n";
                    break;
                case 51:
                    buildXML += "\t\t<race type=\"string\">Dwarf</race>\n";
                    buildXML += "\t\t<racelink type=\"windowreference\">\n";
                    buildXML += "\t\t\t<class>sw_referencerace</class>\n";
                    buildXML += "\t\t\t<recordname>reference.races.dwarf@*</recordname>\n";
                    buildXML += "\t\t</racelink>\n";
                    break;
                case 50:
                    buildXML += "\t\t<race type=\"string\">Elf</race>\n";
                    buildXML += "\t\t<racelink type=\"windowreference\">\n";
                    buildXML += "\t\t\t<class>sw_referencerace</class>\n";
                    buildXML += "\t\t\t<recordname>reference.races.elf@*</recordname>\n";
                    buildXML += "\t\t</racelink>\n";
                    break;
                case 49:
                    buildXML += "\t\t<race type=\"string\">Avion</race>\n";
                    buildXML += "\t\t<racelink type=\"windowreference\">\n";
                    buildXML += "\t\t\t<class>sw_referencerace</class>\n";
                    buildXML += "\t\t\t<recordname>reference.races.avion@*</recordname>\n";
                    buildXML += "\t\t</racelink>\n";
                    break;
                case 48:
                    buildXML += "\t\t<race type=\"string\">Aquarian</race>\n";
                    buildXML += "\t\t<racelink type=\"windowreference\">\n";
                    buildXML += "\t\t\t<class>sw_referencerace</class>\n";
                    buildXML += "\t\t\t<recordname>reference.races.aquarian@*</recordname>\n";
                    buildXML += "\t\t</racelink>\n";
                    break;
                case 47:
                    buildXML += "\t\t<race type=\"string\">Android</race>\n";
                    buildXML += "\t\t<racelink type=\"windowreference\">\n";
                    buildXML += "\t\t\t<class>sw_referencerace</class>\n";
                    buildXML += "\t\t\t<recordname>reference.races.android@*</recordname>\n";
                    buildXML += "\t\t</racelink>\n";
                    break;
                case 19:
                    buildXML += "\t\t<race type=\"string\">Human</race>\n";
                    buildXML += "\t\t<racelink type=\"windowreference\">\n";
                    buildXML += "\t\t\t<class>sw_referencerace</class>\n";
                    buildXML += "\t\t\t<recordname>reference.races.human@*</recordname>\n";
                    buildXML += "\t\t</racelink>\n";
                    break;
            }

            buildXML += "\t\t<gender type=\"string\">" + ourCharData.gender + "</gender>\n";

            hindCount = 1;
            buildXML += "\t\t<hindrances>\n";
            $.each(ourCharData.hindrances, function(hdex, hindData) {
                thisIteration = pad(hindCount, 5);
                buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                if (hindData.major == false) {
                    buildXML += "\t\t\t\t<name type=\"string\">" + savageData[hindData.id] + "</name>\n";
                } else {
                    buildXML += "\t\t\t\t<name type=\"string\">" + savageData[hindData.id] + " (Major)</name>\n";
                }
                buildXML += "\t\t\t\t<link type=\"windowreference\">\n";
                buildXML += "\t\t\t\t<class>sw_referencefeat</class>\n";
                buildXML += "\t\t\t\t<recordname>reference.hindrances." + fixSkillName(savageData[hindData.id]).toLowerCase() + "@*</recordname>\n";
                buildXML += "\t\t\t\t</link>\n";
                buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                hindCount += 1;
            });
            buildXML += "\t\t</hindrances>\n";

            edgeCount = 1;
            buildXML += "\t\t<edges>\n";
            $.each(ourCharData.edges, function(edex, edgeData) {
                //console.log(edgeData.id + ": " + savageEdgesFinal[edgeData.id]);
                thisIteration = pad(edgeCount, 5);
                buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                buildXML += "\t\t\t\t<name type=\"string\">" + savageEdgesFinal[edgeData.id] + "</name>\n";
                buildXML += "\t\t\t\t<link type=\"windowreference\">\n";
                buildXML += "\t\t\t\t<class>sw_referencefeat</class>\n";
                buildXML += "\t\t\t\t<recordname>reference.edges." + fixSkillName(savageEdgesFinal[edgeData.id]).toLowerCase() + "@*</recordname>\n";
                buildXML += "\t\t\t\t</link>\n";
                buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                edgeCount += 1;
            });
            buildXML += "\t\t</edges>\n";
        }
        finalXML += startXML + buildXML + endXML;
        //console.log(finalXML);
        $('#textHere').val(finalXML);
        pcFilename = ourCharData.name.replace(/\W/g, '');
        $("#dlChar").jqxButton({ disabled: false });
    });

    $("#dlChar").on("click", function() {
        if ($("#textHere").val() == "") {
            alert("You need to load a character first.");
            return;
        }
        if (pcFilename == "" || pcFilename == null) {
            var ts = Math.round((new Date()).getTime() / 1000);
            pcFilename = ts + ".xml";
        } else {
            pcFilename += ".xml";
        }

        var textFile = new Blob([$("#textHere").val()], {
            type: 'text/plain'
        });
        invokeSaveAsDialog(textFile, pcFilename);
    });

    $("#resetChar").on("click", function() {
        window.location.reload(false);
    });
});

function populateChars(inputChar) {
    characters = jQuery.extend(true, {}, inputChar);
    //var charCount = 0;
    for (var key in characters) {
        if (characters.hasOwnProperty(key)) {
            //console.log(key + "-> " +character[key].id);
            if (characters[key].deleted == false && characters[key].save_type == "character") {
                $("#popChars").jqxDropDownList('addItem', characters[key].name + " (" + characters[key].id + ")" );
            }
        }
    }
    //alert("Character list has been populated");
    $("#popChars").jqxDropDownList({disabled: false});
};

function pad(num, size) {
    var s = num + "";

    while (s.length < size) s = "0" + s;
    return s;
}

function fixSkillName(badString) {
    if(badString == "" || badString == null) {
        return "";
    }
    return badString.replace(/[^a-zA-Z0-9+]+/gi, '');
}

function invokeSaveAsDialog(file, fileName) {
    if (!file) {
        throw 'Blob object is required.';
    }

    if (!file.type) {
        file.type = 'video/webm';
    }

    var fileExtension = file.type.split('/')[1];

    if (fileName && fileName.indexOf('.') !== -1) {
        var splitted = fileName.split('.');
        fileName = splitted[0];
        fileExtension = splitted[1];
    }

    var fileFullName = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + fileExtension;

    if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
        return navigator.msSaveOrOpenBlob(file, fileFullName);
    } else if (typeof navigator.msSaveBlob !== 'undefined') {
        return navigator.msSaveBlob(file, fileFullName);
    }

    var hyperlink = document.createElement('a');
    hyperlink.href = URL.createObjectURL(file);
    hyperlink.target = '_blank';
    hyperlink.download = fileFullName;

    if (!!navigator.mozGetUserMedia) {
        hyperlink.onclick = function() {
            (document.body || document.documentElement).removeChild(hyperlink);
        };
        (document.body || document.documentElement).appendChild(hyperlink);
    }

    var evt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    hyperlink.dispatchEvent(evt);

    if (!navigator.mozGetUserMedia) {
        URL.revokeObjectURL(hyperlink.href);
    }
}
