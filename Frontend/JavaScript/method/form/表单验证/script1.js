window.onload = initForms;
// 当页面首次加载时，调用 initForms()函数。
function initForms() {
	var forms = document.forms;
	for (var i = 0; i < forms.length; i++) {
		forms[i].onsubmit = validForm;
	}
}

function validForm() {
	var allGood = true;
	var demo = document.getElementById("demo");
	// 星号让 JavaScript 返回一个包含页面上所有标签的数组。
	var allTags = demo.getElementsByTagName("*");
	
	for (var i = 0; i < allTags.length; i++) {
		// 检查每个标签，了解是否有什么东西阻止表单提交这个页面。
		if (!validTag(allTags[i])) {
			allGood = false;
		}
	}
	// 现在返回 allGood，以此表明是否应该继续提交表单。
	return allGood;
	
	function validTag(thisTag) {
		var outClass = "";
		// 以空格为分隔符将字符串分割为数组保存在 allClasses
		var allClasses = thisTag.className.split(" ");
		
		for (var j = 0; j < allClasses.length; j++) {
			if (allClasses[j] == "") {
				continue;
			}
			// 且传递当前查看的类。这个函数返回某些东西，这些东西
			// 加上一个空格之后追加到 outClass 变量中。
			outClass += validBasedOnClass(allClasses[j]) + " ";
		}
		// 在结束 allClasses 循环时，我们获得 outClass 的内容并且将它放进 
		// thisTag.className
		thisTag.className = outClass;
		
		// 在新的 class 属性中可能返回的值之一是单词 invalid，所以要检查它。如果在新的类
		// 中找到了invalid，就说明有问题，因此执行对应的操作。
		if (outClass.indexOf("invalid") > -1) {
			// 这个表单字段可以获得焦点
			thisTag.focus();
			// 当前查看的这个标签是<input>标签吗
			if (thisTag.nodeName == "INPUT") {
				// 是的话选中它
				thisTag.select();
			}
			// 我们仍然在“返回无效元素”块中，所以将 false 返回到进行调用的地方。
			return false;
		}
		// 如果所有一切都运行良好并且有效，就返回 true。
		return true;
		
		function validBasedOnClass(thisClass) {
			// 创建 classBack 变量，并且将它初始化为空。这个变量将包含要返回的类，
			// 也就是我们希望发送回的值。
			var classBack = "";
			// 句检查（在 thisClass 中）传递给它的一个 class 属性，并根据这个属性执行对应
			// 的操作。
			switch(thisClass) {
				// 如果 thisClass 是空的或是 invalid，那么就跳出条件语句，否则继续。
				case "":
				case "invalid":
					break;
				case "reqd": //如果正在处理的属性是 reqd，
				// allGood 是 true，而且当前标签的当前值是""（即空字符串），那么
				// 将 classBack 设置为 invalid，因为这说明有问题，我们希望通知用户。
					if (allGood && thisTag.value == "") {
						classBack = "invalid ";
					}
					// 无论是否有问题，我们都将当前的类追加到 classBack 中，使它不会丢失。
					classBack += thisClass;
					break;
				default: //如果上面的分支与发生的情况都不匹配，就会执行 default 块。
					// 只需要将它追加到 classBack 中
					classBack += thisClass;
			}
			// 最后，返回 classBack。
			return classBack;
		}
	}
}