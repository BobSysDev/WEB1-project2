var cardHolder = $("#cardHolder");


$.get("xml/testFile.xml", function (xml, status) {
    console.log("Status for request to xml/testFile.xml: " + status);
    
    cardHolderData = cardHolder.html();

    if(cardHolder.hasClass("load-ongoing-projects") == true){
        var loadOngoingFiles = "true";
    }
    else{
        var loadOngoingFiles = "false";
    }

    console.log(loadOngoingFiles);

    $(xml).find("project").each(function () {
        var projectType = $(this).attr("type");
        
        if(projectType != "Residential" && projectType != "Commercial" && projectType != "Industrial" && projectType != "Roadwork"){
            alert("Your XML file contains unrecognized projects, check the file and try again.");
            return;
        }

        var isArchived = $(this).find("isArchived").text();

        if(isArchived == loadOngoingFiles){
            return
        }

        projectId = $(this).find("projectId").text();

        if(projectType < 10){
            var modalId = "modal-id-00" + projectId;
        }
        else if(projectType < 100){
            var modalId = "modal-id-0" + projectId;
        }
        else{
            var modalId = "modal-id-" + projectId;
        }

        var projectTitle = $(this).find("title").text();
        var budgetEstimate = $(this).find("budgetEstimate").text();
        var manHours = $(this).find("manHours").text();
        var manHoursEstimate = $(this).find("manHoursEstimate").text();
        var displayImage = $(this).find("imagePath").text();

        if(displayImage == ""){
            displayImage = "images/ongoing-projects/house_proj_bob.png";
        }

        cardHolderData += "<div class=\"col-lg-4 col-md-6\"><a href=\"#\" data-bs-toggle=\"modal\" data-bs-target=\"#" + modalId + "\">";
        cardHolderData += "<div class=\"card\"><div class=\"card-img-top image\" style=\"background-image: url('" + displayImage + "');\"></div>";
        cardHolderData += "<div class=\"card-body bg-accent-main border-radius-5-down\">";
        cardHolderData += "<div class=\"card-title-height\"><h1 class=\"card-title light_text tal-center\">" + projectTitle + "</h1></div>";
        cardHolderData += "<h3 class=\"light_text tal-center\">" + projectType + "</h3>";
        cardHolderData += "<div class=\"row margin-5 justify-content-between bg-white rounded\"><div class=\"col-6 bg-white card-content-height border-radius-5-left\">";
        cardHolderData += "<h2 class=\"tal-center card-tal\">Est. price: </h2></div><div class=\"col-1 border-div\"></div><div class=\"col-5 bg-white card-content-height border-radius-5-right\">";   
        cardHolderData += "<h3 class=\"tal-center card-tal price\">" + budgetEstimate + " DKK</h3></div>";
        cardHolderData += "</div><br><div class=\"row margin-5 justify-content-between bg-white rounded\"><div class=\"col-6 bg-white card-content-height-tall border-radius-5-left\">";
        cardHolderData += "<h2 class=\"tal-center card-tal fit-adj\">Man-hours used: </h2></div><div class=\"col-1 border-div-tall\"></div><div class=\"col-5 bg-white card-content-height-tall border-radius-5-right\">";
        cardHolderData += "<h3 class=\"tal-center card-tal-tall\"><span class=\"highlight-hours\">" + manHours + "</span>/" + manHoursEstimate + "*</h3>"
        cardHolderData += "</div></div></div></div></a></div>";

        cardHolder.html(cardHolderData);
    });
});