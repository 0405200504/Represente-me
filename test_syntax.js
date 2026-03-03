@
var fso = new ActiveXObject('Scripting.FileSystemObject');
var content = fso.OpenTextFile('app.js', 1).ReadAll();
try {
  eval('function test(){' + content + '}');
  WScript.Echo('Syntax OK');
} catch(e) {
  WScript.Echo('Error: ' + e.description);
}
