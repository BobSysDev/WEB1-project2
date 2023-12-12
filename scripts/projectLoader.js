var cardHolder = $("#cardHolder");
var modalHolder = $("#modalHolder");

var displayArchiveOnly = cardHolder.hasClass("archive");

var projectArray = [];

$(document).ready(function() {
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            renderAllProjects($("#sortProjects").val(), $("#filterProjects").val(), $("#projectSearch").val());
            return false;
        }
    });
});

$.get("xml/projectDB.xml", function (xml, status) {
    console.log("Status for request to xml/projectDB.xml: " + status);
    
    cardHolderData = cardHolder.html();

    $(xml).find("project").each(function () {
        var projectType = $(this).attr("type");
        var id = $(this).find("projectId").text();
        var title = $(this).find("title").text();
        var budgetEstimate = $(this).find("budgetEstimate").text();
        var manHoursEstimate = $(this).find("manHoursEstimate").text();
        var details = $(this).find("details").text();
        var materials = $(this).find("materials").text();
        var imagePath = $(this).find("imagePath").text();
        var isArchived = $(this).find("isArchived").text();
        var dateOfCration = $(this).find("startDate").text();
        var timeframeEstimate = $(this).find("timeEstimate").text();

        let project = {type:projectType, id, title, budgetEstimate, manHoursEstimate, details, materials, imagePath, isArchived, dateOfCration, timeframeEstimate};

        projectArray.push(project);
    });

    renderAllProjects();
    if(!displayArchiveOnly){
        renderAllModals();
    }
});

$("#sortProjects").on('change', function() {
    renderAllProjects(this.value, $("#filterProjects").val(), $("#projectSearch").val());
});

$("#filterProjects").on('change', function() {
    renderAllProjects($("#sortProjects").val(), this.value, $("#projectSearch").val());
});

$("#projectSearchButton").on('click', function() {
    renderAllProjects($("#sortProjects").val(), $("#filterProjects").val(), $("#projectSearch").val());
});

function printProjectCard(project){
    cardHolderData = cardHolder.html();

    if(project.imagePath == ""){
        project.imagePath = "images/ongoing-projects/house_proj_bob.png";
    }

    cardHolderData += "<div class=\"col-lg-4 col-md-6\"><a href=\"#\" data-bs-toggle=\"modal\" data-bs-target=\"#modal-id-" + project.id + "\">";
    cardHolderData += "<div class=\"card\"><div class=\"card-img-top image\" style=\"background-image: url('" + project.imagePath + "');\"></div>";
    cardHolderData += "<div class=\"card-body bg-accent-main border-radius-5-down\">";
    cardHolderData += "<div class=\"card-title-height\"><h1 class=\"card-title light_text tal-center\">" + project.title + "</h1></div>";
    cardHolderData += "<h3 class=\"light_text tal-center\">" + project.type + "</h3>";
    cardHolderData += "<div class=\"row margin-5 justify-content-between bg-white rounded\"><div class=\"col-6 bg-white card-content-height border-radius-5-left\">";
    cardHolderData += "<h2 class=\"tal-center card-tal\">Est. price: </h2></div><div class=\"col-1 border-div\"></div><div class=\"col-5 bg-white card-content-height border-radius-5-right\">";   
    cardHolderData += "<h3 class=\"tal-center card-tal price\">" + Math.round(project.budgetEstimate) + " DKK</h3></div>";
    cardHolderData += "</div><br><div class=\"row margin-5 justify-content-between bg-white rounded\"><div class=\"col-6 bg-white card-content-height-tall border-radius-5-left\">";
    cardHolderData += "<h2 class=\"tal-center card-tal fit-adj\">Est. man-hours: </h2></div><div class=\"col-1 border-div-tall\"></div><div class=\"col-5 bg-white card-content-height-tall border-radius-5-right\">";
    cardHolderData += "<h3 class=\"tal-center card-tal-tall\">" + Math.round(project.manHoursEstimate) + "</h3>"
    cardHolderData += "</div></div></div></div></a></div>";

    cardHolder.html(cardHolderData);
}

function printArchivedProjectCard(project){
    cardHolderData = cardHolder.html();

    if(project.imagePath == ""){
        project.imagePath = "images/ongoing-projects/house_proj_bob.png";
    }

    cardHolderData += "<div class=\"col-lg-4 col-md-6\"><div class=\"card\">";
    cardHolderData += "<img src=\"" + project.imagePath + "\" class=\"card-img-top\" alt=\"...\">";
    cardHolderData += "<div class=\"card-body bg-accent-main border-radius-5-down\"><div class=\"card-title-height\">";
    cardHolderData += "<h1 class=\"card-title light_text tal-center\">" + project.title + "</h1></div>";
    cardHolderData += "<h3 class=\"light_text tal-center\">" + project.type + "</h3>";
    cardHolderData += "<div class=\"row margin-5 justify-content-between bg-white rounded project-archive-text-div\">";
    cardHolderData += "<p>" + project.details + "</p></div></div></div></div>"

    cardHolder.html(cardHolderData);
}

function printProjectModal(project){
    modalHolderData = modalHolder.html();

    modalHolderData += "<div class=\"modal fade\" id=\"modal-id-" + project.id + "\" tabindex=\"-1\" aria-labelledby=\"label-modal-1\" aria-hidden=\"true\">";
    modalHolderData += "<div class=\"modal-dialog modal-fullscreen-md-down modal-xl\"><div class=\"modal-content\"><div class=\"modal-header\">";
    modalHolderData += "<h1 class=\"modal-title dark_text\" id=\"label-modal-" + project.id + "\">" + project.title + "<br><span><h3>" + project.type + " | Started on " + project.dateOfCration + "</h3></span></h1>";
    modalHolderData += "<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button></div><div class=\"modal-body\"><div class=\"row\"><div class=\"col-lg-6 col-md-12\"><h2 class=\"dark_text\">Materials used</h2>";
    modalHolderData += "<p class=\"dark_text\">" + project.materials + "</p>";
    modalHolderData += "</div><div class=\"col-lg-6 col-md-12\"><h2 class=\"dark_text\">Project details</h2>"; 
    modalHolderData += "<p class=\"dark_text\">" + project.details + "</p>";
    modalHolderData += "</div></div><hr><div class=\"row\"><div class=\"col-lg-4 col-md-12\"><h2 class=\"dark_text\">Est. budget</h2><p class=\"dark_text\">" + Math.round(project.budgetEstimate) + " DKK</p>";
    modalHolderData += "</div><div class=\"col-lg-4 col-md-12\"><h2 class=\"dark_text\">Est. man-hours</h2><p class=\"dark_text\">" + Math.round(project.manHoursEstimate) + "h</p>";
    modalHolderData += "</div><div class=\"col-lg-4 col-md-12\"><h2 class=\"dark_text\">Est. timeframe</h2><p class=\"dark_text\">" + project.timeframeEstimate + " months</p></div></div></div>";
    modalHolderData += "<div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-secondary bg-accent-main hide-border light_text button-fix\" data-bs-dismiss=\"modal\">Close</button></div></div></div></div>";

    modalHolder.html(modalHolderData);
}

function renderAllProjects(sortOrder = "4", projectType = "Any", filterString = ""){
    cardHolder.html("");

    arrayToDisplay = displayOnlyType(filterProjectTitles(projectArray, filterString), projectType);

    switch(sortOrder){
        case "0":
            arrayToDisplay.sort(compareByTitle);
            break;
        case "1":
            arrayToDisplay.sort(compareByPriceAsc);
            break;
        case "2":
            arrayToDisplay.sort(compareByPriceDesc);
            break;
        case "3":
            arrayToDisplay.sort(compareByDateOfCreation);
            break;
        default:
            arrayToDisplay.sort(compareById);
            break;
    }

    arrayToDisplay.forEach(project => {
        if(project.isArchived == "false" && displayArchiveOnly == false){
            printProjectCard(project);
        }
        else if(project.isArchived == "true" && displayArchiveOnly == true){
            printArchivedProjectCard(project);
        }
    });
}

function renderAllModals(){
    modalHolder.html("");

    projectArray.forEach(project => {
        printProjectModal(project);
    });
}

function compareByTitle(a, b){
    if(a.title < b.title){
        return -1;
    }
    if(a.title > b.title){
        return 1;
    }
    return 0;
}

function compareByPriceAsc(a, b){
    if(Number(a.budgetEstimate) < Number(b.budgetEstimate)){
        return -1;
    }
    if(Number(a.budgetEstimate) > Number(b.budgetEstimate)){
        return 1;
    }
    return 0;
}

function compareByPriceDesc(a, b){
    if(Number(a.budgetEstimate) > Number(b.budgetEstimate)){
        return -1;
    }
    if(Number(a.budgetEstimate) < Number(b.budgetEstimate)){
        return 1;
    }
    return 0;
}

function compareByDateOfCreation(a, b){
    dateTMP = a.dateOfCration.split(".");
    dateA = {day: Number(dateTMP[0]), month: Number(dateTMP[1]), year: Number(dateTMP[2])};
    dateTMP = b.dateOfCration.split(".");
    dateB = {day: Number(dateTMP[0]), month: Number(dateTMP[1]), year: Number(dateTMP[2])};

    if(dateA.year == dateB.year){
        if(dateA.month == dateB.month){
            if(dateA.day < dateB.day){
                return -1;
            }
            if(dateA.day > dateB.day){
                return 1;
            }
            return 0;
        }
        else if(dateA.month < dateB.month){
            return -1;
        }
        return 1;
    }
    else if(dateA.year < dateB.year){
        return -1;
    }
    return 1;
}

function compareById(a, b){
    if(Number(a.id) < Number(b.id)){
        return -1;
    }
    if(Number(a.id) > Number(b.id)){
        return 1;
    }
    return 0;

}

function displayOnlyType(inputArray, type){
    if(type == "Any"){
        return inputArray;
    }

    newProjectArray = [];

    inputArray.forEach(project => {
        if(project.type == type){
            newProjectArray.push(project);
        }
    });

    return newProjectArray;
}

function filterProjectTitles(inputArray, filterString = ""){
    if(filterString == ""){
        return inputArray;
    }

    newProjectArray = [];

    inputArray.forEach(project => {
        if(project.title.toLowerCase().includes(filterString.toLowerCase())){
            newProjectArray.push(project);
        }
    });

    return newProjectArray;
}
