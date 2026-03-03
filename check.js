var fso = new ActiveXObject('Scripting.FileSystemObject');
var strFile = fso.OpenTextFile('app.js', 1).ReadAll();
try {
   eval('function __syntax_test__() {' + strFile + '}');
   WScript.Echo('SYNTAX OK');
} catch(e) {
   WScript.Echo('SYNTAX ERROR: ' + e.message);
}
