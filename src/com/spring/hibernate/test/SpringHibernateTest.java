package com.spring.hibernate.test;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.commons.lang.ObjectUtils.Null;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.spring.hibernate.dao.BankaccountManager;
import com.spring.hibernate.dao.EventManager;
import com.spring.hibernate.dao.ProjectManager;
import com.spring.hibernate.dao.UserManager;
import com.spring.hibernate.entities.Bankaccount;
import com.spring.hibernate.entities.Bankaccountevent;
import com.spring.hibernate.entities.Event;
import com.spring.hibernate.entities.Project;
import com.spring.hibernate.entities.Projectevent;
import com.spring.hibernate.entities.Staff;
import com.spring.hibernate.service.FinancialManagementService;

public class SpringHibernateTest {
	
	private ApplicationContext ctx = null;
	private EventManager eventManager = null;
	private UserManager userManager = null;
	private BankaccountManager bankaccountManager = null;
	private ProjectManager projectManager = null;
	private FinancialManagementService financialManagementService= null;
	
	
	{
		ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
		eventManager=ctx.getBean(EventManager.class);
		userManager=ctx.getBean(UserManager.class);
		bankaccountManager=ctx.getBean(BankaccountManager.class);
		financialManagementService=ctx.getBean(FinancialManagementService.class);
		projectManager=ctx.getBean(ProjectManager.class);
		
	}

	@Test
	public void testDataSource() throws SQLException {
		DataSource dataSource = ctx.getBean(DataSource.class);
		System.out.println(dataSource.getConnection());
		
	}
	
	@Test
	public void testUserManager(){
		String result=userManager.findUserByUsername("123");
		System.out.println(result);
	}
	
	@Test
	public void testUserLogin(){
		Staff staff=new Staff();
		staff.setUsername("jack3173");
		staff.setPwd("yesterday");
		Staff result=userManager.loginByUsernameAndPwd(staff);
		System.out.println(result);
	}
	@Test
	public void testDeleteEvent(){
		eventManager.deleteEvent(428279813);
	}
	
	@Test
	public void testGetBalance(){
		List<?> result=eventManager.getBalance("2015","3");
		Map<?,?> map=(Map<?,?>)result.get(0);
		System.out.println(map.get("debit")+" "+map.get("credit"));
	}
	
	@Test
	public void testSaveProject(){
		Project project=new Project();
		project.setName("重钢");
		project.setCategory("水处理项目");
		eventManager.saveProject(project);
	}
	
	@Test
	public void testgetAccountinfo(){
		Bankaccount bankaccount=bankaccountManager.getBankaccountInfo("现金账户");
		System.out.println(bankaccount.toString());
	}
	
	@Test
	public void testEventToBAevent(){
		Event event=new Event();
		event.setId(1);
		event.setDate("2015-01-04");
		event.setBank_account("现金账户");
		event.setAccount("李雄伟");
		event.setCredit(305);
		event.setDebit(0);
		event.setIsPublic(0);
		event.setExpense_name("工资");
		event.setPay_method("现金");
		String result=financialManagementService.saveData(event);
	}
	
}
