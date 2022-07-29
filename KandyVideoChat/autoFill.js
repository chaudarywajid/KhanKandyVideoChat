/**
 *    This utility will take query string values and apply them to form values
 *    wherever there is a form element with an Id to match each query param.
 *
 *    For the call example, you can add
 *          ?token=<YourDomainAccessToken>&username=<YourUsername>&password=<YourPassword>
 *      (or any combination thereof) to the URL for more convinient login after page reloads.
 */

function getUrlVars()
{
    var vars = {}, hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var queryParams = getUrlVars();

Object.keys(queryParams).forEach(function(key) {
    if(queryParams.hasOwnProperty(key)) {
        document.getElementById(key).value = queryParams[key];
    }
});
