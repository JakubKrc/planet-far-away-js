function postJS(whereTo, value) {

	let jobj = document.createElement('input');

	jobj.type  = 'hidden';

	jobj.name  = 'jobj';

	jobj.value = value;

	whereTo.appendChild(jobj);
	
}

function addNulls (tiles){
	
	for (i in tiles){
		let pomoc = tiles[i].length;
		for (x=pomoc; x<pomoc + (LEVELMAXX - pomoc); x++)
			tiles[i].push(0)
	}
	
}

function writelevel() {

    let levelname = document.getElementsByName('levelfile')[0].value;

    ifrm.document.open();
    
    ifrm.document.write("if(levelname=='"+levelname+"'){<br>");
	
	let objectValues
    
    for (let i in objects){      
        
		objectValues = getParamNames(objects[i].constructor)
		
         ifrm.document.write("objects[" + i + "]= new " + objects[i].constructor.name + "(")
		
		for(let argument in objectValues){
			if (!isNaN(objects[i][objectValues[argument]]))
				ifrm.document.write(objects[i][objectValues[argument]])
			else ifrm.document.write('"'+objects[i][objectValues[argument]]+'"')
			if(argument != objectValues.length-1) ifrm.document.write(',')
		}
		
		ifrm.document.write(")<br>")
        
    }
   
   addNulls(tiles);

    for(let x=0;x<tiles.length;x++){

        ifrm.document.write("tiles["+x+"]=[");

        for(let y=0;y<tiles[x].length;y++){

            ifrm.document.write(tiles[x][y]);
            if (y!=tiles[x].length-1) ifrm.document.write(",");

        }

        ifrm.document.write("]; <br>");
    }

    ifrm.document.write("}");

    ifrm.document.close();

}