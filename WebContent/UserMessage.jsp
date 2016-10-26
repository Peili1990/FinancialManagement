<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css" href="CSS/style.css" />
<link rel="stylesheet" type="text/css" href="CSS/jquery-ui.css" />
<link rel="stylesheet" type="text/css" href="CSS/userInterface.css" />
<script language="javascript" src="JS/UserMessageJS.js"></script>
<script language="javascript" src="JS/AjaxRequest.js"></script>
<script language="javascript" src="JS/DatePicker.js"></script>
<script language="javascript" src="JS/amcharts.js"></script>
<script language="javascript" src="JS/jquery.js"></script>
<script language="javascript" src="JS/jquery-ui.js"></script>
<script language="javascript" src="JS/amcharts.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>重庆能兴科技发展有限公司</title>
</head>
<body onload="getSession()">

	<div id="plumBlossom" class="plumBlossom"></div>

	<div id="header" class="headerdiv">
		<div id="logo" class="logodiv">
			<img src="IMAGES/logo.png">
		</div>
		<div id="btnbox" class="btnboxdiv">
			<a style="width: 52px" onclick="logout()"> <img class="optionaBtn"
				src="IMAGES/exit_btn.png" />
			</a> <a style="width: 122px;" onclick="" id="logBtn"> <img class="optionaBtn"
				src="IMAGES/log_btn.png" />
			</a> <a style="width: 122px" onclick="show_container('staff_info_container')" id="staffBtn"> <img class="optionaBtn"
				src="IMAGES/staff_btn.png" />
			</a> <a style="width: 122px" onclick="show_container('navigation_container')" id="eventBtn"> <img class="optionaBtn"
				src="IMAGES/event_btn.png" />
			</a> <a style="width: 55px" onclick="show_container('welcome_page_container')"> <img class="optionaBtn"
				src="IMAGES/home_btn.png" />
			</a>
		</div>
	</div>

	<div id="welcome_page_container" class="containerdiv">
		<div id="userInfo" class="userInfodiv">
			<a id="welcomeInfo" class="welcomeInfo">欢迎使用能兴科技财务管理系统</a>
			<div id="sessionInfo" class="sessionInfo">
				<a id="Greeting"></a>
				<img class="quickOptionPic" src="IMAGES/quickOption.png"/>
				<div id="quickOptionbox" class="quickOptionboxdiv">
					<input type="button" class="myButton" value="查看个人信息" onclick="show_container('staff_info_container')"/>	
					<input type="button" id="quickOption1" class="myButton" value="添加一个账目" onclick="addData()"/>			
				</div>
			</div>
		</div>	
	</div>
	
	<div id="navigation_container" class="containerdiv">
		<div id="navigation_options" class="navOptiondiv">
			<div id="bankaccount_Btn" class="navOption" style="background:url(IMAGES/bankaccount_icon.png) 100% 100% "
				onclick="prepare_bankaccount_container()"></div>
			<div id="project_Btn" class="navOption" style="background:url(IMAGES/expense_icon.png) 100% 100%"
				onclick="prepare_event_container()"></div>
			<div id="employee_Btn" class="navOption" style="background:url(IMAGES/employee_icon.png) 100% 100%"
				onclick="prepare_employee_container()"></div>
			<div  class="navOption" style="background:url(IMAGES/project_icon.png) 100% 100%"
				onclick="prepare_project_container()"></div>
		</div>
		
	</div>

	<div id="bank_account_container" class="containerdiv">
		<div id="BAmanager" class="searchboxdiv">
			<table>
				<tr>
					<td>
						<div class="styled-select" style="width: 171px; height: 32px">
							<select style="width: 171px; height: 32px"
								id="bankaccount_manager">
								<option value="showOption">请选择账户</option>
							</select>
						</div>
					</td>
					<td><input type="button" class="myButton" value="查看"
						onclick="show_bankaccount()" /></td>
			</table>
		</div>

		<div id="bankaccount_info" align="center" class="bankaccount_infodiv">
			<form class="basic-grey" style="width: 300px; height: 280px">
				<table align="center">
					<tr>
						<td align="center" colspan="2">
							<h2>账户信息</h2>
							<hr>
						</td>
					</tr>
					<tr>
						<td align="right">账户名称：</td>
						<td><a id="bankaccount_name">现金账户</a></td>
					</tr>
					<tr>
						<td align="right">账户余额：</td>
						<td><a id="bankaccount_balance">300</a></td>
					</tr>
					<tr>
						<td align="center" colspan="2"><input type="text"
							id="start_date1" class="classicinput"
							style="float: none; margin-top: 20px;" placeholder="请选择起始日期"
							onfocus="JTC.setday()"></td>
					</tr>
					<tr>
						<td align="center" colspan="2"><input type="text"
							id="end_date1" class="classicinput"
							style="float: none; margin-bottom: 20px" placeholder="请选择结束日期"
							onfocus="JTC.setday()"></td>
					</tr>
					<tr style="height: 50px;">
						<td align="center" colspan="2"><input type="button"
							style="float: none" id="searchBtn" class="myButton" value="查看明细"
							onClick="search_bank_data()" /></td>
					</tr>
				</table>
			</form>
		</div>

		<div id="showdata_BA" class="showdata_BA">
			<table id="data_table_BA" class="altrowstable">
				<tr>
					<th align="center">日期</th>
					<th align="center">摘要</th>
					<th align="center">账户</th>
					<th align="center">收支方式</th>
					<th align="center">借方</th>
					<th align="center">贷方</th>
					<th align="center">余额</th>
				</tr>
			</table>
			
			<table id="data_table_BAaccount" class="altrowstable">
				<tr>
					<th align="center">账户名称</th>
					<th align="center">账户余额</th>
			</table>
		</div>

		<div class="optionsdiv">
			<input type="button" id="printbankTable" disabled="disabled"
				class="myButton" value="打印表格" onClick="printpage('showdata_BA')" />
			<input type="button" 
				class="myButton" value="转账" onClick="transfer()" />
			<input type="button" 
				class="myButton" value="查询总余额" onClick="getIntotal()" />
		</div>

		<div id="transferbox" class="popdiv"
			style="margin: -150px 0 0 -210px; width: 420px; height: 300px;">
			<table style="line-height: 50px">
				<tr>
					<td><a style="float: left;width: 50px">转出</a></td>
					<td>
						<div class="styled-select" style="width: 180px; height: 32px">
							<select style="width: 180px; height: 32px" id="from_account"
								onchange="getBalance(this.value,'from_balance')">
								<option value="showOption">请选择资金转出账户</option>
							</select>
						</div>

					</td>
					<td align="left"><a id="from_balance"
						style="float: left; width: 160px">账户余额：</a></td>
				</tr>
				<tr>
					<td><a style="float: left;width: 50px">转入</a></td>
					<td><div class="styled-select"
							style="width: 180px; height: 32px">
							<select style="width: 180px; height: 32px" id="to_account"
								onchange="getBalance(this.value,'to_balance')">
								<option value="showOption">请选择资金存入账户</option>
							</select>
						</div></td>
					<td align="left"><a id="to_balance"
						style="float: left; width: 160px">账户余额：</a></td>
				</tr>
				<tr>
					<td colspan="3"><a style="float: left">注意：此转账功能仅限公司内部取现及转账</a></td>
				</tr>
				<tr>
					<td colspan="3"><input type="text" id="transfer_amount" 
						class="classicinput" placeholder="请输入转账金额" style="float:none;"></td>
				</tr>
				<tr>
					<td colspan="3" align="center"><input type="button"
						class="myButton" value="转账" onClick="doTransfer()" />
						<input type="button" class="myButton" value="取消"
						onClick="closediv('ly','transferbox')" />
			</table>
		</div>
	</div>

	<div id="event_data_container" class="containerdiv">
		<div id="searchbox" class="searchboxdiv">
			<table>
				<tr>
					<td><input type="text" id="start_date" class="classicinput"
						placeholder="请选择起始日期" onfocus="JTC.setday()"></td>
					<td><div class="styled-select"
							style="width: 171px; height: 32px">
							<select style="width: 171px; height: 32px" id="select1">
								<option value="showOption">请选择人员</option>
							</select>
						</div></td>
					<td>
						<div class="styled-select" style="width: 171px; height: 32px">
							<select style="width: 171px; height: 32px" id="select5">
								<option value="showOption">请选择账户</option>
							</select>
						</div>						
					</td>
					<td>
						<input type="text" id="company_category" class="classicinput"
						placeholder="请输入单位名称" onchange="getProject(this.value)"> 
<!-- 						<div id="project_category" class="styled-select" -->
<!-- 							style="width: 171px; height: 32px"> -->
<!-- 							<select id="select3" onchange="getProject(this.value)" -->
<!-- 								style="width: 171px; height: 32px"> -->
<!-- 								<option value="showOption">请选择单位名称</option> -->
<!-- 							</select> -->
<!-- 						</div>						 -->
					</td>
					<td><div id="project_category" class="styled-select"
							style="width: 171px; height: 32px">
							<select id="select7" style="width: 171px; height: 32px">
								<option value="showOption">请选择项目范畴</option>
								<option value="环保项目">环保项目</option>
								<option value="水处理项目">水处理项目</option>
								<option value="公司总部">公司总部</option>
							</select>
						</div></td>
				</tr>
				<tr>
					<td><input type="text" id="end_date" class="classicinput"
						placeholder="请选择结束日期" onfocus="JTC.setday()"></td>
					<td>
<!-- 						<div class="styled-select" style="width: 171px; height: 32px"> -->
<!-- 							<select id="select2" style="width: 171px; height: 32px"> -->
<!-- 								<option value="showOption">请选择费用名称</option> -->
<!-- 							</select> -->
<!-- 						</div> -->
						<input type="text" id="expense_category" class="classicinput"
						placeholder="请输入费用名称"> 
					</td>
					<td>
						<div class="styled-select" style="width: 171px; height: 32px">
							<select id="select6" style="width: 171px; height: 32px">
								<option value="showOption">请选择收支方式</option>
								<option value="现金">现金</option>
								<option value="转账">转账</option>
								<option value="兑票">兑票</option>
							</select>
						</div>
					</td>
					<td>
						<div id="project_select" class="styled-select"
							style="width: 171px; height: 32px; display: none">
							<select id="select4" style="width: 171px; height: 32px;">
								<option value="showOption">请选择项目名称</option>
							</select>
						</div>
					</td>
					<td>
						<input type="button" id="searchBtn" class="myButton" 
						value="提交" onClick="searchData()" />
						<input type="button" id="clearBtn" class="myButton"
						value="清空" onClick="clearData()" />
					</td>
				</tr>
			</table>
		</div>

		<div id="showdata" class="showdata">
			<table id="data_table" class="altrowstable">
				<tr>
					<th style="display: none">id</th>
					<th align="center" ondblclick="reorder('e.date')">日期</th>
					<th align="center" ondblclick="reorder('e.account')">人员</th>
					<th align="center" ondblclick="reorder('e.project_name')">所属项目</th>
					<th align="center" ondblclick="reorder('e.expense_name')">费用名称</th>
					<th align="center">摘要</th>
					<th align="center">账户</th>
					<th align="center">收支方式</th>
					<th align="center" ondblclick="reorder('e.debit')">借方</th>
					<th align="center" ondblclick="reorder('e.credit')">贷方</th>
					<th style="width: 80px" align="center">备注</th>
				</tr>
			</table>
		</div>

		<div id="options" class="optionsdiv">
			<input type="button" id="updateDataBtn" disabled="disabled"
				class="myButton" value="修改账目" onClick="updateData()" /> <input
				type="button" id="deleteDataBtn" disabled="disabled"
				class="myButton" value="删除账目" onClick="deleteData()" /> <input
				type="button" id="addDataBtn" class="myButton" value="添加账目"
				onClick="addData()" /> <input type="button" id="addExpense_name"
				class="myButton" value="添加费用名称" onClick="addExpense_name()" /> <input
				type="button" id="printTable" disabled="disabled" class="myButton"
				value="打印表格" onClick="printpage('showdata')" /> <input
				type="button" id="financialStaBtn" class="myButton" value="财务统计"
				onClick="show_year_input()" />
		</div>

	</div>

	<div id="updateOrAdd_data_container" class="containerdiv">
		<form id="data_form" class="basic-grey" style="width:800px; height:400px">
			<table align="center" width="700">
				<tr>
					<td align="center" colspan="4">
						<h2 id="form_header">添加账目</h2>
						<hr>
					</td>
				</tr>
				<tr>
					<td align="right">日期：</td>
					<td><input type="text" name="date" onfocus="JTC.setday()"></td>
					<td align="right">人员：</td>
					<td><div class="styled-select" style="width:171px;height:32px">
							<select style="width:171px;height:32px" id="account">
								<option value="showOption" >请选择人员</option>
							</select>
						</div></td>
				</tr>
				<tr>
					<td align="right">项目范畴：</td>
					<td><div class="styled-select" style="width:171px;height:32px">
							<select style="width:171px;height:32px" id="project_cate" onchange="setCompany(this.value)">
								<option value="showOption">请选择项目范畴</option>
								<option value="环保项目">环保项目</option>
								<option value="水处理项目">水处理项目</option>
								<option value="公司总部">公司总部</option>
							</select>
						</div>
					</td>
					<td align="right">所属单位：</td>
					<td>
						<input type="text" id="company" onchange="getProject1(this.value)">
<!-- 						<div class="styled-select" style="width:171px;height:32px"> -->
<!-- 							<select style="width:171px;height:32px" id="company" onchange="getProject1(this.value)"> -->
<!-- 								<option value="showOption" >请选择项目名称</option> -->
<!-- 							</select> -->
<!-- 						</div> -->
					</td>
				</tr>
				<tr>
					<td align="right">所属项目：</td>
					<td><div class="styled-select" style="width:171px;height:32px">
							<select style="width:171px;height:32px" id="project">
								<option value="showOption" >请选择项目名称</option>
							</select>
						</div></td>
					<td align="right">账户：</td>
					<td><div class="styled-select" style="width:171px;height:32px">
							<select style="width:171px;height:32px" id="bankaccount">
								<option value="showOption" >请选择账户</option>							
							</select>
						</div></td>
				</tr>
				<tr>
					<td align="right">费用名称：</td>
					<td>
<!-- 					<div class="styled-select" style="width:171px;height:32px"> -->
<!-- 							<select style="width:171px;height:32px" id="expense_name"> -->
<!-- 								<option value="showOption" >请选择费用名称</option> -->
<!-- 							</select> -->
<!-- 					</div> -->
						<input type="text" id="expense_name">
					</td>
					<td align="right">收支方式：</td>
					<td><div class="styled-select" style="width:171px;height:32px">
							<select style="width:171px;height:32px" id="pay_method">
								<option value="showOption" >请选择收支方式</option>
								<option value="现金">现金</option>
								<option value="转账">转账</option>
								<option value="兑票">兑票</option>
							</select>
						</div></td>
				</tr>
				<tr>
					<td align="right">费用类型：</td>
					<td><input type="radio" name="expense_type" value="debit" />借方
						<input type="radio" name="expense_type" value="credit" />贷方</td>
					<td align="right">费用额度：</td>
					<td><input type="text" name="expense"></td>
					<td><input type="text" name="id" style="display: none" /></td>
				</tr>
				<tr>
					<td align="right">摘要：</td>
					<td colspan="3"><input type="text" style="width:94%" name="description"/></td>
				</tr>
				<tr>
					<td align="right">备注：</td>
					<td><input type="text" name="remark"></td>
					<td align="right"><input type="checkbox" id="ispublic1" value="yes"> 
					<td id="ispublic2">此条账目不公开</td>
				</tr>
				<tr style="height:100px;">
					<td align="center" colspan="4">
						<input type="button"  id="submitDataBtn" 
				   		class="myButton" value="提交" onClick="sumbitform()" />	
				   		<input type="button"  id="resetBtn" 
				   		class="myButton" value="清空" onClick="resetform()" />
				   		<input type="button"  id="returnBtn" 
				   		class="myButton" value="返回" onClick="return_last_container()" />
					</td>	
				</tr>
			</table>		
		</form>
	</div>
	
	<div id="financial_statistics_container" align="center" class="containerdiv">
			<a id="financialOfyear" class="welcomeInfo"
			 style="position:relative;top:50px">2015年财务收支统计</a>
		<div id="categorycond" class="categoryconddiv">
			<div class="styled-select" style="width: 171px; height: 32px;margin-bottom:10px">
				<select style="width: 171px; height: 32px" id="category_project_cate">
					<option value="showOption">请选择项目范畴</option>
					<option value="环保项目">环保项目</option>
					<option value="水处理项目">水处理项目</option>
					<option value="公司总部">公司总部</option>
				</select>
			</div>
<!-- 			<div class="styled-select" style="width: 171px; height: 32px;margin-bottom:10px"> -->
<!-- 				<select style="width: 171px; height: 32px" id="category_company" onchange="getproject2(this.value)"> -->
<!-- 					<option value="showOption">请选择单位名称</option> -->
<!-- 				</select> -->
<!-- 			</div> -->
			<div class="styled-select" style="width: 171px; height: 32px;margin-bottom:10px">
				<input type="text" id="category_company" onchange="getproject2(this.value)" class="classicinput" placeholder="请输入单位名称">
			</div>
			<div class="styled-select" style="width: 171px; height: 32px;margin-bottom:10px">
				<select style="width: 171px; height: 32px" id="category_project">
					<option value="showOption">请选择项目名称</option>
				</select>
			</div>
<!-- 			<div class="styled-select" style="width: 171px; height: 32px;margin-bottom:10px"> -->
<!-- 				<select style="width: 171px; height: 32px" id="category_expense_name"> -->
<!-- 					<option value="showOption">请选择费用名称</option> -->
<!-- 				</select> -->
<!-- 			</div> -->
			<div class="styled-select" style="width: 171px; height: 32px;margin-bottom:10px">
				<input type="text" id="category_expense_name" class="classicinput" placeholder="请输入费用名称">
			</div>
			<div class="styled-select" style="width: 171px; height: 32px;margin-bottom:10px">
				<select style="width: 171px; height: 32px" id="category_month">
					<option value="showOption">请选择月份</option>
					<option value="01月">01月</option>
					<option value="02月">02月</option>
					<option value="03月">03月</option>
					<option value="04月">04月</option>
					<option value="05月">05月</option>
					<option value="06月">06月</option>
					<option value="07月">07月</option>
					<option value="08月">08月</option>
					<option value="09月">09月</option>
					<option value="10月">10月</option>
					<option value="11月">11月</option>
					<option value="12月">12月</option>
				</select>
			</div>
			<div class="styled-select" style="width: 171px; height: 32px;margin-bottom:10px">
				<select style="width: 171px; height: 32px" id="category_account">
					<option value="showOption">请选择人员名字</option>
				</select>
			</div>
			<div class="styled-select" style="width: 171px; height: 32px;margin-bottom:10px">
				<select style="width: 171px; height: 32px" id="category_bankaccount">
					<option value="showOption">请选择账户</option>
				</select>
			</div>
		</div>
		
		<div id="category" class="categorydiv">	
			<ul id="nav" class="navdiv">
				<li><a onClick="DoMenu('ChildMenu1')">按收入</a>
					<ul id="ChildMenu1" class="collapsed">
						<li><a onClick="DoQuery('e.date','sum(e.debit)')">按月份细分</a>
						<li><a onClick="DoQuery('p.category', 'sum(e.debit)')">按项目范畴细分</a>
						<li><a onClick="DoQuery('p.company', 'sum(e.debit)')">按单位细分</a>
						<li><a onClick="DoQuery('p.name', 'sum(e.debit)')">按项目细分</a>
						<li><a onClick="DoQuery('e.expense_name', 'sum(e.debit)')">按费用细分</a>
						<li><a onClick="DoQuery('e.account', 'sum(e.debit)')">按人员细分</a>
					</ul>
				</li>
				<li><a onClick="DoMenu('ChildMenu2')">按支出</a>
					<ul id="ChildMenu2" class="collapsed">
						<li><a onClick="DoQuery('e.date','sum(e.credit)')">按月份细分</a>
						<li><a onClick="DoQuery('p.category', 'sum(e.credit)')">按项目范畴细分</a>
						<li><a onClick="DoQuery('p.company', 'sum(e.credit)')">按单位细分</a>
						<li><a onClick="DoQuery('p.name', 'sum(e.credit)')">按项目细分</a>
						<li><a onClick="DoQuery('e.expense_name', 'sum(e.credit)')">按费用细分</a>
			 			<li><a onClick="DoQuery('e.account', 'sum(e.credit)')">按人员细分</a>
					</ul>
				</li>
			</ul>
			
			<div style="position:absolute;bottom:20px">
				<input type="button"  id="returnBtn" 
				   		class="myButton" value="清空" onClick="reset_category_box()" />
				<input type="button"  id="returnBtn"  
				   		class="myButton" value="返回" onClick="return_last_container()" />
			</div>	
		</div>
		<div id="graphic" align="center" class="graphicdiv"></div>	
	</div>
	
	<div id="employee_container" class="containerdiv">
		
		<div id="emp_optiondiv" class="optionsdiv">
			<input type="button"
					class="myButton" value="添加费用" onClick="addSubfee()" />
			<input type="button"
					class="myButton" value="删除费用" onClick="deleteSubfee()" />
			<input type="button"  
				   	class="myButton" value="添加人员" onClick="addEmployee()" />
			<input type="button"
					class="myButton" value="删除人员" onClick="deleteEmployee()" />
			<input type="button" id="changeValueBtn"
					class="myButton" value="修改数据" onClick="changeValue()" />
			<input type="button"
					class="myButton" value="打印表格" onClick="printpage('showdata_E')" />
			<input type="button"
					class="myButton" value="发放工资" onClick="payoff()" />			
		</div>
		
		<div id="emp_optiondiv_H" class="optionsdiv" style="display:none">
			<input type="button"
					class="myButton" value="打印表格" onClick="printpage('showdata_HE')" />
			<input type="button"
					class="myButton" value="返回" onClick="show_cur_data()" />		
		</div>
		
		<div id="showdata_E" class="showdata">
			<table id="employee_table" class="altrowstable" > 
			
			</table>
		</div>
		
		<div id="showdata_HE" class="showdata">
			<table id="employee_table" class="altrowstable" > 
			
			</table>
		</div>
		
		<div class="searchboxdiv">
			<table>
				<tr>
					<td>
						<div class="styled-select"
							style="width: 171px; height: 32px;">
							<select style="width: 171px; height: 32px" id="search_historic" >
								<option value="showOption">请选择历史表格</option>
							</select>
						</div>
					</td>
					<td>
						<input type="button" class="myButton" value="查看"
						onclick="show_historic_table()" />
					</td>
				</tr>
			</table>
		</div>
	</div>
	
	<div id="project_data_container" class="containerdiv">
		
		<div class="searchboxdiv">
			<table>
				<tr>
					<td>
						<input type="text" id="search_project_start_date" onfocus="JTC.setday()"
							class="classicinput" placeholder="请选择开始日期">
					</td>
					<td>
<!-- 						<div class="styled-select" -->
<!-- 							style="width: 171px; height: 32px;"> -->
<!-- 							<select style="width: 171px; height: 32px" -->
<!-- 								id="search_project_company" onchange="get_search_project(this.value)"> -->
<!-- 								<option value="showOption">请选择单位名称</option> -->
<!-- 								<option value="环保项目">环保项目</option> -->
<!-- 								<option value="水处理项目">水处理项目</option> -->
<!-- 							</select> -->
<!-- 						</div> -->
						<input type="text" id="search_project_company" onchange="get_search_project(this.value)"
							class="classicinput" placeholder="请输入单位名称">
					</td>
					<td>
						<div class="styled-select"
							style="width: 171px; height: 32px;">
							<select style="width: 171px; height: 32px" id="search_project_agent">
								<option value="showOption">请选择人员</option>
							</select>
						</div>
					</td>
					<td>
						<input type="button" class="myButton" value="查看应付明细" 
							onclick="show_totalbalance('first_party')" />
					</td>
					<td>
						<input type="button" class="myButton" value="清空" 
							onclick="clearProjectSearch()" />
					</td>
				</tr>
				<tr>
				<td>
					<input type="text" id="search_project_end_date" onfocus="JTC.setday()"
							class="classicinput" placeholder="请选择结束日期">
					</td>
					<td>
						<div class="styled-select" style="width: 171px; height: 32px;">
							<select style="width: 171px; height: 32px" id="search_project"
								disabled="disabled">
								<option value="showOption">请选择项目名称</option>
							</select>
						</div>
					</td>
					<td>
						<div class="styled-select"
							style="width: 171px; height: 32px;">
							<select style="width: 171px; height: 32px"
								id="search_project_category" onchange="get_search_project(this.value)">
								<option value="showOption">请选择项目范畴</option>
								<option value="环保项目">环保项目</option>
								<option value="水处理项目">水处理项目</option>
							</select>
						</div>
					</td>
					<td>
						<input type="button" class="myButton" value="查看应收明细" 	
							onclick="show_totalbalance('second_party')" />
					</td>
				</tr>
			</table>
		</div>
			
		
		<div class="optionsdiv">
			<input type="button"  id="addProject" 
				   	class="myButton" value="添加项目" onClick="addProject()" />
			<input type="button"  id="updateProject"  disabled="disabled"
				   	class="myButton" value="修改项目" onClick="updateProject()" />
		    <input type="button"  id="deleteProject"  disabled="disabled"
				   	class="myButton" value="删除项目" onClick="deleteProject()" />
			<input type="button"  id="addCompany"  
				   	class="myButton" value="添加单位" onClick="addCompany()" />
			<input type="button"  id="printProjectTable" disabled="disabled" 
				   	class="myButton" value="打印表格" onClick="printpage('showdata_P')" />
			<input type="button"  id="returnLastTable" disabled="disabled"
				   	class="myButton" value="返回" onClick="returnLastTable()" />
		</div>
		
		<div id="project_info" align="center" class="bankaccount_infodiv">
			<form class="basic-grey" style="width: 300px; min-height: 220px">
				<table align="center" style="line-height:25px">
					<tr>
						<td align="center" colspan="2">
							<h2>项目信息</h2>
							<hr>
						</td>
					</tr>
					<tr>
						<td style="display:none" id="project_id" ></td>
						<td align="right">项目名称：</td>
						<td><a id="project_name">现金账户</a></td>
					</tr>
					<tr>
						<td align="right">日期：</td>
						<td><a id="project_date"></a></td>
					</tr>
					<tr>
						<td align="right">经办人：</td>
						<td><a id="project_agent"></a></td>
					</tr>
					<tr>
						<td align="right">项目期初：</td>
						<td><a id="project_fund"></a></td>
					</tr>
					<tr>
						<td align="right" id="show_project_type">项目名称：</td>
						<td><a id="project_balance">现金账户</a></td>
					</tr>
					<tr>
						<td align="right"><input type="checkbox" id="project_isinvoiced" value="yes"
						 onchange="set_project_invoiced()"></td>
						<td align="left">该项目已开具发票</td>
					</tr>
					<tr align="center">
						<td colspan="2"><input type="button" class="myButton" value="查看明细" 
						style="float:none" onclick="show_projectevent()" >
						<input type="button" class="myButton" value="追开发票" 
						style="float:none" onclick="addDebit()" ></td>
					</tr>
				</table>
			</form>
		</div>
		
		<div id="showdata_P" class="showdata_BA">
			<table id="data_table_P" class="altrowstable">
				<tr>
					<th align="center">日期</th>
					<th align="center">摘要</th>
					<th align="center">项目名称</th>
					<th align="center">借方</th>
					<th align="center">贷方</th>
					<th align="center">余额</th>
				</tr>
			</table>
			
			<table id="data_table_Project" class="altrowstable">
				<tr>
					<th align="center">日期</th>
					<th align="center">单位名称</th>
					<th align="center">项目名称</th>
					<th align="center" >经办人</th>
					<th align="center">项目期初</th>
					<th align="center" id="amount_type">账户余额</th>
					<th align="center" >备注</th>
			</table>
		</div>

		<div id="add_Project_box" class="popdiv"
			style="margin: -210px 0 0 -190px; width: 380px; height: 420px;">
			<form id="project_form" class="basic-grey" style="top:0px;margin:0;width:320px;">
			<table id="project_table" style="line-height:30px;">
				<tr>
					<td align="right">日期：</td>
					<td><input type="text" name="date" onfocus="JTC.setday()"></td>
				<tr>
					<td align="right">项目范畴：</td>
					<td>
						<div class="styled-select"
							style="width: 171px; height: 32px;">
							<select style="width: 171px; height: 32px"
								id="add_project_category">
								<option value="showOption">请选择项目范畴</option>
								<option value="环保项目">环保项目</option>
								<option value="水处理项目">水处理项目</option>
							</select>
						</div>
					</td>
				</tr>
				<tr>
					<td align="right">单位名称：</td>
					<td>
						<input id="add_project_company" type="text" >
<!-- 						<div class="styled-select" -->
<!-- 							style="width: 171px; height: 32px;"> -->
<!-- 							<select style="width: 171px; height: 32px" -->
<!-- 								id="add_project_company"> -->
<!-- 								<option value="showOption">请选择单位名称</option> -->
<!-- 							</select> -->
<!-- 						</div> -->
					</td>
				</tr>
				<tr>
					<td align="right">项目名称：</td>
					<td><input name="name" type="text" ></td>
				</tr>
				<tr>
					<td align="right">项目类型：</td>
					<td><input type="radio" name="project_type"
						value="second_party" id="second_party">客户单位 <input type="radio"
						name="project_type" value="first_party" id="first_party">供应商/外协单位</td>
				</tr>
				<tr>
					<td align="right">经办人：</td>
					<td><div class="styled-select"
							style="width: 171px; height: 32px;">
							<select style="width: 171px; height: 32px" id="add_agent">
								<option value="showOption">请选择经办人</option>
							</select>
						</div>
				</tr>	
				<tr>
					<td align="right">项目期初：</td>
					<td>
						<input name="fund" type="text">
					</td>
				</tr>
				<tr>
					<td align="right">备注：</td>
					<td>
						<input name="remark" type="text">
					</td>
				</tr>
				<tr>
					<td align="right"><input type="checkbox" id="isinvoiced" value="yes"></td>
					<td align="left">此项目已开具发票</td>
					
				</tr>
				<tr>
					<td colspan="2" align="center"><input type="button"
						class="myButton" value="确定" onClick="sumbit_project()" /> <input
						type="button" class="myButton" value="取消"
						onClick="closediv('ly','add_Project_box')" />
						<input name="id" type="text" style="display:none"></td>
				</tr>
				</table>
				</form>
		</div>
	</div>
	
	<div id="staff_info_container" class="containerdiv">
		<div class="optionsdiv">
			<input type="button"  id="showPersonalInfoBtn" 
				   		class="myButton" value="修改个人信息" onClick="show_personal_info()" /> 
			<input type="button"  id="showAllStaffInfoBtn" 
				   		class="myButton" value="查看所有人信息" onClick="" />	   		
		</div>
		
		<div id="personalInfo" style="display:none">
			<form id="staff_form" class="basic-grey" style="width:450px;height:300px">
			<table align="center" style="line-height:40px;">
				<tr>
					<td align="right">姓名：</td>
					<td><a id="staff_name"></a></td>
				</tr>
				<tr>
					<td align="right">用户名： </td>
					<td><a id="username"></a></td>
				</tr>
				<tr>
					<td align="right">电话号码：</td>
					<td><input type="text" class="classicinput" name="telephone"></td>
				</tr>
				<tr>
					<td align="right">原密码：</td>
					<td><input type="password" class="classicinput" name="originalpwd"></td>
				</tr>
				<tr>
					<td align="right">新密码：</td>
					<td><input type="password" class="classicinput" name="newpwd"></td>
				</tr>
				<tr>
					<td align="right">确认密码：</td>
					<td><input type="password" class="classicinput" name="renewpwd"></td>
				</tr>
				<tr>
					<td colspan="2" align="center">
					<input type="button" class="myButton" value="修改" onclick="change_pwd()">
					<input type="button" class="myButton" value="取消" onclick="cancel_change_pwd()"></td>
					
				</tr>
			</table>
			</form>
		</div>
	</div>

	<div id="ly"  class="backgrounddiv"></div>
	
</body>
</html>