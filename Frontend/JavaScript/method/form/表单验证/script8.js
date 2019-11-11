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
					// 如果输入的是非数字，那么 isNum()返回 false。
					if (allGood && !isNum(thisTag.value)) {
						classBack = "invalid ";
					}
					classBack += thisClass;
					break;
				case "isZip":
				// 如果这个字段非空而且它不是 Zip 编码，那么 isZip()返回 false。
					if (allGood && !isZip(thisTag.value)) {
						classBack = "invalid ";
					}
					classBack += thisClass;
					break;
				case "email":
					// 如果 validEmail()函数返回 false，就将 class设置为 invalid。
					if (allGood && !validEmail(thisTag.value)) {
						classBack = "invalid ";
					}
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
		
		function isNum(passedVal) {
			// 在 isNum()函数中，如果 passedVal 是空的，那么我们正在检查的字段就不是数字.
			if (passedVal == "") {
				return false;
			}
			for (var k = 0; k < passedVal.length; k++) {
				// charAt()函数检查位置 k 上的字符。如果这个字符小于“0”或者大于“9”，
				// 那么它就不是数字
				if (passedVal.charAt(k) < "0") {
					return false;
				}
				if (passedVal.charAt(k) > "9") {
					return false;
				}
			}
			// 如果到达这行代码，就说明输入是数字，所以返回 true。
			return true;
		}
		// 在这个表单中，Zip 编码字段为空是有效的。
		function isZip(inZip) {
			// 此我们先检查用户是否在这个字段中输入了任何内容，如果没有，就返回 true——这
			// 是有效的输入。但是，如果输入了任何内容，它就必须是数字，所以用 isNum()进行
			// 检查。
			if (inZip == "") {
				return true;
			}
			return (isNum(inZip));
		}
		
		function validEmail(email) {
			// 创建变量 invalidChars，其中包含电子邮件地址中最可能出现的 5 个无效
			// 字符：空格、斜杠、冒号、逗号和分号。
			var invalidChars = " /:,;";
			// 如果 email 字段的内容是空的，那么结果是 false。”
			if (email == "") {
				return false;
			}
			for (var k = 0; k < invalidChars.length; k++) {
				// 将 badChar 变量设置为 invalidChars 字符串中 k 位置上的无效字符
				var badChar = invalidChars.charAt(k);
				// 检查电子邮件地址（email）中是否有这个字符。
				if (email.indexOf(badChar) > -1) {
					return false;
				}
			}
			//  atPos 变量设置为@符号的位置。脚本使用 indexOf 从地址的第二个字符开始检
			// 查第一个@符号。
			var atPos = email.indexOf("@", 1);
			if (atPos == -1) { //就意味着地址中没有@符号，因此是错误的
				return false;
			}
			// 脚本检查第一个@符号之后的字符，从而确保只有一个@符号，并且拒绝任何包含多
			// 个@符号的输入。
			if (email.indexOf("@", atPos + 1) != -1) {
				return false;
			}
			// 脚本检查在@符号后面是否有点号。如果没有，就返回 false。
			var periodPos = email.indexOf(".", atPos);
			if (periodPos == -1) {
				return false;
			}
			// 脚本要求在地址中的点号后面至少有两个字符。
			if (periodPos + 3 > email.length) {
				return false;
			}
			// 如果通过了所有这些检查，这意味着电子邮件地址是有效的。
			return true;
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