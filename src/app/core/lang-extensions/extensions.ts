/**
 * 'number' prototype extension methods
 */
interface Number {
  roundTo: (decimalPlaces: number) => number;
  format: (decimalPlaces: number, useGrouping?: boolean, decimalSeparator?: '.' | ',') => string;
}

Number.prototype.roundTo = function(decimapPlaces: number) {
  return +(Math.round(+(this + 'e+' + decimapPlaces)) + 'e-' + decimapPlaces);
};

Number.prototype.format = function(decimalPlaces: number = 0, useGrouping: boolean = true, decimalSeparator?: '.' | ','): string {
  const ds = decimalSeparator || <'.' | ','>(0.1).toLocaleString('en-EN').match(/0(.*)1/)[1];
  const gs = ds === '.' ? ',' : '.';
  const thisAsNumber: number = this.roundTo(decimalPlaces);
  let retVal = thisAsNumber.toLocaleString('en-EN', {
    useGrouping,
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  });
  if (useGrouping) {
    retVal = retVal.replace(/,/g, '_GS_');
  }
  retVal = retVal.replace(/\./g, '_DS_');
  if (useGrouping) {
    retVal = retVal.replace(/_GS_/g, gs);
  }
  retVal = retVal.replace(/_DS_/g, ds);
  return retVal;
};

/**
 * 'array' prototype extension methods
 */
interface Array<T> {
  distinc: () => T[];
}

Array.prototype.distinc = function(): any[] {
  return this.filter((value: any, index: number, self: any[]) => self.indexOf(value) === index);
};
