// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // hide results
  document.getElementById('results').style.display = 'none';

  // show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

function calculateResults(e) {
  const amount = document.getElementById('amount'),
        interest = document.getElementById('interest'),
        years = document.getElementById('years'),
        monthlyPayment = document.getElementById('monthly-payment'),
        totalPayment = document.getElementById('total-payment'),
        totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value),
        calculatedInterest = parseFloat(interest.value) / 100 / 12,
        calculatePayments = parseFloat(years.value) * 12;

  // compute montlhy payment
  const n = Math.pow(1 + calculatedInterest, calculatePayments),
        monthly = (principal * n * calculatedInterest) / (n-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatePayments).toFixed(2);
    totalInterest.value = ((monthly * calculatePayments) - principal).toFixed(2);

    // hide loader
    document.getElementById('loading').style.display = 'none';
    
    // show results
    document.getElementById('results').style.display = 'block';
  }else {
    showError('please check the numbers');
  }
}

function showError(err) {

  // hide loader
  document.getElementById('loading').style.display = 'none';
  
  // hide results
  document.getElementById('results').style.display = 'none';

  // create a div
  const errorDiv = document.createElement('div');

  // get elements
  const card = document.querySelector('.card'),
        heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger';
  
  // create text node and append it to div
  errorDiv.appendChild(document.createTextNode(err));

  // insert error above heading
  card.insertBefore(errorDiv, heading); 

  // clear error after 3 secs.
  setTimeout(clearError, 3000);
}

function clearError(){
  document.querySelector('.alert').remove();
}

