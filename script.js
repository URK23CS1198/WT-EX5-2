// SimpliEMI - Bank Loan EMI Calculator - JavaScript

function calculateEMI() {
    // Get input values
    const loanAmount = parseFloat(document.getElementById('loanAmount').value) || 0;
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value) || 0;
    const tenureYears = parseFloat(document.getElementById('tenureYears').value) || 0;
    
    // Convert to monthly values
    const monthlyInterestRate = (annualInterestRate / 12) / 100; // R = Annual Rate / 12 / 100
    const tenureMonths = tenureYears * 12; // N = Years * 12
    
    // Calculate EMI using formula: EMI = [P × R × (1 + R)^N] / [(1 + R)^N - 1]
    let emi = 0;
    if (monthlyInterestRate > 0 && tenureMonths > 0) {
        const numerator = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths);
        const denominator = Math.pow(1 + monthlyInterestRate, tenureMonths) - 1;
        emi = numerator / denominator;
    }
    
    // Calculate total amount and interest
    const totalAmount = emi * tenureMonths;
    const totalInterest = totalAmount - loanAmount;
    
    // Calculate percentages for chart
    const principalPercent = loanAmount > 0 ? ((loanAmount / totalAmount) * 100).toFixed(1) : 0;
    const interestPercent = loanAmount > 0 ? ((totalInterest / totalAmount) * 100).toFixed(1) : 0;
    
    // Update display
    document.getElementById('emiAmount').textContent = '₹' + (isNaN(emi) ? 0 : emi.toFixed(2));
    document.getElementById('displayLoan').textContent = '₹' + loanAmount.toLocaleString('en-IN');
    document.getElementById('totalInterest').textContent = '₹' + (isNaN(totalInterest) ? 0 : totalInterest.toFixed(2));
    document.getElementById('totalAmount').textContent = '₹' + (isNaN(totalAmount) ? 0 : totalAmount.toFixed(2));
    document.getElementById('totalMonths').textContent = tenureMonths + ' months';
    
    // Update chart percentages
    document.getElementById('chartPrincipal').textContent = principalPercent + '%';
    document.getElementById('chartInterest').textContent = interestPercent + '%';
}

// Calculate on page load
window.onload = function() {
    calculateEMI();
};
