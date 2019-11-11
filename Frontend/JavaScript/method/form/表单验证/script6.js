window.onload = initForms;

function initForms() {
	var forms = document.forms;
	for (var i = 0; i < forms.length; i++) {
		forms[i].onsubmit = validForm;
	}
	// 当用户单击遮阳篷复选框时，将调用 doorSet()函数
	document.getElementById("sunroof").onclick = doorSet;
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
				// 希望确保至少选择一个单选按钮
					if (allGood && !radioPicked(thisTag.name)) {
						classBack = "invalid ";
					}
					classBack += thisClass;
					break;
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
		
		function radioPicked(radioName) {
			var forms = document.forms;
			// 对 radioSet 变量进行初始化
			var radioSet = "";
			
			for (var k = 0; k < forms.length; k++) {
				if (!radioSet) {
					// 尝试将 radioSet 设置为正在查看的表单中单选按钮组的名称。如果找到这个
					// 单选按钮组，radioSet 就会包含一个值。
					radioSet = forms[k][radioName];
				}
			}
			if (!radioSet) {
				return false;
			}
			// 在循环结束时，查看 radioSet——如果还没有设置它，就返回 false，因为无法找到
			// 要找的单选按钮组，所以不能选择单选按钮。
			for (k = 0; k < radioSet.length; k++) {
				// 用另一个循环检查每个单选按钮。当发现一个单选按钮被选中时，就返
				// 回 true，
				if (radioSet[k].checked) {
					return true;
				}
			}
			// 如果到达了循环末尾的这个语句，那么已经检查了整个单选按钮组而且没有单选按钮
			// 被选中。在这种情况下，返回 false，并且改变单选按钮的标签并将单选按钮的文
			// 本改为红色的粗体。
			return false;
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

function doorSet() {
	// 检查是否选中了遮阳篷选项
	// 如果是，就将 twoDoor 单选按钮设置为 true。如果是取消选中遮阳篷复选框，
	// 那么不做任何处理。
	if (this.checked) {
		document.getElementById("twoDoor").checked = true;
	}
}