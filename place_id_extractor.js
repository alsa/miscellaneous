function buildPopup(gameDiv, urlValue) {
    var d = document.createElement("div");
    d.style.cssText = "position: fixed;\
                       left: 50%;\
                       top: 50%;\
                       width: 300px;\
                       margin-left:-200px;\
                       margin-top:-150px;\
                       border:1px solid black;\
                       background-color:white;\
                       color:black;\
                       padding:20px;\
                       font-size:13px;\
                       text-align:left;\
                       z-index:501;";
    d.innerHTML = "<h1><a style='font-size:16pt;color:blue;text-decoration: none;'> Google: </a>\
                   <a style='font-size:16pt;color:black;text-decoration: none;'> PlaceID Finder </a></h1>\
                   <button style='position:absolute;top:0;right:0;height:20px;width:20px'>X</button>\
                   </br></br><textarea rows='3' cols='55'></textarea></br></br>\
                   <button style='float: right;'>Copy to clipboard</button>";

    gameDiv.appendChild(d);

    d.getElementsByTagName("button")[0].addEventListener("click", function() {
        gameDiv.removeChild(d);
    }, true);

    d.getElementsByTagName("textarea")[0].value = urlValue;

    d.getElementsByTagName("button")[1].addEventListener("click", function() {
        var text = d.getElementsByTagName("textarea")[0];
        text.select();
        try {
            var successful = document.execCommand("copy");
            var msg = successful ? "successful" : "unsuccessful";
            console.log("Copying text command was " + msg);
        } catch (err) {
            console.log("Oops, unable to copy");
        }
    }, true);

    return d;
}

function main() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://code.jquery.com/jquery-1.5.1.min.js'
    s.onload = function() {
        place_id = jQuery('#place-id').text();

        if (place_id) {
            var gameDiv, popup;
            gameDiv = document.createElement("div");
            gameDiv.khIgnore = true;
            document.body.appendChild(gameDiv);
            popup = buildPopup(gameDiv, place_id);
        } else {
            alert("No PlaceID found.");
        }
    };

    document.body.appendChild(s);
}

if (!window.noMain) {
    main();
}