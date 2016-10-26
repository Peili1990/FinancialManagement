package com.spring.hibernate.entities;

public class Staff {
	
	private int id;
	private String name;
	private int authority;
	private String username;
	private String pwd;
	private String telephone;
	
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
	public int getAuthority() {
		return authority;
	}
	public void setAuthority(int authority) {
		this.authority = authority;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	@Override
	public String toString() {
		return "Staff [id=" + id + ", name=" + name + ", authority=" + authority + ", username=" + username + ", pwd="
				+ pwd + ", telephone=" + telephone + "]";
	}
	
	
}
