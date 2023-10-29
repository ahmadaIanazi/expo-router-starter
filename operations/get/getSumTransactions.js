import moment from 'moment';

export default function getSumTransactions(transactionsArray, sortBy, period) {
  if (!Array.isArray(transactionsArray)) {
    console.error('Input is not an array.');
    return [
      { date: 1, value: 0 },
    ];
  }

  const currentYear = period.getFullYear();
  const currentMonth = period.getMonth();

  let divisions = 1;
  if (sortBy === 'week') {
    divisions = 5; // Approximate number of weeks in a month
  } else if (sortBy === 'month') {
    divisions = 12; // 12 months in a year
  } else {
    divisions = moment(period).daysInMonth(); // Days in the specified month
  }

  const dataDivisions = Array.from({ length: divisions }, () => 0);

  transactionsArray.forEach((transaction) => {
    if (
      transaction &&
      transaction.date &&
      transaction.date.seconds &&
      transaction.newValue !== undefined &&
      transaction.oldValue !== undefined
    ) {
      const transactionDate = new Date(transaction.date.seconds * 1000);
      const transactionYear = transactionDate.getFullYear();
      const transactionMonth = transactionDate.getMonth();

      if (transactionYear === currentYear && transactionMonth === currentMonth) {
        let divisionIndex;
        if (sortBy === 'month') {
          divisionIndex = transactionMonth;
        } else if (sortBy === 'week') {
          divisionIndex = getWeekNumber(transactionDate, period) - 1;
        } else {
          divisionIndex = transactionDate.getDate() - 1;
        }

        if (divisionIndex >= 0 && divisionIndex < dataDivisions.length) {
          dataDivisions[divisionIndex] += transaction.newValue - transaction.oldValue;
        }
      }
    }
  });

  const divisionLabels =
    sortBy === 'month'
      ? moment.months()
      : sortBy === 'week'
      ? Array.from({ length: divisions }, (_, index) => index + 1)
      : Array.from({ length: divisions }, (_, index) => index + 1);

  return divisionLabels.map((date, index) => ({
    date,
    value: dataDivisions[index],
  }));
}

function getWeekNumber(date, period) {
  const periodStart = moment(period).startOf('month');
  return Math.ceil(moment(date).diff(periodStart, 'weeks', true)) + 1;
}
