package com.spring.hibernate.entities;

public class Projectevent {
	
	private int id;
	private String date;
	private String description;
	private double debit;
	private double credit;
	private int project_id;
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
	public int getProject_id() {
		return project_id;
	}
	public void setProject_id(int project_id) {
		this.project_id = project_id;
	}
	@Override
	public String toString() {
		return "Projectevent [id=" + id + ", date=" + date + ", description=" + description + ", debit=" + debit
				+ ", credit=" + credit + ", project_id=" + project_id + "]";
	}
	
	
}
