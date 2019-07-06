var l = console.log;
//https://30secondsofcode.org/object#deepclone
const deepClone = obj => {
	let clone = Object.assign({}, obj);
	Object.keys(clone).forEach(
		key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
	);
	return Array.isArray(obj) && obj.length
		? (clone.length = obj.length) && Array.from(clone)
		: Array.isArray(obj)
			? Array.from(obj)
			: clone;
};
//based off of https://davidwalsh.name/fill-array-javascript
var fillRange = function fillRange(start, end) {
	return Array(end - start + 1).fill().map(function (item, index) {
		return start + index;
	});
};



var list = {
	'A': 9,
	'B': 18,
	'C': 12
};

var result = spreadShuffle(list);

//inspiration from https://keyj.emphy.de/balanced-shuffle/
function spreadShuffle(meta) {
	var longest = 0;
	Object.keys(meta).forEach(function(item) {
		if (meta[item] > longest) {
			longest = meta[item];
		}
	});
	l(longest);
	
	var newMeta = deepClone(meta);
	Object.keys(newMeta).forEach(function(item) {
		if (newMeta[item] === longest) {
			newMeta[item] = Array(longest).fill(item);
		} else {
			var finalArray = [];
			
			var current = newMeta[item];
			var dummiesleft = longest - current;
			var actual = item;
			var dummy = 'Z';
			//handle the alternate case
			if (dummiesleft < current) {
				current = dummiesleft;
				dummiesleft = newMeta[item];
				actual = 'Z';
				dummy = item;
			}
			
			while (dummiesleft > 0) {
				var toadd = Math.round(dummiesleft / current);
				finalArray.push(actual);
				finalArray = finalArray.concat(Array(toadd).fill(dummy));
				
				dummiesleft = dummiesleft - toadd;
				current = current - 1;
			}
			newMeta[item] = finalArray;
		}
	});
	l(meta);
	l(newMeta)
	
	var rawArray = [];
	
	var keys = Object.keys(newMeta);
	var keyArray = fillRange(0,keys.length-1);
	
	//l(keys, keyArray)
	
	for (var i=0; i < longest; i++) {
		//newMeta[keys[0]][i]
		var currentKeyArray = deepClone(keyArray);
		//l(currentKeyArray, keyArray)
		while (currentKeyArray.length > 0) {
			//l(currentKeyArray, currentKeyArray[0])
			var randomIndex = Math.floor(Math.random() * currentKeyArray.length);
			var randomKey = currentKeyArray[randomIndex];
			//newMeta[keys[randomKey]][i]
			//l(randomKey, randomIndex, currentKeyArray, keys)
			rawArray.push(newMeta[keys[randomKey]][i]);
			currentKeyArray.slice(randomIndex, 1);
		}
	}
	l(rawArray);
	
	var processed = rawArray.filter(function(el) {
		return el !== 'Z';
	});
	
	l(processed)
	
	var ul = document.querySelector('ul');
	for (var el of processed) {
		var li = document.createElement('li');
		li.innerText = el;
		ul.appendChild(li);
	}
}


