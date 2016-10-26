package com.spring.hibernate.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.hibernate.dao.EmployeeManager;
@Repository
public class EmployeeManagerImpl implements EmployeeManager {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public Session getSession(){
		return sessionFactory.getCurrentSession();
	}

	@Override
	public List<?> getAllEmployee() {
		String sql="select * from Employee";
		Query query=getSession().createSQLQuery(sql).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		return query.list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<String> getAllColunmName() {
		String sql="select COLUMN_NAME from information_schema.COLUMNS where table_name = 'EMPLOYEE'";
		Query query=getSession().createSQLQuery(sql);
		return (List<String>)query.list();
		
	}

	@Override
	public String addSubfee(String name) {
		String sql="alter table EMPLOYEE add column "+name+" decimal(10,2) null default 0";
		getSession().createSQLQuery(sql).executeUpdate();
		return "1";	
	}

	@Override
	public String addEmployee(String name) {
		String sql="insert into EMPLOYEE (姓名) values ('"+name+"')";
		getSession().createSQLQuery(sql).executeUpdate();
		return "1";	
	}

	@Override
	public String deleteSubfee(String name) {
		String sql="alter table EMPLOYEE drop column "+ name;
		getSession().createSQLQuery(sql).executeUpdate();
		return "1";
	}

	@Override
	public String deleteEmployee(String name) {
		String sql="delete from EMPLOYEE where 姓名='"+name+"'";
		getSession().createSQLQuery(sql).executeUpdate();
		return "1";
	}

	@Override
	public String changeValue(String emp, String exp, double value) {
		String sql="update Employee e set e."+exp+" = "+value;
		if(emp!=null){
			sql+=" where e.姓名='"+emp+"'";
		}
		getSession().createSQLQuery(sql).executeUpdate();
		return "1";
	}

	@Override
	public String saveForm(String title, String text) {
		String sql="insert into HISTORIC (title,html) value ('"+title+"','"+text+"')";
		getSession().createSQLQuery(sql).executeUpdate();
		return "1";	
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<String> getHistoricTitle() {
		String sql="select h.title from Historic h";
		Query query=getSession().createSQLQuery(sql);
		return (List<String>)query.list();
	}

	@Override
	public String getHistoricByTitle(String title) {
		String sql="select h.html from Historic h where h.title='"+title+"'";
		return (String)getSession().createSQLQuery(sql).list().get(0);
	}

}
