var queryParametersList = [];
//for year month period
function setPeriodValues(periodType, startDate, endDate) {
    var dateValuesToQuery = {};
    dateValuesToQuery['filter'] = {};
    var startDate = startDate;
    var endDate = endDate;
    dateValuesToQuery['filter'] = {};
    if (periodType == "monthly") {
        dateValuesToQuery['what'] = 'date:yearly:monthly';
        dateValuesToQuery['filter']['start_month'] = new Array('1');
        dateValuesToQuery['filter']['end_month'] = new Array('12');
    } else if (periodType == "yearly") {
        dateValuesToQuery['what'] = 'date:yearly';
    }
    dateValuesToQuery['filter']['start_year'] = new Array();
    dateValuesToQuery['filter']['start_year'].push(startDate);
    dateValuesToQuery['filter']['end_year'] = new Array();
    dateValuesToQuery['filter']['end_year'].push(endDate);
    queryParametersList.push(dateValuesToQuery);
    return queryParametersList;
}

function sortIndicatorType(indicatorType, indicator, filter){
    if(indicatorType.indexOf('facility') != -1){
        setInfrustructureValues(indicatorType, indicator);
    }else if(indicatorType.indexOf('indicator') != -1){
        setIndicatorValues(indicatorType, indicator);
    }else if(indicatorType.indexOf('human_resource') != -1){
        setHRValues(indicatorType, indicator);
    }else{
    }
    
}

function setIndicatorValues(indicatorType, indicator, filter) {
    var indicatorValuesToQuery = {};
    indicatorValuesToQuery['what'] = indicatorType;
    indicatorValuesToQuery['filter'] = {'indicator': new Array(indicator)};
    queryParametersList.push(indicatorValuesToQuery);
    return queryParametersList;
}


function setInfrustructureValues(indicatorType, indicator, filter) {
    var indicatorValuesToQuery = {};
    indicatorValuesToQuery['what'] = indicatorType;
    indicatorValuesToQuery['filter'] = {'facility': new Array(indicator)};
    queryParametersList.push(indicatorValuesToQuery);
    return queryParametersList;
}


function setHRValues(indicatorType, indicator, filter) {
    var indicatorValuesToQuery = {};
    indicatorValuesToQuery['what'] = indicatorType;
    indicatorValuesToQuery['filter'] = {'cadre': new Array(indicator)};
    queryParametersList.push(indicatorValuesToQuery);
    return queryParametersList;
}


function setLocality(org_level, filter) {
    var localityValuesToQuery = {};
    localityValuesToQuery['what'] = "locality:" + org_level;
    localityValuesToQuery['filter'] = filter;
    console.log("Filter");
    console.log(filter);
    queryParametersList.push(localityValuesToQuery);
    return queryParametersList;
}

function setIhrisValues(cadreType) {
    var humanResourceValuesToQuery = {};
    humanResourceValuesToQuery['what'] = cadreType;
    humanResourceValuesToQuery['filter'] = {};
    var what = '';
    humanResourceValuesToQuery['what'] = humanResourceValuesToQuery['what'] + what;
    queryParametersList.push(humanResourceValuesToQuery);
    return queryParametersList;
}


function setKemsaValues(commodityType) {
    var commodityValuesToQuery = {};
    commodityValuesToQuery['what'] = commodityType;
    queryParametersList.push(commodityValuesToQuery);
    return queryParametersList;
}