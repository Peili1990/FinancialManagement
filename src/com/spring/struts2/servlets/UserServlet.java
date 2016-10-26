package com.spring.struts2.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.context.ApplicationContext;

import com.spring.hibernate.dao.UserManager;
import com.spring.hibernate.entities.Staff;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * Servlet implementation class UserServlet
 */
@WebServlet("/UserServlet")
public class UserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	ServletContext servletContext = null;
	ApplicationContext ctx = null;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserServlet() {
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
		if("checkUser".equals(action))
			this.checkUser(request,response);
		if("getSession".equals(action))
			this.getSession(request,response);
		if("logout".equals(action))
			this.logout(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		servletContext=getServletContext();
		ctx = (ApplicationContext) servletContext.getAttribute("ApplicationContext");
		String action=request.getParameter("action");
		System.out.println(request.getParameter("name"));
		if("save".equals(action))
			this.save(request,response);
		if("login".equals(action))
			this.login(request,response);
		if("update".equals(action))
			this.update(request,response);
	}
	
	private void update(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session=request.getSession();
		Staff staff=(Staff) session.getAttribute("curUser");
		if(!request.getParameter("pwd").equals(""))
			staff.setPwd(request.getParameter("pwd"));
		if(!request.getParameter("telephone").equals(""))
			staff.setTelephone(request.getParameter("telephone"));
		String result=ctx.getBean(UserManager.class).saveOrUpdateUser(staff);  //0表示没有注册成功，1表示注册成功
		PrintWriter out=response.getWriter();
		out.print(result);
		out.flush();
		out.close();
	}

	public void checkUser(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username=request.getParameter("username");
		String result=ctx.getBean(UserManager.class).findUserByUsername(username);
		if(result.equals(username))
			result="0";
		else result="1";  //0表示该用户名已被注册，1表示没有被注册
		PrintWriter out=response.getWriter();
		out.print(result);
		out.flush();
		out.close();
	}
	
	public void save(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Staff staff=new Staff();
		staff.setName(request.getParameter("name"));
		staff.setUsername(request.getParameter("username"));
		staff.setPwd(request.getParameter("pwd"));
		staff.setTelephone(request.getParameter("telephone"));
		staff.setAuthority(1);
		System.out.println(staff);
		String result=ctx.getBean(UserManager.class).saveOrUpdateUser(staff);  //0表示没有注册成功，1表示注册成功
		PrintWriter out=response.getWriter();
		out.print(result);
		out.flush();
		out.close();
	}
	
	public void login(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Staff staff=new Staff();
		staff.setUsername(request.getParameter("username"));
		staff.setPwd(request.getParameter("pwd"));
		staff=ctx.getBean(UserManager.class).loginByUsernameAndPwd(staff);
		PrintWriter out=response.getWriter();
		if(staff!=null){
			HttpSession session=request.getSession();
			session.setAttribute("curUser", staff);
			out.print("1");           //1表示登录成功，0表示登录失败
		}
		else{
			out.print("0");
		}
		out.flush();
		out.close();
	}
	
	public void getSession(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session=request.getSession();
		Staff staff=(Staff) session.getAttribute("curUser");
		if(staff!=null){
			response.setCharacterEncoding("UTF-8");
			PrintWriter out=response.getWriter();
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("staff", staff);
			JSONArray jsonArray = new JSONArray();
			jsonArray.add(jsonObject);
			out.print(jsonArray.toString());
			out.flush();
			out.close();
		}	
	}
	
	public void logout(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session=request.getSession();
		session.removeAttribute("curUser");
	}

}
