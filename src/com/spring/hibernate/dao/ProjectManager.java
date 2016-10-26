package com.spring.hibernate.dao;

import java.util.List;

import com.spring.hibernate.entities.Event;
import com.spring.hibernate.entities.Project;
import com.spring.hibernate.entities.Projectevent;

public interface ProjectManager {
	
	public String saveOrUpdateProject(Project project);
	
	public Project getProjectById(int id);
	
	public Project getProjectByName(String name);
	
	public String addDebit(int id,double amount);
	
	public boolean saveProjectevent(Projectevent projectevent);
	
	public boolean deleteProjectevent(int id);
	
	public List<?> getProjecteventsByProjectId(int project_id);
	
	public Projectevent eventToPevent(Event event,String type);
	
	public void changeBalance(Projectevent oldPevent, Projectevent newPevent);
	
	public Projectevent getProjecteventById(int id);
	
	public List<Project> getAllProjects(String type);
	
	public String setProjectInvoiced(int id);
	
	public String replaceProjectName(String oldname,String newname);
	
	public String deleteProjectById(int id);
	
	public List<?> getProjectByCompany(String company_name);
	
	public String addCompany(String name);

}
