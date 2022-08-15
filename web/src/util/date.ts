export function dateComparator(date1: Date, date2: Date) {
    var date1Number = date1.getTime();
    var date2Number = date2.getTime();
  
    if (date1Number == null && date2Number == null) {
      return 0;
    }
  
    if (date1Number == null) {
      return -1;
    } else if (date2Number == null) {
      return 1;
    }
  
    // @ts-ignore
    return date1Number - date2Number;
  }