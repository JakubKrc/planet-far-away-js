let selectedobject

function whichObjectIsOnCoordinates(x,y){
		
	objects = objects.filter (ele => x<ele.x || x>ele.x+ ele.width || y<ele.y|| y>ele.y + ele.height)

}

function whichObjectIsClickedOn(x,y){
		
	return objects.findIndex (ele => x>ele.x && x<ele.x+ ele.width && y>ele.y && y<ele.y + ele.height)

}

function displayValuesObjects(){
	
	let okienko = document.getElementById("objectvalue")
	let element
	
	okienko.innerHTML = ""
	
	element = document.createElement("a")
	element.textContent = objects[selectedobject].constructor.name
	okienko.appendChild(element)
	
	let valuesNames = getParamNames(objects[selectedobject].constructor)
		
	for(let i in valuesNames){
					
			element = document.createElement("div")
			element.setAttribute("name", "valuetext");
			element.textContent = valuesNames[i]
			okienko.appendChild(element)
			
			element = document.createElement("input")
			element.name = "value"
			element.type = "text"
			element.class = "input"
			element.value = objects[selectedobject][valuesNames[i]]
			okienko.appendChild(element)
				
	}
	
}

function saveValuesObjects(){
	
	let valuesObjects = document.getElementsByName("valuetext")
	let valuesToSave = document.getElementsByName("value")

	for(let i in valuesObjects){
		if(typeof valuesObjects[i].textContent !== 'undefined' && typeof valuesToSave[i].value !== 'undefined'){ 
			if(isNaN(valuesToSave[i].value))
				objects[selectedobject][valuesObjects[i].textContent] = valuesToSave[i].value
			else objects[selectedobject][valuesObjects[i].textContent] = parseInt(valuesToSave[i].value);
		}
	}
	
}

let STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
let ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  let fnStr = func.toString().replace(STRIP_COMMENTS, '');
  let result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
	
  result = result.map (arr => arr.slice(0, ( arr.indexOf('=') == -1 ) ? arr.length : arr.indexOf('=') ))	
	
  if(result === null)
     result = [];
  return result;
}

function setObject(whichObject,x,y) {
    
	if(whichObject == "nothing") return
	selectedobject = objects.push(eval("new "+whichObject+"()")) - 1
	objects[selectedobject].x = x
	objects[selectedobject].y = y
	displayValuesObjects()
    
}

function buttonsetdimensionsgif() {
	
	objects[selectedobject].width = gamePic[objects[selectedobject].imagenum].width
	objects[selectedobject].height = gamePic[objects[selectedobject].imagenum].height
	displayValuesObjects()
	
}

function selectedFromObjectList() {
	
	let list=document.getElementById('selectobjects')
	
	return list.options[list.options.selectedIndex].text
	
}
