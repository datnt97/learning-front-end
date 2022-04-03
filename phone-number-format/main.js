const isNumericInput = (event) =>
{
	const key = event.which ? event.which : event.keyCode;

	const NUMBER_PAD_ZERO = 96;
	const NUMBER_PAD_NINE = 105;
	const NUMBER_LINE_ZERO = 48;
	const NUMBER_LINE_NINE = 57;

	const result = (key >= NUMBER_LINE_ZERO && key <= NUMBER_LINE_NINE) ||
		(key >= NUMBER_PAD_ZERO && key <= NUMBER_PAD_NINE);

	return result;
}

const isModifierKey = (event) =>
{
	const BACKSPACE_CODE = 8;
	const TAB_CODE = 9;
	const ENTER_CODE = 13;
	const DELETE_CODE = 46;

	const HOME_CODE = 35;
	const END_CODE = 36

	const ARROW_LEFT_CODE = 37;
	const ARROW_DOWN_CODE = 40;

	const CHAR_A_CODE = 65;
	const CHAR_C_CODE = 67;
	const CHAR_V_CODE = 86;
	const CHAR_X_CODE = 88;
	const CHAR_Z_CODE = 90;

	const key = event.which ? event.which : event.keyCode;
	const result =
		// Allow Shift, Home, End
		event.shiftKey === true ||
		key === HOME_CODE ||
		key === END_CODE ||

		// Allow Backspace, Tab, Enter, Delete
		key === BACKSPACE_CODE ||
		key === TAB_CODE ||
		key === ENTER_CODE ||
		key === DELETE_CODE ||

		// Allow Ctrl/Command + A,C,V,X,Z
		event.metaKey === true ||
		event.ctrlKey == true ||
		key === CHAR_A_CODE ||
		key === CHAR_C_CODE ||
		key === CHAR_V_CODE ||
		key === CHAR_X_CODE ||
		key === CHAR_Z_CODE ||

		// Allow left, up, right, down
		(key >= ARROW_LEFT_CODE && key <= ARROW_DOWN_CODE);

	return result;
}

const enforceFormat = (event) =>
{
	// Conditions: Input must be of a valid number format or a modifier key, and not longer than ten digits
	if (!isNumericInput(event) && !isModifierKey(event))
	{
		event.preventDefault();
	}
}

const formatToPhone = (event) =>
{
	if (isModifierKey(event)) return;

	const inputValue = event.target.value.replace(/\D/g, '').substring(0, 10);

	const areaCode = inputValue.substring(0, 3);
	const numbersMiddle = inputValue.substring(3, 6);
	const numbersLast = inputValue.substring(6, 10);

	if (inputValue.length > 6)
	{
		event.target.value = `(${areaCode}) ${numbersMiddle}-${numbersLast}`;
	}
	else
	{
		if (inputValue.length > 3)
		{
			event.target.value = `(${areaCode}) ${numbersMiddle}`;
		}
		else
		{
			if (inputValue.length > 0)
			{
				event.target.value = `(${areaCode}`;
			}
		}
	}
}

const phoneNumberInput = document.getElementById('phoneNumber');

phoneNumberInput.addEventListener('keydown', enforceFormat);
phoneNumberInput.addEventListener('keyup', formatToPhone);