package com.spring.struts2.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;

import com.spring.hibernate.dao.EventManager;
import com.spring.hibernate.entities.Event;
import com.spring.hibernate.entities.Project;
import com.spring.hibernate.service.FinancialManagementService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * Servlet implementation class EventServlet
 */
@WebServlet("/EventServlet")
public class EventServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	ServletContext servletContext = null;
	ApplicationContext ctx = null;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EventServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		servletContext=getServletContext();
		ctx = (ApplicationContext) servletContext.getAttribute("ApplicationContext");
		String action=request.getParameter("action");
		if("getSelectOption".equals(action))
			this.getSelectOption(request,response);
		if("getBalance".equals(action))
			this.getBalance(request, response);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		servletContext=getServletContext();
		ctx = (ApplicationContext) servletContext.getAttribute("ApplicationContext");
		String action=request.getParameter("action");
		if("searchEvents".equals(action))
			this.searchEvents(request,response);
		if("saveOrUpdateData".equals(action))
			this.saveOrUpdateData(request,response);
		if("deleteData".equals(action))
			this.deleteData(request,response);
		if("doQuery".equals(action))
			this.doQuery(request,response);
		if("addExpenseName".equals(action))
			this.addExpenseName(request,response);
		if("getProject".equals(action))
			this.getProject(request,response);
		if("getProjectCategory".equals(action))
			this.getProjectCategory(request,response);
		if("addProject".equals(action))
			this.addProject(request,response);
	}
	
	public void searchEvents(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		List<?> events = null;
		String sql=request.getParameter("sql");
		if(request.getParameter("orderBy")!=null){
			sql+=" order by "+request.getParameter("orderBy");
		}
		events=ctx.getBean(EventManager.class).searchEvents(sql);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("categorys", events);
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(jsonObject);
		outResult(response, jsonArray.toString());
	}
	
	public void getProject(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException { 
		response.setCharacterEncoding("UTF-8");
		List<String> result;
		JSONObject jsonObject = new JSONObject();
		result=ctx.getBean(EventManager.class).getProject(request.getParameter("project_cate"));
		jsonObject.put("project", result);
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(jsonObject);
		outResult(response, jsonArray.toString());
	}
	
	public void getSelectOption(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException { 
		response.setCharacterEncoding("UTF-8");
		List<String> result;
		JSONObject jsonObject = new JSONObject();
		result=ctx.getBean(EventManager.class).getSelectOption("Bankaccount");
		jsonObject.put("Bankaccount", result);
		result=ctx.getBean(EventManager.class).getSelectOption("Employee");
		jsonObject.put("Employee", result);
		result=ctx.getBean(EventManager.class).getSelectOption("Expense");
		jsonObject.put("Expense", result);
		result=ctx.getBean(EventManager.class).getSelectOption("Company");
		jsonObject.put("Company", result);
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(jsonObject);
		outResult(response, jsonArray.toString());
	}
	
	public void saveOrUpdateData(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException{
		Event event=new Event();
		String result;
		event.setDate(request.getParameter("date"));
		event.setAccount(request.getParameter("account"));
		event.setExpense_name(request.getParameter("expense_name"));
		event.setDescription(request.getParameter("description"));
		event.setDebit(Double.parseDouble(request.getParameter("debit")));
		event.setCredit(Double.parseDouble(request.getParameter("credit")));
		event.setRemark(request.getParameter("remark"));
		event.setProject_id(Integer.parseInt(request.getParameter("project_id")));
		event.setBank_account(request.getParameter("bankaccount"));
		event.setPay_method(request.getParameter("pay_method"));
		event.setIsPublic(Integer.parseInt(request.getParameter("ispublic")));
		if(request.getParameter("id")!=null){
			event.setId(Integer.parseInt(request.getParameter("id")));	
			result=ctx.getBean(FinancialManagementService.class).updateData(event);
		}
		else {
			event.setId((int) new Date().getTime()); 
			result=ctx.getBean(FinancialManagementService.class).saveData(event);
		}
		outResult(response, result);	         //0表示保存数据失败，1表示成功
	}
	
	public void deleteData(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException{
		String result=ctx.getBean(FinancialManagementService.class).deleteData(Integer.parseInt(request.getParameter("id")));
		outResult(response, result);
	}
	
	public void getBalance(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		Map<?, ?> map=(Map<?,?>)(ctx.getBean(EventManager.class).getBalance(
				request.getParameter("year"),request.getParameter("authority")).get(0));
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("name", "收入");
		jsonObject.put("value", map.get("debit"));
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(jsonObject);
		jsonObject = new JSONObject();
		jsonObject.put("name", "支出");
		jsonObject.put("value", map.get("credit"));
		jsonArray.add(jsonObject);
		outResult(response, jsonArray.toString());	
	}
	
	public void doQuery(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		String query=request.getParameter("query");
		String year=request.getParameter("year");
		if(query.contains("e.date"))
			query=query.replace("e.date", "DATE_FORMAT(e.date,'%m月')");
		if(query.contains("where")){
			query+=" and e.date>='"+year+"-01-01' and e.date<='"+year+"-12-31' group by a;";
		}
		else{
			query+=" where e.date>='"+year+"-01-01' and e.date<='"+year+"-12-31' group by a;";
		}
		List<?> result=ctx.getBean(EventManager.class).doQuery(query);	
		Map<?, ?> map=null;
		JSONObject jsonObject=null;
		JSONArray jsonArray = new JSONArray();
		for(int i=0;i<result.size();i++){
			map=(Map<?,?>)result.get(i);
			if((Double)map.get("b")==0||map.get("a").equals(" "))
				continue;
			jsonObject=new JSONObject();
			jsonObject.put("name", map.get("a"));
			jsonObject.put("value", map.get("b"));
			jsonArray.add(jsonObject);
		}
		outResult(response, jsonArray.toString());
	}
	
	public void addExpenseName(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		String result=ctx.getBean(EventManager.class).saveExpenseName(request.getParameter("expense_name"));
		outResult(response, result);
	}
	
	public void getProjectCategory(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		String result=ctx.getBean(EventManager.class).getProjectCategory(request.getParameter("project_name"));
		List<String> result_set=ctx.getBean(EventManager.class).getProject(result);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("project", result_set);
		jsonObject.put("project_cate", result);
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(jsonObject);
		outResult(response, jsonArray.toString());
	}
	
	public void addProject(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		Project project=new Project();
		project.setName(request.getParameter("project"));
		project.setCategory(request.getParameter("project_cate"));
		System.out.println(project);
		String result=ctx.getBean(EventManager.class).saveProject(project);
		outResult(response, result);
	}
	
	public void outResult(HttpServletResponse response, String result) throws ServletException, IOException{
		PrintWriter out=response.getWriter();
		out.print(result);
		out.flush();
		out.close();
	}

}
