package com.spring.hibernate.service;

import com.spring.hibernate.entities.Event;

public interface FinancialManagementService {
	
	public String saveData(Event event);
	
	public String deleteData(int id);
	
	public String updateData(Event event);
	
	public String transfer(String from_account,String to_account,double transfer_amount);
	
	public String addDebit(int project_id, double amount, String description);
	
	public String replaceProjectName(String newname,String oldname);
	
	public String deleteDataByProjectId(int project_id);

}
