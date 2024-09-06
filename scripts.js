const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  try {
    const entries = new FormData(event.target);
    const { dividend, divider } = Object.fromEntries(entries);

    // Check for empty inputs
    if (dividend === "" || divider === "") {
      result.innerText = "Division not performed. Both values are required in inputs. Try again.";
      return;
    }

    // Parse inputs to numbers
    const numDividend = parseFloat(dividend);
    const numDivider = parseFloat(divider);

    // Check for invalid numbers
    if (isNaN(numDividend) || isNaN(numDivider)) {
      throw new Error("Invalid input: Non-numeric value");
    }

    // Check for division by zero
    if (numDivider === 0) {
      result.innerText = "Division not performed. Invalid number provided. Try again.";
      console.error(new Error("Division by zero").stack);
      return;
    }

    // Perform the division
    const resultValue = numDividend / numDivider;

    // Check if the result is a whole number
    if (Number.isInteger(resultValue)) {
      result.innerText = resultValue;
    } else {
      result.innerText = Math.floor(resultValue); // Display whole number part
    }
  } catch (error) {
    // Handle non-numeric inputs and other errors
    result.innerText = "Something critical went wrong. Please reload the page";
    console.error(error.stack);
  }
});
