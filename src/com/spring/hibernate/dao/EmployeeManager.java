package com.spring.hibernate.dao;

import java.util.List;

public interface EmployeeManager {
	
	public List<?> getAllEmployee();
	
	public List<String> getAllColunmName();
	
	public String addSubfee(String name);
	
	public String addEmployee(String name);
	
	public String deleteSubfee(String name);
	
	public String deleteEmployee(String name);
	
	public String changeValue(String emp,String exp,double value);
	
	public String saveForm(String title,String text);
	
	public List<String> getHistoricTitle();
	
	public String getHistoricByTitle(String title);

}
