package com.spring.hibernate.dao;

import java.util.*;

import com.spring.hibernate.entities.Event;
import com.spring.hibernate.entities.Project;;

public interface EventManager {
	
	public List<String> getSelectOption(String table);
	
	public List<String> getProject(String project_cate);
	
	public boolean saveOrUpdateEvent(Event event);
	
	public String deleteEvent(int id);
	
	public List<?> getBalance(String year,String authority);
	
	public List<?> doQuery(String statement);
	
	public String saveExpenseName(String name);
	
	public String getProjectCategory(String name);
	
	public String saveProject(Project project);
	
	public List<?> searchEvents(String sql);
	
	public String replaceProjectName(String oldname,String newname);
}
