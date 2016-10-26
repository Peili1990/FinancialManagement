package com.spring.hibernate.entities;

public class Bankaccount {
	
	private int id;
	private String name;
	private double openning;
	private double balance;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getBalance() {
		return balance;
	}
	public void setBalance(double balance) {
		this.balance = balance;
	}
	public double getOpenning() {
		return openning;
	}
	public void setOpenning(double openning) {
		this.openning = openning;
	}
	@Override
	public String toString() {
		return "Bankaccount [id=" + id + ", name=" + name + ", openning=" + openning + ", balance=" + balance + "]";
	}
	
	

}
