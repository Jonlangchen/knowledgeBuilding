window.onload = initForms;

function initForms() {
	var forms = document.forms;
	for (var i = 0; i < forms.length; i++) {
		forms[i].onsubmit = validForm;
	}
}

function validForm() {
	var allGood = true;
	var form = document.getElementsByTagName("form")[0];
	var allTags = form.getElementsByTagName("*");
	
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
				case "email":
					if (allGood && !validEmail(thisTag.value)) {
						classBack = "invalid ";
					}
				default:
					classBack += thisClass;
			}
			return classBack;
		}
		function validEmail(email) {
			// 首先，re 仅仅是一个变量。
			
			// 正则表达式总是以斜杠(/)开头和结尾（当然，仍然有一个分号，表示 JavaScript 代
			// 码行结束，但分号不是正则表达式的一部分）。斜杠之间的所有内容都是正则表达式的组
			// 成部分。
			
			// 脱字符（^）表示我们要使用这个表达式检查以特定的字符串开头的字符串。
			
			// 表达式\w 表示任意单一字符，包括 a～z、A～Z、0～9 或下划线。
			
			// 加号+表示我们要寻找前面条目的一次或多次出现。
			
			// 左圆括号(表示一个组。这意味着后面将要引用圆括号中的所有内容，所以现在将它们
			// 放在一个组中。
			
			// 方括号[]用来表示可以出现在其中的任意一个字符。
			
			// 问号?表示前面的条目可以不出现或者出现一次。
			
			// 在?后面，再次使用\w+，这表示点号或连字符后面必须有其他一些字符。
			
			// @字符仅仅代表它本身，没有任何其他意义，这个字符位于电子邮件地址前缀和域名之间。
			
			// 再次使用\w+，这表示域名必须以一个或多个 a～z、A～Z、0～9 或下划线字符开头。
			
			// 然后，在一对圆括号中建立另一个组：\.\w{2,3}，表示我们希望找到一个点号，后面
			// 跟着一些字符。
			
			// 最后，正则表达式的末尾是一个美元符号$，表示匹配的字符串必须在这里结束。
			var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			// 这一行获得前一步中定义的正则表达式，并使用 test()方法验证电子邮件地址的
			// 有效性。
			return re.test(email);
		}
		
		function invalidLabel(parentTag) {
			if (parentTag.nodeName == "LABEL") {
				parentTag.className += " invalid";
			}
		}
	}
}