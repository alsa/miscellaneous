function add(x, y, base) {
    var z = [];
    var n = Math.max(x.length, y.length);
    var carry = 0;
    var i = 0;
    while (i < n || carry) {
        var xi = i < x.length ? x[i] : 0;
        var yi = i < y.length ? y[i] : 0;
        var zi = carry + xi + yi;
        z.push(zi % base);
        carry = Math.floor(zi / base);
        i++;
    }
    return z;
}

function multiplyByNumber(num, x, base) {
    if (num < 0) return null;
    if (num == 0) return [];

    var result = [];
    var power = x;
    while (true) {
        if (num & 1) {
            result = add(result, power, base);
        }
        num = num >> 1;
        if (num === 0) break;
        power = add(power, power, base);
    }

    return result;
}

function parseToDigitsArray(str, base) {
    var digits = str.split("");
    var ary = [];
    for (var i = digits.length - 1; i >= 0; i--) {
        var n = parseInt(digits[i], base);
        if (isNaN(n)) return null;
        ary.push(n);
    }
    return ary;
}

function convertBase(str, fromBase, toBase) {
    var digits = parseToDigitsArray(str, fromBase);
    if (digits === null) return null;

    var outArray = [];
    var power = [1];
    for (var i = 0; i < digits.length; i++) {
        if (digits[i]) {
            outArray = add(outArray, multiplyByNumber(digits[i], power, toBase), toBase);
        }
        power = multiplyByNumber(fromBase, power, toBase);
    }

    var out = "";
    for (var i = outArray.length - 1; i >= 0; i--) {
        out += outArray[i].toString(toBase);
    }
    return out;
}

function hexToDec(hexStr) {
    if (hexStr.substring(0, 2) === "0x") hexStr = hexStr.substring(2);
    hexStr = hexStr.toLowerCase();
    return convertBase(hexStr, 16, 10);
}

function buildPopup(gameDiv, urlValue) {
    var d = document.createElement("div");
    d.style.cssText = "position: fixed;\
                       left: 50%;\
                       top: 50%;\
                       width: 400px;\
                       margin-left:-200px;\
                       margin-top:-150px;\
                       border:1px solid black;\
                       background-color:white;\
                       color:black;\
                       padding:20px;\
                       font-size:13px;\
                       text-align:left;\
                       z-index:501;";
    d.innerHTML = "<h1><a style='font-size:16pt;color:blue;text-decoration: none;'> Google Maps: </a>\
                   <a style='font-size:16pt;color:black;text-decoration: none;'> URL extractor </a></h1>\
                   <button style='position:absolute;top:0;right:0;height:20px;width:20px'>X</button>\
                   </br></br><textarea rows='3' cols='55'></textarea></br></br>\
                   <button style='float: right;'>Copy to clipboard</button>\
                   <button style='float: left;'>Open URL</button>";

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

    d.getElementsByTagName("button")[2].addEventListener("click", function() {
        window.location.replace(urlValue);
    }, true);

    return d;
}

function main() {
    var currentUrl = window.location.href;
    var googleId = currentUrl.match(".*:0x([a-f0-9]{12,})"); // extract last occurence;

    if (googleId) {
        var gameDiv, popup;
        gameDiv = document.createElement("div");
        gameDiv.khIgnore = true;
        document.body.appendChild(gameDiv);
        popup = buildPopup(gameDiv, "https://maps.google.com/maps?cid=" + hexToDec(googleId[1]));

    } else {
        alert("No Google Maps ID found.");
    }
}

if (!window.noMain) {
    main();
}
