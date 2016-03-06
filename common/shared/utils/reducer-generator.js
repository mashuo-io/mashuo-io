export default (prefix, mapping, initialState) => {
	return (state = initialState, action) => {
		if (typeof action.type !== 'string') return state;

		if (!action.type.startsWith(`${prefix}.`)) return state;
		let type = action.type.replace(`${prefix}.`, '');
		let reducer = mapping[type];
		if (!reducer) return state;
		return reducer(state, action);
	};
};