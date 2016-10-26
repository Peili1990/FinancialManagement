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

import com.spring.hibernate.dao.ProjectManager;
import com.spring.hibernate.entities.Project;
import com.spring.hibernate.entities.Projectevent;
import com.spring.hibernate.service.FinancialManagementService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * Servlet implementation class ProjectServlet
 */
@WebServlet("/ProjectServlet")
public class ProjectServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    public ProjectServlet() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    ServletContext servletContext = null;
	ApplicationContext ctx = null;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		servletContext=getServletContext();
		ctx = (ApplicationContext) servletContext.getAttribute("ApplicationContext");
		String action=request.getParameter("action");
	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		servletContext=getServletContext();
		ctx = (ApplicationContext) servletContext.getAttribute("ApplicationContext");
		String action=request.getParameter("action");
		if("saveOraddProject".equals(action))
			this.saveOraddProject(request,response);
		if("getProjectById".equals(action))
			this.getProjectById(request,response);
		if("addDebit".equals(action))
			this.addDebit(request,response);
		if("getProjecteventsByProjectId".equals(action))
			this.getProjecteventsByProjectId(request,response);
		if("getTotalBalance".equals(action))
			this.getTotalBalance(request,response);
		if("setProjectInvoiced".equals(action))
			this.setProjectInvoiced(request,response);
		if("deleteProject".equals(action))
			this.deleteProject(request,response);
		if("getProjectByCompany".equals(action))
			this.getProjectByCompany(request, response);
		if("addCompany".equals(action))
			this.addCompany(request,response);
	}
	
	private void saveOraddProject(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Project project=null;
		if(request.getParameter("id")!=null){
			project=ctx.getBean(ProjectManager.class).getProjectById(Integer.parseInt(request.getParameter("id")));
		}
		else{
			project=new Project();
		}
		int isinvoiced=Integer.parseInt(request.getParameter("isinvoiced"));
		double fund=Double.parseDouble(request.getParameter("project_fund"));
		project.setCategory(request.getParameter("project_cate"));
		project.setAgent(request.getParameter("project_agent"));
		project.setCompany(request.getParameter("project_company"));
		project.setDate(request.getParameter("project_date"));
		project.setIsinvoiced(isinvoiced);
		project.setRemark(request.getParameter("project_remark"));
		project.setBalance(isinvoiced==1?project.getBalance()-project.getFund()+fund:project.getBalance());
		project.setFund(fund);
		project.setName(request.getParameter("project"));
		project.setType(request.getParameter("project_type"));
		String result=ctx.getBean(ProjectManager.class).saveOrUpdateProject(project);
		outResult(response, result);
	}
	
	private void getProjectById(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		Project project=ctx.getBean(ProjectManager.class).getProjectById(Integer.parseInt(request.getParameter("project_id")));
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("project", project);
		if(project.getCompany()!=null){
			List<?> projects = ctx.getBean(ProjectManager.class).getProjectByCompany(project.getCompany());
			jsonObject.put("projects", projects);
		}		
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(jsonObject);
		outResult(response, jsonArray.toString());
	}
	
	private void addDebit(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String result=ctx.getBean(FinancialManagementService.class).addDebit(Integer.parseInt(request.getParameter("project_id")), 
				Double.parseDouble(request.getParameter("amount")), request.getParameter("description"));
		outResult(response, result);
	}
	
	private void getProjecteventsByProjectId(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		List<?> result=ctx.getBean(ProjectManager.class).getProjecteventsByProjectId(
				Integer.parseInt(request.getParameter("id")));
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("Projectevent", result);
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(jsonObject);
		outResult(response, jsonArray.toString());
	}
	
	private void getTotalBalance(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		List<Project> result=ctx.getBean(ProjectManager.class).getAllProjects(request.getParameter("hql"));
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("Project", result);
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(jsonObject);
		outResult(response, jsonArray.toString());
	}
	
	private void setProjectInvoiced(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String result=ctx.getBean(ProjectManager.class).setProjectInvoiced(Integer.parseInt(request.getParameter("id")));
		outResult(response, result);
	}
	
	private void deleteProject(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String result=ctx.getBean(FinancialManagementService.class).deleteDataByProjectId(Integer.parseInt(request.getParameter("id")));
		outResult(response, result);
	}
	
	private void getProjectByCompany(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		List<?> result;
		JSONObject jsonObject = new JSONObject();
		result=ctx.getBean(ProjectManager.class).getProjectByCompany(request.getParameter("company"));
		jsonObject.put("project", result);
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(jsonObject);
		outResult(response, jsonArray.toString());
	}
	
	private void addCompany(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String result=ctx.getBean(ProjectManager.class).addCompany(request.getParameter("company"));
		outResult(response, result);
	}
	
 	
	private void outResult(HttpServletResponse response, String result) throws ServletException, IOException{
		PrintWriter out=response.getWriter();
		out.print(result);
		out.flush();
		out.close();
	}

}
