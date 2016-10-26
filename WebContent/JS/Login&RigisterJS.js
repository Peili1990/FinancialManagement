/**
 * 
 */
//获取Session
function getCookies(){
	username=getCookie("FMusername");
	if(username!=null){
		document.getElementById("form1").username.value=username;
		document.getElementById("saveuser").checked=true;
	}
}

//打开用户注册界面
function Regopen(divID,backdivID){
	document.getElementById("errortips").style.display="none";
	divID=document.getElementById(divID);
	divID.style.display="block";
	backdivID=document.getElementById(backdivID);	
	backdivID.style.display="block"; 
	backdivID.style.width=document.body.clientWidth+"px"; 
	backdivID.style.height=document.documentElement.clientHeight+"px";   
}
//关闭用户注册界面
function Regclose(divID,backdivID){
	document.getElementById(divID).style.display="none";
	document.getElementById(backdivID).style.display="none";
	document.getElementById("username").value="";
	document.getElementById("pwd").value="";
	document.getElementById("repwd").value="";
	document.getElementById("name").value="";
	document.getElementById("telephone").value="";
	
}
//用户注册信息确认
function Regcheck(){
	var username=document.getElementById("username").value;
	var pwd=document.getElementById("pwd").value;
	var repwd=document.getElementById("repwd").value;
	var name=document.getElementById("name").value;
	var telephone=document.getElementById("telephone").value;
	if(username==""){
		alert("请输入用户名！");
		return;
	}
	if(pwd==""){
		alert("请输入密码！");
	}
	if(pwd!=repwd){
		alert("两次输入的密码不一致！");
		return;
	}
	if(name==""){
		alert("请输入真实姓名！");
	}
	if(telephone=""){
		alert("请输入电话号码！");
	}
	var loader=new net.AjaxRequest("UserServlet?action=checkUser&username="+username+"&nocache="+new Date().getTime(),
			deal_Regcheck,onerror,"GET");
}
//用户注册信息确认回调函数
function deal_Regcheck(){
	result=this.req.responseText;
	if(result=="0"){
		alert("该用户名已被注册！")
		return;
	}
	if(result=="1"){	
	save();
	}
}
//用户注册信息保存
function save(){
	var param="username="+document.getElementById("username").value+"&pwd="+document.getElementById("pwd").value
			  +"&name="+document.getElementById("name").value+"&telephone="+document.getElementById("telephone").value;
	var loader=new net.AjaxRequest("UserServlet?action=save&nocache="+new Date().getTime(),
			deal_save,onerror,"POST",param);
}
//用户注册信息保存回调函数
function deal_save(){
	result=this.req.responseText;
	if(result=="0"){
		alert("注册失败，请重试");
	}
	if(result=="1"){
		alert("注册成功");
		Regclose("register","ly");
	}
}

function onerror(){
	alert("出错了");
}

//用户登录
function loginSubmit(form){
	document.getElementById("errortips").style.display="none";
	if(form.username.value==""){
		document.getElementById("errortip").innerHTML="请输入用户名！";
		document.getElementById("errortips").style.display="block";
		return;
	}
	if(form.pwd.value==""){
		document.getElementById("errortip").innerHTML="请输入密码！";
		document.getElementById("errortips").style.display="block";
		return;
	}
	if(document.getElementById("saveuser").checked==true){
		setCookie("FMusername",form.username.value);
	}
	else{
		delCookie("FMusername");
	}
	var param="username="+form.username.value+"&pwd="+form.pwd.value;
	var loader=new net.AjaxRequest("UserServlet?action=login&nocache="+new Date().getTime(),
			deal_login,onerror,"POST",param);
}

//用户登录的回调函数
function deal_login(){
	result=this.req.responseText;
	if(result=="0"){
		document.getElementById("errortip").innerHTML="用户名或密码错误，请重新输入！";
		document.getElementById("errortips").style.display="block";
		document.getElementById("form1").pwd.value="";
	}
	if(result=="1"){
		window.location.href="UserMessage.jsp";
	}
}

//设置cookie
function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires="
			+ exp.toGMTString();
}

//获取cookie
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

//删除cookie
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

