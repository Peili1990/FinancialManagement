package com.spring.hibernate.dao;

import com.spring.hibernate.entities.Staff;

public interface UserManager {
	
	public String findUserByUsername(String username);
	
	public String saveOrUpdateUser(Staff staff);
	
	public Staff loginByUsernameAndPwd(Staff staff);

}
