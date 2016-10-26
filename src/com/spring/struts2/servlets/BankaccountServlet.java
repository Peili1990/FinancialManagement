package com.spring.struts2.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;

import com.spring.hibernate.dao.BankaccountManager;
import com.spring.hibernate.entities.Bankaccount;
import com.spring.hibernate.entities.Bankaccountevent;
import com.spring.hibernate.service.FinancialManagementService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * Servlet implementation class BankaccountServlet
 */
@WebServlet("/BankaccountServlet")
public class BankaccountServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	ServletContext servletContext = null;
	ApplicationContext ctx = null;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BankaccountServlet() {
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
		if("getIntotal".equals(action))
			this.getIntotal(request,response);

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		servletContext=getServletContext();
		ctx = (ApplicationContext) servletContext.getAttribute("ApplicationContext");
		String action=request.getParameter("action");
		if("getBankaccountInfo".equals(action))
			this.getBankaccountInfo(request,response);
		if("searchBAEvents".equals(action))
			this.searchBAEvents(request,response);
		if("getBalance".equals(action))
			this.getBalance(request,response);
		if("doTransfer".equals(action))
			this.doTransfer(request,response);
	}
	
	public void outResult(HttpServletResponse response, String result) throws ServletException, IOException{
		PrintWriter out=response.getWriter();
		out.print(result);
		out.flush();
		out.close();
	}
	
	public void getBankaccountInfo(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		Bankaccount bankaccount=ctx.getBean(BankaccountManager.class).getBankaccountInfo(request.getParameter("name"));
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("bankaccount", bankaccount);
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(jsonObject);
		outResult(response, jsonArray.toString());
	}
	
	public void searchBAEvents(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		List<Bankaccountevent> result=ctx.getBean(BankaccountManager.class).searchBAEvents(request.getParameter("sql"));
		double balance=ctx.getBean(BankaccountManager.class).getBalance(request.getParameter("start_date"), 
				request.getParameter("name"));
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("balance", balance);
		jsonObject.put("BAevent", result);
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(jsonObject);
		outResult(response, jsonArray.toString());
	}
	
	public void getBalance(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		double balance=ctx.getBean(BankaccountManager.class).getBankaccountInfo(request.getParameter("name")).getBalance();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("balance",balance);
		jsonObject.put("labelID", request.getParameter("labelID"));
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(jsonObject);
		outResult(response, jsonArray.toString());
	}
	
	public void doTransfer(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		String result=ctx.getBean(FinancialManagementService.class).transfer(request.getParameter("from_account"),
				request.getParameter("to_account"), Double.parseDouble(request.getParameter("transfer_amount")));
		outResult(response, result);
	}
	
	public void getIntotal(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		List<Bankaccount> result=ctx.getBean(BankaccountManager.class).getAllBankaccount();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("BAaccount",result);
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(jsonObject);
		outResult(response, jsonArray.toString());
	}
	
}
