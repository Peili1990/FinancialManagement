package com.spring.hibernate.entities;

public class Bankaccountevent {
	
	private int id;
	private String date;
	private String description;
	private double debit;
	private double credit;
	private String bank_account;
	private String pay_method;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getDebit() {
		return debit;
	}
	public void setDebit(double debit) {
		this.debit = debit;
	}
	public double getCredit() {
		return credit;
	}
	public void setCredit(double credit) {
		this.credit = credit;
	}
	public String getBank_account() {
		return bank_account;
	}
	public void setBank_account(String bank_account) {
		this.bank_account = bank_account;
	}
	public String getPay_method() {
		return pay_method;
	}
	public void setPay_method(String pay_method) {
		this.pay_method = pay_method;
	}
	@Override
	public String toString() {
		return "Bankaccountevent [id=" + id + ", date=" + date + ", description=" + description + ", debit=" + debit
				+ ", credit=" + credit + ", bank_account=" + bank_account + ", pay_method="
				+ pay_method + "]";
	}
	
	
	
	

}
