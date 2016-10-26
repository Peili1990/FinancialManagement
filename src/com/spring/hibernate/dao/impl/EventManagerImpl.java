package com.spring.hibernate.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.hibernate.dao.EventManager;
import com.spring.hibernate.entities.Event;
import com.spring.hibernate.entities.Project;

@SuppressWarnings("unchecked")
@Repository
public class EventManagerImpl implements EventManager {

	@Autowired
	private SessionFactory sessionFactory;
	
	public Session getSession(){
		return sessionFactory.getCurrentSession();
	}

	@Override
	public List<String> getSelectOption(String table) {
		String hql="select tb.name from "+table+" tb";
		Query query=getSession().createQuery(hql);
		return (List<String>) query.list();
	}

	@Override
	public List<String> getProject(String project_cate) {
		String hql="select p.name from Project p where p.category=?";
		Query query=getSession().createQuery(hql);
		query.setParameter(0, project_cate);
		return (List<String>) query.list();
	}

	@Override
	public boolean saveOrUpdateEvent(Event event) {
		try{
			getSession().saveOrUpdate(event);
			return true;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public String deleteEvent(int id) {
		try{
			Event event=getSession().get(Event.class,new Integer(id));
			getSession().delete(event);
			return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}

	@Override
	public List<?> getBalance(String year,String authority) {
		String sql="select sum(e.debit) debit,sum(e.credit) credit from Event e where e.date>='"+year+"-01-01' and e.date<='"
				+year+"-12-31'";
		if(Integer.parseInt(authority)<4){
			sql+="and e.ispublic=0";
		}
		Query query=getSession().createSQLQuery(sql).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		return query.list();
	}

	@Override
	public List<?> doQuery(String statement) {
		Query query=getSession().createSQLQuery(statement).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		return query.list();
	}
	
	@Override
	public String saveExpenseName(String name) {
		String sql="insert into Expense(Name) VALUES ('"+name+"')";
		try{
			getSession().createSQLQuery(sql).executeUpdate();
			return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}

	@Override
	public String getProjectCategory(String name) {
		String hql="select p.category from Project p where p.name=?";
		Query query=getSession().createQuery(hql);
		query.setParameter(0, name);
		return (String) query.list().get(0);
	}

	@Override
	public String saveProject(Project project) {
		try{
			getSession().save(project);
			return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}

	@Override
	public List<?> searchEvents(String sql) {
		Query query=getSession().createSQLQuery(sql).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);;
		return (List<?>) query.list();
	}

	@Override
	public String replaceProjectName(String oldname,String newname) {
		try{
			String sql="update Event e set e.project_name='"+newname+"' where e.project_name='"+oldname+"'";
			getSession().createSQLQuery(sql).executeUpdate();
			return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}

}
