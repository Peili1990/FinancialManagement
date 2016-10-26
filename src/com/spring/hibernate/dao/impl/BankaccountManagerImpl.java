package com.spring.hibernate.dao.impl;

import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.hibernate.dao.BankaccountManager;
import com.spring.hibernate.entities.Bankaccount;
import com.spring.hibernate.entities.Bankaccountevent;
import com.spring.hibernate.entities.Event;

@Repository
public class BankaccountManagerImpl implements BankaccountManager {

	@Autowired
	private SessionFactory sessionFactory;
	
	public Session getSession(){
		return sessionFactory.getCurrentSession();
	}
	
	@Override
	public Bankaccount getBankaccountInfo(String name) {
		String hql="from Bankaccount b where b.name=?";
		Query query=getSession().createQuery(hql);
		query.setParameter(0, name);
		return (Bankaccount) query.list().get(0);
	}

	@Override
	public void changeBalance(Bankaccountevent oldBAevent, Bankaccountevent newBAevent) {
		String sql;
		if(oldBAevent==null){
			sql="update Bankaccount b set b.balance=b.balance-"+newBAevent.getCredit()
						+"+"+newBAevent.getDebit()+" where b.name='"+newBAevent.getBank_account()+"'";		
		}
		else if(newBAevent==null){
			sql="update Bankaccount b set b.balance=b.balance+"+oldBAevent.getCredit()
			+"-"+oldBAevent.getDebit()+" where b.name='"+oldBAevent.getBank_account()+"'";
		}
		else {
			changeBalance(oldBAevent, null);
			changeBalance(null, newBAevent);
			return;
		}
		getSession().createSQLQuery(sql).executeUpdate();
	
	}

	@Override
	public boolean saveBankaccountevent(Bankaccountevent bankaccountevent) {
		try{
			getSession().saveOrUpdate(bankaccountevent);
			return true;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public Bankaccountevent eventToBAevent(Event event) {
		Bankaccountevent bankaccountevent=new Bankaccountevent();
		bankaccountevent.setId(event.getId());
		bankaccountevent.setBank_account(event.getBank_account());
		bankaccountevent.setDate(event.getDate());
		bankaccountevent.setDebit(event.getDebit());
		bankaccountevent.setCredit(event.getCredit());
		bankaccountevent.setDescription(event.getDescription());
		bankaccountevent.setPay_method(event.getPay_method());
		return bankaccountevent;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Bankaccountevent> searchBAEvents(String sql) {
		Query query=getSession().createSQLQuery(sql).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);;
		return (List<Bankaccountevent>) query.list();
	}

	@Override
	public double getBalance(String start_date,String name) {
		String sql="select b.openning from Bankaccount b where b.name='"+name+"'";
		double balance=(double) getSession().createSQLQuery(sql).list().get(0);
		if(start_date==null)
			return balance;
		else{
		sql="select sum(b.debit) debit, sum(b.credit) credit from Bankaccountevent b where b.bank_account='"+name+
				"' and b.date<'"+start_date+"'";
		Query query=getSession().createSQLQuery(sql).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		Map<?, ?> map=(Map<?,?>)query.list().get(0);
		if(map.get("credit")==null){
			return balance;
		}
		return balance-(double)map.get("credit")+(double)map.get("debit");
		}
				
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Bankaccount> getAllBankaccount() {
		String hql="from Bankaccount b";
		Query query=getSession().createQuery(hql);
		return (List<Bankaccount>)query.list();
	}

	@Override
	public String deleteBankaccountevent(int id) {
		try{
			Bankaccountevent bankaccountevent=getSession().get(Bankaccountevent.class, id);
			changeBalance(bankaccountevent, null);
			getSession().delete(bankaccountevent);
			return "1";
		}catch(Exception e){
			e.printStackTrace();
			return "0";
		}
	}

	@Override
	public Bankaccountevent getBAeventbyID(int id) {
		return getSession().get(Bankaccountevent.class,id);
	}

}
