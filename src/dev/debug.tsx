
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;

function getParamNames(func:any) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}

export default function debug(...props:any){
    console.log("%c" + getParamNames(props), "color:" + 'orange' + ";font-weight:bold;");
    props.map((i:any) => {
        console.log("%c" + 'name', "color:" + 'yellow' + ";font-weight:bold;");
        console.log("%c" + i, "color:" + 'red' + ";font-weight:bold;");
    })
}

