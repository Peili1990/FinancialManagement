package com.spring.hibernate.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.hibernate.dao.ProjectManager;
import com.spring.hibernate.entities.Event;
import com.spring.hibernate.entities.Project;
import com.spring.hibernate.entities.Projectevent;

@Repository
public class ProjectManagerImpl implements ProjectManager {

	@Autowired
	private SessionFactory sessionFactory;
	
	public Session getSession(){
		return sessionFactory.getCurrentSession();
	}
	
	@Override
	public String saveOrUpdateProject(Project project) {
		try{
		getSession().saveOrUpdate(project);
		return "1";
		}catch(Exception e){
			return "0";
		}		
	}

	@Override
	public Project getProjectById(int id) {
		return getSession().get(Project.class, id);
	}
	
	@Override
	public Project getProjectByName(String name) {
		String hql="from Project p where p.name=?";
		Query query=getSession().createQuery(hql).setParameter(0, name);
		return (Project)query.list().get(0);
	}

	@Override
	public String addDebit(int id, double amount) {
		try{
		String sql="update Project p set p.balance=p.balance+"+amount+" where p.id="+id;
		getSession().createQuery(sql).executeUpdate();
		return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}

	@Override
	public boolean saveProjectevent(Projectevent projectevent) {
		try{
			getSession().saveOrUpdate(projectevent);
			return true;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}	
	}

	@Override
	public boolean deleteProjectevent(int id) {
		try{
			Projectevent projectevent=getSession().get(Projectevent.class, id);
			if(projectevent==null)
				return false;
			changeBalance(projectevent, null);
			getSession().delete(projectevent);
			return true;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<?> getProjecteventsByProjectId(int project_id) {
		String sql="select pe.*,p.name as name from Projectevent pe,Project p where pe.project_id=p.id "
				+ "and pe.project_id="+project_id+" order by pe.date";
		Query query=getSession().createSQLQuery(sql).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		return (List<?>) query.list();
	}

	@Override
	public Projectevent eventToPevent(Event event,String type) {
		Projectevent projectevent=new Projectevent();
		projectevent.setId(event.getId());
		projectevent.setDate(event.getDate());
		projectevent.setProject_id(event.getProject_id());
		projectevent.setDescription(event.getDescription());
		if(type.equals("first_party")){
			projectevent.setCredit(event.getCredit());
			projectevent.setDebit(0);
		}
		else{
			projectevent.setCredit(event.getDebit());
			projectevent.setDebit(0);
		}
		return projectevent;
	}

	@Override
	public void changeBalance(Projectevent oldPevent, Projectevent newPevent) {
		String sql;
		if(oldPevent==null){
			sql="update Project p set p.balance=p.balance-"+newPevent.getCredit()
						+"+"+newPevent.getDebit()+" where p.id="+newPevent.getProject_id();		
		}
		else if(newPevent==null){
			sql="update Project p set p.balance=p.balance+"+oldPevent.getCredit()
			+"-"+oldPevent.getDebit()+" where p.id="+oldPevent.getProject_id();
		}
		else {
			changeBalance(oldPevent, null);
			changeBalance(null, newPevent);
			return;
		}
		getSession().createSQLQuery(sql).executeUpdate();
	}

	@Override
	public Projectevent getProjecteventById(int id) {
		return getSession().get(Projectevent.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Project> getAllProjects(String hql) {
		Query query=getSession().createQuery(hql);
		return (List<Project>)query.list();
	}

	@Override
	public String setProjectInvoiced(int id) {
		try{
			String sql="update Project p set p.isinvoiced=1, p.balance=p.balance+p.fund where p.id="+id;
			getSession().createSQLQuery(sql).executeUpdate();
			return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}

	@Override
	public String replaceProjectName(String oldname, String newname) {
		try{
			String sql="update Projectevent p set p.name='"+newname+"' where p.name='"+oldname+"'";
			getSession().createSQLQuery(sql).executeUpdate();
			return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}

	@Override
	public String deleteProjectById(int id) {
		try{
			String sql="delete from Projectevent where project_id="+id;
			getSession().createSQLQuery(sql).executeUpdate();
			sql="delete from Project where id="+id;
			getSession().createSQLQuery(sql).executeUpdate();
			return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}

	@Override
	public List<?> getProjectByCompany(String company_name) {
		String sql="select p.id as id,p.name as name from Project p where p.company='"+company_name+"'";
		Query query=getSession().createQuery(sql).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		return (List<?>) query.list();
	}

	@Override
	public String addCompany(String name) {
		String sql="insert into Company(Name) VALUES ('"+name+"')";
		try{
			getSession().createSQLQuery(sql).executeUpdate();
			return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}


}
