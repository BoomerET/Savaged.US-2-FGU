/*jshint esversion: 6 */
/*jshint multistr: true */

//var charSource = [];
var characters;
var attributes = ["agility", "smarts", "spirit", "strength", "vigor"];
var coreSkills = ["Athletics", "Common Knowledge", "Notice", "Persuasion", "Stealth"];
var diceNum = ["d4", "d6", "d8", "d10", "d12", "d20"];

var startXML = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
startXML += "<root version=\"4\" dataversion=\"20200203\" release=\"5.1|CoreRPG:4\">\n";
startXML += "\t<character>\n";
var endXML = "\t</character>\n";
endXML += "</root>\n";

var buildXML = "";
var finalXML = "";

var fightDie = 4;

$(function() {
    $("#getUserAPI").jqxInput({placeHolder: "Enter API key", height: 30, width: 500, minLength: 1, theme: 'darkblue' });
    $("#getCharacters").jqxButton({ width: 120, height: 20, theme: 'darkblue' });
    $("#popChars").jqxDropDownList({ placeHolder: "Select Server", width: 250, height: 30, theme: 'darkblue' });
    //1408xZWZmZjIxYjAtNGU5NS0xMWVhLThlYWQtMzkxODY2MjBiNDEy

    $("#getCharacters").on('click', function () {
        var apiKey = $('#getUserAPI').val().trim();
        if (apiKey == "" || apiKey.length < 50) {
            alert("Invalid API key");
        } else {
            $.ajax({
                data: { apikey:  apiKey },
                url: 'scripts/getChar.php',
                method: 'GET',
                success: function(data) {
                    try {
                        populateChars($.parseJSON(data));
                    } catch(e) {
                        alert("Unable to parse character");
                        console.error(e);
                        return;
                    }
                },
                failure: function(msg) {
                    alert("Unable to find character");
                    return;
                }
            });
        }
    });

    $('#popChars').on('change', function (event)
    {     
        var args = event.args;
        if (args) {
            var item = args.item;
            var value = item.value;
            var charID = value.match(/\(([^)]+)\)/)[1];
            for (var key in characters) {
                if (characters[key].id == charID) {
                    var ourCharData = $.parseJSON(characters[key].data);
                    $.each(ourCharData.attribute_assignments, function( index, value) {
                        // Does this give an error?
                        //console.log(index);
                        buildXML += "\t\t<" + index + " type=\"dice\">" + diceNum[value] + "</" + index + ">\n";
                    });
                    // Let's find his name
                    buildXML += "\t\t<name type=\"string\">" + ourCharData.name + "</name>\n";
                    var skillCount = 1;
                    $.each(ourCharData.skill_assignments, function( index, value) {
                        thisIteration = pad(skillCount, 5);
                        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                        buildXML += "\t\t\t\t<link type=\"windowreference\">\n";
					    buildXML += "\t\t\t\t\t<class>sw_referenceskill</class>\n";
					    buildXML += "\t\t\t\t\t<recordname>reference.skills." + fixSkillName(value.name.toLowerCase()) + "@*</recordname>\n";
                        buildXML += "\t\t\t\t</link>\n";
                        buildXML += "\t\t\t\t<name type=\"string\">" + value.name + "</name>\n";
                        buildXML += "\t\t\t\t<skill type=\"dice\">" + diceNum[value.value] + "</skill>\n";
                        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                        
                        skillCount += 1;
                    });
                    buildXML += "\t\t\t<pace type=\"number\">6</pace>\n";
                    buildXML += "\t\t\t<parry type=\"number\">" + 2 + Math.floor(fightDie / 2) + "</parry>\n";
                    switch(ourCharData.race) {
                        case 51:
                            buildXML += "\t\t\t<race type=\"string\">Dwarf</race>\n";
                            buildXML += "\t\t\t<racelink type=\"windowreference\">\n";
                            buildXML += "\t\t\t\t<class>sw_referencerace</class>\n";
                            buildXML += "\t\t\t\t<recordname>reference.races.dwarf@*</recordname>\n";
                            buildXML += "\t\t\t</racelink>\n";
                            break;
                        case 50:
                            buildXML += "\t\t\t<race type=\"string\">Elf</race>\n";
                            buildXML += "\t\t\t<racelink type=\"windowreference\">\n";
                            buildXML += "\t\t\t\t<class>sw_referencerace</class>\n";
                            buildXML += "\t\t\t\t<recordname>reference.races.Elf@*</recordname>\n";
                            buildXML += "\t\t\t</racelink>\n";
                            break;
                        case 49:
                            buildXML += "\t\t\t<race type=\"string\">Avion</race>\n";
                            buildXML += "\t\t\t<racelink type=\"windowreference\">\n";
                            buildXML += "\t\t\t\t<class>sw_referencerace</class>\n";
                            buildXML += "\t\t\t\t<recordname>reference.races.avion@*</recordname>\n";
                            buildXML += "\t\t\t</racelink>\n";
                            break;
                        case 48:
                            buildXML += "\t\t\t<race type=\"string\">Aquarian</race>\n";
                            buildXML += "\t\t\t<racelink type=\"windowreference\">\n";
                            buildXML += "\t\t\t\t<class>sw_referencerace</class>\n";
                            buildXML += "\t\t\t\t<recordname>reference.races.aquarian@*</recordname>\n";
                            buildXML += "\t\t\t</racelink>\n";
                            break;
                        case 47:
                            buildXML += "\t\t\t<race type=\"string\">Android</race>\n";
                            buildXML += "\t\t\t<racelink type=\"windowreference\">\n";
                            buildXML += "\t\t\t\t<class>sw_referencerace</class>\n";
                            buildXML += "\t\t\t\t<recordname>reference.races.android@*</recordname>\n";
                            buildXML += "\t\t\t</racelink>\n";
                            break;
                        case 19:
                            buildXML += "\t\t\t<race type=\"string\">Human</race>\n";
                            buildXML += "\t\t\t<racelink type=\"windowreference\">\n";
                            buildXML += "\t\t\t\t<class>sw_referencerace</class>\n";
                            buildXML += "\t\t\t\t<recordname>reference.races.human@*</recordname>\n";
                            buildXML += "\t\t\t</racelink>\n";
                            break;
                    }
                    console.log(ourCharData.race);
                } else {
                    continue;
                }
            }
            finalXML += startXML + buildXML + endXML;
            console.log(finalXML);
        } 
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
    alert("Character list has been populated");
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
    return badString.replace(/\s/g, '').trim();
}
