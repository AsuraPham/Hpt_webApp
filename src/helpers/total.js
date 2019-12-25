export default  function Total (listPrescriptionDetails) {
  return listPrescriptionDetails.reduce(function (prev, cur) {
    return prev + cur.quantity * cur.medicine.price;
  }, 0);
};