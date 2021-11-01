const convertDate = (inputFormat: string): string => {
  function pad(s: number | string): string | number {
    return s < 10 ? '0' + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('.');
};

export default convertDate;