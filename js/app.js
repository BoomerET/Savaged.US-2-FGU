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
var pcFilename = "";

var fightDie = 4;

$(function() {
    $("#getUserAPI").jqxInput({placeHolder: "Enter API key", height: 30, width: 500, minLength: 1, theme: 'darkblue' });
    $("#getCharacters").jqxButton({ width: 240, height: 20, theme: 'darkblue' });
    $("#popChars").jqxDropDownList({ placeHolder: "Select Character", width: 250, height: 30, theme: 'darkblue' });
    $("#textHere").jqxTextArea({ theme: "darkblue", width: 750, height: 150, placeHolder: "XML will appear here." });
    $("#resetChar").jqxButton({ width: "120px", height: "35px", theme: "darkblue" });
    $("#dlChar").jqxButton({ width: "120px", height: "35px", theme: "darkblue" });


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
                    var ourCharData = $.parseJSON(characters[key].data);
                    $.each(ourCharData.attribute_assignments, function( index, value) {
                        // Does this give an error?
                        //console.log(index);
                        buildXML += "\t\t<" + index + " type=\"dice\">" + diceNum[value] + "</" + index + ">\n";
                    });
                    buildXML += "\t\t<name type=\"string\">" + ourCharData.name + "</name>\n";
                    var skillCount = 1;
                    buildXML += "\t\t<skills>\n";
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
                    //console.log(ourCharData.race);
                } else {
                    continue;
                }
            }
            finalXML += startXML + buildXML + endXML;
            //console.log(finalXML);
            $('#textHere').val(finalXML);
            pcFilename = ourCharData.name.replace(/\W/g, '');
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
