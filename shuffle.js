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



var list = {
	'A': 3,
	'B': 8,
	'C': 5
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
			//newMeta[item] = [].fill(item, 0, longest);
			newMeta[item] = Array(longest).fill(item);
		} else {
			l(' ')
			var finalArray = [];
			//need to get to longest, from current
			var n = longest;
			var current = newMeta[item];
			var dummies = longest - current;
			var k = current > dummies ? dummies : current;
			
			while (n>0) {
				var newdummies = n - current;
				
				var r = Math.round(n / k);
				l(n,k,r)
				l(n - k + 1)
				/*if (r == 0) {
					r = 1;
				}*/
				/*while (r > (n - k + 1)) {
					r = r-1;
					l(r)
				}*/
				l(k, newdummies,n,current)
				if (k == newdummies) {
					//l(k)
					l(r)
					finalArray.push(item);
					finalArray.concat(Array(r).fill('Z'));
				} else {
					//l(k, dummies)
					l(r)
					finalArray.push('Z');
					finalArray.concat(Array(r).fill(item));
				}
				k = k - 1;
				n = n - r;
			}
			newMeta[item] = finalArray;
			l(' ')
		}
	});
	l(newMeta)
}


