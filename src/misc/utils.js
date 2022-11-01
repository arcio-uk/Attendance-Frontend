const getLessonsHappeningNow = (lessons) => {
	if (!lessons) return [];
	const timeNow = new Date();
	return lessons.filter((l) =>
		new Date(l['start-time']) < timeNow
		&& new Date(l['end-time']) > timeNow);
};

// eslint-disable-next-line import/prefer-default-export
export { getLessonsHappeningNow };