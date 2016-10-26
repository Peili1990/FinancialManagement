package com.spring.hibernate.dao.impl;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.hibernate.dao.UserManager;
import com.spring.hibernate.entities.Staff;

@Repository
public class UserManagerImpl implements UserManager {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public Session getSession(){
		return sessionFactory.getCurrentSession();
	}
	
	@Override
	public String findUserByUsername(String username){
		String hql="select s.username from Staff s where s.username= ? ";
		Query query=getSession().createQuery(hql);
		query.setParameter(0, username);
		if(query.list().size()==0)
			return "";
		else return (String) query.list().get(0);
	}

	@Override
	public String saveOrUpdateUser(Staff staff) {
		try{
			getSession().saveOrUpdate(staff);
			return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}

	@Override
	public Staff loginByUsernameAndPwd(Staff staff) {
		String hql="from Staff s where s.username = ?";
		Query query=getSession().createQuery(hql);
		query.setParameter(0, staff.getUsername());
		if(query.list().size()==0) 
			return null;
		Staff result=(Staff) query.list().get(0);
		if(staff.getPwd().equals(result.getPwd()))
			return result;
		return null;
	}

}
