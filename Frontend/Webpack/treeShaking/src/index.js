// import _ from 'lodash';
import { cube } from './math.js';

function component() {
	// var element = document.createElement('div');
	
	// element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	
	var element = document.createElement('pre');
	element.innerHTML = [
		'Hello webpack!',
		'5 cubed is equal to ' + cube(5)
	].join('\n\n');
	
	return element;
}

document.body.appendChild(component());