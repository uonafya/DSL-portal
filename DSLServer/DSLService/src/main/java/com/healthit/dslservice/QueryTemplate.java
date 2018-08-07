/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.dslservice;

/**
 *
 * @author duncan
 */
public class QueryTemplate {
//    static final String SELECT ="SELECT {%s}.{%s} as {%s} from";
//    static final String field = "{%s}.{%s} as {%s}";
//    static final String JOIN_CAST_VARCHAR = "inner join {%s} on CAST ({%s}.{%s} AS Varchar)= CAST ({%s}.{%s} AS Varchar)";
//    static final String JOIN = "inner join {%s} on {%s}.{%s} = {%s}.{%s}";
//    static final String DEEP_JOIN = "inner join {%s} on {%s}.{%s} = {%s}.{%s}";

    public static  String KEMPSA = "inner join ( select * from fact_kemsa_order_dsl) "
            + "kemsa on CAST(kemsa.mfl as VARCHAR) =CAST(dhis.mfl_code as VARCHAR) ";
    
    public static  String IHRIS = "inner join ( select * from vw_mohdsl_ihris) ihris on "
            + "CAST(ihris.\"MFL Code\" as VARCHAR) =CAST(dhis.mfl_code as VARCHAR) ";
    
    public static  String DHIS_MFL = "from( select dhis.\"Indicator ID\" as indicator_id, dhis.\"Indicator name\" as indicator_name,\n"
            + "    dhis.kpivalue as kpivalue,dhis.code as mfl_code,facility.name as facility_name,facility.owner_id as facility_owner,\n"
            + "    facility.sub_county_id as sub_county_id,facility.facilitystatus_sk as facility_status_sl,\n"
            + "    facility.ward_id as ward_id,facility.facility_type_id as facility_type_id,\n"
            + "    facility.keph_level_id as keph_level_id FROM vw_mohdsl_dhis dhis\n"
            + "    inner join facilities_facility facility on CAST (dhis.code AS Varchar)= CAST (facility.code AS Varchar) )  dhis ";

    public static  String SELECT = "SELECT\n"
            + "dhis.indicator_id as indicator_id, dhis.indicator_name as indicator_name,dhis.kpivalue as kpivalue,\n"
            + "dhis.mfl_code  as mfl_code,dhis.facility_name as facility_name,dhis.facility_owner as facility_owner,\n"
            + "dhis.sub_county_id  as sub_county_id,dhis.facility_status_sl  as facility_status_sl,dhis.ward_id  as ward_id,\n"
            + "dhis.facility_type_id  as facility_type_id,dhis.keph_level_id  as keph_level_id ";

}
