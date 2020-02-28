/*jshint esversion: 6 */
/*jshint multistr: true */

//var charSource = [];
var characters;
var attributes = ["agility", "smarts", "spirit", "strength", "vigor"];
var attributesDie = [0, 0, 0, 0, 0];
var coreSkills = ["Athletics", "Common Knowledge", "Notice", "Persuasion", "Stealth"];
var coreSkillsDie = [0, 0, 0, 0, 0];
var diceNum = ["d4", "d6", "d8", "d10", "d12"];

var startXML = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
startXML += "<root version=\"4\" dataversion=\"20200203\" release=\"5.1|CoreRPG:4\">\n";
startXML += "\t<character>\n";
var endXML = "\t</character>\n";
endXML += "</root>";

var buildXML = "";
var finalXML = "";
var pcFilename = "";

var skillList = coreSkills;
var skillListDie = coreSkillsDie;

var ourCharData = "";
var charGenData = "";

var fightDie = -1;
var apiKey = "";
var toughNess = 0;


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

//var addAbilAg = 0;
//var addAbilSm = 0;
//var addAbilSp = 0;
//var addAbilSt = 0;
//var addAbilVi = 0;

var encLimit = 0;
var encLoad = 0;
var strDie = 0;

var addAbilagility = 0;
var addAbilsmarts = 0;
var addAbilspirit = 0;
var addAbilstrength = 0;
var addAbilviogor = 0;

var ourEdges = [];

var gearName = {};
var gearCost = {};
var gearGroup = {};
var gearWeight = {};

var weapName = {};
var weapCost = {};
var weapGroup = {};
var weapWeight = {};
var weapDamage = {};
var weapMinStr = {};
var weapMelee = {};
var weapThrown = {};
var weapRange = {};
var weapReach = {};
var weapRof = {};

var armName = {};
var armType = {};
var armWeight = {};
var armShield = {};
var armValue = {};
var armMinStr = {};
var armCost = {};
var armCoversArms = {};
var armCoversLegs = {};
var armCoversFace = {};
var armCoversHead = {};
var armCoversTorso = {};
var armShieldParry = {};
var armShieldCover = {};


var armTotalProt = 0;

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
edgeArray06 = ["Iron Jaw","Killer Instinct","Level Headed","Improved Level Headed","Marksman","Martial Artist","Martial Warrior","Mighty Blow","Nerves of Steel"];
edgeArray07 = ["Improved Nerves of Steel","No Mercy","UNKNOWN","UNKNOWN","Rapid Fire","Improved Rapid Fire","Rock and Roll!","Steady Hands","Sweep","Improved Sweep"];
edgeArray08 = ["Trademark Weapon","Improved Trademark Weapon","Two-Fisted","Two-Gun Kid","Command","Command Presence","Fervor","Hold the Line","Inspire"];
edgeArray09 = ["Natural Leader","Tactician","Master Tactician","Artificer","Channeling","Concentration","Extra Effort","Gadgeteer","Holy/Unholy Warrior","Mentalist"];
edgeArray10 = ["New Powers","Power Points","Rapid Recharge","Improved Rapid Recharge","Soul Drain","Power Surge","Wizard","Bolster","Common Bond","Connections"];
edgeArray11 = ["Humiliate","Menacing","Provoke","Retort","Streetwise","Strong Willed","Iron Will","Work the Room","Work the Crowd","Beast Bond","Beast Master"];
edgeArray12 = ["Champion","Chi","Danger Sense","Healer","Liquid Courage","Scavenger","Followers","Professional","Expert","Master","Sidekick","Tough as Nails"];
edgeArray13 = ["Tougher than Nails","Weapon Master","Master of Arms","Ace","Acrobat","Investigator","Assassin","Jack-of-all-Trades","McGyver","Mr. Fix It","Scholar"];
edgeArray14 = ["Thief","Woodsman","Soldier","Gadgeteer","Combat Acrobat"];

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
        apiKey = $('#getUserAPI').val().trim();
        if (apiKey == "" || apiKey.length < 50) {
            alert("Invalid API key");
        } else {
            //var url = "https://savaged.us/_api/auth/get-saves";
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
        finalXML = "";
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
            generateXML();
        }
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
        } else {
            alert("We couldn't find any characters, check your API key.");
        }
    }
    var numItems = $("#popChars").jqxDropDownList('getItems');
    if (typeof numItems == 'undefined') {
        alert("Either your API key is incorrect, or you don't have any active characters.");
        return(0);
    }
    $.ajax({
        url:  "https://savaged.us/_api/chargen-data",
        method: "POST",
        data: { apikey:  apiKey },
        beforeSend: function( xhr ) {
            xhr.overrideMimeType( "application/x-www-form-urlencoded" );
          }
        })
    .done(function( data ) {
        if ( console && console.log) {
            charGenData = $.parseJSON(data);
        }
    });
    $("#popChars").jqxDropDownList({disabled: false});
}

function generateXML() {
    // Generate gear hash
    $.each(charGenData.gear, function(gdex, gName) {
        //console.log(gName);
        if (gName.book_id == 9) {
            gearName[gName.id] = gName.name;
            gearGroup[gName.id] = gName.type;
            gearCost[gName.id] = gName.cost;
            gearWeight[gName.id] = gName.weight;
        }
        
    });

    $.each(charGenData.weapons, function(wdex, wName) {
        //console.log(gName);
        if (wName.book_id == 9) {
            weapName[wName.id] = wName.name;
            weapGroup[wName.id] = wName.type;
            weapCost[wName.id] = wName.cost;
            weapWeight[wName.id] = wName.weight;
            weapDamage[wName.id] = wName.damage;
            weapMinStr[wName.id] = wName.minimum_strength;
            weapMelee[wName.id] = wName.melee_only;
            weapThrown[wName.id] = wName.thrown_weapon;
            weapRange[wName.id] = wName.range;
            weapReach[wName.id] = wName.reach;
            weapRof[wName.id] = wName.rof;
        }
    });

    $.each(charGenData.armor, function(adex, aName) {
        if (aName.book_id == 9) {
            armName[aName.id] = aName.name;
            armType[aName.id] = aName.type;
            armValue[aName.id] = aName.armor_value;
            armCost[aName.id] = aName.cost;
            armMinStr[aName.id] = aName.minimum_strength;
            armShield[aName.id] = aName.is_shield;
            armWeight[aName.id] = aName.weight;
            armCoversArms[aName.id] = aName.covers_arms;
            armCoversLegs[aName.id] = aName.covers_legs;
            armCoversFace[aName.id] = aName.covers_face;
            armCoversHead[aName.id] = aName.covers_head;
            armCoversTorso[aName.id] = aName.covers_torso;
            armShieldParry[aName.id] = aName.shield_parry_bonus;
            armShieldCover[aName.id] = aName.shield_cover_vs_ranged;
        }
    });

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
    $.each(ourCharData.advancements, function(charIdx, charAdv) {
        //console.log(charAdv.type);
        if (charAdv.type == "attribute") {
            // Let's try an eval to go through all 13
            for (nx = 1; nx < 14; nx++) {
                var tempName = eval("charAdv.target" + nx);
                if (tempName != "") {
                    eval("addAbil" + tempName + " += 1 ");
                }
            }
        } else if (charAdv.type == 'raise_skill_above') {
            for (nx = 1; nx < 14; nx++) {
                var tempName2 = eval("charAdv.target" + nx);
                if (tempName2 != "") {
                    var getIdx = skillList.indexOf(tempName2);
                    if (getIdx != -1) {
                        skillListDie[getIdx] += 1;
                    }
                }
            }
        } else if (charAdv.type == 'edge') {
            for (nx = 1; nx < 14; nx++) {
                var tempName4 = eval("charAdv.target" + nx);
                if (tempName4 != "") {
                    //console.log("Edge: " + savageEdgesFinal[tempName4]);
                    ourEdges.push(savageEdgesFinal[tempName4]);
                }
            }
        } else if (charAdv.type == 'swade_raise_skills_below') {
            for (nx = 1; nx < 14; nx++) {
                var tempName3 = eval("charAdv.target" + nx);
                if (tempName3 != "") {
                    var getIdx2 = skillList.indexOf(tempName3);
                    if (getIdx2 != -1) {
                        skillListDie[getIdx2] += 1;
                    } else {
                        // We need to add this to the skills list
                        skillList.push(tempName3);
                        skillListDie.push(0);
                    }
                }
            }
        }
    });
    $.each(ourCharData.attribute_assignments, function( index, value) {
        //console.log("Index: " + index + "; " + value);
        var popValue = value;
        if (index == "agility") {
            popValue += addAbilagility;
        } else if (index == "smarts") {
            popValue += addAbilsmarts;
        } else if (index == "spirit") {
            popValue += addAbilspirit;
        } else if (index == "strength") {
            popValue += addAbilstrength;
            strDie = popValue;
            if (popValue == 0) {
                encLimit = 20;
            } else if (popValue == 1) {
                encLimit = 40;
            } else if (popValue == 2) {
                encLimit = 60;
            } else if (popValue == 3) {
                encLimit = 80;
            } else if (popValue == 4) {
                encLimit = 100;
            }

        } else if (index == "vigor") {
            popValue += addAbilviogor;
        }
        if ((ourCharData.race == 50 || ourCharData.race == 55) && index == "agility") {
            popValue += 1;
        } else if (ourCharData.race == 51 && index == "vigor") {
            popValue += 1;
        } else if (ourCharData.race == 54 && index == "spirit") {
            popValue += 1;
        }
        if (index == "vigor") {
            toughNess += popValue + 4;
        }
        buildXML += "\t\t<" + index + " type=\"dice\">" + diceNum[popValue] + "</" + index + ">\n";
    });
    
    buildXML += "\t\t<name type=\"string\">" + ourCharData.name + "</name>\n";
    buildXML += "\t\t<advances type=\"number\">" + ourCharData.advancement_count + "</advances>\n";
    
    var skillCount = 1;
    buildXML += "\t\t<skills>\n";
    for (var x = 0; x < skillList.length; x++) {
        if (skillList[x] == "Fighting") {
            fightDie =  (2 * parseInt(skillListDie[x]) + 4);
        }
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
    if (fightDie == -1) {
        buildXML += "\t\t<parry type=\"number\">2</parry>\n";
    } else {
        buildXML += "\t\t<parry type=\"number\">" + (2 + Math.floor(fightDie / 2)) + "</parry>\n";
    }
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
    $.each(ourEdges, function(eNum, eName) {
        //console.log(eName);
        thisIteration = pad(edgeCount, 5);
        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
        buildXML += "\t\t\t\t<name type=\"string\">" + eName + "</name>\n";
        buildXML += "\t\t\t\t<link type=\"windowreference\">\n";
        buildXML += "\t\t\t\t<class>sw_referencefeat</class>\n";
        buildXML += "\t\t\t\t<recordname>reference.edges." + fixSkillName(eName).toLowerCase() + "@*</recordname>\n";
        buildXML += "\t\t\t\t</link>\n";
        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
        edgeCount += 1;
    });
    buildXML += "\t\t</edges>\n";

    // Parse gear
    var gearCount = 1;
    buildXML += "\t\t<invlist>\n";
    $.each(ourCharData.gear_purchased, function(gpdex, gpname) {
        thisIteration = pad(gearCount, 5);
        
        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
        buildXML += "\t\t\t\t<name type=\"string\">" + fixGear(gearName[gpname.id]) + "</name>\n";
        buildXML += "\t\t\t\t<cost type=\"string\">" + gearCost[gpname.id] + "</cost>\n";
        buildXML += "\t\t\t\t<group type=\"string\">" + gearGroup[gpname.id] + "</group>\n";
        buildXML += "\t\t\t\t<weight type=\"number\">" + gearWeight[gpname.id] + "</weight>\n";
        buildXML += "\t\t\t\t<count type=\"number\">" + gpname.count_current + "</count>\n";
        if (gpname.equipped == false) {
            buildXML += "\t\t\t\t<carried type=\"number\">1</carried>\n";
            encLoad += gearWeight[gpname.id];
        } else {
            buildXML += "\t\t\t\t<carried type=\"number\">2</carried>\n";
            encLoad += gearWeight[gpname.id];
        }
        buildXML += "\t\t\t\t<isidentified type=\"number\">1</isidentified>\n";
		buildXML += "\t\t\t\t<locked type=\"number\">0</locked>\n";
        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
        gearCount += 1;
    });
    buildXML += "\t\t</invlist>\n";

    var weapCount = 1;
    buildXML += "\t\t<weaponlist>\n";
    $.each(ourCharData.weapons_purchased, function(wpdex, wpname) {
        thisIteration = pad(weapCount, 5);
        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
        buildXML += "\t\t\t\t<name type=\"string\">" + fixGear(weapName[wpname.id]) + "</name>\n";
        buildXML += "\t\t\t\t<cost type=\"string\">" + weapCost[wpname.id] + "</cost>\n";
        buildXML += "\t\t\t\t<group type=\"string\">" + weapGroup[wpname.id] + "</group>\n";
        buildXML += "\t\t\t\t<weight type=\"number\">" + weapWeight[wpname.id] + "</weight>\n";
        encLoad += weapWeight[wpname.id];
        buildXML += "\t\t\t\t<count type=\"number\">" + wpname.count_current + "</count>\n";
        if (wpname.equipped_primary == false && wpname.equipped_secondary == false) {
            buildXML += "\t\t\t\t<carried type=\"number\">1</carried>\n";
            encLoad +=  weapWeight[wpname.id];
        } else {
            buildXML += "\t\t\t\t<carried type=\"number\">2</carried>\n";
            encLoad +=  weapWeight[wpname.id];
        }
        buildXML += "\t\t\t\t<damage type=\"string\">" + weapDamage[wpname.id] + "</damage>\n";
        buildXML += "\t\t\t\t<isequipment type=\"number\">1</isequipment>\n";

        if (weapMelee[wpname.id] == true) {
            buildXML += "\t\t\t\t<traittype type=\"string\">Melee</traittype>\n";
            buildXML += "\t\t\t\t<catname type=\"string\">Melee Weapon</catname>\n";
            buildXML += "\t\t\t\t<damage type=\"string\">Str+" + weapDamage[wpname.id] + "</damage>\n";
        } else if (weapThrown[wpname.id] == true) {
            buildXML += "\t\t\t\t<traittype type=\"string\">Thrown</traittype>\n";
            buildXML += "\t\t\t\t<catname type=\"string\">Thrown Weapon</catname>\n";
            buildXML += "\t\t\t\t<range type=\"string\">" + weapRange[wpname.id] + "</range>\n";
            buildXML += "\t\t\t\t<rof type=\"string\">" + weapRof[wpname.id] + "</rof>\n";
            buildXML += "\t\t\t\t<damage type=\"string\">Str+" + weapDamage[wpname.id] + "</damage>\n";
        } else {
            buildXML += "\t\t\t\t<damage type=\"string\">" + weapDamage[wpname.id] + "</damage>\n";
            buildXML += "\t\t\t\t<traittype type=\"string\">Ranged</traittype>\n";
            buildXML += "\t\t\t\t<catname type=\"string\">Ranged Weapon</catname>\n";
            buildXML += "\t\t\t\t<range type=\"string\">" + weapRange[wpname.id] + "</range>\n";
            buildXML += "\t\t\t\t<rof type=\"string\">" + weapRof[wpname.id] + "</rof>\n";

        }
        buildXML += "\t\t\t\t<reach type=\"number\">" + weapReach[wpname.id] + "</reach>\n";
        buildXML += "\t\t\t\t<minstr type=\"string\">" + weapMinStr[wpname.id] + "</minstr>\n";
        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
        weapCount += 1;
    });
    buildXML += "\t\t</weaponlist>\n";


    // FIXME: Shield does not count towards toughness

    var armCount = 1;
    buildXML += "\t\t<armorlist>\n";
    $.each(ourCharData.armor_purchased, function(ardex, arname) {
        armTotalProt += armValue[arname.id];
        thisIteration = pad(armCount, 5);
        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
        // Build what this covers
        var armCovers = "";
        if (armCoversArms[arname.id] == true) {
            armCovers += "Arms; ";
        }
        if (armCoversFace[arname.id] == true) {
            armCovers += "Face; ";
        }
        if (armCoversLegs[arname.id] == true) {
            armCovers += "Legs; ";
        }
        if (armCoversTorso[arname.id] == true) {
            armCovers += "Torso; ";
            toughNess += armValue[arname.id];
        }
        //console.log(armName[arname.id] + " covers: " + armCovers);
        //console.log(armName[arname.id] + ": " + armCovers.substring(0, armCovers.length - 2));
        if (armCovers != "") {
            buildXML += "\t\t\t\t<areaprotected type=\"string\">" + armCovers.substring(0, armCovers.length - 2) + "</areaprotected>\n";
        } 
        buildXML += "\t\t\t\t<carried type=\"number\">2</carried>\n";
        buildXML += "\t\t\t\t<cost type=\"string\">" + armCost[arname.id] + "</cost>\n";
        buildXML += "\t\t\t\t<count type=\"number\">" + arname.count_current + "</count>\n";
        var compareDie = 0;
        switch(armMinStr[arname.id]) {
            case "d4":
                compareDie = 0;
                break;
            case "d6":
                compareDie = 1;
                break;
            case "d8":
                compareDie = 2;
                break;
            case "d10":
                compareDie = 3;
                break;
            case "d12":
                compareDie = 4;
                break;
        }
        //console.log(armName[arname.id] + "; Min: " + compareDie + "; str: " + strDie);
        if (strDie >= compareDie) {
            buildXML += "\t\t\t\t<encumbered type=\"number\">0</encumbered>\n";
        } else {
            buildXML += "\t\t\t\t<encumbered type=\"number\">2</encumbered>\n";
        }
        buildXML += "\t\t\t\t<group type=\"string\">" + armType[arname.id].replace(/\&/g, "&amp;") + "</group>\n";
        buildXML += "\t\t\t\t<minstr type=\"string\">" + armMinStr[arname.id] + "</minstr>\n";
        buildXML += "\t\t\t\t<modifications />\n";
        buildXML += "\t\t\t\t<name type=\"string\">" + armName[arname.id] + "</name>\n";
        buildXML += "\t\t\t\t<weight type=\"number\">" + armWeight[arname.id] + "</weight>\n";
        if (armShield[arname.id] != true) {
            buildXML += "\t\t\t\t<protection type=\"number\">" + armValue[arname.id] + "</protection>\n";
        } else {
            // FIXME, add parry/cover for shield.
            var tempNotes = "";
            tempNotes += "[Parry +" + armShieldParry[arname.id] + ", Cover +" + Math.abs(armShieldCover[arname.id]) + "]\n";
            buildXML += "\t\t\t\t<notes type=\"string\">" + tempNotes + "</notes>\n";
        }
        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
        armCount += 1;
    });
    buildXML += "\t\t</armorlist>\n";
    buildXML += "\t\t<armor type=\"number\">" + armTotalProt + "</armor>\n";
    buildXML += "\t\t<toughness type=\"number\">" + toughNess + "</toughness>\n";
    if (encLimit >= encLoad) {
        buildXML += "\t\t<encumbered type=\"number\">0</encumbered>\n";
    } else {
        buildXML += "\t\t<encumbered type=\"number\">1</encumbered>\n";
    }
    
    buildXML += "\t\t<encumbrance>\n";
	buildXML += "\t\t\t<limit type=\"number\">" + encLimit + "</limit>\n";
	buildXML += "\t\t\t<load type=\"number\">" + encLoad + "</load>\n";
	buildXML += "\t\t\t<loadstr type=\"number\">2</loadstr>\n";
    buildXML += "\t\t</encumbrance>\n";
    
    buildXML += "\t\t<bonuslist>\n";
    buildXML += "\t\t\t<agility>\n";
    buildXML += "\t\t\t</agility>\n";
    buildXML += "\t\t\t<armor>\n";
    buildXML += "\t\t\t</armor>\n";
    buildXML += "\t\t\t<pace>\n";
    buildXML += "\t\t\t</pace>\n";
    buildXML += "\t\t\t<parry>\n";
    buildXML += "\t\t\t</parry>\n";
    buildXML += "\t\t\t<smarts>\n";
    buildXML += "\t\t\t</smarts>\n";
    buildXML += "\t\t\t<spirit>\n";
    buildXML += "\t\t\t</spirit>\n";
    buildXML += "\t\t\t<strength>\n";
    buildXML += "\t\t\t</strength>\n";
    buildXML += "\t\t\t<toughness>\n";
    buildXML += "\t\t\t</toughness>\n";
    buildXML += "\t\t\t<vigor>\n";
    buildXML += "\t\t\t</vigor>\n";
    buildXML += "\t\t</bonuslist>\n";


    finalXML += startXML + buildXML + endXML;
    
    $('#textHere').val(finalXML);
    pcFilename = ourCharData.name.replace(/\W/g, '');
    $("#dlChar").jqxButton({ disabled: false });
}

function pad(num, size) {
    var s = num + "";

    while (s.length < size) s = "0" + s;
    return s;
}

function fixSkillName(badString) {
    if(badString == "" || badString == null) {
        return "";
    } else {
        return badString.replace(/[^a-zA-Z0-9+]+/gi, '');
    }
}

function fixGear(badString) {
    if (badString == "" || badString == null) {
        return "";
    } else {
        return badString.replace(/”/g, "\"");
    }
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
