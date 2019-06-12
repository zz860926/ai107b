var log = console.log;

function matrixPrint(m) {
    for(var i=0;i<m.length;i++)
      log(m[i]);
  }

  function strset(s, i, c) {
    return s.substr(0, i) + c + s.substr(i+1);
  }

var m =['    ',
        '    ',
        '    ',
        '    ',]

function search(m,x,y) {
  log('=========================');
  log('x='+x+' y='+y);
	matrixPrint(m);
	if (x>=4||y>=4) return false;
	if (m[x][y] == '*') return false;
	if (m[x][y] == ' ') m[x] = strset(m[x], y, '*');

	if (y<4&&m[x][y+1]==' ') //向右
    if (findPath(m, x,y+1)) return true;
}

search(m, 0, 0);