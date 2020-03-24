export const createPDF = () => {
  var tableContent = document.getElementById('tableContainer')
    .innerHTML;
  var style = '<style>';
  style = style + 'table {width: 100%;font: 17px Calibri;}';
  style =
    style +
    'table, th, td {border: solid 1px #DDD; border-collapse: collapse;';
  style = style + 'padding: 2px 3px;text-align: center;}';
  style = style + '</style>';

  // CREATE A WINDOW OBJECT.
  var win = window.open('', '', 'height=700,width=700');

  win.document.write('<html><head>');
  win.document.write('<title>Print Table</title>'); // <title> FOR PDF HEADER.
  win.document.write(style); // ADD STYLE INSIDE THE HEAD TAG.
  win.document.write('</head>');
  win.document.write('<body>');
  win.document.write(tableContent); // THE TABLE CONTENTS INSIDE THE BODY TAG.
  win.document.write('</body></html>');

  win.document.close(); // CLOSE THE CURRENT WINDOW.

  win.print(); // PRINT THE CONTENTS.
};

export const tableToExcel = (function() {
  var uri = 'data:application/vnd.ms-excel;base64,',
    template =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
    base64 = function(s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    },
    format = function(s, c) {
      return s.replace(/{(\w+)}/g, function(m, p) {
        return c[p];
      });
    };
  return function(table, name) {
    if (!table.nodeType) table = document.getElementById(table);
    var ctx = {
      worksheet: name || 'Worksheet',
      table: table.innerHTML,
    };
    window.location.href = uri + base64(format(template, ctx));
  };
})();
