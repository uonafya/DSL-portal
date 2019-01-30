package com.healthit.metadata.model.query;

import com.healthit.metadata.model.OrgUnitName;
import com.healthit.metadata.model.PeriodType;

/**
 * Model to hold values for a query.
 *
 * @author duncan
 */
public class QueryParameters {

    private String startYear;
    private String endYear;
    private String startMonth;
    private String endMonth;
    private OrgUnitName orgUnitName;
    private PeriodType periodType;
    private String orgId;

    public OrgUnitName getOrgUnitName() {
        return orgUnitName;
    }

    public PeriodType getPeriodType() {
        return periodType;
    }

    public String getStartYear() {
        return startYear;
    }

    public String getEndYear() {
        return endYear;
    }

    public String getStartMonth() {
        return startMonth;
    }

    public String getEndMonth() {
        return endMonth;
    }

    public String getOrgId() {
        return orgId;
    }

    private QueryParameters(String startYear, String endYear, String startMonth, String endMonth, String orgId) {
        this.endMonth = endMonth;
        this.startYear = startYear;
        this.endYear = endYear;
        this.startMonth = startMonth;
        this.endMonth = endMonth;
        this.orgId = orgId;
    }

    public static class QueryParametersBuilder {

        private String startYear;
        private String endYear;
        private String startMonth;
        private String endMonth;
        private String orgId;
        private OrgUnitName orgUnitName;
        private PeriodType periodType;

        public QueryParametersBuilder() {
        }

        public QueryParametersBuilder setStartYear(String startYear) {
            this.startYear = startYear;
            return this;
        }

        public QueryParametersBuilder setEndYear(String endYear) {
            this.endYear = endYear;
            return this;
        }

        public QueryParametersBuilder setOrgUnitName(OrgUnitName orgUnitName) {
            this.orgUnitName = orgUnitName;
            return this;
        }

        public QueryParametersBuilder setPeriodType(PeriodType periodType) {
            this.periodType = periodType;
            return this;
        }

        public QueryParametersBuilder setStartMonth(String startMonth) {
            this.startMonth = startMonth;
            return this;
        }

        public QueryParametersBuilder setEndMonth(String endMonth) {
            this.endMonth = endMonth;
            return this;
        }

        public QueryParametersBuilder setOrgId(String orgId) {
            this.orgId = orgId;
            return this;
        }

        public QueryParameters build() {
            return new QueryParameters(startYear, endYear, startMonth, endMonth, orgId);
        }

    }

}
