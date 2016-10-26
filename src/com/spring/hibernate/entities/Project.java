package com.spring.hibernate.entities;

public class Project {
	
	private int id;
	private String date;
	private String name;
	private String category;
	private String company;
	private String type;
	private double fund;
	private double balance;
	private String remark;
	private String agent;
	private int isinvoiced;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public double getBalance() {
		return balance;
	}
	public void setBalance(double balance) {
		this.balance = balance;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public double getFund() {
		return fund;
	}
	public void setFund(double fund) {
		this.fund = fund;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getAgent() {
		return agent;
	}
	public void setAgent(String agent) {
		this.agent = agent;
	}
	public int getIsinvoiced() {
		return isinvoiced;
	}
	public void setIsinvoiced(int isinvoiced) {
		this.isinvoiced = isinvoiced;
	}
	@Override
	public String toString() {
		return "Project [id=" + id + ", date=" + date + ", name=" + name + ", category=" + category + ", company="
				+ company + ", type=" + type + ", fund=" + fund + ", balance=" + balance + ", remark=" + remark
				+ ", agent=" + agent + ", isinvoiced=" + isinvoiced + "]";
	}
}
