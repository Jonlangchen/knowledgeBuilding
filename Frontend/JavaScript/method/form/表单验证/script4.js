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
			// 将父标签也标记为无效字段，加以区别
			invalidLabel(thisTag.parentNode);
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
					// 使这个脚本能够检查更多的字段和更多的情况
				case "radio":
				case "isNum":
				case "isZip":
				case "email":
					classBack += thisClass;
					break;
				default:
					if (allGood && !crossCheck(thisTag, thisClass)) {
						classBack = "invalid ";
					}
					classBack += thisClass;
			}
			return classBack;
		}
		
		function crossCheck(inTag, otherFieldID) {
			var tagID = document.getElementById(otherFieldID);
			
			if (!tagID) {
				return false;
			}
			//return (inTag.value == tagID.value);
			// 而是检查是否至少已经设置了两个字段之一（这是为表单末尾的 ZIP 编码字段和列
			// 表元素准备的）。
			return (inTag.value != "" || tagID.value != "");
		}
		
		function invalidLabel(parentTag) {
			// 检查这个标签（tag）是否是一个标签（label）
			if (parentTag.nodeName == "LABEL") {
				// 在它的类中添加 invalid 属性。
				parentTag.className += " invalid";
			}
		}
	}
}