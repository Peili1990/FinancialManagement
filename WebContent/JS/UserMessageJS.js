/**
 * 
 */
var session;
var cur_active_container;
var last_container;
var LastLeftID;
var chooseRow=0;
var chooseX=0;
var chooseY=0;
var select_options;
var bankaccount_info;
var sql;
var year;

//初次登陆获取Session
function getSession(){
	var loader=new net.AjaxRequest("UserServlet?action=getSession&nocache="+new Date().getTime(),
			deal_getSession,onerror,"GET");
}
//getSession的回调函数
function deal_getSession(){
	result=this.req.responseText;
	if(result==""){
		alert("您还未登录，将会跳转至登录界面！");
		window.location.href="Login&Rigister.jsp";
	}
	else{
		session=eval("("+result+")");
		cur_active_container="welcome_page_container";
		adjustContainerHeight();
		document.getElementById("welcome_page_container").style.display="block";
		authority = session[0].staff.authority;
		set_pageByAuthority(authority);
		name=result.substr(1);
		document.getElementById("Greeting").innerHTML=getGreet()+session[0].staff.name;	
		getSelectOption();
	}
}
//根据权限设置页面
function set_pageByAuthority(authority){
	switch(authority){
	case 1:document.getElementById("quickOption1").style.display="none";
	case 2:document.getElementById("eventBtn").style.display="none";
		   document.getElementById("staffBtn").style.display="none";
		   document.getElementById("logBtn").style.display="none";
		   document.getElementById("quickOption2").style.display="none";
		   document.getElementById("quickOption3").style.display="none";
		   document.getElementById("quickOption4").style.display="none";
	case 3:document.getElementById("ispublic1").style.display="none";
		   document.getElementById("ispublic2").style.display="none";	
		   document.getElementById("bankaccount_Btn").onclick="";
		   document.getElementById("project_Btn").onclick="";
		   document.getElementById("employee_Btn").onclick="";
	case 4:
	}
}

//调整页面主容器高度
function adjustContainerHeight(){
	document.getElementById(cur_active_container).style.height=document.body.clientHeight-80+"px";
}
//设置欢迎语
function getGreet(){
	var myHour = new Date().getHours();
	if(myHour >= 7 && myHour < 11) return "上午好，";
	if(myHour >= 11 && myHour < 14) return "中午好，";
	if(myHour >= 14 && myHour < 18) return "下午好，";
	if(myHour >= 18 && myHour < 22) return "晚上好，";
	if(myHour >= 22 || myHour < 5) return "夜深了，";
	return "清晨早，";
}
//容器切换
function show_container(divID){
	last_container=cur_active_container;
	document.getElementById(cur_active_container).style.display="none";
	cur_active_container=divID;
	adjustContainerHeight();
	document.getElementById(cur_active_container).style.display="block";
}
//返回上一个容器
function return_last_container(){
	resetform();
	show_container(last_container);
}

//弹出div
function popdiv(backdiv_ID,divID){
	backdivID=document.getElementById(backdiv_ID);
	backdivID.style.display="block"; 
	backdivID.style.width=document.body.clientWidth+"px"; 
	backdivID.style.height=document.documentElement.clientHeight+"px"; 
	document.getElementById(divID).style.display="block";
	
}
//div弹层消失
function closediv(backdiv_ID,divID){
	document.getElementById(backdiv_ID).style.display="none";
	document.getElementById(divID).style.display="none";
}

//登出
function logout(){
	var loader=new net.AjaxRequest("UserServlet?action=logout&nocache="+new Date().getTime(),
			deal_logout,onerror,"GET");
}

//登出回调函数
function deal_logout(){
	alert("登出成功！");
	window.location.href="Login&Rigister.jsp";
}

//设置日期选择默认值
function setDefaultStartDate(inputID){
	cur_year=new Date().getFullYear();
	input=document.getElementById(inputID).value=cur_year+"-01-01";
}

//银行账户管理页面初始化
function prepare_bankaccount_container(){
	fill_selectOption("bankaccount_manager","bank_account");
	document.getElementById("bankaccount_info").style.display="none";
	document.getElementById("data_table_BA").style.display="none";
	document.getElementById("data_table_BAaccount").style.display="none";
	show_container("bank_account_container");
	document.getElementById("printbankTable").disabled="disabled";
}
//显示银行信息
function show_bankaccount(){
	bankaccount_name=document.getElementById("bankaccount_manager").value;
	if(bankaccount_name!="showOption"){
		param="name="+bankaccount_name;
		loader=new net.AjaxRequest("BankaccountServlet?action=getBankaccountInfo&nocache="+new Date().getTime(),
				deal_show_bankaccount,onerror,"POST",param);
	}
}

//显示银行信息回调函数
function deal_show_bankaccount(){
	result=this.req.responseText;
	bankaccount_info=eval("("+result+")");
	document.getElementById("bankaccount_name").innerHTML=bankaccount_info[0].bankaccount.name;
	document.getElementById("bankaccount_balance").innerHTML=fmoney(bankaccount_info[0].bankaccount.balance,2)
	document.getElementById("bankaccount_info").style.display="block";
	document.getElementById("data_table_BA").style.display="none";
	setDefaultStartDate("start_date1");
}

//金额格式化
function fmoney(s, n) {
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r;
} 
//格式化还原
function rmoney(s)   
{   
   return parseFloat(s.replace(/[^\d\.-]/g, ""));   
} 

//转账
function transfer(){
	fill_selectOption("from_account","bank_account");
	fill_selectOption("to_account","bank_account");
	document.getElementById("transfer_amount").value="";
	document.getElementById("from_balance").innerHTML="账户余额：";
	document.getElementById("to_balance").innerHTML="账户余额：";
	popdiv("ly","transferbox");
}

//获取余额
function getBalance(bank_account,labelID){
	if(bank_account=="showOption"){
		document.getElementById(labelID).innerHTML="账户余额：";
		return;
	}
	param="name="+bank_account+"&labelID="+labelID;
	loader=new net.AjaxRequest("BankaccountServlet?action=getBalance&nocache="+new Date().getTime(),
			deal_getBalance,onerror,"POST",param);
}

//获取余额回调函数
function deal_getBalance(){
	result=this.req.responseText;
	data=eval("("+result+")");
	document.getElementById(data[0].labelID).innerHTML="账户余额："+data[0].balance;
}

//银行数据查询
function search_bank_data(){
	sql = "select b.* from Bankaccountevent b where b.bank_account='"+bankaccount_info[0].bankaccount.name+"'";
	condOfStart_date=document.getElementById("start_date1").value;
	condOfEnd_date=document.getElementById("end_date1").value;
	param="name="+bankaccount_info[0].bankaccount.name;
	if(condOfStart_date!="") {
		sql+=" and b.date>='"+condOfStart_date+"'";
		param+="&start_date="+condOfStart_date;
	}
	if(condOfEnd_date!=""){
		if(condOfStart_date!=""&&!date_compare(start_date,end_date)){
			alert("起始日期不能在结束日期之后!");
			return;
		}
		sql+=" and b.date<='"+condOfEnd_date+"'";
	}
	sql+=" order by b.date;"
	param+="&sql="+sql;
	var loader=new net.AjaxRequest("BankaccountServlet?action=searchBAEvents&nocache="+new Date().getTime(),
			deal_search_bank_data,onerror,"POST",param);
}

//银行数据查询回调函数
function deal_search_bank_data(){
	data = this.req.responseText;
	var debit_intotal=0,credit_intotal=0;
	BAevents = eval("(" + data + ")");
	balance=BAevents[0].balance;
	tb = document.getElementById("data_table_BA");	
	for(var i=tb.rows.length-1;i>=1;i--)
    {
        tb.deleteRow(i);
    }
	if(BAevents[0].BAevent.length==0){
		tb.style.display = "none";
		alert("未查询到任何账目！");
		return;
	}
	document.getElementById("data_table_BAaccount").style.display="none";
	tb.style.display = "block";
	document.getElementById("showdata_BA").style.height=document.body.clientHeight-300+"px";
	for (var i = 0; i < BAevents[0].BAevent.length; i++) {
		newRow = tb.insertRow();
		if(i%2==0){
			newRow.className="evenrowcolor";
		}
		else{
			newRow.className="oddrowcolor";
		}
		newCell1 = newRow.insertCell();
		newCell1.innerHTML = BAevents[0].BAevent[i].date;
		newCell2 = newRow.insertCell();
		newCell2.innerHTML = BAevents[0].BAevent[i].description;
		newCell3 = newRow.insertCell();
		newCell3.innerHTML = BAevents[0].BAevent[i].bank_account;
		newCell4 = newRow.insertCell();
		newCell4.innerHTML = BAevents[0].BAevent[i].pay_method;
		newCell5 = newRow.insertCell();
		newCell6 = newRow.insertCell();
		newCell7 = newRow.insertCell(); 
		balance=parseFloat(balance)-parseFloat(BAevents[0].BAevent[i].credit)+parseFloat(BAevents[0].BAevent[i].debit);;
		newCell7.innerHTML=fmoney(balance,2);
		if (BAevents[0].BAevent[i].debit != 0) {
			newCell5.innerHTML = BAevents[0].BAevent[i].debit;
			debit_intotal+=parseFloat(BAevents[0].BAevent[i].debit);
		}
		else {
			newCell6.innerHTML = BAevents[0].BAevent[i].credit;
			credit_intotal+=parseFloat(BAevents[0].BAevent[i].credit);
		}
	}
	newRow = tb.insertRow();
	newRow.style.backgroundColor="#9fe6c5";
	for(var i=0;i<3;i++){
		newCell=newRow.insertCell();
	}
	newCell1=newRow.insertCell()
	newCell1.innerHTML = "总计";
	newCell2=newRow.insertCell()
	newCell2.innerHTML =fmoney(debit_intotal,2);
	newCell3=newRow.insertCell()
	newCell3.innerHTML =fmoney(credit_intotal,2);
	newCell4=newRow.insertCell()
	document.getElementById("printbankTable").disabled="";
}

//账户转账
function doTransfer(){
	from_account=document.getElementById("from_account").value;
	to_account=document.getElementById("to_account").value;
	transfer_amount=document.getElementById("transfer_amount").value;
	if(from_account=="showOption"){
		alert("请选择转出账户！");
		return;
	}
	if(to_account=="showOption"){
		alert("请选择转入账户！");
		return;
	}
	if(from_account==to_account){
		alert("转出和转入账户不能相同！");
		return;
	}
	if(transfer_amount==""){
		alert("请输入转账金额！");
		return;
	}
	if(parseFloat(transfer_amount)>parseFloat(document.getElementById("from_balance").innerHTML.replace(/[^0-9.]/ig,""))){
		alert("转账金额大于转出账户余额！");
		return;
	}
	param="from_account="+from_account+"&to_account="+to_account+"&transfer_amount="+transfer_amount;
	loader=new net.AjaxRequest("BankaccountServlet?action=doTransfer&nocache="+new Date().getTime(),
			deal_doTransfer,onerror,"POST",param);
}

//账户转账回调函数
function deal_doTransfer(){
	result=this.req.responseText;
	if(result=="1"){
		alert("转账成功！");
		closediv("ly","transferbox");
	}
	else{
		alert("转账失败，请重试！");
	}
}

//查询总额
function getIntotal(){
	loader=new net.AjaxRequest("BankaccountServlet?action=getIntotal&nocache="+new Date().getTime(),
			deal_getIntotal,onerror,"GET");
}

//查询总额回调函数
function deal_getIntotal(){
	result=this.req.responseText;
	var amount_intotal=0;
	BAaccounts=eval("("+result+")");
	document.getElementById("data_table_BA").style.display="none";
	tb=document.getElementById("data_table_BAaccount");
	tb.style.display="block";
	for(var i=tb.rows.length-1;i>=1;i--)
    {
        tb.deleteRow(i);
    }
	for(var i=0;i<BAaccounts[0].BAaccount.length;i++){
		newRow=tb.insertRow();
		newCell1 = newRow.insertCell();
		newCell1.innerHTML= BAaccounts[0].BAaccount[i].name;
		newCell2 = newRow.insertCell();
		newCell2.innerHTML= fmoney(BAaccounts[0].BAaccount[i].balance,2);
		amount_intotal+=parseFloat(BAaccounts[0].BAaccount[i].balance);
	}
	newRow=tb.insertRow();
	newCell1 = newRow.insertCell();
	newCell1.innerHTML ="总计";
	newCell2 = newRow.insertCell();
	newCell2.innerHTML =fmoney(amount_intotal,2);
}

//数据查询页面初始化
function prepare_event_container(){
	tb = document.getElementById("data_table");
	$("#company_category").autocomplete({
      source: select_options[0].Company,
      select: function(event, ui){
    	  getProject(ui.item.value);
      }
    });
	$("#expense_category").autocomplete({
	      source: select_options[0].Expense,
	    });
	//fill_selectOption("select3","company");
	fill_selectOption("select1","account");
	//fill_selectOption("select2","expense_name");
	fill_selectOption("select5","bank_account");
	for(var i=tb.rows.length-1;i>=1;i--)
	    {
	        tb.deleteRow(i);
	    }
	tb.style.display="none";
	document.getElementById("printTable").disabled="disabled";
	clearData();
	setDefaultStartDate("start_date");
	show_container("event_data_container");
}

//获取项目
function getProject(company){
	if(company==""){
		document.getElementById("project_select").style.display="none";
		document.getElementById("select4").value="showOption";
		return;
	}
	param="company="+company;
	loader=new net.AjaxRequest("ProjectServlet?action=getProjectByCompany&nocache="+new Date().getTime(),
			deal_getProject,onerror,"POST",param);
}

//获取项目回调函数
function deal_getProject(){
	result=this.req.responseText;
	data=eval("("+result+")");
	document.getElementById("project_select").style.display="block";
	select=document.getElementById("select4");
	select.innerHTML="";
	select.add(new Option("请选择项目名称","showOption"));
	for(i=0;i<data[0].project.length;i++){
		select.add(new Option(data[0].project[i].name,data[0].project[i].id));
	}
}
//获取费用名称
function getSelectOption(){
	loader=new net.AjaxRequest("EventServlet?action=getSelectOption&nocache="+new Date().getTime(),
			deal_getSelectOption,onerror,"GET");
}

//获取费用回调函数
function deal_getSelectOption(){
	result=this.req.responseText;
	select_options=eval(result);
}

//添加费用名称
function fill_selectOption(select_id,type){
	if (type == "company") {
		selectID = document.getElementById(select_id);
		selectID.innerHTML = "";
		selectID.add(new Option("请选择单位名称", "showOption"));
		for (i = 0; i < select_options[0].Company.length; i++) {
			selectID.add(new Option(select_options[0].Company[i],
					select_options[0].Company[i]));
		}
	}
	if (type == "expense_name") {
		selectID = document.getElementById(select_id);
		selectID.innerHTML = "";
		selectID.add(new Option("请选择费用名称", "showOption"));
		for (i = 0; i < select_options[0].Expense.length; i++) {
			selectID.add(new Option(select_options[0].Expense[i],
					select_options[0].Expense[i]));
		}
	}
	if (type == "account") {
		selectID = document.getElementById(select_id);
		selectID.innerHTML = "";
		selectID.add(new Option("请选择人员", "showOption"));
		for (i = 0; i < select_options[0].Employee.length; i++) {
			selectID.add(new Option(select_options[0].Employee[i],
					select_options[0].Employee[i]));
		}
	}
	if (type == "bank_account") {
		selectID = document.getElementById(select_id);
		selectID.innerHTML = "";
		selectID.add(new Option("请选择账户", "showOption"));
		for (i = 0; i < select_options[0].Bankaccount.length; i++) {
			selectID.add(new Option(select_options[0].Bankaccount[i],
					select_options[0].Bankaccount[i]));
		}
	}
}

//数据查询
function searchData(){
	sql = "select e.*,p.name as project_name from Event e, Project p where e.project_id=p.id";
	condOfStart_date=document.getElementById("start_date").value;
	condOfEnd_date=document.getElementById("end_date").value;
	condOfAccount=document.getElementById("select1").value;
	condOfExpense_name=document.getElementById("expense_category").value;
	condOfCompany=document.getElementById("company_category").value;
	condOfProject=document.getElementById("select4").value;
	condOfBankAccount=document.getElementById("select5").value;
	condOfPay_method=document.getElementById("select6").value;
	condOfProjectCate=document.getElementById("select7").value;
	if(condOfStart_date!="") {
		sql+=" and e.date>='"+condOfStart_date+"'";
	}
	if(condOfEnd_date!=""){
		if(condOfStart_date!=""&&!date_compare(start_date,end_date)){
			alert("起始日期不能在结束日期之后!");
			return;
		}
		sql+=" and e.date<='"+condOfEnd_date+"'";
	}
	if(condOfAccount!="showOption"){
		sql +=" and e.account='"+condOfAccount+"'";
	}
	if(condOfExpense_name!="") {
		sql +=" and e.expense_name='"+condOfExpense_name+"'";
	}
	if(condOfCompany != "") {
		sql +=" and p.company='"+condOfCompany+"'";
	}
	if(condOfProjectCate != "showOption") {
		sql +=" and p.category='"+condOfProjectCate+"'";
	}
	if(condOfProject !="showOption") {
		sql +=" and e.project_id="+condOfProject;
	}
	if(condOfBankAccount !="showOption"){
		sql +=" and e.bank_account='"+condOfBankAccount+"'";
	}
	if(condOfPay_method !="showOption") {
		sql +=" and e.pay_method='"+condOfPay_method+"'";
	}
	if(session[0].staff.authority<4){
		sql +=" and e.ispublic=0";
	}
	param="sql="+sql;
		var loader=new net.AjaxRequest("EventServlet?action=searchEvents&nocache="+new Date().getTime(),
				deal_searchData,onerror,"POST",param);
}
//日期比较
function date_compare(date1,date2){
	if(new Date(date1).getTime()>new Date(date2).getTime())
		return false;
	else 
		return true;
}

//数据查询的回调函数
function deal_searchData(){
	data = this.req.responseText;
	var debit_intotal=0,credit_intotal=0;
	events = eval("(" + data + ")");
	tb = document.getElementById("data_table");	
	set_update_disabled();
	chooseRow=0;
	for(var i=tb.rows.length-1;i>=1;i--)
	    {
	        tb.deleteRow(i);
	    }
	if(events[0].categorys.length==0){
		tb.style.display = "none";
		alert("未查询到任何账目！");
		return;
	}
	tb.style.display = "block";
	document.getElementById("showdata").style.height=document.body.clientHeight-300+"px";	
	for (var i = 0; i < events[0].categorys.length; i++) {
		newRow = tb.insertRow();
		newRow.onclick = function() {
			click_color(this)
		};
		if(i%2==0){
			newRow.className="evenrowcolor";
		}
		else{
			newRow.className="oddrowcolor";
		}
		newCell1 = newRow.insertCell();
		newCell1.innerHTML = events[0].categorys[i].id;
		newCell1.style.display = "none";	
		newCell2 = newRow.insertCell();
		newCell2.innerHTML = events[0].categorys[i].date;
		newCell3 = newRow.insertCell();
		newCell3.innerHTML = events[0].categorys[i].account;
		newCell4 = newRow.insertCell();
		newCell4.innerHTML = events[0].categorys[i].project_name;
		newCell5 = newRow.insertCell();
		newCell5.innerHTML = events[0].categorys[i].expense_name;
		newCell6 = newRow.insertCell();
		newCell6.innerHTML = events[0].categorys[i].description;
		newCell7 = newRow.insertCell();
		newCell7.innerHTML = events[0].categorys[i].bank_account;
		newCell8 = newRow.insertCell();
		newCell8.innerHTML = events[0].categorys[i].pay_method;
		newCell9 = newRow.insertCell();
		if (events[0].categorys[i].debit != 0) {
			newCell9.innerHTML = events[0].categorys[i].debit;
			debit_intotal+=parseFloat(events[0].categorys[i].debit);
		}
		newCell10 = newRow.insertCell();
		if (events[0].categorys[i].credit != 0) {
			newCell10.innerHTML = events[0].categorys[i].credit;
			credit_intotal+=parseFloat(events[0].categorys[i].credit);
		}
		newCell11 = newRow.insertCell();
		newCell11.innerHTML = events[0].categorys[i].remark;
		newCell12 = newRow.insertCell();
		newCell12.innerHTML = events[0].categorys[i].ispublic;
		newCell12.style.display = "none";
		newCell13 = newRow.insertCell();
		newCell13.innerHTML = events[0].categorys[i].project_id;
		newCell13.style.display = "none";
	}
	newRow = tb.insertRow();
	newRow.style.backgroundColor="#9fe6c5";
	for(var i=0;i<6;i++){
		newCell=newRow.insertCell();
	}
	newCell1=newRow.insertCell()
	newCell1.innerHTML = "总计";
	newCell2=newRow.insertCell()
	newCell2.innerHTML =fmoney(debit_intotal,2);
	newCell3=newRow.insertCell()
	newCell3.innerHTML =fmoney(credit_intotal,2);
	newCell4=newRow.insertCell()
	document.getElementById("printTable").disabled="";
}
//打印表格
function printpage(div){  
    var newstr = document.getElementById(div).innerHTML;
    var oldstr = document.body.innerHTML; 
    document.body.innerHTML = newstr; 
    window.print(); 
    document.body.innerHTML = oldstr; 
    } 

//查询数据重新排序
function reorder(orderBy){
	param="sql="+sql+"&orderBy="+orderBy;
	var loader=new net.AjaxRequest("EventServlet?action=searchEvents&nocache="+new Date().getTime(),
			deal_searchData,onerror,"POST",param);
}
//清空数据
function clearData(){
	document.getElementById("start_date").value="";
	document.getElementById("end_date").value="";
	document.getElementById("select1").value="showOption";
	//document.getElementById("select2").value="showOption";
	document.getElementById("company_category").value="";
	document.getElementById("expense_category").value="";
	//document.getElementById("select3").value="showOption";
	document.getElementById("select4").value="showOption";
	document.getElementById("select5").value="showOption";
	document.getElementById("select6").value="showOption";
	document.getElementById("select7").value="showOption";
	document.getElementById("project_select").style.display="none";
}

//点击表格行变色
function click_color(obj){
    var tb=obj.parentNode;//获得父节点对象
    if(chooseRow!=0){
        var lastObj=tb.rows[chooseRow];
        lastObj.style.backgroundColor="";
    }
    chooseRow=obj.rowIndex;//获得当前行在表格中的序数
    obj.style.backgroundColor="#2fa719";   
    set_update_enabled();
}
//设置删改功能可用
function set_update_enabled(){
	document.getElementById("updateDataBtn").disabled="";
	document.getElementById("deleteDataBtn").disabled="";
}
//设置删改功能不可用
function set_update_disabled(){
	document.getElementById("updateDataBtn").disabled="disabled";
	document.getElementById("deleteDataBtn").disabled="disabled";
}

//添加数据
function addData(){
	resetform();
	show_container("updateOrAdd_data_container");
	document.getElementById("form_header").innerHTML="添加账目";
	document.getElementById("resetBtn").disabled="";
	document.getElementById("company").disabled="disabled";
	document.getElementById("project").disabled="disalbed";
	fill_selectOption("account","account");
	//fill_selectOption("expense_name","expense_name");
	fill_selectOption("bankaccount","bank_account");
	$("#company").autocomplete({
	      source: select_options[0].Company,
	      select: function(event, ui){
	    	  getProject1(ui.item.value);
	      }
	});
	$("#expense_name").autocomplete({
	      source: select_options[0].Expense,
	});
	//fill_selectOption("company","company");
}

//清空表单
function resetform(){
	document.getElementById("data_form").reset();
}

//设置公司选项状态
function setCompany(expense_cate){
	if(expense_cate=="showOption"||expense_cate=="公司总部"){
		document.getElementById("company").disabled="disabled";
		document.getElementById("project").disabled="disabled";
		document.getElementById("company").value="";
		document.getElementById("project").value="showOption";
	}
	else{
		document.getElementById("company").disabled="";
	}
}

//获取表单中的项目名称
function getProject1(company){
	if(company==""){
		document.getElementById("project").disabled="disabled";
		return;
	}
	else document.getElementById("project").disabled="";
	param="company="+company;
	loader=new net.AjaxRequest("ProjectServlet?action=getProjectByCompany&nocache="+new Date().getTime(),
			deal_getProject1,onerror,"POST",param);
}
//获取表单中的项目名称回调函数
function deal_getProject1(){
	result=this.req.responseText;
	data=eval("("+result+")");
	select=document.getElementById("project");
	select.innerHTML="";
	select.add(new Option("请选择项目名称","showOption"));
	for(i=0;i<data[0].project.length;i++){
		select.add(new Option(data[0].project[i].name,data[0].project[i].id));
	}
}

//数据提交
function sumbitform(){
	form=document.getElementById("data_form");
	if(form.date.value==""){
		alert("请选择日期！");
		form.date.focus();
		return;
	}
	if(document.getElementById("account").value=="showOption"){
		alert("请输入人员名字！");
		return;
	}
	if(document.getElementById("project_cate").value=="showOption"){
		alert("请选择项目范畴！");
		return;
	}
	if(document.getElementById("project").disabled==""&&document.getElementById("project").value=="showOption"){
		alert("请选择所属项目！");
		return;
	}
	if(document.getElementById("expense_name").value==""){
		alert("请选择费用名称！")
		return;
	}
	if(document.getElementById("bankaccount").value=="showOption"){
		alert("请选择账户！")
		return;
	}
	if(document.getElementById("pay_method").value=="showOption"){
		alert("请选择收支方式！")
	}
	if(form.expense_type.value==""){
		alert("请选择费用类型！")
		return;
	}
	if(form.expense.value==""){
		alert("请输入费用额度！")
		form.expense.focus();
		return;
	}
	var param = "date="+form.date.value+"&account="+document.getElementById("account").value+"&expense_name="
				+document.getElementById("expense_name").value+"&description="+form.description.value+"&remark="
				+form.remark.value+"&bankaccount="+document.getElementById("bankaccount").value+"&pay_method="
				+document.getElementById("pay_method").value;
	if(document.getElementById("company").value=="showOption"&&document.getElementById("company").disabled==""||
			document.getElementById("project_cate").value=="公司总部"){
		project_cate=document.getElementById("project_cate").value;
		if(project_cate=="公司总部"){
			param+="&project_id=0";
		}else if(project_cate=="环保项目"){
			param+="&project_id=1";
		}else{
			param+="&project_id=2";
		}
	}
	else{
		param+="&project_id="+document.getElementById("project").value;
	}
	if(form.expense_type.value=="debit"){
		param += "&debit=" + form.expense.value +"&credit=0";
	}
	else
		param += "&debit=0" + "&credit="+form.expense.value;
	if(form.id.value!=""){
		param += "&id=" + form.id.value;
	}
	if(document.getElementById("ispublic1").checked==true){
		param += "&ispublic=1"
	}
	else
		param += "&ispublic=0";
	var loader=new net.AjaxRequest("EventServlet?action=saveOrUpdateData&nocache="+new Date().getTime(),
			deal_sumbitform,onerror,"POST",param);
}
//数据提交的回调函数
function deal_sumbitform(){	
	result=this.req.responseText;
	
	if(result=="1"){
		alert("账目保存成功！");
		if(form.id.value!=""){
			row=document.getElementById("data_table").rows[chooseRow];
			row.cells[1].innerHTML=form.date.value;
			row.cells[2].innerHTML=document.getElementById("account").value;
			row.cells[5].innerHTML=form.description.value;
			row.cells[6].innerHTML=document.getElementById("bankaccount").value;
			row.cells[7].innerHTML=document.getElementById("pay_method").value;
			row.cells[10].innerHTML=form.remark.value;
			row.cells[4].innerHTML=document.getElementById("expense_name").value;
			if(document.getElementById("company").value=="showOption"&&document.getElementById("company").disabled==""||
					document.getElementById("project_cate").value=="公司总部"){
				project_cate=document.getElementById("project_cate").value;
				if(project_cate=="公司总部"){
					row.cells[12].innerHTML=0;
				}else if(project_cate=="环保项目"){
					row.cells[12].innerHTML=1;
				}else{
					row.cells[12].innerHTML=2;
				}
				row.cells[3].innerHTML=" ";
			}
			else{
				row.cells[12].innerHTML=document.getElementById("project").value;
				index=document.getElementById("project").selectedIndex;
				row.cells[3].innerHTML=document.getElementById("project").options[index].text;
			}
			if(form.expense_type.value=="debit"){
				row.cells[8].innerHTML=form.expense.value;
				row.cells[9].innerHTML="";
			}
			else{
				row.cells[9].innerHTML=form.expense.value;
				row.cells[8].innerHTML="";
			}
			return_last_container();
		}
		resetform();
	}
	else{
		alert("账目保存失败，请重试！");
	}	
}
//修改数据
function updateData(){
	row=document.getElementById("data_table").rows[chooseRow];
	addData();
	document.getElementById("resetBtn").disabled="disabled";
	document.getElementById("form_header").innerHTML="修改账目";
	form=document.getElementById("data_form");
	form.date.value=row.cells[1].innerHTML;
	form.description.value=row.cells[5].innerHTML;
	form.remark.value=row.cells[10].innerHTML;
	form.id.value=row.cells[0].innerHTML;
	document.getElementById("account").value=row.cells[2].innerHTML;
	document.getElementById("bankaccount").value=row.cells[6].innerHTML;
	document.getElementById("pay_method").value=row.cells[7].innerHTML;
	param="project_id="+row.cells[12].innerHTML;
	loader=new net.AjaxRequest("ProjectServlet?action=getProjectById&nocache="+new Date().getTime(),
				deal_getProjectCategory,onerror,"POST",param);
	document.getElementById("expense_name").value=row.cells[4].innerHTML;
	if(row.cells[8].innerHTML!=""){
		form.expense_type.value="debit";
		form.expense.value=row.cells[8].innerHTML;
	}
	else{
		form.expense_type.value="credit";
		form.expense.value=row.cells[9].innerHTML;
	}
	if(row.cells[11].innerHTML=="1"){
		document.getElementById("ispublic1").checked=true;
	}
}

//获取项目范畴回调函数
function deal_getProjectCategory(){
	result=this.req.responseText;
	data=eval("("+result+")");
	document.getElementById("project_cate").value=data[0].project.category;
	if(data[0].project.category!="公司总部"){
		document.getElementById("company").disabled="";
		if(data[0].project.name!=" "){
			document.getElementById("company").value=data[0].project.company;
			select=document.getElementById("project");
			select.innerHTML="";
			select.add(new Option("请选择项目名称","showOption"));
			for(i=0;i<data[0].projects.length;i++){
				select.add(new Option(data[0].projects[i].name,data[0].projects[i].id));
			}
			select.disabled="";
			select.value=data[0].project.id;
		}
	}
}

//删除数据
function deleteData(){
	row=document.getElementById("data_table").rows[chooseRow];
	var con=window.confirm("确定要删除该账目吗？");
	if(con==true){
		param="id="+row.cells[0].innerHTML;
		loader=new net.AjaxRequest("EventServlet?action=deleteData&nocache="+new Date().getTime(),
				deal_deleteData,onerror,"POST",param);
	}
}
//删除数据的回调函数
function deal_deleteData(){
	result=this.req.responseText;
	tb = document.getElementById("data_table");
	if(result=="1"){
		alert("账目删除成功！");		
		searchData();
		set_update_disabled();
		chooseRow=0;
	}
	else{
		alert("账目删除失败，请重试！");
	}	
}

//财务统计
function financialSta(){
	show_container("financial_statistics_container");
	document.getElementById("financialOfyear").innerHTML=year+document.getElementById("financialOfyear").innerHTML.substring(4);
	document.getElementById("graphic").style.height=document.body.clientHeight*0.78+"px";
	reset_category_box();
	fill_selectOption("category_account","account");
	//fill_selectOption("category_expense_name","expense_name");
	
	fill_selectOption("category_bankaccount","bank_account");
	//fill_selectOption("category_company","company");
	$("#category_company").autocomplete({
	      source: select_options[0].Company,
	      select: function(event, ui){
	    	  getproject2(ui.item.value);
	      }
	});
	$("#category_expense_name").autocomplete({
	      source: select_options[0].Expense,
	});
	loader=new net.AjaxRequest("EventServlet?action=getBalance&year="+year+"&authority="+session[0].staff.authority+"&nocache="+new Date().getTime(),
			deal_financialSta,onerror,"GET");
}
//财务统计回调函数
function deal_financialSta(){
	result=this.req.responseText;
	MakeChart(result);
}

//根据json数据生成饼状图，并将饼状图显示到div中
function MakeChart(value) {
    chartData = eval(value);
    if(chartData.length==0){
    	alert("未查到相关数据！");
    	return;
    }
    //饼状图
    chart = new AmCharts.AmPieChart();
    chart.dataProvider = chartData;
    //标题数据
    chart.titleField = "name";
    //值数据
    chart.valueField = "value";
    //边框线颜色
    chart.outlineColor = "#fff";
    //边框线的透明度
    chart.outlineAlpha = .8;
    //边框线的狂宽度
    chart.outlineThickness = 1;
    chart.depth3D = 20;
    chart.angle = 30;
    chart.write("graphic");
}

//二级菜单展开及关闭
function DoMenu(emid)
{
 var obj = document.getElementById(emid); 
 obj.className = (obj.className.toLowerCase() == "expanded"?"collapsed":"expanded");
 if((LastLeftID!=null)&&(emid!=LastLeftID)) //关闭上一个Menu
 {
  document.getElementById(LastLeftID).className = "collapsed";
 }
 LastLeftID = emid;
}
//获取条件查询中的项目
function getproject2(company){
	if(company=="showOption"){
		document.getElementById("category_project").disabled="disabled";
		return;
	}
	else document.getElementById("category_project").disabled="";
	param="company="+company;
	loader=new net.AjaxRequest("ProjectServlet?action=getProjectByCompany&nocache="+new Date().getTime(),
			deal_getProject2,onerror,"POST",param);
}

//获取条件查询中的项目
function deal_getProject2(){
	result=this.req.responseText;
	data=eval("("+result+")");
	select=document.getElementById("category_project");
	select.innerHTML="";
	select.add(new Option("请选择项目名称","showOption"));
	for(i=0;i<data[0].project.length;i++){
		select.add(new Option(data[0].project[i].name,data[0].project[i].id));
	}
}
//条件集合查询
function DoQuery(str1,str2){
	query="select "+str1+" a, "+str2+" b from Event e, Project p where e.project_id=p.id";
	condOfProject=document.getElementById("category_project").value;
	condOfCompany=document.getElementById("category_company").value;
	condOfExpense_name=document.getElementById("category_expense_name").value;
	condOfMonth=document.getElementById("category_month").value;
	condOfAccount=document.getElementById("category_account").value;
	condOfProjectCate=document.getElementById("category_project_cate").value;
	condOfBankAccount=document.getElementById("category_bankaccount").value;
	if(condOfProject!="showOption"&&document.getElementById("category_project").disabled==""){
		query+=" and e.project_id="+condOfProject;
	}
	if(condOfProjectCate!="showOption"){
		query+=" and p.category='"+condOfProjectCate+"'";
	}
	if(condOfCompany!=""){
		query+=" and p.company='"+condOfCompany+"'";
	}	
	if(condOfExpense_name!=""){
		query+=" and e.expense_name='"+condOfExpense_name+"'";
	}
	if(condOfMonth!="showOption"){
		query+=" and e.date='"+condOfMonth+"'";
	}
	if(condOfAccount!="showOption"){
		query+=" and e.account='"+condOfAccount+"'";
	}
	if(condOfBankAccount!="showOption"){
		query+=" and e.bank_account='"+condOfBankAccount+"'";
	}
	if(session[0].staff.authority<4){
		query+=" and e.ispublic=0";
	}
	param="query="+query+"&year="+year;
	loader=new net.AjaxRequest("EventServlet?action=doQuery&nocache="+new Date().getTime(),
			deal_doQuery,onerror,"POST",param);
}

//条件集合查询回调
function deal_doQuery(){
	result=this.req.responseText;
	MakeChart(result);
}
//查询盒子重置
function reset_category_box(){
	document.getElementById("category_project_cate").value="showOption";
	document.getElementById("category_project").value="showOption";
	document.getElementById("category_project").disabled="disabled";
	document.getElementById("category_expense_name").value="";
	document.getElementById("category_month").value="showOption";
	document.getElementById("category_account").value="showOption";
	document.getElementById("category_company").value="";
	document.getElementById("ChildMenu1").className = "collapsed";
	document.getElementById("ChildMenu2").className = "collapsed";
}

//显示年份输入
function show_year_input(){
	year=prompt("请输入年份：");
	if(year==""||year==null)
		return;
	else if(!/^\d{4}$/.test(year)){
		alert("请输入正确的年份");
	    return;
	}
	financialSta();
}

//显示2015年财政
function show_2015_financial(){
	year=2015;
	financialSta();
}

//人员管理页面初始化
function prepare_employee_container(){
	show_container("employee_container");
	showEmployee();
	getHistoricTitle();
}

//获取历史表格标题
function getHistoricTitle(){
	loader=new net.AjaxRequest("EmployeeServlet?action=getHistoricTitle&nocache="+new Date().getTime(),
			deal_getHistoricTitle,onerror,"GET");
}

//获取历史表格标题回调函数
function deal_getHistoricTitle(){
	result=this.req.responseText;
	titles=eval("("+result+")");
	select=document.getElementById('search_historic');
	select.innerHTML="";
	select.add(new Option("请选择历史表格","showOption"));
	for(var i=0;i<titles[0].title.length;i++){
		select.add(new Option(titles[0].title[i],titles[0].title[i]));
	}
	
}

//添加人员
function addEmployee(){
	emp_name=prompt("请输入人员名字：");
	if(emp_name==null||emp_name=="")
		return;
	param="name="+emp_name;
	loader=new net.AjaxRequest("EmployeeServlet?action=addEmployee&nocache="+new Date().getTime(),
			deal_addEmployee,onerror,"POST",param);
}

//添加人员回调函数
function deal_addEmployee(){
	result=this.req.responseText;
	if(result=="1"){
		alert("添加成功！");
		showEmployee();
		getSelectOption();
	}	
}

//添加列
function addSubfee(){
	exp_name=prompt("请输入添加的费用名称：");
	if(exp_name==null||exp_name=="")
		return;
	param="name="+exp_name;
	loader=new net.AjaxRequest("EmployeeServlet?action=addSubfee&nocache="+new Date().getTime(),
			deal_addSubfee,onerror,"POST",param);
}
//删除列
function deleteSubfee(){
	if(chooseY!=0){
		alert("请选中费用名称！");
		return;
	}
	con=window.confirm("确定删除该列？");
	if(con==true){
		param="name="+document.getElementById("employee_table").rows[0].cells[chooseX].innerHTML;
		loader=new net.AjaxRequest("EmployeeServlet?action=deleteSubfee&nocache="+new Date().getTime(),
				deal_delete,onerror,"POST",param);
	}
}

//删除行
function deleteEmployee(){
	if(chooseX!=0){
		alert("请选中人员！");
		return;
	}
	con=window.confirm("确定删除该人员？");
	if(con==true){
		param="name="+document.getElementById("employee_table").rows[chooseY].cells[0].innerHTML;
		loader=new net.AjaxRequest("EmployeeServlet?action=deleteEmployee&nocache="+new Date().getTime(),
				deal_delete,onerror,"POST",param);
	}
}

//删除行列回调函数
function deal_delete(){
	result=this.req.responseText;
	if(result=="1"){
		alert("删除成功！");
		chooseX=0;
		chooseY=0;
		showEmployee();
	}
}

//添加列回调函数
function deal_addSubfee(){
	result=this.req.responseText;
	if(result=="1"){
		alert("添加成功！");
		showEmployee();
	}
}

//修改单元格值
function changeValue(){
	if(chooseX==0){
		alert("请选中数值单元格！");
		return;
	}
	value=prompt("请输入数值：");
	if(value==null||value=="")
		return;
	expense_name=document.getElementById("employee_table").rows[0].cells[chooseX].innerHTML;
	param="value="+value+"&expense_name="+expense_name;
	if(chooseY!=0){
		employee_name=document.getElementById("employee_table").rows[chooseY].cells[0].innerHTML;
		param+="&employee_name="+employee_name;
	}
	loader=new net.AjaxRequest("EmployeeServlet?action=changeValue&nocache="+new Date().getTime(),
			deal_changeValue,onerror,"POST",param);
}

//修改单元格值回调函数
function deal_changeValue(){
	result=this.req.responseText;
	if(result=="1"){
		alert("修改成功！");	
		showEmployee();
	}
}

//保存表格
function saveForm(){
	title=prompt("请输入表格标题：");
	if(title==null||title=="")
		return;
	text=document.getElementById("showdata_E").innerHTML;
	param="text="+text+"&title="+title;
	loader=new net.AjaxRequest("EmployeeServlet?action=saveForm&nocache="+new Date().getTime(),
			deal_saveForm,onerror,"POST",param);
	return title;
}

//保存表格回调函数
function deal_saveForm(){
	result=this.req.responseText;
	if(result=="1"){
		alert("保存成功！");
		getHistoricTitle();
	}
}

//显示历史工资数据
function show_historic_table(){
	title=document.getElementById("search_historic").value;
	if(title!="showOption"){
		param="title="+title;
		loader=new net.AjaxRequest("EmployeeServlet?action=getHistoricBytitle&nocache="+new Date().getTime(),
				deal_show_historic_table,onerror,"POST",param);
	}
}

//显示历史工资数据回调函数
function deal_show_historic_table(){
	text=this.req.responseText;
	document.getElementById("emp_optiondiv").style.display="none";
	document.getElementById("showdata_E").style.display="none";
	document.getElementById("showdata_HE").innerHTML=text;
	document.getElementById("showdata_HE").style.height=document.body.clientHeight-300+"px";
	document.getElementById("showdata_HE").style.display="block";
	document.getElementById("emp_optiondiv_H").style.display="block";
}

//显示现在工资数据
function show_cur_data(){
	document.getElementById("emp_optiondiv_H").style.display="none";
	document.getElementById("showdata_HE").style.display="none";
	document.getElementById("showdata_E").style.display="block";
	document.getElementById("emp_optiondiv").style.display="block";
}


//获取人员及工资数据
function showEmployee(){
	loader=new net.AjaxRequest("EmployeeServlet?action=getAllEmployee&nocache="+new Date().getTime(),
			deal_showEmployee,onerror,"GET");
}

//获取人员及工资数据回调函数
function deal_showEmployee(){
	result=this.req.responseText;
	data=eval("("+result+")");
	tb=document.getElementById("employee_table");
	for(var i=tb.rows.length-1;i>=0;i--)
    {
        tb.deleteRow(i);
    }
	tb.style.display = "block";
	document.getElementById("showdata_E").style.height=document.body.clientHeight-300+"px";
	newRow = tb.insertRow();
	newRow.style.backgroundColor="#d4e3e5";
	for(var i=1;i<data[0].colname.length;i++){
		newCell=newRow.insertCell();
		newCell.innerHTML=data[0].colname[i];
		if(i>2){
			newCell.onclick=function(){
				document.getElementById("changeValueBtn").value="批量修改";
				clickCell_color(this);
			}
		}
	}
	newRow.insertCell().innerHTML="实发工资";
	for(var i=1;i<data.length;i++){
		newRow = tb.insertRow();
		salary=0;
		if(i%2==0){
			newRow.className="evenrowcolor";
			}
			else{
			newRow.className="oddrowcolor";
			}
		for(var key in data[i]){
			newCell= newRow.insertCell();
			newCell.onclick=function(){
				document.getElementById("changeValueBtn").value="修改数据";
				clickCell_color(this);
			}
			if(data[i][key]=="0")
				continue;
			newCell.innerHTML=data[i][key];
			if(key!="1")
				salary+=parseFloat(newCell.innerHTML);
		}
		newCell=newRow.insertCell();
		newCell.innerHTML=salary.toFixed(2);
			
	}
	newRow=tb.insertRow();
	newRow.style.backgroundColor="#9fe6c5";
	newCell=newRow.insertCell().innerHTML="总计";
	for(var i=1;i<data[0].colname.length;i++){
		newCell=newRow.insertCell();
		total=0;
		for(var j=1;j<data.length;j++){
			if(tb.rows[j].cells[i].innerHTML=="")
				continue;
			total+=parseFloat(tb.rows[j].cells[i].innerHTML);
		}
		newCell.innerHTML=fmoney(total,2);
	}
}

//点击表格单元变色
function clickCell_color(obj){
    var row=obj.parentNode;//获得父节点对象
    var tb=row.parentNode;
    if(chooseX!=0||chooseY!=0){
        var lastObj=tb.rows[chooseY].cells[chooseX];
        lastObj.style.backgroundColor="";
    }
    chooseX=obj.cellIndex;
    chooseY=row.rowIndex;
    obj.style.backgroundColor="#2fa719";   
}

//发放工资
function payoff(){
	con=window.confirm("确定要进行一次发放工资操作吗？");
	if(con==true){
		tb=document.getElementById("employee_table");
		discription=saveForm();		
		len=tb.rows.item(0).cells.length;
		var json=[];
		for(var i=1;i<tb.rows.length-1;i++){
			if(tb.rows[i].cells[len-1].innerHTML=="0"){
				continue;
			}
			json.push({"discription":discription,"emp":tb.rows[i].cells[0].innerHTML,"salary":tb.rows[i].cells[len-1].innerHTML});		
		}
		param="json="+JSON.stringify(json);
		loader=new net.AjaxRequest("EmployeeServlet?action=payoff&nocache="+new Date().getTime(),
				deal_payoff,onerror,"POST",param);
		alert("工资发放记录添加完毕，如需个别修改请在费用管理里进行账目修改");
	}
}
//发放工资回调函数
function deal_payoff(){
	
}

//项目管理页面初始化
function prepare_project_container(){
	show_container("project_data_container");
	document.getElementById("printProjectTable").disabled="disabled";
	document.getElementById("project_info").style.display="none";
	document.getElementById("data_table_P").style.display="none";
	document.getElementById("data_table_Project").style.display="none";
	clearProjectSearch();
	fill_selectOption("search_project_agent","account");
	//fill_selectOption("search_project_company","company");
	$("#search_project_company").autocomplete({
	      source: select_options[0].Company,
	      select: function(event, ui){
	    	  get_search_project(ui.item.value);
	      }
	    });
	document.getElementById("showdata_P").style.height=document.body.clientHeight-300+"px";		
	document.getElementById("updateProject").disabled="disabled";
	document.getElementById("returnLastTable").disabled="disalbed";
	document.getElementById("deleteProject").disabled="disabled";
	
}

//添加费用名称
function addExpense_name(){
	expense_name=prompt("请输入费用名称：");
	if(expense_name==""||expense_name==null) return;
	param="expense_name="+expense_name;
	loader=new net.AjaxRequest("EventServlet?action=addExpenseName&nocache="+new Date().getTime(),
			deal_addExpense_name,onerror,"POST",param);
}

//添加费用名称回调函数
function deal_addExpense_name(){
	result=this.req.responseText;
	if(result=="1"){
		alert("添加成功！");
		getSelectOption();
	}
	else
		alert("添加失败，请重试！");
}

//添加项目
function addProject(){
	popdiv("ly","add_Project_box");
	document.getElementById("project_form").reset();
	fill_selectOption("add_agent","account");
	//fill_selectOption("add_project_company","company");
	$("#add_project_company").autocomplete({
	      source: select_options[0].Company
	    });
	document.getElementById("first_party").disabled=false;
	document.getElementById("second_party").disabled=false;
	document.getElementById("isinvoiced").disabled=false;
}

//提交项目
function sumbit_project(){
	form=document.getElementById("project_form");
	project_cate=document.getElementById("add_project_category").value;
	project=form.name.value;
	project_type=form.project_type.value;
	project_fund=form.fund.value;
	project_remark=form.remark.value;
	project_company=document.getElementById("add_project_company").value;
	project_agent=document.getElementById("add_agent").value;
	project_date=form.date.value;
	if(project_date==""){
		alert("请选择日期！");
		return;
	}
	if(project_cate=="showOption"){
		alert("请选择项目范畴！");
		return;
	}
	if(project_company==""){
		alert("请输入单位名称！");
	}
	if(project==""){
		alert("请输入项目名称！");
		return;
	}
	if(project_fund==""){
		alert("请输入项目总额！");
		return;
	}
	if(project_type==""){
		alert("请选择项目单位！");
		return;
	}
	if(project_agent=="showOption"){
		alert("请选择经办人！");
		return;
	}
	param="project_cate="+project_cate+"&project="+project+"&project_type="+project_type+"&project_date="+project_date
			+"&project_fund="+project_fund+"&project_remark="+project_remark+"&project_company="+project_company+
			"&project_agent="+project_agent;
	if(document.getElementById("isinvoiced").checked==true){
		param+="&isinvoiced=1";
	}
	else
		param+="&isinvoiced=0";
	if(form.id.value!=""){
		param += "&id=" + form.id.value;
	}
	loader=new net.AjaxRequest("ProjectServlet?action=saveOraddProject&nocache="+new Date().getTime(),
			deal_sumbit_project,onerror,"POST",param);
	closediv("ly","add_Project_box");
}

//提交项目回调函数
function deal_sumbit_project(){
	result=this.req.responseText;
	if(result=="1"){
		alert("添加成功！");
		prepare_project_container();
	}
	else
		alert("添加失败，请重试！");
}

//获取项目搜索中的项目
function get_search_project(company){
	if(company==""){
		document.getElementById("search_project").disabled="disabled";
		document.getElementById("search_project").value="showOption";
		return;
	}
	else document.getElementById("search_project").disabled="";
	param="company="+company;
	loader=new net.AjaxRequest("ProjectServlet?action=getProjectByCompany&nocache="+new Date().getTime(),
			deal_get_search_project,onerror,"POST",param);
}

//获取项目搜索回调函数
function deal_get_search_project(){
	result=this.req.responseText;
	data=eval("("+result+")");
	select=document.getElementById("search_project");
	select.innerHTML="";
	select.add(new Option("请选择项目名称","showOption"));
	for(i=0;i<data[0].project.length;i++){
		select.add(new Option(data[0].project[i].name,data[0].project[i].id));
	}
}	

//显示项目
function show_project(){
	row=document.getElementById("data_table_Project").rows[chooseRow];
	document.getElementById("project_date").innerHTML=row.cells[0].innerHTML;
	document.getElementById("project_name").innerHTML=row.cells[2].innerHTML;
	document.getElementById("project_agent").innerHTML=row.cells[3].innerHTML;
	document.getElementById("project_fund").innerHTML=row.cells[4].innerHTML;
	document.getElementById("project_balance").innerHTML=row.cells[5].innerHTML;
	document.getElementById("project_id").innerHTML=row.cells[9].innerHTML;
	document.getElementById("show_project_type").innerHTML=document.getElementById("amount_type").innerHTML+"：";
	if(row.cells[7].innerHTML=="1"){
		document.getElementById("project_isinvoiced").checked=true;
		document.getElementById("project_isinvoiced").disabled="disabled";
	}
	else{
		document.getElementById("project_isinvoiced").checked=false;
		document.getElementById("project_isinvoiced").disabled="";
	}
	document.getElementById("project_info").style.display="block";
}

//将项目设为已开发票
function set_project_invoiced(){
	con=window.confirm("确定要将该项目设为已开发票吗？");
	if(con==true){
		param="id="+document.getElementById("project_id").innerHTML;
		loader=new net.AjaxRequest("ProjectServlet?action=setProjectInvoiced&nocache="+new Date().getTime(),
				deal_set_project_invoiced,onerror,"POST",param);  
	}	
	else{
		document.getElementById("project_isinvoiced").checked=false;
	}
}

//将项目设为已开发票回调函数
function deal_set_project_invoiced(){
	result=this.req.responseText;
	if(result=="1"){
		alert("修改成功！");
		document.getElementById("project_isinvoiced").checked=true;
		document.getElementById("project_isinvoiced").disabled="disabled";
		balance=rmoney(document.getElementById("project_balance").innerHTML);
		fund=rmoney(document.getElementById("project_fund").innerHTML);
		new_balance=parseFloat(balance)+parseFloat(fund);
		tb=document.getElementById("data_table_Project");
		cell1=tb.rows[chooseRow].cells[5];
		cell2=tb.rows[tb.rows.length-1].cells[5];
		document.getElementById("project_balance").innerHTML=fmoney(new_balance,2);
		cell1.innerHTML=fmoney(new_balance,2);
		cell2.innerHTML=fmoney(parseFloat(rmoney(cell2.innerHTML))-parseFloat(balance)+parseFloat(new_balance),2);
	}
}
//修改项目
function updateProject(){
	addProject();
	row=document.getElementById("data_table_Project").rows[chooseRow];
	form=document.getElementById("project_form");
	document.getElementById("first_party").disabled=true;
	document.getElementById("second_party").disabled=true;
	form.isinvoiced.disabled=true;
	form.date.value=row.cells[0].innerHTML;
	document.getElementById("add_project_category").value=row.cells[8].innerHTML;
	document.getElementById("add_project_company").value=row.cells[1].innerHTML;
	form.name.value=row.cells[2].innerHTML;
	document.getElementById("add_agent").value=row.cells[3].innerHTML;
	form.fund.value=rmoney(row.cells[4].innerHTML);
	form.remark.value=row.cells[6].innerHTML;
	if(document.getElementById("data_table_Project").rows[0].cells[5].innerHTML=="应收余额"){
		document.getElementById("second_party").checked=true;
	}
	else
		document.getElementById("first_party").checked=true;
	if(row.cells[7].innerHTML=="1")
		document.getElementById("isinvoiced").checked=true;
	form.id.value=row.cells[9].innerHTML;
}

//删除项目
function deleteProject(){
	con=window.confirm("删除项目会删除与之相关的所有费用，确定吗？");
	if (con == true) {
		project_id = document.getElementById("project_id").innerHTML;
		param = "id=" + project_id;
		loader = new net.AjaxRequest(
				"ProjectServlet?action=deleteProject&nocache="
						+ new Date().getTime(), deal_deleteProject, onerror,
				"POST", param);
	}
}

//删除项目回调函数
function deal_deleteProject(){
	result=this.req.responseText;
	if(result=="1"){
		alert("删除成功！");
		prepare_project_container();
	}else{
		alert("删除失败，请重试！");
	}
}

//添加单位
function addCompany(){
	company=prompt("请输入单位名称：");
	if(company==""||company==null){
		return;
	}
	param="company="+company;
	loader =new net.AjaxRequest("ProjectServlet?action=addCompany&nocache="+new Date().getTime(),
			deal_addCompany,onerror,"POST",param); 
}

//添加单位回调函数
function deal_addCompany(){
	result=this.req.responseText;
	if(result=="1"){
		alert("添加成功！");
		getSelectOption();
	}
	else{
		alert("添加失败！");
	}
}

//显示项目明细
function show_projectevent(){
	project_id=document.getElementById("project_id").innerHTML;
	param="id="+project_id;
	loader=new net.AjaxRequest("ProjectServlet?action=getProjecteventsByProjectId&nocache="+new Date().getTime(),
				deal_show_projectevent,onerror,"POST",param); 
}

//显示项目应收应付明细回调函数
function deal_show_projectevent(){
	result=this.req.responseText;
	Pevents=eval("("+result+")");
	var balance=rmoney(document.getElementById("project_fund").innerHTML),debit_intotal=0,credit_intotal=0;
	document.getElementById("data_table_Project").style.display="none";
	tb=document.getElementById("data_table_P");
	tb.style.display="block";
	for(var i=tb.rows.length-1;i>=1;i--)
    {
        tb.deleteRow(i);
    }
	for (var i = 0; i < Pevents[0].Projectevent.length; i++) {
		newRow = tb.insertRow();
		if(i%2==0){
		newRow.className="evenrowcolor";
		}
		else{
		newRow.className="oddrowcolor";
		}
		newCell1 = newRow.insertCell();
		newCell1.innerHTML=Pevents[0].Projectevent[i].date;
		newCell2 = newRow.insertCell();
		newCell2.innerHTML=Pevents[0].Projectevent[i].description;
		newCell3 = newRow.insertCell();
		newCell3.innerHTML=Pevents[0].Projectevent[i].name;
		newCell4 = newRow.insertCell();
		newCell5 = newRow.insertCell();
		newCell6 = newRow.insertCell();
		balance=parseFloat(balance)-parseFloat(Pevents[0].Projectevent[i].credit)+parseFloat(Pevents[0].Projectevent[i].debit);
		newCell6.innerHTML = fmoney(balance,2);
		if (Pevents[0].Projectevent[i].debit != 0) {
			newCell4.innerHTML = Pevents[0].Projectevent[i].debit;
			debit_intotal+=parseFloat(Pevents[0].Projectevent[i].debit);
			}
			else {
			newCell5.innerHTML = Pevents[0].Projectevent[i].credit;
			credit_intotal+=parseFloat(Pevents[0].Projectevent[i].credit);
			}
		}
	newRow = tb.insertRow();
	newRow.style.backgroundColor="#9fe6c5";
	for(var i=0;i<2;i++){
	newCell=newRow.insertCell();
	}
	newCell1=newRow.insertCell()
	newCell1.innerHTML = "总计";
	newCell2=newRow.insertCell()
	newCell2.innerHTML =fmoney(debit_intotal,2);
	newCell3=newRow.insertCell()
	newCell3.innerHTML = fmoney(credit_intotal,2);
	newCell4=newRow.insertCell()
	document.getElementById("returnLastTable").disabled="";
}

//返回前一个表格
function returnLastTable(){
	document.getElementById("data_table_P").style.display="none";
	document.getElementById("data_table_Project").style.display="block";
	document.getElementById("returnLastTable").disabled="disabled";
}

//显示总的应付应收余额
function show_totalbalance(type){
	hql="from Project p where p.type='"+type+"'";
	condStartdate=document.getElementById("search_project_start_date").value;
	condEnddate=document.getElementById("search_project_end_date").value;
	condProjectcate=document.getElementById("search_project_category").value;
	condProject=document.getElementById("search_project").value;
	condProjectagent=document.getElementById("search_project_agent").value;
	condProjectcompany=document.getElementById("search_project_company").value;
	if(condStartdate!="")
		hql+=" and p.date>='"+condStartdate+"'";
	if(condEnddate!="")
		hql+=" and p.date<='"+condEnddate+"'";
	if(condProjectcate!="showOption")
		hql+=" and p.category='"+condProjectcate+"'";
	if(condProject!="showOption")
		hql+=" and p.id="+condProject;
	if(condProjectagent!="showOption")
		hql+=" and p.agent='"+condProjectagent+"'";
	if(condProjectcompany!="showOption")
		hql+=" and p.company='"+condProjectcompany+"'";
	if(type=="second_party"){
	document.getElementById("amount_type").innerHTML="应收余额";
	}
	else{
		document.getElementById("amount_type").innerHTML="应付余额";
	}
	param="hql="+hql;
	loader=new net.AjaxRequest("ProjectServlet?action=getTotalBalance&nocache="+new Date().getTime(),
			deal_show_totalbalance,onerror,"POST",param);	
}

//查询应收项目对应的外包合同
function showSubProjects(){
	row=document.getElementById("data_table_Project").rows[chooseRow];	
	hql = "from Project p where p.type='first_party' and p.name='"+row.cells[2].innerHTML+"'";
	param="hql="+hql;
	loader=new net.AjaxRequest("ProjectServlet?action=getTotalBalance&nocache="+new Date().getTime(),
			deal_show_totalbalance,onerror,"POST",param);
}

//显示总的应付应收余额回调函数
function deal_show_totalbalance(){
	result=this.req.responseText;
	Projects=eval("("+result+")");
	if(Projects[0].Project.length==0){
		alert("未查询到任何数据！");
		return;
		}
	var balance_intotal=0,fund_intotal=0;
	tb=document.getElementById("data_table_Project");
	document.getElementById("data_table_P").style.display="none";
	document.getElementById("project_info").style.display="none";
	tb.style.display="block";
	chooseRow=0;
	for(var i=tb.rows.length-1;i>=1;i--)
    {
        tb.deleteRow(i);
    }
	for(var i=0;i<Projects[0].Project.length;i++){
		newRow=tb.insertRow();
		newRow.onclick = function() {
			click_color(this)
			show_project();
			document.getElementById("updateProject").disabled="";
			document.getElementById("deleteProject").disabled="";
		};
		newRow.ondblclick = function(){
			showSubProjects();
		}
		if(i%2==0){
			newRow.className="evenrowcolor";
		}
		else{
			newRow.className="oddrowcolor";
		}
		newCell0 = newRow.insertCell();
		newCell0.innerHTML= Projects[0].Project[i].date;
		newCell1 = newRow.insertCell();
		newCell1.innerHTML = Projects[0].Project[i].company;
		newCell2 = newRow.insertCell();
		newCell2.innerHTML= Projects[0].Project[i].name;
		newCell3 = newRow.insertCell();
		newCell3.innerHTML= Projects[0].Project[i].agent;
		newCell4 = newRow.insertCell();
		newCell4.innerHTML= fmoney(Projects[0].Project[i].fund,2);
		newCell5 = newRow.insertCell();
		newCell5.innerHTML= fmoney(Projects[0].Project[i].balance,2);
		newCell6 = newRow.insertCell();
		newCell6.innerHTML= Projects[0].Project[i].remark;
		newCell7 = newRow.insertCell();
		newCell7.style.display="none";
		newCell7.innerHTML= Projects[0].Project[i].isinvoiced;
		newCell8 = newRow.insertCell();
		newCell8.style.display="none";
		newCell8.innerHTML= Projects[0].Project[i].category;
		newCell9 = newRow.insertCell();
		newCell9.style.display="none";
		newCell9.innerHTML= Projects[0].Project[i].id;
		balance_intotal+=parseFloat(Projects[0].Project[i].balance);
		fund_intotal+=parseFloat(Projects[0].Project[i].fund);
	}
	newRow=tb.insertRow();
	newRow.style.backgroundColor="#9fe6c5";
	newCell1 = newRow.insertCell();
	newCell1.innerHTML ="总计";
	for(var i=0;i<3;i++)
		newRow.insertCell();
	newCell3 = newRow.insertCell();
	newCell3.innerHTML =fmoney(fund_intotal,2);	
	newCell4 = newRow.insertCell();
	newCell4.innerHTML =fmoney(balance_intotal,2);
	newRow.insertCell();
	document.getElementById("printProjectTable").disabled="";
	document.getElementById("updateProject").disabled="disabled";
	document.getElementById("deleteProject").disabled="disabled";
	document.getElementById("returnLastTable").disabled="disabled";
}

//追开发票
function addDebit(){
	amount=prompt("请输入开票金额：");
	if(amount==""||amount==null) return;
	description=prompt("请输入票据摘要：");
	if(description==""||description==null) return;
	id=document.getElementById("project_id").innerHTML;
	param="amount="+amount+"&description="+description+"&project_id="+id;
	loader=new net.AjaxRequest("ProjectServlet?action=addDebit&nocache="+new Date().getTime(),
			deal_addDebit,onerror,"POST",param);
	balance=rmoney(document.getElementById("project_balance").innerHTML);
	new_balance=parseFloat(balance)+parseFloat(amount);
	document.getElementById("project_balance").innerHTML=fmoney(new_balance,2);
}

//追开发票回调函数
function deal_addDebit(){
	result=this.req.responseText;
	if(result=="1"){
		alert("添加成功！");
		show_projectevent();
	}
	else{
		alert("添加失败！");
	}
}

//清除项目搜索菜单
function clearProjectSearch(){
	document.getElementById("search_project_start_date").value="";
	document.getElementById("search_project_end_date").value="";
	document.getElementById("search_project_category").value="showOption";
	document.getElementById("search_project").value="showOption";
	document.getElementById("search_project").disabled="disabled";
	document.getElementById("search_project_agent").value="showOption";
	document.getElementById("search_project_company").value="";
}

//显示个人信息
function show_personal_info(){
	document.getElementById("personalInfo").style.display="block";
	form=document.getElementById("staff_form");
	form.reset();
	document.getElementById("staff_name").innerHTML=session[0].staff.name;
	document.getElementById("username").innerHTML=session[0].staff.username;
	form.telephone.value=session[0].staff.telephone;
}

//隐藏个人信息
function cancel_change_pwd(){
	document.getElementById("personalInfo").style.display="none";
}

//修改密码
function change_pwd(){
	form=document.getElementById("staff_form");
	var param;
	if(form.originalpwd.value!=session[0].staff.pwd){
		alert("原密码错误！");
		return;
	}
	if(form.newpwd.value!=form.renewpwd.value){
		alert("两次输入的密码不一致！");
		return;
	}
	if(form.originalpwd.value==form.newpwd.value){
		alert("新密码不能和原密码相同！");
		return;
	}
	if(form.newpwd.value!=""){
		param="pwd="+form.newpwd.value;
		session[0].staff.pwd=form.newpwd.value;
	}
	if(form.telephone.value!=""){
		param+="&telephone="+form.telephone.value;
		session[0].staff.telephone=form.telephone.value;
	}
	loader=loader=new net.AjaxRequest("UserServlet?action=update&nocache="+new Date().getTime(),
			deal_change_pwd,onerror,"POST",param); 	
}

//更改密码回调函数
function deal_change_pwd(){
	result=this.req.responseText;
	if(result=="1"){
		alert("修改信息成功！");
		cancel_change_pwd();
	}
	else{
		alert("修改失败！");
	}
}