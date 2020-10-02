export const convertDateToString = (val: Date) => { 
    let converted_date = val.getFullYear().toString() + '-' + val.getMonth().toString() + '-'+ val.getDay().toString();
    console.log(converted_date);
    return converted_date; 
};

export const convertStringToDate = (val: string) => { 
    let splited_date = val.split('-');
    let converted_date = new Date(parseInt(splited_date[0]), parseInt(splited_date[1]), parseInt(splited_date[2]));
    console.log(converted_date);
    return converted_date; 
};

export const COMPUTER_ID = 'MICROCOMPUTADOR';
export const PRM_ID = 'PRM';
export const PRPI_ID = 'PRPI';