package com.spring.hibernate.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.hibernate.dao.BankaccountManager;
import com.spring.hibernate.dao.EventManager;
import com.spring.hibernate.dao.ProjectManager;
import com.spring.hibernate.entities.Bankaccountevent;
import com.spring.hibernate.entities.Event;
import com.spring.hibernate.entities.Project;
import com.spring.hibernate.entities.Projectevent;
import com.spring.hibernate.service.FinancialManagementService;

@Service
public class FinancialManagementServiceImpl implements FinancialManagementService {
	
	@Autowired
	private BankaccountManager bankaccountManager;
	
	@Autowired
	private EventManager eventManager; 
	
	@Autowired
	private ProjectManager projectManager;
	
	@Transactional
	@Override
	public String saveData(Event event) {
		try{
		eventManager.saveOrUpdateEvent(event);
		Bankaccountevent bankaccountevent=bankaccountManager.eventToBAevent(event);
		saveBAevent(bankaccountevent);
			if (event.getProject_id()>2||event.getProject_id()<0) {
				Project project = projectManager.getProjectById(event.getProject_id());
				if (project.getType().equals("first_party") && event.getCredit() != 0
						|| project.getType().equals("second_party") && event.getDebit() != 0) {
					Projectevent projectevent = projectManager.eventToPevent(event, project.getType());
					savePevent(projectevent);
				}
			}
		return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}
	
	@Transactional
	@Override
	public String transfer(String from_account, String to_account, double transfer_amount) {
		try{
			Bankaccountevent bankaccountevent = new Bankaccountevent();
			bankaccountevent.setId((int) new Date().getTime());
			bankaccountevent.setBank_account(from_account);
			bankaccountevent.setCredit(transfer_amount);
			bankaccountevent.setDebit(0);
			bankaccountevent.setDescription("公司内部转账");
			bankaccountevent.setPay_method("转账");
			bankaccountevent.setDate(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
			saveBAevent(bankaccountevent);
			bankaccountevent.setId((int) new Date().getTime());
			bankaccountevent.setDebit(transfer_amount);
			bankaccountevent.setCredit(0);
			bankaccountevent.setBank_account(to_account);
			saveBAevent(bankaccountevent);
			return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}
	
	public boolean saveBAevent(Bankaccountevent bankaccountevent){
		bankaccountManager.changeBalance(null, bankaccountevent);
		return bankaccountManager.saveBankaccountevent(bankaccountevent);
	}
	
	public boolean savePevent(Projectevent projectevent){
		projectManager.changeBalance(null, projectevent);
		return projectManager.saveProjectevent(projectevent);
	}

	@Transactional
	@Override
	public String updateData(Event event) {
		try{
			deleteData(event.getId());
			saveData(event);
			return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}

	@Transactional
	@Override
	public String deleteData(int id) {
		try{
			eventManager.deleteEvent(id);
			bankaccountManager.deleteBankaccountevent(id);
			projectManager.deleteProjectevent(id);
			return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}

	@Transactional
	@Override
	public String addDebit(int project_id, double amount,String description) {
		try{
			projectManager.addDebit(project_id, amount);
			Projectevent projectevent=new Projectevent();
			projectevent.setId((int) new Date().getTime());
			projectevent.setDebit(amount);
			projectevent.setDescription(description);
			projectevent.setCredit(0);
			projectevent.setDate(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
			projectevent.setProject_id(project_id);
			projectManager.saveProjectevent(projectevent);
			return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}
	
	@Transactional
	@Override
	public String replaceProjectName(String newname, String oldname) {
		try{
			eventManager.replaceProjectName(oldname, newname);
			projectManager.replaceProjectName(oldname, newname);
			return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}

	@Transactional
	@Override
	public String deleteDataByProjectId(int project_id) {
		try{
			String sql="select e.* from Event e, Project p where e.project_id=p.id and p.id="+project_id;
			List<?> events=eventManager.searchEvents(sql);
			for(int i=0;i<events.size();i++){
				Map<?,?> map=(Map<?, ?>)events.get(i);
				deleteData((int) map.get("id"));
			}
			projectManager.deleteProjectById(project_id);
			return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}


}
