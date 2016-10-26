<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>重庆能兴科技发展有限公司</title>
<link rel="stylesheet" type="text/css" href="CSS/main.css" />
<script language="javascript" src="JS/Login&RigisterJS.js"></script>
<script language="javascript" src="JS/AjaxRequest.js"></script>

</head>
<body onload="getCookies()">

	<div id="ly"  class="backgrounddiv"></div>

	<div id="register" class="reigsterdiv">
			<form action="" method="post" class="basic-grey">
			<table align="center" width="450">
				<tr>
					<td align="center" colspan="2">
						<h2>用户注册</h2>
						<hr>
					</td>
				</tr>
				<tr>
					<td align="right">用户名：</td>
					<td><input type="text" id="username" /></td>
				</tr>
				<tr>
					<td align="right">密 码：</td>
					<td><input type="password" id="pwd" /></td>
				</tr>
				<tr>
					<td align="right">确认密码：</td>
					<td><input type="password" id="repwd" /></td>
				</tr>
				<tr>
					<td align="right">真实姓名：</td>
					<td><input type="text" id="name" /></td>
				</tr>
				<tr>
					<td align="right">电话号码：</td>
					<td><input type="text" id="telephone" /></td>
				</tr>
				<tr>
					<td align="center" colspan="2"><input type="button"
						class="myButton" onClick="Regcheck()" value="注册"> <input
						type="button" onClick="Regclose('register','ly')" class="myButton" value="关闭"></td>
				</tr>
			</table>
		</form>
	</div>

	<div id="login" class="logindiv">
		<form name="form1" method="post" action="" id="form1">
			<h2 align="center" class="header">能兴科技财务管理登录系统</h2>
			<hr>
			<div id="loginpicture" class="loginpic">
				<img src="IMAGES/logo.png" />
			</div>
			<div id="loginContent" class="loginpanel" align="center">
				<div style="height: 30px"></div>
				<input type="text" name="username" placeholder="用户名" />
				<div style="height: 20px"></div>
				<input type="password" name="pwd" placeholder="密码"
					onkeydown="if(event.keyCode==13){loginSubmit(this.form)}" />
				<div class="tipsdiv" align="left">
					<input type="checkbox" id="saveuser" value="checkbox">记住用户名
					<div id="errortips" class="errorTipsdiv">
						<a id="errortip" >测试文字</a>
					</div>
				</div>
				<input type="button" class="myButton" value="登录"
					onClick="loginSubmit(this.form)" /> <input type="button"
					class="myButton" value="注册" onclick="Regopen('register','ly')" />
			</div>
		</form>
	</div>
</body>
</html>