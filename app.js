// Select the svg container

const svg = d3.select('svg');

d3.json('planet.json').then(data => {
	const circs = svg.selectAll('circle').data(data);
	console.log(circs);

	//Add attr
	circs
		.attr('cy', 200)
		.attr('cx', data => data.distance)
		.attr('r', data => data.radius)
		.attr('fill', data => data.fill);

	//append the enter selection

	circs
		.enter()
		.append('circle')
		.attr('cx', d => d.distance)
		.attr('cy', 200)
		.attr('r', d => d.radius)
		.attr('fill', d => d.fill);
});
