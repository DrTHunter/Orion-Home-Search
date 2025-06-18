    <script>
    // Calculator toggle functionality
    const mortgageToggle = document.getElementById('mortgage-toggle');
    const dtiToggle = document.getElementById('dti-toggle');
    const mortgageCalc = document.getElementById('mortgage-calculator');
    const dtiCalc = document.getElementById('dti-calculator');
    if (mortgageToggle && dtiToggle && mortgageCalc && dtiCalc) {
      mortgageToggle.addEventListener('click', function () {
        mortgageCalc.style.display = 'flex';
        dtiCalc.style.display = 'none';
        mortgageToggle.classList.add('cta-button');
        mortgageToggle.classList.remove('secondary-button');
        dtiToggle.classList.add('secondary-button');
        dtiToggle.classList.remove('cta-button');
      });
      dtiToggle.addEventListener('click', function () {
        mortgageCalc.style.display = 'none';
        dtiCalc.style.display = 'flex';
        dtiToggle.classList.add('cta-button');
        dtiToggle.classList.remove('secondary-button');
        mortgageToggle.classList.add('secondary-button');
        mortgageToggle.classList.remove('cta-button');
      });
    }

    // Mortgage Calculator functionality
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', calculateMortgage);
    }
    const mortgageInputs = document.querySelectorAll('#mortgage-calculator input, #mortgage-calculator select');
    mortgageInputs.forEach(input => {
      input.addEventListener('change', calculateMortgage);
      input.addEventListener('keyup', calculateMortgage);
    });
    function calculateMortgage() {
      const homePrice = parseFloat(document.getElementById('home-price').value) || 0;
      const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
      const loanTerm = parseInt(document.getElementById('loan-term').value) || 30;
      const interestRate = parseFloat(document.getElementById('interest-rate').value) || 0;
      const propertyTaxRate = parseFloat(document.getElementById('property-tax-rate').value) || 0;
      const insuranceRate = parseFloat(document.getElementById('insurance-rate').value) || 0;
      const hoaFee = parseFloat(document.getElementById('hoa-fee').value) || 0;
      const loanAmount = homePrice - downPayment;
      const monthlyInterestRate = interestRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;
      let monthlyPayment = 0;
      if (monthlyInterestRate > 0 && numberOfPayments > 0) {
        monthlyPayment = loanAmount *
          (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
          (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
      }
      const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;
      const monthlyInsurance = (homePrice * (insuranceRate / 100)) / 12;
      const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyInsurance + hoaFee;
      const totalInterest = (monthlyPayment * numberOfPayments) - loanAmount;
      const totalCost = homePrice + totalInterest + (monthlyPropertyTax * numberOfPayments) +
        (monthlyInsurance * numberOfPayments) + (hoaFee * numberOfPayments);
      document.getElementById('monthly-payment').textContent = formatCurrency(totalMonthlyPayment);
      document.getElementById('total-interest').textContent = formatCurrency(totalInterest);
      document.getElementById('total-cost').textContent = formatCurrency(totalCost);
      document.getElementById('principal-interest').textContent = formatCurrency(monthlyPayment);
      document.getElementById('property-tax').textContent = formatCurrency(monthlyPropertyTax);
      document.getElementById('home-insurance').textContent = formatCurrency(monthlyInsurance);
      document.getElementById('hoa-fee-display').textContent = formatCurrency(hoaFee);
      document.getElementById('total-monthly').textContent = formatCurrency(totalMonthlyPayment);
    }

    // DTI Calculator functionality
    const calculateDtiBtn = document.getElementById('calculate-dti-btn');
    if (calculateDtiBtn) {
      calculateDtiBtn.addEventListener('click', calculateDTI);
    }
    const dtiInputs = document.querySelectorAll('#dti-calculator input');
    dtiInputs.forEach(input => {
      input.addEventListener('change', calculateDTI);
      input.addEventListener('keyup', calculateDTI);
    });
    function calculateDTI() {
      const monthlyIncome = parseFloat(document.getElementById('monthly-income').value) || 0;
      const monthlyDebts = parseFloat(document.getElementById('monthly-debts').value) || 0;
      const proposedMortgage = parseFloat(document.getElementById('proposed-mortgage').value) || 0;
      const frontEndRatio = (proposedMortgage / monthlyIncome) * 100;
      const backEndRatio = ((monthlyDebts + proposedMortgage) / monthlyIncome) * 100;
      let lenderPreference = 'Poor';
      if (backEndRatio <= 36) {
        lenderPreference = 'Excellent';
      } else if (backEndRatio <= 43) {
        lenderPreference = 'Good';
      } else if (backEndRatio <= 50) {
        lenderPreference = 'Fair';
      }
      document.getElementById('front-end-ratio').textContent = frontEndRatio.toFixed(0) + '%';
      document.getElementById('back-end-ratio').textContent = backEndRatio.toFixed(0) + '%';
      document.getElementById('lender-preference').textContent = lenderPreference;
      document.getElementById('your-back-end').textContent = backEndRatio.toFixed(0) + '%';
    }

    // Helper function to format currency
    function formatCurrency(amount) {
      return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    // Calculate initial values
    calculateMortgage();
    calculateDTI();
  });
    </script>
