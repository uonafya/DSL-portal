/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.metadata.model;

/**
 *
 * @author duncan
 */
public class RequestEntity {
    private String subject;
    private String orgUnitID;
    private OrgUnitName orgUnitName;
    private String periodType;
    private String period;

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public OrgUnitName getOrgUnitName() {
        return orgUnitName;
    }

    public void setOrgUnitName(OrgUnitName orgUnitName) {
        this.orgUnitName = orgUnitName;
    }

    public String getOrgUnitID() {
        return orgUnitID;
    }

    public void setOrgUnitID(String orgUnitID) {
        this.orgUnitID = orgUnitID;
    }

    
    public String getPeriodType() {
        return periodType;
    }

    public void setPeriodType(String periodType) {
        this.periodType = periodType;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }
    
    
}
