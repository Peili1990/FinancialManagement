package com.spring.hibernate.dao;

import java.util.List;

import com.spring.hibernate.entities.Bankaccount;
import com.spring.hibernate.entities.Bankaccountevent;
import com.spring.hibernate.entities.Event;

public interface BankaccountManager {
	
	public Bankaccount getBankaccountInfo(String name);
	
	public void changeBalance(Bankaccountevent oldBAevent,Bankaccountevent newBAevent);
	
	public boolean saveBankaccountevent(Bankaccountevent bankaccountevent);
	
	public Bankaccountevent eventToBAevent(Event event);
	
	public List<Bankaccountevent> searchBAEvents(String sql);
	
	public double getBalance(String start_date,String name);

	public List<Bankaccount> getAllBankaccount();
	
	public Bankaccountevent getBAeventbyID(int id);
	
	public String deleteBankaccountevent(int id);
}
