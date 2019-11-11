window.onload = initForms;

function initForms() {
	var forms = document.forms;
	for (var i = 0; i < forms.length; i++) {
		forms[i].onsubmit = validForm;
	}
}

function validForm() {
	var allGood = true;
	var demo = document.getElementById("demo");
	var allTags = demo.getElementsByTagName("*");
	
	for (var i = 0; i < allTags.length; i++) {
		if (!validTag(allTags[i])) {
			allGood = false;
		}
	}
	return allGood;
	
	function validTag(thisTag) {
		var outClass = "";
		var allClasses = thisTag.className.split(" ");
		
		for (var j = 0; j < allClasses.length; j++) {
			if (allClasses[j] == "") {
				continue;
			}
			outClass += validBasedOnClass(allClasses[j]) + " ";
		}
		thisTag.className = outClass;
		
		if (outClass.indexOf("invalid") > -1) {
			thisTag.focus();
			if (thisTag.nodeName == "INPUT") {
				thisTag.select();
			}
			return false;
		}
		return true;
		
		function validBasedOnClass(thisClass) {
			var classBack = "";
			
			switch(thisClass) {
				case "":
				case "invalid":
					break;
				case "reqd":
					if (allGood && thisTag.value == "") {
						classBack = "invalid ";
					}
					classBack += thisClass;
					break;
				default:
					// 因为第二个密码字段的类包含 passwd1，所以这个 JavaScript 脚本知道它必须
					// 根据第一个密码字段核对第二个密码字段。这在条件语句的default 块中进行处理。
					// 如果 allGood 是 true 且 crossCheck()函数（见下面）发现了问题（并返回false）
					if (allGood && !crossCheck(thisTag, thisClass)) {
						// 就将 classBack 设置为 invalid
						classBack = "invalid ";
					}
					classBack += thisClass;
			}
			return classBack;
		}
		
		function crossCheck(inTag, otherFieldID) {
			var tagID = document.getElementById(otherFieldID);
			// 如果另一个字段不存在，就无法进行检查，这就说明有问题，所以函数返回 false。
			if (!tagID) {
				return false;
			}
			// 这两个字段都存在，所以可以比较它们的值：如果相同，就返回 true；如果不同，
			// 就返回 false。
			return (inTag.value == tagID.value);
		}
	}
}