package com.spring.struts2.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
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

import com.spring.hibernate.dao.EmployeeManager;
import com.spring.hibernate.entities.Event;
import com.spring.hibernate.service.FinancialManagementService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * Servlet implementation class EmployeeServlet
 */
@WebServlet("/EmployeeServlet")
public class EmployeeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
          
	ServletContext servletContext = null;
	ApplicationContext ctx = null;
	/**
     * @see HttpServlet#HttpServlet()
     */
    public EmployeeServlet() {
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
		if("getAllEmployee".equals(action))
			this.getAllEmployee(request,response);
		if("getHistoricTitle".equals(action))
			this.getHistoricTitle(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		servletContext=getServletContext();
		ctx = (ApplicationContext) servletContext.getAttribute("ApplicationContext");
		String action=request.getParameter("action");
		if("addSubfee".equals(action))
			this.addSubfee(request,response);
		if("addEmployee".equals(action))
			this.addEmployee(request,response);
		if("deleteSubfee".equals(action))
			this.deleteSubfee(request, response);
		if("deleteEmployee".equals(action))
			this.deleteEmployee(request,response);
		if("changeValue".equals(action))
			this.changeValue(request, response);
		if("saveForm".equals(action))
			this.saveForm(request,response);
		if("getHistoricBytitle".equals(action))
			this.getHistoricBytitle(request,response);
		if("payoff".equals(action))
			this.payoff(request,response);
	}
	
	public void getAllEmployee(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		List<String> colname=ctx.getBean(EmployeeManager.class).getAllColunmName();
		List<?> employees=ctx.getBean(EmployeeManager.class).getAllEmployee();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("colname", colname);
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(jsonObject);
		Map<?, ?> map=null;
		for(int i=0;i<employees.size();i++){
			jsonObject=new JSONObject();
			for(int j=1;j<colname.size();j++){
				map = (Map<?, ?>) employees.get(i);
				jsonObject.put(j, map.get(colname.get(j)));
			}
			jsonArray.add(jsonObject);
		}
		outResult(response, jsonArray.toString());
		
	}
	
	public void addSubfee(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		String result=ctx.getBean(EmployeeManager.class).addSubfee(request.getParameter("name"));
		outResult(response, result);
	}
	
	public void deleteSubfee(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		String result=ctx.getBean(EmployeeManager.class).deleteSubfee(request.getParameter("name"));
		outResult(response, result);
	}
	
	public void deleteEmployee(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		String result=ctx.getBean(EmployeeManager.class).deleteEmployee(request.getParameter("name"));
		outResult(response, result);
	}
	
	public void addEmployee(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		String result=ctx.getBean(EmployeeManager.class).addEmployee(request.getParameter("name"));
		outResult(response, result);
	}
	
	public void changeValue(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		String result=ctx.getBean(EmployeeManager.class).changeValue(request.getParameter("employee_name"),
				request.getParameter("expense_name"), Double.parseDouble(request.getParameter("value")));
		outResult(response, result);
	}
	
	public void saveForm(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		String result=ctx.getBean(EmployeeManager.class).saveForm(request.getParameter("title"), request.getParameter("text"));
		outResult(response, result);
	}
	
	public void getHistoricTitle(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		response.setCharacterEncoding("UTF-8");
		List<String> titles=ctx.getBean(EmployeeManager.class).getHistoricTitle();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("title", titles);
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(jsonObject);
		outResult(response, jsonArray.toString());
	}
	
	public void getHistoricBytitle(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		response.setCharacterEncoding("UTF-8");
		String text=ctx.getBean(EmployeeManager.class).getHistoricByTitle(request.getParameter("title"));
		outResult(response, text);
	}
	
	public void payoff(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		String json=request.getParameter("json");
		JSONArray jsonArray=JSONArray.fromObject(json);
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObject=jsonArray.getJSONObject(i);
			Event event=new Event();
			event.setId((int) new Date().getTime());
			event.setAccount(jsonObject.getString("emp"));
			event.setBank_account("现金账户");
			event.setDate(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
			event.setDebit(0);
			event.setCredit(Double.parseDouble(jsonObject.getString("salary")));
			event.setDescription(jsonObject.getString("discription"));
			event.setExpense_name("工资");
			event.setIsPublic(0);
			event.setPay_method("现金");
			event.setProject_id(0);
			ctx.getBean(FinancialManagementService.class).saveData(event);
		}
	}
	
	private void outResult(HttpServletResponse response, String result) throws ServletException, IOException{
		PrintWriter out=response.getWriter();
		out.print(result);
		out.flush();
		out.close();
	}
	

}
