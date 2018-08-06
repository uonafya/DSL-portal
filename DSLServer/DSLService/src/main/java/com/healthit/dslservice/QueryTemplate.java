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
    static final String SELECT ="SELECT {%s} FROM {%s}";
    static final String field = "{%s}.{%s} as {%s}";
    static final String JOIN_CAST_VARCHAR = "inner join {%s} on CAST ({%s}.{%s} AS Varchar)= CAST ({%s}.{%s} AS Varchar)";
    static final String JOIN = "inner join {%s} on {%s}.{%s} = {%s}.{%s}";
}
