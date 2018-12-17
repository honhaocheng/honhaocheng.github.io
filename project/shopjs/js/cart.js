/*
	思路：
		第一步：当页面加载完后，根据本地的数据的数据，动态生成表格(购物车列表)
			获取所要操作的节点对象
			判断购物车中是否有数据?
				有:
					显示购物列表
				没有:
				提示购物车为空
		第二步：当购物车列表动态生成后，获取tbody里面所有的checkBox标签节点对象，看那个被选中就获取对应小计进行总价格运算。
		第三步：
				为每一个checkbox添加一个onchange事件，根据操作更改总价格
		第四步：全选
		第五步：
			为加减按钮添加一个鼠标点击事件
			更改商品的数量
		第六步：删除
			获取所有的删除按钮
			为删除按钮添加一个点击事件
			删除当前行，并更新本地数据
*/

var listObj = getAllData();
var table = document.getElementById("table");
var box = document.getElementById("box");
var tbody = document.getElementById("tbody");
var totalPrice = document.getElementById("totalPrice");
var allCheck = document.getElementById("allCheck");
console.log(listObj);
if (listObj.length == 0) {	//购物车为空
	box.className = "box";
	table.className = "hide";
} else {
	box.className = "box hide";
	table.className = "";
	var nodes = "";
	for (var i = 0, len = listObj.length; i < len; i++) {
		// {"pid": 值, "pImg": 值, "pName",值, "pDesc": 值, "price": 值, "pCount": 值}
		nodes += '<tr pid=' + listObj[i].pid + '>\
					<td><input type="checkbox" class="ck"/></td>\
					<td><img src="' + listObj[i].pImg + '" alt=""/></td>\
					<td>' + listObj[i].pDesc + '</td>\
					<td>\
						<button class="down">-</button><input type="text" value="' + listObj[i].pCount + '" readonly="readonly"/><button class="up">+</button>\
					</td>\
					<td>¥<span>' + listObj[i].price + '</span></td>\
					<td>¥<span>' + listObj[i].price * listObj[i].pCount + '</span></td>\
					<td><button class="del">删除</button></td>\
				</tr>';
	}
	tbody.innerHTML = nodes;
/*
	//	作者的写法
	for(var i = 0, len = listObj.length; i < len; i++) {
        var tr = document.createElement("tr");
        tr.setAttribute("pid", listObj[i].pid);
            //{"pid":值,"pImg":值,"pName":值,"pDesc":值,"price":值,"pCount":1},
        tr.innerHTML = '<td>' +
            '<input type="checkbox" class="ck"  />' +
            '</td>' +
            '<td>' +
            '<img src="' + listObj[i].pImg + '" alt="" />' +
            '</td>' +
            '<td>' +
            listObj[i].pDesc +
            '</td>' +
            '<td>' +
            '<button class="down">-</button><input type="text" value="' + listObj[i].pCount + '" readonly="readonly" /><button class="up">+</button>' +
            '</td>' +
            '<td>' +
            '￥<span>' + listObj[i].price + '</span>' +
            '</td>' +
            '<td>' +
            '￥<span>' + listObj[i].price * listObj[i].pCount + '</span>' +
            '</td>' +
            '<td>' +
            '<button class="del" >删除</button>' +
            '</td>';
        tbody.appendChild(tr);
    }
 */
}

/*
	功能：计算总价格
*/
var cks = document.querySelectorAll("tbody .ck");
function getTotalPrice() {
	cks = document.querySelectorAll("tbody .ck");
	var sum = 0;
	for (var i = 0, len = cks.length; i < len; i++) {
		if (cks[i].checked) {	//如果当前被选中
			var tr = cks[i].parentNode.parentNode;
			var temp = tr.children[5].firstElementChild.innerHTML;
			sum += Number(temp);
		}
	}
	return sum;
}

/*
	循环遍历为每一个checkbox添加一个onchange事件
*/
for (var i = 0, len = cks.length; i < len; i++) {
	cks[i].onchange = function () {
		checkAllChecked();
		totalPrice.innerHTML = getTotalPrice();
	}
}
/*
	全选实现
*/
allCheck.onclick = function () {
	if (this.checked) {
		for (var i = 0, len = cks.length; i < len; i++) {
			cks[i].checked = true;
		}
	} else {
		for (var i = 0, len = cks.length; i < len; i++) {
			cks[i].checked = false;
		}
	}
	totalPrice.innerHTML = getTotalPrice();
}

/*检测是否要全选*/
function checkAllChecked() {
	var isSelected = true  // 全选是否会选中
	for (var i = 0, len = cks.length; i < len; i++) {
		if (cks[i].checked == false) {
			isSelected = false;
			break;
		}
	}
	allCheck.checked = isSelected;
}

var downs = document.querySelectorAll(".down");	// 一组减得按钮
var ups = document.querySelectorAll(".up");		// 一组加的按钮
var dels = document.querySelectorAll(".del");	// 一组删除按钮

for (var i =  0, len = downs.length; i < len; i++) {
	downs[i].onclick = function () {
		var txtObj = this.nextElementSibling;	// 下一个兄弟节点
		var tr = this.parentNode.parentNode;
		var pid = tr.getAttribute("pid");
		txtObj.value = txtObj.value - 1;
		if (txtObj.value < 1) {
			txtObj.value = 1;
			updateObjById(pid, 1);
		} else {
			updateObjById(pid, -1);
		}
		tr.children[0].firstElementChild.checked = true;
		checkAllChecked();
		var price = tr.children[4].firstElementChild.innerHTML;
		tr.children[5].firstElementChild.innerHTML = price * txtObj.value;
		totalPrice.innerHTML = getTotalPrice();
	}

	ups[i].onclick = function () {
		var txtObj = this.previousElementSibling;
		var tr = this.parentNode.parentNode;
		var pid = tr.getAttribute("pid");
		txtObj.value = Number(txtObj.value) + 1;
		updateObjById(pid, 1);
		tr.children[0].firstElementChild.checked = true;
		checkAllChecked();
		var price = tr.children[4].firstElementChild.innerHTML;
		tr.children[5].firstElementChild.innerHTML = price * txtObj.value;
		totalPrice.innerHTML = getTotalPrice();
	}

	dels[i].onclick = function () {
		var tr = this.parentNode.parentNode;
		var pid = tr.getAttribute("pid");
		if (confirm("确定删除？")) {
			// remove() 自杀
			tr.remove();
			listObj = deleteObjById(pid);
		}
		if (listObj.length == 0) {	//购物车为空
			box.className = "box";
			table.className = "hide";
		} else {
			box.className = "box hide";
			table.className = "";
		}
		totalPrice.innerHTML = getTotalPrice();
	}
}