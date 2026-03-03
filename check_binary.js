var fso = new ActiveXObject('Scripting.FileSystemObject');
var js = fso.OpenTextFile('app.js', 1).ReadAll();

var len = 20000;
for(var j=5000; j<=len; j+=1000) {
   var s = js.substring(0, j);
   try { eval('function a() { '+s+' }'); } catch(e) { 
      // JScript eval says ';' esperado for unexpected end of string, so if we just cut it mid-way it fails.
      // But if it fails early for a real syntax error, what is it?
      // Actually unexpected curly braces throws something else. 
      // Let's do differently.
   }
}
