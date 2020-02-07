export const MaritalStatus = {
	name: 'maritalStatus',
	values: ['SINGLE', 'MARRIED', 'WIDOWED', 'DIVORCED'],
};

export const CoborrowerChoice = {
	name: 'coborrowerChoice',
	values: ['SINGLE', 'NON_SINGLE'],
};

/** @see http://www.europass.cz/wp-content/uploads/porovnani1.pdf */
export const EducationCS = {
	name: 'educationCS',
	values: ['b', 'j', 'e', 'k', 'n', 'r', 't', 'v'],
};

export const EducationISCED97 = {
	name: 'educationISCED97',
	values: ['1', '2', '3', '4', '5', '6'],
};

export const EducationNonStandard = {
	name: 'educationNonStandard',
	values: ['ELEMENTARY', 'SECONDARY', 'SECONDARY_WITH_MATURITA', 'TERTIARY', 'UNIVERSITY'],
};

// TODO:
// export const getEducationByLanguage = language =>
// 	language === 'cs' ? EducationCS : EducationISCED97;

export const getEducationByLanguage = () => EducationNonStandard;
